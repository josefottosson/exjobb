class City
	include Mongoid::Document
	field :city, type: String
	field :loc, type: Array
	field :population, type: Integer
	field :state, type: String
	field :_id
end