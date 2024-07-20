package com.planwise.backend;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

public interface ExternalSystemSetupRepository extends JpaRepository<ExternalSystemSetup, Long> {
    @Query("SELECT ess FROM ExternalSystemSetup ess WHERE ess.title LIKE %:title%")
    Page<ExternalSystemSetup> findByTitleContaining(@Param("title") String title, Pageable pageable);
    Page<ExternalSystemSetup> findAll(Pageable pageable);
}
