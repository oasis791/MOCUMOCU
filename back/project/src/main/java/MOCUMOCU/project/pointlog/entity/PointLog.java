package MOCUMOCU.project.pointlog.entity;

import MOCUMOCU.project.customer.entity.Customer;
import MOCUMOCU.project.customize.entity.Customize;
import MOCUMOCU.project.customizeCustomer.entity.CustomizeCustomer;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class PointLog {

    @Id
    @GeneratedValue
    @Column(name = "pointlog_id")
    private Long id;

    private int point;
    private int year;
    private int month;
    private int day;
    private int hour;
    private int minute;
    private String dayOfWeek;

    private Type type;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customize_id")
    private Customize customize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne(mappedBy = "pointLog")
    private CustomizeCustomer customizeCustomer;

    public void setPointLog(Customize customize, Customer customer) {

        LocalDateTime now = LocalDateTime.now();

        this.customize = customize;
        this.customer = customer;
        this.point = -customize.getCustomizePoint();
        this.year = now.getYear();
        this.month = now.getMonthValue();
        this.day = now.getDayOfMonth();
        this.hour = now.getHour();
        this.minute = now.getMinute();
        this.dayOfWeek = now.getDayOfWeek().name();
    }
}
