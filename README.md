exjobb
======

Mitt exjobb våren 2013

För att testa:

Clona repon <br/>
Installera MongoDB (brew install mongodb)<br/>
Starta terminalen i MongoDB-mappen i repon. </br>
Kör följande kommando <br/>
<i>mongoimport --db exjobb --collection cities --file exjobb.json</i>

För django gäller följande kommando <br/>
<i>mongoimport --db exjobb --collection exjobbApp_city --file exjobb.json</i> <br/>
Då skapas en ny collection med samma data. Det är en tillfällig workaround tills man kan ändra collection i Django, eller tills jag har kommit på hur man gör rättare sagt.

<h3>Konfiguration</h3>
Följande bibliotek/moduler etc har använts för de olika applikationerna
<h4>Django</h4>
virtualenv (pip install virtualenv) <br />
Django nonrel (pip install https://bitbucket.org/wkornewald/django-nonrel/get/tip.tar.gz) <br />
DjangoToolbox (pip install https://bitbucket.org/wkornewald/djangotoolbox/get/tip.tar.gz) <br />
MongoDB-Engine (pip install https://github.com/django-nonrel/mongodb-engine/tarball/master)

<h4>PHP</h4>
MAMP PRO 2.1.1 (PHP Version = 5.3.14)<br/>
MongoDB Driver (https://github.com/mongodb/mongo-php-driver/downloads) <br />
Placera mongo.so i /Applications/MAMP/bin/php/php5.3.14/lib/php/extensions/no-debug-non-zts-20090626/
Öppna din Mamps php.ini fil, leta reda på ; Dynamic Extensions ; och lägg till följande längst ner extension=mongo.so
Starta sedan om Mamp.
<h4>NodeJS</h4>
MongoJS, kör kommandot i samma mapp som din NodeJS applikation (npm install mongojs)
Bra info finns <a href="http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs">här </a>för att komma igång
<h4>Ruby on Rails</h4>
gems = mongo, bson_ext, mongoid
Kör sedan följande kommando i din rails mapp (rails generate mongoid:config)


<h3>TestAppen</h3>
Starta servern för de applikationerna du vill testa<br/>
Själva testappen ligger placerad i start/index.html
Applikationen tar två queryvariabler, APP och METOD.
Exempel: <br />
För att hämta alla rader från databasen med hjälp av PHP: <br/>
<i>http://localhost/start?php&GetAllCities</i><br/>
Rails = <i>http://localhost/start?rails&GetAllCities</i> <br/>
Django = <i>http://localhost/start?django&GetAllCities</i> <br/>
NodeJS = <i>http://localhost/start?node&GetAllCities</i> <br/>

Kontrollera i start/js/js.js, du kan behöva konfigurera om de urler(portnummer) som finns så att det pekar mot rätt serveraddress för dina lokala servrar.
<h4>Metoder</h4>
De olika metoder som finns att testa är: <br/>
<strong>GetAllCities</strong> - Hämtar alla rader ifrån databasen <br/>
<strong>GetAllCitiesWhere</strong> - Hämtar alla rader där state = AL, hårdkodad atm. <br/>
