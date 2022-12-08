package com.x00179223.librarybackend.config;

import io.jsonwebtoken.Claims;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class JwtTokenFilter extends OncePerRequestFilter {

    private static Logger log = LoggerFactory.getLogger(JwtTokenFilter.class);
    private JwtTokenProvider tokenProvider;

    public JwtTokenFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("JwtTokenFilter : doFilterInternal");
        String token = request.getHeader("Authorization");
        if (token != null) {
            try {
                Claims claims = tokenProvider.getClaimsFromToken(token);
                if (!claims.getExpiration().before(new Date())) {
                    Authentication authentication = tokenProvider.getAuthentication(claims.getSubject());
                    if (authentication.isAuthenticated()) {
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            } catch (RuntimeException e) {
                try {
                    SecurityContextHolder.clearContext();
                    response.setContentType("application/json");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().println(new JSONObject().put("exception", "Token is invalid or expired " + e.getMessage()));
                } catch (IOException | JSONException ex) {
                    ex.printStackTrace();
                }
                return;
            }
        } else {
            log.info("Creating token using UserResourceImpl - authenticate");
        }
        filterChain.doFilter(request, response);
    }
}

