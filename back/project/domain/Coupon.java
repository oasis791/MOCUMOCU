package MOCUMOCU.project.domain;

import MOCUMOCU.project.customer.Customer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Coupon {

    @Id @GeneratedValue
    @Column(name = "coupon_id")
    private Long id;

    private int amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardCustom boardCustom;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stamp_id")
    private StampCustom stampCustom;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "market_id")
    private Market market;
}
