package com.marketplace.controller;

import com.marketplace.dto.PriceHistoryDTO;
import com.marketplace.model.PriceHistory;
import com.marketplace.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/price-history/{productId}")
    public ResponseEntity<?> getPriceHistory(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "7") int days) {
        
        List<PriceHistory> history = analyticsService.getProductPriceHistory(productId, days);
        List<PriceHistoryDTO> dtos = history.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }

    private PriceHistoryDTO toDTO(PriceHistory history) {
        return new PriceHistoryDTO(
            history.getId(),
            history.getProduct().getId(),
            history.getProduct().getName(),
            history.getPrice(),
            history.getDemandIndex(),
            history.getSupplyIndex(),
            history.getRecordedAt()
        );
    }

}
