const { MongoClient, ServerApiVersion } = require('mongodb');
const {default : mongoose } = require('mongoose');
const methodOverride = require('method-override');
var express = require('express');
const Form = require("./models/Model");
var bodyPaser =require('body-parser');

var app = express();
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
    //     const collection = client.db("test").collection("devices");
    //     console.log('Data connected');
    //     // perform actions on the collection object
    //     client.close();
    // });

const url = "mongodb+srv://Happy:salut_1@cluster0.2oi0g.mongodb.net/testdb?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

mongoose.connect(url,connectionParams).then(()=> {
    console.log('Mangodb databse connected')
}).catch(err=> console.log(err))

    

app.use(methodOverride('_method'))
app.use(bodyPaser.urlencoded({extended:false}))

app.set("view engine", "ejs")

app.get('/', function(req, res) {
    // res.sendFile("C:/Users/lagra/Desktop/build/index.html");
    // res.render('Home')

    Form.find().then(data => {
        res.render('Home',{data:data});
    }).catch(err=> console.log(err))
})

app.get('/form/:id', (req, res) => {
    Form.findOne({_id: req.params.id}).then(data => {
        res.render('Page',{data:data});
    }).catch(err=> console.log(err));
})

app.get('/form/edit/:id', (req, res) => {
    Form.findOne({_id: req.params.id}).then(data => {
        res.render('Edit',{data:data});
    }).catch(err=> console.log(err));   
})

app.post('/submit-data', function(req, res) {
    // res.send("Bonjour "+ req.body.nom+" "+req.body.prenom+"<br/>"
    // + "Merci de nous avoir contacter."+"<br/>"+"Nous rendrons vers vous dans les plus bref délai à cette adresse: "+req.body.email)
    // console.log(req.body);
    // const form = new Form({
    //     ...req.body
    // })

    const data = new Form({
        nom : req.body.nom,
        prenom : req.body.prenom,
        email : req.body.email,
        message : req.body.message,
    })

    data.save().then(() => {
        console.log("Data saved !");
        res.redirect('/');
    })
})

app.put('/form/edit/:id', function(req, res) {
    Form.findOne({_id: req.params.id})
    .then(data => {
        data.nom = req.body.nom,
        data.prenom = req.body.prenom,
        data.email = req.body.email,
        data.message = req.body.message

        data.save().then(() => {
            console.log("Data changed !");
            res.redirect("/");
        }).catch(err=> console.log(err));

    }).catch(err=> console.log(err)); 
})

app.delete('/form/delete/:id', function(req, res) {
    Form.remove({
        _id: req.params.id
    }).then(()=>{
        console.log("data deleted");
        res.redirect('/');
    }).catch(err=> console.log(err))
})

var server = app.listen(5000, function () {
    console.log('Running serveur at port 5000...')
});