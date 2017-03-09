<?php

class Question
{
	public $id;
	public $text;
	public $sequence;
	public $type;
	
	public $answers = [];
	public $dependencies = [];
	
	function __construct($id_ , $text_, $sequence_, $type_) 
	{
       $this->id = $id_;
	   $this->text = $text_;
	   $this->sequence = $sequence_;
	   $this->type = $type_;
   }
	
	public static function getAll()
	{
		$deps = Dependency::getAll();
		$anss = QuestionAnswer::getAll();
		
		global $sql_conn;
		
		$query = "SELECT * FROM questions";
		
		$res = $sql_conn->query($query);
		
		$return = [];
		while($row = $res->fetch_assoc()) 
		{
			$q = new Question(
				$row["question_id"],
				$row["text"],
				$row["order_nr"],
				$row["type"]
			);
			
			$q->dependencies = Dependency::filter($q->id, $deps);
			$q->answers = QuestionAnswer::filter($q->id, $anss);
			
			$return[] = $q;	
		}
			
		$res->close();
		
		return $return;
	}
}