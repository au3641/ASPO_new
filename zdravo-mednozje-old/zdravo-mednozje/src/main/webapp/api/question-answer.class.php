<?php

class QuestionAnswer
{
	public $answerID;
	public $answerText;
	public $flag;
	public $orderNr;
	public $questionID;
	
	function __construct($id_ , $text_, $flag_, $order_, $qid_) 
	{
       $this->answerID = $id_;
	   $this->answerText = $text_;
	   $this->flag = $flag_;
	   $this->orderNr = $order_;
	   $this->questionID = $qid_;
   }
	
	public static function getAll()
	{
		global $sql_conn;
		
		$query = "SELECT * FROM question_answers";
		
		$res = $sql_conn->query($query);
		
		$return = [];
		while($row = $res->fetch_assoc()) 
		{
			$return[] = new QuestionAnswer(
				$row["answer_id"],
				$row["text"],
				$row["flag"],
				$row["order_nr"],
				$row["question_id"]
			);
		}
			
		$res->close();
		
		return $return;
	}
	
	
	public static function filter($id, $set)
	{
		$return = [];
		
		foreach($set as $a)
			if($a->questionID == $id)
				$return[] = $a;
		
		return $return;
	}
}

?>