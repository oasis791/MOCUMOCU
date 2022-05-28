package MOCUMOCU.project.repository;

import MOCUMOCU.project.domain.Coupon;
import MOCUMOCU.project.domain.Reward;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RewardRepository {

    private final EntityManager em;

    public void save(Reward reward) {
        em.persist(reward);
    }

    public void remove(Reward reward) {
        em.remove(reward);
    }

    public void update(Reward reward) {
        em.persist(reward);
    }

    public Reward findOne(Long id) {
        return em.find(Reward.class, id);
    }

    public List<Reward> findByMarketId(Long marketId) {
        return em.createQuery("select r from Reward r where r.market.id = : marketId", Reward.class)
                .setParameter("marketId", marketId)
                .getResultList();
    }
}
