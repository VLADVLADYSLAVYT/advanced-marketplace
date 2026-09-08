package com.marketplace.controller;

import com.marketplace.dto.BuyProductRequest;
import com.marketplace.dto.SellProductRequest;
import com.marketplace.model.Transaction;
import com.marketplace.service.MarketplaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/marketplace")
@RequiredArgsConstructor
public class MarketplaceController {

    private final MarketplaceService marketplaceService;

    @PostMapping("/buy")
    public ResponseEntity<?> buyProduct(
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody BuyProductRequest request) {
        try {
            Transaction transaction = marketplaceService.buyProduct(userId, request);
            return ResponseEntity.ok(transaction);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/sell")
    public ResponseEntity<?> sellProduct(
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody SellProductRequest request) {
        try {
            Transaction transaction = marketplaceService.sellProduct(userId, request);
            return ResponseEntity.ok(transaction);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
