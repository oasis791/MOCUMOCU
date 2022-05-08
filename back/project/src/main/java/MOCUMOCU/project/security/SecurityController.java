package MOCUMOCU.project.security;

import MOCUMOCU.project.domain.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/security")
public class SecurityController {
    @Autowired
    private SecurityService securityService;

    /*@GetMapping("/create/token")
    public Map<String, Object> createToken(@RequestParam(value = "subject") String subject) {
        String token = securityService.createToken(subject, (2 * 1000 * 60));
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("result", token);

        return map;
    }*/

    @PostMapping("/sign-in")
    public Map<String, Object> createToken(String name, String password, String age) {
        TestPerson person = new TestPerson(name, password, age);
        String token = securityService.createToken(person, (2 * 1000 * 60));
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("result", token);

        return map;
    }


    @GetMapping("/subject")
    public Map<String, Object> getSubject(@RequestParam(value = "token") String token) {
        String subject = securityService.getSubject(token);
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("result", subject);

        return map;
    }
}
