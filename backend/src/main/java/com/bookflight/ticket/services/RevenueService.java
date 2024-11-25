package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.DashboardSummary;
import com.bookflight.ticket.dto.response.RevenueResponse;
import com.bookflight.ticket.dto.response.YearlyRevenueResponse;

import java.time.LocalDate;
import java.util.List;

public interface RevenueService {
     List<RevenueResponse> getRevenueByDate();
     YearlyRevenueResponse getRevenueByYear(Integer year);
     DashboardSummary getDashboardSummary();
}
