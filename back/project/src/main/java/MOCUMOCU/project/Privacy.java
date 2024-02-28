package MOCUMOCU.project;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Embeddable;

@Embeddable
@Getter @Setter
public class Privacy {

    private String name;
    private String email;
    private String password;
    private String phoneNum;
}
