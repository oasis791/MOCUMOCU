package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Customer;
import MOCUMOCU.project.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;


    public Long join(Customer customer) {

        customerRepository.save(customer);
        return customer.getId();
    }
}
