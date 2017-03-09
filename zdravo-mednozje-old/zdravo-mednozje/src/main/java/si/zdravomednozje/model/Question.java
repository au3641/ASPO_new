package si.zdravomednozje.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
//
//@XmlRootElement
@Entity
@Table(name="questions")
public class Question {
	
	@Id 
	private long id;
	private String text;
	private long sequence;
	private short type;
	
	@OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST, fetch=FetchType.EAGER)
	private List<Answer> answers = new ArrayList<Answer>();
	
	@OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST, fetch=FetchType.EAGER)
	private List<Dependency> dependencies = new ArrayList<Dependency>();
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public long getSequence() {
		return sequence;
	}
	public void setSequence(long sequence) {
		this.sequence = sequence;
	}
	public short getType() {
		return type;
	}
	public void setType(short type) {
		this.type = type;
	}
	public List<Answer> getAnswers() {
		return answers;
	}
	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}
	public List<Dependency> getDependencies() {
		return dependencies;
	}
	public void setDependencies(List<Dependency> dependencies) {
		this.dependencies = dependencies;
	}

}
