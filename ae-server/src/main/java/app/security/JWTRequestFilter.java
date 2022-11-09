//package app.security;
//
//import app.exceptions.AuthenticationException;
//import app.exceptions.UnAuthorizedException;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.Set;
//
///**
// * This method <description of functionality>
// *
// * @outhor redouanassakali
// */
//
//@Component
//public class JWTRequestFilter extends OncePerRequestFilter {
//    @Value("${jwt.pass-phrase}")
//    private String passphrase;
//
//    private static final Set<String> SECURED_PATHS = Set.of("/aevents","/registrations","/users");
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//
//        String encryptedToken = null;
//        try {
//
//            JWTokenUtils jwTokenUtils = null;
//            String servletPath = request.getServletPath();
//
//            if (HttpMethod.OPTIONS.matches(request.getMethod())||
//                    SECURED_PATHS.stream().noneMatch(servletPath::startsWith)){
//                filterChain.doFilter(request, response);
//                return;
//            }
//           encryptedToken = request.getHeader(HttpHeaders.AUTHORIZATION);
//
//            if (encryptedToken == null){
//                throw new UnAuthorizedException("You need to login first!");
//            }
//
//            encryptedToken = encryptedToken.replace("Bearer ","");
//
//            jwTokenUtils = JWTokenUtils.deCode(encryptedToken, this.passphrase);
//
//            System.out.println(jwTokenUtils.toString());
//            if (jwTokenUtils == null){
//                throw new AuthenticationException("hier gaat iets fout" + jwTokenUtils.toString());
//            }
//
//            request.setAttribute("tokeninfo", jwTokenUtils);
//            filterChain.doFilter(request, response);
//        }catch(AuthenticationException e ) {
//            // aborting the chain
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication error");
//            return;
//        }
//
//
//
//
//
//
//
//    }
//}
