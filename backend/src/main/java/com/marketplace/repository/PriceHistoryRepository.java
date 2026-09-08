package com.marketplace.repository;

import com.marketplace.model.PriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {

    @Query("SELECT ph FROM PriceHistory ph WHERE ph.product.id = :productId " +
           "AND ph.recordedAt >= CURRENT_TIMESTAMP - :days " +
           "ORDER BY ph.recordedAt ASC")
    List<PriceHistory> findPriceHistoryByDays(@Param("productId") Long productId, @Param("days") int days);

    List<PriceHistory> findByProductIdOrderByRecordedAtDesc(Long productId);

}
