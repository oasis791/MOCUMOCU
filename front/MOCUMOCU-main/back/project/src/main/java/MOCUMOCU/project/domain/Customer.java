package MOCUMOCU.project.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
public class Customer {

    @Id @GeneratedValue
    @Column(name = "customer_id")
    private Long id;

    @Embedded
    private Privacy privacy;

    private boolean sex; // 남 1, 여 0
    private int attendanceDate; //연속 출석 일수
    private int userPoint; //보유 포인트
    private boolean enable;
    private Date lastDate; //마지막 접속 날짜 저장

    @OneToMany(mappedBy = "customer")
    private List<Coupon> coupons = new ArrayList<>();

    @OneToMany(mappedBy = "customer")
    private List<BoardCustomer> boardCustomers = new ArrayList<>();

    @OneToMany(mappedBy = "customer")
    private List<StampCustomer> stampCustomers = new ArrayList<>();
}
