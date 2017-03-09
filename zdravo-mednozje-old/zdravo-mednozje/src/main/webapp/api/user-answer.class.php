<?php

class UserAnswer 
{
	public $question_id;
	public $answer_id;
	
	public function insert()
	{
		$insert = $sql_conn->prepare("INSERT INTO user_answers VALUES(?, ?)");
		$insert->bind_param('ii', $this->question_id, $this->answer_id);
		
		$insert->execute();
	}
}

?>