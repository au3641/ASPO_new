<?php

class Dependency
{
	public $questionID;
	public $previusQuestionID;
	public $answerID;
	
	function __construct($qid_ , $prevId_, $answerID_) 
	{
       $this->questionID = $qid_;
	   $this->previusQuestionID = $prevId_;
	   $this->answerID = $answerID_;
   }
	
	public static function getAll()
	{
		global $sql_conn;
		
		$query = "SELECT * FROM dependencies";
		
		$res = $sql_conn->query($query);
		
		$return = [];
		while($row = $res->fetch_assoc()) 
		{
			$return[] = new Dependency(
				$row["question_id"],
				$row["prev_question_id"],
				$row["answer_id"]
			);
		}
			
		$res->close();
		
		return $return;
	}
	
	
	public static function filter($id, $set)
	{
		$return = [];
		
		foreach($set as $d)
			if($d->questionID == $id)
				$return[] = $d;
		
		return $return;
	}
}

?>