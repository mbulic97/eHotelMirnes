package com.eHotelMirnes.backend.repository;
import com.eHotelMirnes.backend.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;


import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest(properties = {
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect"
})

class UserRepositoryTest{
    @Autowired
    private UserRepository userRepository;
    @Test
    @DisplayName("Should save user successfully")
    void shouldSaveUserSuccessfully() {
        User user = new User();
        user.setEmail("mirnes@gmail.com");
        user.setName("mirnes1");
        user.setPassword("123");
        user.setPhoneNumber("056543165");
        user.setRole("User");

        User savedUser = userRepository.save(user);
        Optional<User> result = userRepository.findById(savedUser.getId());
        assertEquals("mirnes@gmail.com",savedUser.getEmail());
        assertEquals("mirnes1",savedUser.getName());
        assertEquals("056543165",savedUser.getPhoneNumber());
        assertEquals("User",savedUser.getRole());
        assertNotNull(savedUser.getId());
    }
    @Test
    @DisplayName("Should find user by email successfully")
    void shouldFindUserByEmailSuccessfully(){
        User user = new User();
        user.setEmail("mirnes@gmail.com");
        user.setName("mirnes1");
        user.setPassword("123");
        user.setPhoneNumber("056543165");
        user.setRole("User");

        User savedUser = userRepository.save(user);

        Optional<User> result = userRepository.findByEmail("mirnes@gmail.com");

        assertEquals("mirnes@gmail.com",result.get().getEmail());
        assertEquals("mirnes1",result.get().getName());
        assertEquals("056543165",result.get().getPhoneNumber());
        assertEquals("User",result.get().getRole());
        assertNotNull(result.get().getId());
    }

    @Test
    @DisplayName("Should delete user successfully")
    void shouldDeleteUserSuccessfully() {

        User user = new User();
        user.setEmail("mirnes@gmail.com");
        user.setName("mirnes1");
        user.setPhoneNumber("061123456");
        user.setPassword("123456");
        user.setRole("USER");

        User savedUser = userRepository.save(user);

        userRepository.deleteById(savedUser.getId());

        Optional<User> result =
                userRepository.findById(savedUser.getId());

        assertTrue(result.isEmpty());
    }


}
