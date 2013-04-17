class City
	include Mongoid::Document
	store_in database: ->{ Thread.current[:database] }
	field :c, as: :city, type: String
	field :l, as: :loc, type: Array
	field :p, as: :population, type: Integer
	field :s, as: :state, type: String
	field :_id, type: Integer
end