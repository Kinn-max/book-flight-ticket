package com.bookflight.ticket.converter;


import com.bookflight.ticket.dto.response.TicketBookedInfo;
import com.bookflight.ticket.models.TicketEntity;
import com.bookflight.ticket.repositories.AirlineRepository;
import com.bookflight.ticket.repositories.AirportRepository;
import com.bookflight.ticket.repositories.TicketRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketConverter {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private AirportRepository airportRepository;
    public TicketBookedInfo toTicketBookedInfo(TicketEntity ticketEntity) {
//        TicketBookedInfo bookedInfo = modelMapper.map(ticketEntity, TicketBookedInfo.class);
        TicketBookedInfo bookedInfo = new TicketBookedInfo();

        bookedInfo.setTicketId(ticketEntity.getId());
        bookedInfo.setPrice(ticketEntity.getPrice());
        bookedInfo.setSeatNumber(ticketEntity.getSeat().getSeatNumber());
        bookedInfo.setSeatClass(ticketEntity.getSeat().getSeatClass());
        bookedInfo.setFlightCode(ticketEntity.getFlightEntity().getCode());
        bookedInfo.setDepartureTime(ticketEntity.getFlightEntity().getDepartureTime());
        bookedInfo.setArrivalTime(ticketEntity.getFlightEntity().getArrivalTime());
        bookedInfo.setArrivalAirportName(airportRepository.findById(ticketEntity.getFlightEntity().getArrivalId()).get().getName());
        bookedInfo.setDepartureAirportName(airportRepository.findById(ticketEntity.getFlightEntity().getDepartureId()).get().getName());
        bookedInfo.setAirlineName(ticketEntity.getFlightEntity().getPlaneEntity().getAirlineEntity().getName());
        bookedInfo.setCreateAt(ticketEntity.getCreateAt());
        bookedInfo.setEmail(ticketEntity.getEmail());
        bookedInfo.setName(ticketEntity.getName());
        bookedInfo.setPhone(ticketEntity.getPhone());
        bookedInfo.setLogo(ticketEntity.getFlightEntity().getPlaneEntity().getAirlineEntity().getLogo());
        if(ticketEntity.getLuggageEntity() == null){
            bookedInfo.setLuggage(0);
        }else {
            bookedInfo.setLuggage(ticketEntity.getLuggageEntity().getPrice());
        }
        return bookedInfo;
    }
}
