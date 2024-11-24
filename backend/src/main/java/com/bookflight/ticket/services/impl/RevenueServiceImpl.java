package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.dto.response.MonthlyRevenueResponse;
import com.bookflight.ticket.dto.response.RevenueResponse;
import com.bookflight.ticket.dto.response.YearlyRevenueResponse;
import com.bookflight.ticket.models.RevenueEntity;
import com.bookflight.ticket.repositories.RevenueRepository;
import com.bookflight.ticket.services.RevenueService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RevenueServiceImpl implements RevenueService {
    @Autowired
    private RevenueRepository revenueRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<RevenueResponse> getRevenueByDate() {
        LocalDate date = LocalDate.now();
        List<RevenueEntity> revenueList = revenueRepository.findAllByDate(date);
        List<RevenueResponse> revenueResponseList = new ArrayList<>();
        for (RevenueEntity revenueEntity : revenueList) {
            RevenueResponse revenueResponse = modelMapper.map(revenueEntity, RevenueResponse.class);
            revenueResponseList.add(revenueResponse);
        }
        return revenueResponseList;
    }

    @Override
    public YearlyRevenueResponse getRevenueByYear(Integer year) {
        List<MonthlyRevenueResponse> monthlyRevenues = revenueRepository.getMonthlyRevenueByYear(year);

        BigDecimal totalYearlyRevenue = monthlyRevenues.stream()
                .map(MonthlyRevenueResponse::getTotalRevenue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        YearlyRevenueResponse response = YearlyRevenueResponse.builder()
                .year(year)
                .totalRevenue(totalYearlyRevenue)
                .monthlyRevenues(monthlyRevenues)
                .build();
        return response;
    }
}
