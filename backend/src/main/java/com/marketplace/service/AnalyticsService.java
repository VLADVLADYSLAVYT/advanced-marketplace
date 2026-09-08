package com.marketplace.service;

import com.marketplace.model.PriceHistory;
import com.marketplace.model.Product;
import com.marketplace.repository.PriceHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final PriceHistoryRepository priceHistoryRepository;

    @Transactional(readOnly = true)
    public List<PriceHistory> getProductPriceHistory(Long productId, int days) {
        return priceHistoryRepository.findPriceHistoryByDays(productId, days);
    }

    @Transactional
    public void recordPriceSnapshot(Product product) {
        PriceHistory history = new PriceHistory();
        history.setProduct(product);
        history.setPrice(product.getCurrentPrice());
        history.setDemandIndex(product.getDemandIndex());
        history.setSupplyIndex(product.getSupplyIndex());
        
        priceHistoryRepository.save(history);
    }

}
