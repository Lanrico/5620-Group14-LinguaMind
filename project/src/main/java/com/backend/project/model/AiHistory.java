package com.backend.project.model;
import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "ai_history")
public class AiHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private int historyId;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private UserAccount userAccount;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type")
    private RoleType roleType;

    @Column(name = "request_content", length = 2000)
    private String requestContent;

    @Column(name = "response_result", length = 2000)
    private String responseResult;

    @Column(name = "generate_date")
    private Date generateDate;

    @Column(name = "additional_info")
    private String additionalInfo;

    public enum RoleType {
        MESSAGE_GENERATOR, ARTICLE_POLISH, TRASLATOR
    }
}
