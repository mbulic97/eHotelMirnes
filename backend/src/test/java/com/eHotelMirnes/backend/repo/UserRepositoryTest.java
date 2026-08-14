package com.eHotelMirnes.backend.repo;
import com.eHotelMirnes.backend.entity.User;
import com.eHotelMirnes.backend.repo.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
//@SpringBootTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest{
    @Autowired
    private UserRepository userRepository;
    @Test
    void shouldSaveUserAndGenerateId() {
        User user = new User();
        user.setEmail("test1@gmail.com");
        user.setName("Test1");
        user.setPassword("123");
        user.setPhoneNumber("056543165");
        user.setRole("User");
        User savedUser = userRepository.save(user);

        assertNotNull(savedUser.getId());
    }
}
