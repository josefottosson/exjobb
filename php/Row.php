<?php
	
	class Row
	{
		public $_id;
		public $app;
		public $totalTime;

		function __construct($_id, $app, $totalTime) 
		{
    		$this->_id = $_id;
    		$this->app = $app;
    		$this->totalTime = $totalTime;
    	}
	}

?>