package com.bookflight.ticket.controllers;
import com.bookflight.ticket.dto.response.RevenueResponse;
import com.bookflight.ticket.dto.response.YearlyRevenueResponse;
import com.bookflight.ticket.services.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;


@RestController
@RequestMapping("/api/admin/revenue")
public class RevenueController {
    @Autowired
    private RevenueService revenueService;
    @GetMapping("/today")
    public ResponseEntity<?> getRevenueToday() {
        try {
            List<RevenueResponse> result = revenueService.getRevenueByDate();
            return ResponseEntity.ok(result);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/yearly/{year}")
    public ResponseEntity<?> getRevenueByYear(@PathVariable Integer year) {
        try {
            YearlyRevenueResponse revenue = revenueService.getRevenueByYear(year);
            return ResponseEntity.ok(revenue);
        } catch (Exception e) {
           return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
