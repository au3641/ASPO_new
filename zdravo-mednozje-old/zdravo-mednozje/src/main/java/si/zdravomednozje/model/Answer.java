package si.zdravomednozje.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="answers")
public class Answer {
	
	@Id
	private long answerID;
	private String answerText;
	private short flag;
	private long orderNr;
	
	@ManyToOne
	private Question question;
	
	public long getAnswerID() {
		return answerID;
	}
	public void setAnswerID(long answerID) {
		this.answerID = answerID;
	}
	public String getAnswerText() {
		return answerText;
	}
	public void setAnswerText(String answerText) {
		this.answerText = answerText;
	}
	public short getFlag() {
		return flag;
	}
	public void setFlag(short flag) {
		this.flag = flag;
	}
	public long getOrderNr() {
		return orderNr;
	}
	public void setOrderNr(long orderNr) {
		this.orderNr = orderNr;
	}
	public Question getQuestion() {
		return question;
	}
	public void setQuestion(Question question) {
		this.question = question;
	}
	
}
