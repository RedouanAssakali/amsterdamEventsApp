//package app.security;
//
//import app.exceptions.AuthenticationException;
//import app.models.User;
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.security.SignatureException;
//import org.jetbrains.annotations.NotNull;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import javax.crypto.spec.SecretKeySpec;
//import java.beans.ConstructorProperties;
//import java.nio.charset.StandardCharsets;
//import java.security.Key;
//import java.util.Date;
//
///**
// * This method <description of functionality>
// *
// * @outhor redouanassakali
// */
//
//@Component
//public class JWTokenUtils {
//    private static final String JWT_ADMIN_CLAIM = "admin";
//
//
//    @Value("${jwt.issuer:MyOrganisation}")
//    private String issuer;
//
//    @Value("${jwt.pass-phrase}")
//    private String passphrase;
//
//    @Value("${jwt.expiration-seconds}")
//    private int expiration;
//
//    private String userName = null;
//    private Long userId = null;
//    private boolean admin = false;
//
//    public JWTokenUtils(){};
//
//    public JWTokenUtils(String userName, Long userId, boolean admin) {
//        this.userName = userName;
//        this.userId = userId;
//        this.admin = admin;
//    }
//
//
//    public String encode( User user) {
//
//
//
//            Key key = getKey(passphrase);
//            String token = Jwts.builder()
//                    .claim(Claims.SUBJECT, user.getName())
//                    .claim(Claims.ID, user.getId())
//                    .claim(JWT_ADMIN_CLAIM, user.isAdmin())
//                    .setIssuer(issuer)
//                    .setIssuedAt(new Date())
//                    .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
//                    .signWith(key, SignatureAlgorithm.HS512)
//                    .compact();
//
//            return token;
//
//
//    }
//
//    private static Key getKey(String passPhrase) {
//        byte[] hmacKey = passPhrase.getBytes(StandardCharsets.UTF_8);
//        return new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
//    }
//
//
//
//    public static JWTokenUtils deCode(String encodedToken, String passphrase) {
//        try {
//            // Validate the token
//            Key key = getKey(passphrase);
//
//            Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(encodedToken);
////            Jws<Claims> jws = Jwts.parserBuilder().
////                    setSigningKey(key).
////                    build().
////                    parseClaimsJws(encodedToken);
//
//
//            Claims claims = jws.getBody();
//
//
//            JWTokenUtils jwTokenUtils = new JWTokenUtils(claims.SUBJECT,Long.valueOf(claims.ID),(boolean) claims.get(JWT_ADMIN_CLAIM));
////
////            jwTokenUtils.userName = claims.SUBJECT;
////            jwTokenUtils.userId = Long.valueOf(claims.ID);
////            jwTokenUtils.admin = (boolean) claims.get(JWT_ADMIN_CLAIM);
//
//            return jwTokenUtils;
//        } catch (MalformedJwtException |
//                UnsupportedJwtException | IllegalArgumentException| SignatureException e) {
//            throw new AuthenticationException(e.getMessage()+"deze");
//        }
//        }
//    }
//
//
