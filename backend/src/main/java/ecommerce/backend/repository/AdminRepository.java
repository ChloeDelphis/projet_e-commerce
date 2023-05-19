package ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerce.backend.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, String> {

}
