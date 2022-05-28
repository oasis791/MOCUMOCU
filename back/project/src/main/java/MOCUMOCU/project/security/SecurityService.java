package MOCUMOCU.project.security;

import MOCUMOCU.project.domain.Privacy;

public interface SecurityService {

    String createToken(Privacy privacy, long expTime);

    String getSubject(String token);
}
