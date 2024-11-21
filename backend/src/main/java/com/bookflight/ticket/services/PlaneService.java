package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.PlaneRequest;
import com.bookflight.ticket.dto.response.PlaneResponse;

import java.util.List;

public interface PlaneService {
    void createPlane(PlaneRequest planeRequest);
    List<PlaneResponse> getAllPlanes();
    void deletePlane(Long planeId) throws Exception;
}
