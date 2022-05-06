package MOCUMOCU.project.repository;

import MOCUMOCU.project.domain.Owner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;


@Repository
@RequiredArgsConstructor
public class OwnerRepository {

    private final EntityManager em;

    public void save(Owner owner) {
        em.persist(owner);
    }

    public void update(Owner owner) {
        em.persist(owner);
    }

    public void remove(Long id) {
        em.remove(id);
    }

    public Owner findOne(Long id) {
        return em.find(Owner.class, id);
    }
}
