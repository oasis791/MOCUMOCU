package MOCUMOCU.project.owner.repository;

import MOCUMOCU.project.customer.entity.Customer;
import MOCUMOCU.project.owner.entity.Owner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import java.util.List;


@Repository
@RequiredArgsConstructor
public class OwnerRepository {

    private final EntityManager em;

    public void save(Owner owner) {
        em.persist(owner);
    }

    public void remove(Owner owner) {
        em.remove(owner);
    }

    public Owner findOne(Long id) {
        return em.find(Owner.class, id);
    }

    public List<Owner> findByEmail(String email){
        return em.createQuery("select o from Owner o where o.privacy.email = :email", Owner.class)
                .setParameter("email", email)
                .getResultList();
    }

    public List<Owner> findByPhoneNum(String phoneNum) {
        return em.createQuery("select o from Owner o where o.privacy.phoneNum = :phoneNum", Owner.class)
                .setParameter("phoneNum", phoneNum)
                .getResultList();
    }

}
