package MOCUMOCU.project.form;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class MarketInfoDTO {

    private Long id;
    private String phoneNum;
    private String name;
    private List<RewardOwnerDTO> rewardList;
}
