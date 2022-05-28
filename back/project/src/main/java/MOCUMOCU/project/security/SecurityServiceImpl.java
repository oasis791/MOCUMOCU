package MOCUMOCU.project.security;

import MOCUMOCU.project.domain.Privacy;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

@Service
public class SecurityServiceImpl implements SecurityService {
    private static final String SECRET_KEY = "asdfasdfasdfaasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsdfsadfasdfsdfasdfasdfasdfasdf";

    //로그인 서비스 던질 때 같이
    /*public String createToken(String subject, long expTime) {
        if (expTime <= 0) {
            throw new RuntimeException("Expire Time has to bigger than 0");
        }

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        return Jwts.builder()
                .setSubject(subject)
                .signWith(signingKey, signatureAlgorithm)
                .setExpiration(new Date(System.currentTimeMillis() + expTime))
                .compact();
    }*/

    @Override
    public String createToken(Privacy privacy, long expTime) {
        if (expTime <= 0) {
            throw new RuntimeException("Expire Time has to bigger than 0");
        }

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

       /* return Jwts.builder()
                .setSubject(person.getName())
                .signWith(signingKey, signatureAlgorithm)
                .setExpiration(new Date(System.currentTimeMillis() + expTime))
                .compact();*/

        return null;
    }

    //실제 사용할 땐 토큰 검증하는 메소드를 boolean 형으로 이용
    @Override
    public String getSubject(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}