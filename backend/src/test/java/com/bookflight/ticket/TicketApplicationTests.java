package com.bookflight.ticket;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
class TicketApplicationTests {

	@Test
	void contextLoads() {
		LocalDate today = LocalDate.now();
		System.out.println(today);
	}

}
