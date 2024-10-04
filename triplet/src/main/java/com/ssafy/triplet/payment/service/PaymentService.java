package com.ssafy.triplet.payment.service;

import com.ssafy.triplet.account.entity.Account;
import com.ssafy.triplet.account.entity.TransactionList;
import com.ssafy.triplet.account.repository.AccountRepository;
import com.ssafy.triplet.account.repository.TransactionListRepository;
import com.ssafy.triplet.exception.CustomErrorCode;
import com.ssafy.triplet.exception.CustomException;
import com.ssafy.triplet.payment.dto.request.PaymentRequest;
import com.ssafy.triplet.payment.dto.response.PaymentResponse;
import com.ssafy.triplet.travel.entity.*;
import com.ssafy.triplet.travel.repository.MerchantRepository;
import com.ssafy.triplet.travel.repository.TravelBudgetRepository;
import com.ssafy.triplet.travel.repository.TravelTransactionListRepository;
import com.ssafy.triplet.travel.repository.TravelWalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final MerchantRepository merchantRepository;
    private final AccountRepository accountRepository;
    private final TransactionListRepository transactionListRepository;

    private final TravelWalletRepository travelWalletRepository;
    private final TravelTransactionListRepository travelTransactionListRepository;

    private final TravelBudgetRepository travelBudgetRepository;

    public Merchant getMerchantById(Long id) {

        return merchantRepository.findById(id).orElse(null);
    }


    @Transactional
    public PaymentResponse paymentProcess(PaymentRequest request) {
        PaymentResponse result = null;
        if (request.getIsTravel()) {
            result = travelAccountPayment(request);
        } else {
            result = commonAccountPayment(request);
        }

        return result;
    }


    public PaymentResponse travelAccountPayment(PaymentRequest request) {
        TravelWallet travelWallet = travelWalletRepository.findById(request.getAccountId()).orElse(null);
        Merchant merchant = merchantRepository.findById(request.getMerchantId()).orElse(null);
        validateMerchantAndPaymentCurrency(merchant, travelWallet);
        Double price = request.getPrice();
        validateWalletBalance(travelWallet, price);

        // 지갑 금액 빼고 기록
        processTransaction(travelWallet, merchant, price);


        // 지출 현황 업데이트
        TravelBudget travelBudget = travelBudgetRepository.findBudgetByCategoryAndTravel(travelWallet.getTravelId().getId(), merchant.getCategory().getCategoryId());
        updateBudget(travelBudget, price);

        PaymentResponse result = PaymentResponse.builder()
                .currency(merchant.getCurrency())
                .merchantName(merchant.getMerchantName())
                .price(price)
                .merchantId(merchant.getId())
                .build();

        return result;
    }

    private void updateBudget(TravelBudget travelBudget, Double price) {
        if (travelBudget == null) {
            throw new CustomException(CustomErrorCode.TRAVEL_BUDGET_NOT_FOUND);
        }
        travelBudget.setUsedBudget(travelBudget.getUsedBudget() + price);
        updateBudgetUsageRate(travelBudget);
    }

    // 50 안넘음 80 안넘음
    // 50 넘음 80 안넘음
    // 50 넘음 80 넘음

    private void updateBudgetUsageRate(TravelBudget travelBudget) {
        
        if(!travelBudget.isOverFifty() && travelBudget.getFiftyBudget() <= travelBudget.getUsedBudget()){
                travelBudget.setOverFifty(true);
                // 50% 초과 푸시알림 
                
        }else if(travelBudget.isOverFifty() && !travelBudget.isOverEight()){
            if(travelBudget.getEightyBudget() <= travelBudget.getUsedBudget()){
                travelBudget.setOverEight(true);
                // 80% 초과 푸시알림

            }
        }
    }

    private void processTransaction(TravelWallet travelWallet, Merchant merchant, Double price) {
        updateAccountBalance(travelWallet, price);
        Category category = merchant.getCategory();
        Travel travel = travelWallet.getTravelId();
        logTransaction(travelWallet, price, category, merchant.getMerchantName(), travel);
    }

    private void updateAccountBalance(TravelWallet travelWallet, Double amount) {
        travelWallet.setBalance(travelWallet.getBalance() - amount);
        travelWalletRepository.save(travelWallet);
    }

    private void logTransaction(TravelWallet travelWallet, Double price, Category category, String merchantName, Travel travel) {
        TravelTransactionList transaction = new TravelTransactionList();
        transaction.setPrice(price);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setBalance(travelWallet.getBalance());
        transaction.setCategory(category);
        transaction.setTransactionName(merchantName);
        transaction.setTravel(travel);
        travelTransactionListRepository.save(transaction);
    }


    public PaymentResponse commonAccountPayment(PaymentRequest request) {

        Account account = accountRepository.findById(request.getAccountId()).orElse(null);
        Merchant merchant = merchantRepository.findById(request.getMerchantId()).orElse(null);
        validateMerchantAndPaymentCurrency(merchant, account);
        Double price = request.getPrice();
        validateAccountBalance(account, price);

        processTransaction(account, merchant, price);

        PaymentResponse result = PaymentResponse.builder()
                .currency(merchant.getCurrency())
                .merchantName(merchant.getMerchantName())
                .price(price)
                .merchantId(merchant.getId())
                .build();

        return result;
    }


    private void processTransaction(Account account, Merchant merchant, Double price) {
        updateAccountBalance(account, price);
        logTransaction(account, 2, price, "출금", merchant.getMerchantName(), merchant.getAccountNumber());
    }

    private void updateAccountBalance(Account account, Double amount) {
        account.setAccountBalance(account.getAccountBalance() - amount);
        accountRepository.save(account);
    }

    private void logTransaction(Account account, int transactionType, Double amount, String typeName, String transactionName, String targetAccountNumber) {
        TransactionList transaction = TransactionList.builder()
                .transactionType(transactionType) // 트랜잭션 타입 상수로 치환 가능
                .transactionTypeName(typeName)
                .transactionAccountNumber(targetAccountNumber)
                .price(amount)
                .transactionAfterBalance(account.getAccountBalance())
                .transactionName(transactionName)
                .account(account)
                .build();
        transactionListRepository.save(transaction);
    }


    private void validateAccountBalance(Account account, Double price) {
        if (account == null) {
            throw new CustomException(CustomErrorCode.WITHDRAWAL_ACCOUNT_NOT_FOUND);
        }
        if (account.getAccountBalance() < price) {
            throw new CustomException(CustomErrorCode.INSUFFICIENT_BALANCE);
        }
        if (0 >= price) {
            throw new CustomException(CustomErrorCode.INVALID_PRICE_VALUE);
        }
    }

    private void validateWalletBalance(TravelWallet travelWallet, Double price) {
        if (travelWallet == null) {
            throw new CustomException(CustomErrorCode.WITHDRAWAL_ACCOUNT_NOT_FOUND);
        }
        if (travelWallet.getBalance() < price) {
            throw new CustomException(CustomErrorCode.INSUFFICIENT_BALANCE);
        }
        if (0 >= price) {
            throw new CustomException(CustomErrorCode.INVALID_PRICE_VALUE);
        }
    }

    private void validateMerchantAndPaymentCurrency(Merchant merchant, Account account) {
        if (merchant == null) {
            throw new CustomException(CustomErrorCode.MERCHANT_NOT_FOUND);
        }
        if (account == null) {
            throw new CustomException(CustomErrorCode.WITHDRAWAL_ACCOUNT_NOT_FOUND);
        }
        if (!account.getCurrency().equals(merchant.getCurrency())) {
            throw new CustomException(CustomErrorCode.MERCHANT_AND_PAYMENT_CURRENCY_MISMATCH);
        }
    }





    private void validateMerchantAndPaymentCurrency(Merchant merchant, TravelWallet travelWallet) {
        if (merchant == null) {
            throw new CustomException(CustomErrorCode.MERCHANT_NOT_FOUND);
        }
        if (travelWallet == null) {
            throw new CustomException(CustomErrorCode.WITHDRAWAL_ACCOUNT_NOT_FOUND);
        }
        if (!travelWallet.getCurrency().equals(merchant.getCurrency())) {
            throw new CustomException(CustomErrorCode.MERCHANT_AND_PAYMENT_CURRENCY_MISMATCH);
        }
    }


}