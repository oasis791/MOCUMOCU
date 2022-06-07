package MOCUMOCU.project.controller;

import MOCUMOCU.project.customer.Customer;
import MOCUMOCU.project.customer.CustomerService;
import MOCUMOCU.project.domain.Privacy;
import MOCUMOCU.project.form.*;
import MOCUMOCU.project.owner.Owner;
import MOCUMOCU.project.owner.OwnerService;
import MOCUMOCU.project.service.CouponService;
import MOCUMOCU.project.service.MarketService;
import MOCUMOCU.project.service.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/owner")
@RequiredArgsConstructor
public class OwnerController {

    private final OwnerService ownerService;
    private final MarketService marketService;
    private final RewardService rewardService;
    private final CouponService couponService;
    private final CustomerService customerService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody OwnerRegisterDTO ownerRegisterDTO) {
        Privacy newPrivacy = new Privacy();
        newPrivacy.setEmail(ownerRegisterDTO.getOwnerEmail());
        newPrivacy.setName(ownerRegisterDTO.getOwnerName());
        newPrivacy.setPassword(ownerRegisterDTO.getOwnerPassword());
        newPrivacy.setPhoneNum(ownerRegisterDTO.getOwnerPhoneNum());

        Owner newOwner = new Owner();
        newOwner.setPrivacy(newPrivacy);

        ownerService.join(newOwner);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody OwnerLoginDTO ownerLoginDTO, Model model) {
        if (ownerService.login(ownerLoginDTO)) {
            model.addAttribute(ownerService.findOwnerByEmail(ownerLoginDTO.getOwnerEmail()));
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/store")
    public ResponseEntity<Void> addMarket(@RequestBody MarketAddDTO marketAddDTO) {
        marketService.addMarket(marketAddDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/${ownerId}/market-list")
    public ResponseEntity<Void> showMarkets(@RequestParam Long ownerId, Model model) {

        List<MarketInfoDTO> findMarkets = ownerService.findAllMarket(ownerId);
        List<ActivityData> activityData = new ArrayList<>();
        ActivityData newActivityData = new ActivityData();
        activityData.add(newActivityData);


        for (MarketInfoDTO findMarket : findMarkets) {
            findMarket.setRewardList(marketService.findAllReward(findMarket.getId()));
            findMarket.setActivityData(activityData);
        }

        model.addAttribute(findMarkets);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/store/${storeId}")
    public ResponseEntity<Void> removeMarket(@RequestParam Long storeId) {
        marketService.removeMarket(storeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/store/reward")
    public ResponseEntity<Void> saveReward(@RequestBody RewardAddDTO rewardAddDTO) {
        rewardService.addReward(rewardAddDTO);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @DeleteMapping("/${ownerId}/store/${marketId}/reward/${rewardId}")
    public ResponseEntity<Void> removeReward(@RequestParam Long rewardId) {
        rewardService.removeReward(rewardId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/stamp")
    public ResponseEntity<Void> saveStamp(@RequestBody SaveStampDTO saveStampDTO) {
        couponService.earnStamp(saveStampDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/stamp")
    public ResponseEntity<Void> useStamp(@RequestBody UseStampDTO useStampDTO) {
        couponService.useStamp(useStampDTO);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/phoneNum")
    public ResponseEntity<Void> searchCustomerByPhoneNum(@RequestBody String phoneNumber, Model model) {

        if (customerService.isPhoneNumExist(phoneNumber)) {
            Customer findCustomer = customerService.findByPhoneNum(phoneNumber);

            CustomerSendDTO customerSendDTO = new CustomerSendDTO();
            customerSendDTO.setCustomerId(findCustomer.getId());
            customerSendDTO.setName(findCustomer.getPrivacy().getName());

            model.addAttribute(customerSendDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
