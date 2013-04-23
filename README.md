exjobb
======

Mitt exjobb våren 2013

För att testa:

Clona repon
Installera MongoDB
Starta terminalen i MongoDB-mappen i repon.
Kör följande kommando mongoimport --db exjobb --collection cities --file exjobb.json

För django gäller följande kommando
mongoimport --db exjobb --collection exjobbApp_city --file exjobb.json
Då skapas en ny collection med samma data. Det är en tillfällig workaround tills man kan ändra collection i Django, eller tills jag har kommit på hur man gör rättare sagt.

Sen är det bara att starta servrarna för de olika applikationerna.

Såhär fungerar testappen:

För att hämta alla rader från databasen med hjälp av PHP
http://localhost/start?php&GetAllCities

För att testa Rails byter du bara ut php osv...

Kontrollera i start/js/js.js, du kan behöva konfigurera om de urler som finns så att det pekar mot rätt serveraddress för dina lokala servrar.


De olika metoder som finns att testa är:
GetAllCities - Hämtar alla rader ifrån databasen
GetAllCitiesWhere - Hämtar alla rader där state = AL, hårdkodad atm.
