package com.bookflight.ticket.controllers;

import com.bookflight.ticket.dto.request.TicketRequest;
import com.bookflight.ticket.services.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/get-info/{flight_id}/{seat_class}")
    public ResponseEntity<?> getInfoBooking(@PathVariable String flight_id, @PathVariable String seat_class){
        try {
            return ResponseEntity.ok(paymentService.getInfoBooking(flight_id, seat_class));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create_payment_vnpay")
    public ResponseEntity<String> createPaymentVnPay(@RequestBody @Valid TicketRequest ticketRequest) throws UnsupportedEncodingException {
        try {
            return ResponseEntity.ok(paymentService.createPayment(ticketRequest));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/booking")
    public ResponseEntity<?> getBooking(
            @RequestParam(required = false) Integer flightId,
            @RequestParam(required = false) Integer seatId,
            @RequestParam(required = false) Float vnp_Amount,
            @RequestParam(required = false) Integer luggageId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String userId
    ) throws Exception {
        try{
            TicketRequest ticketRequest = new TicketRequest((long) seatId, (long) flightId, (long) luggageId, name, phone, email);
            long id = Long.parseLong(userId);
            paymentService.bookTicket(ticketRequest, id, vnp_Amount);
            return ResponseEntity.ok().body("Booking flight successful");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
