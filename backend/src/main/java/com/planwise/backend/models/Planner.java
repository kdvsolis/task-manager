package com.planwise.backend;

import jakarta.persistence.*;
import java.util.List;
import java.util.Map;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import com.vladmihalcea.hibernate.type.json.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "planner")
@Convert(attributeName = "json", converter = JsonStringType.class)
public class Planner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "owner", length = 255)
    private String owner;

    @Column(name = "status", length = 255)
    private String status;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "funds", length = 255)
    private String funds;

    @Column(name = "fund_alias", length = 255)
    private String fundAlias;

    
    @JdbcTypeCode(SqlTypes.JSON) 
    @Column(name = "sources", columnDefinition = "jsonb")
    private List<String> sources;

    @JdbcTypeCode(SqlTypes.JSON) 
    @Column(name = "runs", columnDefinition = "jsonb")
    private List<String> runs;

    @JdbcTypeCode(SqlTypes.JSON) 
    @Column(name = "reports", columnDefinition = "jsonb")
    private List<Map<String, String>> reports;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getFunds() { return funds; }
    public void setFunds(String funds) { this.funds = funds; }
    public String getFundAlias() { return fundAlias; }
    public void setFundAlias(String fundAlias) { this.fundAlias = fundAlias; }
    public List<String> getSources() { return sources; }
    public void setSources(List<String> sources) { this.sources = sources; }
    public List<String> getRuns() { return runs; }
    public void setRuns(List<String> runs) { this.runs = runs; }
    public List<Map<String, String>> getReports() { return reports; }
    public void setReports(List<Map<String, String>> reports) { this.reports = reports; }
}
