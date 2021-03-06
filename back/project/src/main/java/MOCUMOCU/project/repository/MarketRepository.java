package MOCUMOCU.project.repository;

import MOCUMOCU.project.domain.Market;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MarketRepository {

    private final EntityManager em;

    public void save(Market market) {
        em.persist(market);
    }

    public void remove(Market market) {
        em.remove(market);
    }

    public void update(Market market) {
        em.persist(market);
    }

    public Market findOne(Long id) {
        return em.find(Market.class, id);
    }

    public List<Market> findByOwnerId(Long ownerId) {

        return em.createQuery("select m from Market m where m.owner.id =: ownerId",Market.class)
                .setParameter("ownerId", ownerId)
                .getResultList();
    }
}
