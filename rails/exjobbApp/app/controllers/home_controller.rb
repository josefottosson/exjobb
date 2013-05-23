class HomeController < ApplicationController
  def index
  end

  def GetAllCities
  	cities = City.all.to_a
    render :json => Oj.dump(cities, mode: :compat)
  end

  def GetAllCitiesWhere
  	cities = City.where(:state => 'AL').to_a
  	render :json => Oj.dump(cities, mode: :compat)
  end

  def CalculateModulus

    numbers = []
    10000000.times do |index|
      
      if index % 3 == 0
        numbers << index
      end

    end
    render :text => "Modulus klar<br/>"
  end

  def ReadFile
    file = File.read('exjobb.json')
    render :text => "Läst klart<br/>" + file.length.to_s
  end

  def ReadAndSaveNew
    
    text = File.read('exjobb.json')
    newText = text.gsub('_id', 'id')

    File.open('exjobb2.json', 'w') do |file|
      file << newText
    end

    render :text => "Läst och Modifierat<br/>"
  end

  def SelectAndUpdate
    
    cities = City.where({'population' => { "$lt" => 10000}})
    cities.each do |city|
      if city.city == city.city.upcase()
        city.city = city.city.downcase()
        city.save(city)
      else
        city.city = city.city.upcase()
        city.save(city)
      end

    end
    render :text => "Selected and updated done"
  end

  def Test
    
  end
end
  
