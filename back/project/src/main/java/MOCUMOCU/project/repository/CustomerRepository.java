package MOCUMOCU.project.repository;

import MOCUMOCU.project.domain.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class CustomerRepository {

    private final EntityManager em;

    public void save(Customer customer) {
        em.persist(customer);
    }

    public void remove(Long id) {
        em.remove(id);
    }

    public void update(Customer customer) {
        em.persist(customer);
    }


    public Customer findOne(Long id) {
        return em.find(Customer.class, id);
    }


}
