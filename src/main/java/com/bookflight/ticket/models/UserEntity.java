package com.bookflight.ticket.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user")
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="fullname", length = 250)
    private String fullName;

    @Column(name="dateofbirth")
    private Date dateOfBirth;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number", length = 10)
    private String phoneNumber;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "address")
    private String address;
    // ánh xạ
    @OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
    private List<TicketEntity> ticketEntityList = new ArrayList<>();

    @OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
    private List<RoleEntity> roleEntityList = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

