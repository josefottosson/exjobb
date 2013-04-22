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

end
