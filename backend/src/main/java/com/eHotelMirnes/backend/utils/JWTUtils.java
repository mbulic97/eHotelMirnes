package com.eHotelMirnes.backend.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTUtils {
    private static final long EXPIRATION_TIME = 100 * 60 * 24 * 7;

    private final SecretKey Key;

    public JWTUtils(){
        String secreteString = "JJPW4QAd7wyLeV0R3y3k2LoKjmGRLc1RLbXcs4mORVk"; // https://secretkeygenerator.com/jwt-secret-key-generator
        // ili mozda NhutXy43HMYNPR4qXEls92kgBvShJFE7RrYyOCgZxZu4j1FHiG0BwbCaFQe
        byte[] keyBytes = secreteString.getBytes(StandardCharsets.UTF_8);
        this.Key = new SecretKeySpec(keyBytes,"HmacSHA256");
    }
    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt((new Date(System.currentTimeMillis())))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }
    public String extractUsername(String token){
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction){
        return claimsTFunction.apply(Jwts.parser().verifyWith(Key).build().parseSignedClaims(token).getPayload());
    }
    private boolean isTokenExpired(String token){
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }
}
