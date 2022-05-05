package MOCUMOCU.project.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Owner {

    @Id @GeneratedValue
    @Column(name = "owner_id")
    private Long id;

    @Embedded
    private Privacy privacy;

    private boolean enable;

    @OneToMany(mappedBy = "owner")
    private List<Market> markets = new ArrayList<>();
}
