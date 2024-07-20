package com.planwise.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/planner")
public class PlannerController {

    @Autowired
    private PlannerRepository repository;

    @GetMapping
    public ResponseEntity<Page<Planner>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Planner> externalSystems = repository.findAll(pageable);
        return ResponseEntity.ok(externalSystems);
    }

    @GetMapping("/search")
    public Page<Planner> searchByName(
            @RequestParam("name") String title,
            Pageable pageable) {
        return repository.findByNameContaining(title, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Planner> getById(@PathVariable Long id) {
        Optional<Planner> Planner = repository.findById(id);
        if (Planner.isPresent()) {
            return ResponseEntity.ok(Planner.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Planner create(@RequestBody Planner Planner) {
        return repository.save(Planner);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Planner> update(@PathVariable Long id, @RequestBody Planner updatedPlanner) {
        if (repository.existsById(id)) {
            updatedPlanner.setId(id);
            return ResponseEntity.ok(repository.save(updatedPlanner));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
