<?php
	
	class City
	{
		
		public $city;
		public $loc;
		public $population;
		public $state;
		public $_id;

		function __construct($city, $loc, $population, $state, $_id) 
		{
    		$this->city = (string) $city;
    		$this->loc = (array) $loc;
    		$this->population = (int) $population;
    		$this->state = (string) $state;
    		$this->_id = $_id;   
    	}
	}

?>