package com.eHotelMirnes.backend.service.interfac;

import com.eHotelMirnes.backend.dto.LoginRequest;
import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.entity.User;

public interface IUserService {
    Response register(User user);
    Response login(LoginRequest loginRequest);
}
