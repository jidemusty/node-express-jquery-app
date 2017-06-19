var express = require('express');
var ejs = require('ejs');
var ForecastIo = require('forecastio');
var zipdb = require('zippity-do-dah');
var path = require("path");

var app = express();

var weather = new ForecastIo('FORECAST.IO_API_KEY');

app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("index");
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
	var zipcode = req.params[0];
	var location = zipdb.zipcode(zipcode);
	if (!location.zipcode) {
		next();
		return;
	}
	
	var latitude = location.latitude;
	var longitude = location.longitude;
	
	weather.forecast(latitude, longitude, function(err, data) {
		if (err) {
			next();
			return;
		}
		
		res.json({
			zipcode: zipcode,
			temperature: data.currently.temperature,
			timezone: data.timezone
		});
	});
});

app.use(function(req, res) {
	res.status(404);
	res.render("404");
});

app.listen(3000, function(req, res) {
	console.log('App has started on port 3000...');
});