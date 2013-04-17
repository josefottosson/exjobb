class City
	include Mongoid::Document
	store_in collection: "city"
	field :city, type: String
	field :loc, type: Array
	field :population, type: Integer
	field :state, type: String
	field :_id, type: Integer
end