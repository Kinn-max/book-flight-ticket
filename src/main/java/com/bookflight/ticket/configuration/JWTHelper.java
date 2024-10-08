package com.bookflight.ticket.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.*;
import java.security.spec.ECGenParameterSpec;

@Component
public class JWTHelper {
//    @Value("${SECRET_KEY}")
//    public String secretKey;
    private KeyPair keyPair;

    @PostConstruct
    public void initKeys() {
        if (this.keyPair == null) {
            try {
                KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("EC");
                ECGenParameterSpec ecSpec = new ECGenParameterSpec("secp256r1");
                keyPairGenerator.initialize(ecSpec, new SecureRandom());
                this.keyPair = keyPairGenerator.generateKeyPair();
            } catch (Exception e) {
                throw new IllegalStateException("Failed to generate EC key pair", e);
            }
        }
    }

    private PrivateKey getPrivateKey() {
        return this.keyPair.getPrivate();
    }

    private PublicKey getPublicKey() {
        return this.keyPair.getPublic();
    }

    public String generateToken(String data){
//        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
        return Jwts.builder().subject(data).signWith(getPrivateKey(), SignatureAlgorithm.ES256).compact();
    }

    public boolean verifyToken(String token){
        try {
//            SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));

            Jwts.parser()
                    .verifyWith(getPublicKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        }
        catch(Exception e){
            return false;
        }
    }

    public String getUsername(String token){
//        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
        Claims claims = Jwts.parser()
                .verifyWith(getPublicKey())
                .build()
                .parseSignedClaims(token)
                .getBody();
        String username = claims.getSubject();
        return username;
    }
}
