package MOCUMOCU.project.owner;

import MOCUMOCU.project.domain.Market;
import MOCUMOCU.project.owner.Owner;
import MOCUMOCU.project.domain.Privacy;

import java.util.List;

public interface OwnerService {

    Long join(Owner owner);

    void withdrawal(Long id);

    void updatePrivacy(Long id, Privacy privacy);

    List<Market> findAllMarket(Long id);
}
