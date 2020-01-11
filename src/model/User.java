package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the usr01tbl database table.
 * 
 */
@Entity
@Table(name="usr01tbl")
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="USR01TBL_ID_GENERATOR", sequenceName="USR01TBL_ID_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="USR01TBL_ID_GENERATOR")
	private Integer id;
	@Column(name="firstname")
	private String firstname;
	@Column(name="lastname")
	private String lastname;

	public User() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstname() {
		return this.firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return this.lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

}