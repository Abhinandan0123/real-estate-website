
const express= require("express");
const bodyParser =require("body-parser");
const mongoose = require('mongoose');
const _ = require("lodash");
const ejs = require("ejs");

const app=express();
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/propertiesDB');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res) {
    res.sendFile("index.html", { root: __dirname });
});

app.get("/sell", function(req, res){
    res.sendFile("sell.html", { root: __dirname });
})

app.get("/aboutUs", function(req, res){
    res.sendFile("about.html", { root: __dirname });
})

app.get("/signIn", function(req, res){
    res.render("login");
})
 

app.get("/buy", async function(req, res){
    let data = await Property.find()
    res.render("buy", {allData: data});
})




const propertySchema = new mongoose.Schema ({

    city:{
        type: String,
    },
    state: {
        type: String,
    },
    price: Number,
    bedrooms:Number,
    keywords: String,
    img: String
});

const Property = mongoose.model("Property", propertySchema);


app.post("/sell", function(req, res){

    console.log("hello");
    const city =      _.capitalize(req.body.city);
    const state = _.capitalize( req.body.state);
    const price = req.body.price;
    const bedrooms = req.body.bedrooms;
    const keywords = _.capitalize( req.body.keywords);
    const img = req.body.img

    
    console.log(city, state, price, bedrooms, keywords, img);

   
        const property = new Property ({
            city: city,
            state: state,
            price: price,
            bedrooms: bedrooms,
            keywords: keywords,
            img: img
        });

        property.save()

    res.redirect("buy")
});






let port = process.env.PORT;
if(port==null || port=="")
{
    port=3000;
}

app.listen(3000, function() {
    console.log("Server started on port");
  });