package com.planwise.backend;

import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    JwtInterceptor jwtInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor).addPathPatterns("/api/auth/user");
        registry.addInterceptor(jwtInterceptor).addPathPatterns("/api/external-systems/*");
        registry.addInterceptor(jwtInterceptor).addPathPatterns("/api/planner/*");
    }
}
