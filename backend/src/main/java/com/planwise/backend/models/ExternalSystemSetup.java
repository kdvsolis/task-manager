package com.planwise.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "external_system_setup")
public class ExternalSystemSetup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String baseUrl;
    private String authMethod;
    private String key;
    private String value;
    private String authPlace;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBaseUrl() { return baseUrl; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }

    public String getAuthMethod() { return authMethod; }
    public void setAuthMethod(String authMethod) { this.authMethod = authMethod; }

    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }

    public String getAuthPlace() { return authPlace; }
    public void setAuthPlace(String authPlace) { this.authPlace = authPlace; }
}
