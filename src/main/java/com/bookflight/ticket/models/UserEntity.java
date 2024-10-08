package com.bookflight.ticket.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user")
public class UserEntity {
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
}

