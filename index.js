let express = require('express');
let mongoose = require('mongoose');

const port = 3000
const app = express();

app.use(express.static('public/'));
// app.use(express.json());
app.use(express.urlencoded())
app.set('view engine', 'pug')
let masterguestList = {}
// app.use(express.urlencoded({ extended: true }))

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
mongoose.connect('mongodb://localhost/rsvp');

let responseSchema = mongoose.Schema({
    name: String,
    email: String,
    rsvp: String,
    guests: Number
})
let Response = mongoose.model('Response', responseSchema)

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/submission', (req, res) => {
    res.render('submission')
})

app.post('/reply', (req, res) => {
    // res.status(200)
    console.log('request this', req.body)
    updateMongoose(req.body)
    res.render('submission')
})

app.get('/guests', (req, res) => {
    Response.find({ rsvp: /^attend/ }, function (err, responseArray) {
        if (err) return console.error(err);
        console.log('dem responses', responseArray)
        masterguestList.attending = responseArray
    })
    Response.find({ rsvp: /^not/ }, function (err, responseArray) {
        if (err) return console.error(err);
        console.log('dem responses', responseArray)
        masterguestList.notattending = responseArray
    })

    res.render('guests', masterguestList)
})

function updateMongoose(reqBody) {

    newObject = new Response({
        name: reqBody.name,
        email: reqBody.email,
        rsvp: reqBody.rsvp,
        guests: reqBody.guestCount
    })

    newObject.save(function (err, userInfo) {
        if (err) return console.error(err)
        console.log('added new bad boy to that database')
    })
}

app.listen(port)







