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
        @numbers << index
      end

    end
    render :text => "Modulus klar<br/>" + @numbers.length.to_s
  end

  def ReadFile
    @file = File.read('exjobb.json')
    render :text => "Läst klart<br/>" + @file.length.to_s
  end

  def ReadAndSaveNew
    
    @buf = ""
    File.open('exjobb.json') do |file|
      file.readlines.each do |line|
          @buf << line.gsub('_id', "id")
      end
    end
    File.open('exjobb2.json', 'w') do |file|
      file << @buf
    end

    render :text => "Läst och Modifierat<br/>"
  end
end
  
