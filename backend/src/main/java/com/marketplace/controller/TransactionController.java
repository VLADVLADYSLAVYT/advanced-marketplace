package com.marketplace.controller;

import com.marketplace.dto.TransactionDTO;
import com.marketplace.model.Transaction;
import com.marketplace.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionRepository transactionRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserTransactions(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Transaction> transactions = transactionRepository.findByProductIdOrderByCreatedAtDesc(userId, pageable);
        
        Page<TransactionDTO> dtos = transactions.map(this::toDTO);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getProductTransactions(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Transaction> transactions = transactionRepository.findByProductIdOrderByCreatedAtDesc(productId, pageable);
        
        Page<TransactionDTO> dtos = transactions.map(this::toDTO);
        return ResponseEntity.ok(dtos);
    }

    private TransactionDTO toDTO(Transaction transaction) {
        return new TransactionDTO(
            transaction.getId(),
            transaction.getProduct().getId(),
            transaction.getProduct().getName(),
            transaction.getUser().getId(),
            transaction.getUser().getUsername(),
            transaction.getType().name(),
            transaction.getQuantity(),
            transaction.getPricePerUnit(),
            transaction.getTotalPrice(),
            transaction.getCreatedAt()
        );
    }

}
