const express = require("express");
const https = require("https");

const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended:true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
    
})

app.post("/", function (req, res) {
    
    const query = req.body.cityname;
    const api = "4886eae782ae0ea8dcea008c719a47c0";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + api + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description
            res.write("<h1>the temprature in"+query+" is" + temp + "degree Celcius</h1>");
            res.send();
        })

    })

})
/* const query = "London"
    const api = "4886eae782ae0ea8dcea008c719a47c0";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ api +"&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const weatherdescription = weatherdata.weather[0].description
            res.write("<h1>the temprature in london is" + temp + "degree Celcius</h1>");
            res.send();
        })
    })*/



app.listen(3000, function () {
    console.log("server running on 3000");
});
