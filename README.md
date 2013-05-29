exjobb
======

Mitt exjobb våren 2013

För att testa:

Clona repon <br/>
Installera MongoDB (brew install mongodb)<br/>
Starta terminalen i MongoDB-mappen i repon. </br>
Kör följande kommando <br/>
<i>mongoimport --db exjobb --collection cities --file exjobb.json</i>

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
Placera <strong>mongo.so</strong> i <i>/Applications/MAMP/bin/php/php5.3.14/lib/php/extensions/no-debug-non-zts-20090626/</i> <br/>
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
Själva testappen ligger placerad i start/index.html<br/>
Välj önskat språk + metod i dropdown menyn. <br/>


Kontrollera i start/js/js.js, du kan behöva konfigurera om de urler(portnummer) som finns så att det pekar mot rätt serveraddress för dina lokala servrar.
<h4>Metoder</h4>
De olika metoder som finns att testa är: <br/>
<strong>GetAllCities</strong> - Hämtar alla rader ifrån databasen och returnerar dem som JSON<br/>
<strong>GetAllCitiesWhere</strong> - Hämtar alla rader där state = AL, och returnerar dem som JSON <br/>
<strong>CalculateModulus</strong> - Loopar ifrån 1 - 10000000 och kollar om i%3 === 0, lägger isf till talet i en array och returnerar den<br/>
<strong>ReadFile</strong> - Läser in en fil<br/>
<strong>ReadFileAndSaveNew</strong> - Läser in en fil och ersätter alla "_id" till "id" och sparar som en ny fil<br/>
<strong>SelectAndUpdate</strong> - Läser in alla städer där population < 10000, kollar om namnet på staden är i uppercase, isf görs det om vill lowercase och viceversa. Sparar sedan till databasen<br/>
