class HomeController < ApplicationController
  def index
  end

  def GetAllCities
  	
  	render :nothing => true, :status => :ok, :text => "OK"
  end

  def GetAllCitiesWhere
  	@cities = City.where(:state => 'AL').to_a
  	render :text => @cities.length.to_s + " rader hämtades ifrån Databasen"
  end

end
