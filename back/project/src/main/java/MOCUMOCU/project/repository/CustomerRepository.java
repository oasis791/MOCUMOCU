package MOCUMOCU.project.repository;

import MOCUMOCU.project.domain.Customer;
import MOCUMOCU.project.owner.Owner;
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

    public void remove(Customer customer) {
        em.remove(customer);
    }

    public void update(Customer customer) {
        em.persist(customer);
    }

    public Customer findOne(Long id) {
        return em.find(Customer.class, id);
    }

    public Customer findByEmail(String email){
        return em.createQuery("select c from Customer c where c.privacy.email = :email", Customer.class)
                .setParameter("email", email)
                .getSingleResult();
    }


}
