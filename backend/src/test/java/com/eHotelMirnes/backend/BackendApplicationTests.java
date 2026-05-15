package com.eHotelMirnes.backend;

import com.eHotelMirnes.backend.entity.Booking;
import com.eHotelMirnes.backend.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

//@SpringBootTest
class BackendApplicationTests {

	/*@Test
	void contextLoads() {
	}*/
	@Test
	void shouldReturnUsername() {
		User user = new User();
		user.setEmail("mirnesbulic@gmail.com");

		assertEquals("mirnesbulic@gmail.com", user.getUsername());

	}
	@Test
	void shouldCalculateTotalGuests() {
		Booking booking = new Booking();
		booking.setNumOfAdults(2);
		booking.setNumOfChildren(1);

		assertEquals(3, booking.getTotalNumOfGuest());
	}

}
