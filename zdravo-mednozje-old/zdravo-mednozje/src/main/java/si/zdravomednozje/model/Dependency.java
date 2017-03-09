package si.zdravomednozje.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="dependencies")
public class Dependency {
	
	@Id
	//@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private long previusQuestionID;
	private long answerID;
	
	@ManyToOne
	private Question question;
	
	public long getPreviusQuestionID() {
		return previusQuestionID;
	}
	public void setPreviusQuestionID(long previusQuestionID) {
		this.previusQuestionID = previusQuestionID;
	}
	public long getAnswerID() {
		return answerID;
	}
	public void setAnswerID(long answerID) {
		this.answerID = answerID;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Question getQuestion() {
		return question;
	}
	public void setQuestion(Question question) {
		this.question = question;
	}
	
}
