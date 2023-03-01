package com.x00179223.librarybackend.config;

import org.springframework.stereotype.Component;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CorsFilter implements Filter {

    @Override
    public void doFilter(
            ServletRequest req,
            ServletResponse res,
            FilterChain chain
    ) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
        response.setHeader("Access-Control-Max-Age", "3600");
        chain.doFilter(req, res);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void destroy() {
    }
}