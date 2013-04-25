class HomeController < ApplicationController
  def index
  end

  def GetAllCities
  	@cities = City.all
    render :text => @cities.length.to_s + " rader hämtades ifrån Databasen"
  end

  def GetAllCitiesWhere
  	@cities = City.where(:state => 'AL')
  	render :text => @cities.length.to_s + " rader hämtades ifrån Databasen"
  end

  def CalculateModulus

    @numbers = []
    10000000.times do |index|
      
      if index % 3 == 0
        @numbers.push index
      end

    end
    render :text => "Modulus klar<br/>" + @numbers.length.to_s
  end

end
  
