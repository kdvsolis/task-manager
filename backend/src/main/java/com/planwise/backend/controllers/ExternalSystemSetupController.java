package com.planwise.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/external-systems")
public class ExternalSystemSetupController {

    @Autowired
    private ExternalSystemSetupRepository repository;

    @GetMapping
    public ResponseEntity<Page<ExternalSystemSetup>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ExternalSystemSetup> externalSystems = repository.findAll(pageable);
        return ResponseEntity.ok(externalSystems);
    }

    @GetMapping("/search")
    public Page<ExternalSystemSetup> searchByTitle(
            @RequestParam("title") String title,
            Pageable pageable) {
        return repository.findByTitleContaining(title, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExternalSystemSetup> getById(@PathVariable Long id) {
        Optional<ExternalSystemSetup> externalSystemSetup = repository.findById(id);
        if (externalSystemSetup.isPresent()) {
            return ResponseEntity.ok(externalSystemSetup.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ExternalSystemSetup create(@RequestBody ExternalSystemSetup externalSystemSetup) {
        return repository.save(externalSystemSetup);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExternalSystemSetup> update(@PathVariable Long id, @RequestBody ExternalSystemSetup updatedExternalSystemSetup) {
        if (repository.existsById(id)) {
            updatedExternalSystemSetup.setId(id);
            return ResponseEntity.ok(repository.save(updatedExternalSystemSetup));
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
