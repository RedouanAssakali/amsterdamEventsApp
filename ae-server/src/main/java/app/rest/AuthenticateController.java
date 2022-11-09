//package app.rest;
//
//import app.exceptions.UnAuthorizedException;
//import app.models.User;
//import app.security.JWTokenUtils;
//import com.fasterxml.jackson.databind.node.ObjectNode;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//
//import java.net.URI;
//
///**
// * This method <description of functionality>
// *
// * @outhor redouanassakali
// */
//@RestController
//public class AuthenticateController {
//
//    @Autowired
//    private JWTokenUtils jwTokenUtils;
//
//    @PostMapping("/authenticate/login")
//    public ResponseEntity<User> createAEvent(@RequestBody ObjectNode login){
//
//      String eMail = login.get("eMail").asText();
//      String passWord = login.get("passWord").asText();
//
//      if (eMail == null | passWord == null ){
//          throw new UnAuthorizedException("Cannot authenticate user by email="+ eMail +" and password="+passWord);
//      }
//        int index = eMail.indexOf('@');
//        String username = eMail.substring(0,index);
//      if (!username.equals(passWord)){
//          throw new UnAuthorizedException("Cannot authenticate user by email="+ eMail +" and password="+passWord);
//      }
//
//      User user = new User();
//        user.setName(username);
//        user.seteMail(eMail);
//        user.setHashedPassWord(passWord);
//        String tokenString = this.jwTokenUtils.encode(user);
//        return ResponseEntity.accepted()
//                .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString)
//                .body(user);
//    }
//}
