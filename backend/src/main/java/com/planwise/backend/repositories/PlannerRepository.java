package com.planwise.backend;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlannerRepository extends JpaRepository<Planner, Long> {

    @Query("SELECT s FROM Planner s WHERE s.name LIKE %:name%")
    Page<Planner> findByNameContaining(@Param("name") String name, Pageable pageable);

    Page<Planner> findAll(Pageable pageable);
}
