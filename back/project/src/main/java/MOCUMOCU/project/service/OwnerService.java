package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Market;
import MOCUMOCU.project.domain.Owner;
import MOCUMOCU.project.domain.Privacy;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OwnerService {

    Long join(Owner owner);


    void withdrawal(Long id);

    void updatePrivacy(Long id, Privacy privacy);

    List<Market> findAllMarket(Long id);
}
