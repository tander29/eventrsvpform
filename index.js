let express = require('express');
let mongoose = require('mongoose');

const port = 3000
const app = express();

app.use(express.static('public/'));
app.use(express.json());
app.set('view engine', 'pug')

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

// app.get('/guests', (req, res) => {

// })

app.post('/reply', (req, res) => {
    console.log('request this', req.body)
    updateMongoose(req.body)
    let sendback = { one: 1, two: 4, string: 'yes' }
    // res.send(sendback)
    res.render('guests', sendback)
})

function updateMongoose(user) {
    // let responseSchema = mongoose.Schema({
    //     name: String,
    //     email: String,
    //     rsvp: String,
    //     guests: Number
    // })

    newObject = new Response({
        name: user.name,
        email: user.email,
        rsvp: user.rsvp,
        guests: user.guests
    })

    newObject.save(function (err, userInfo) {
        if (err) return console.error(err)
        console.log('added new bad boy to that database')
    })

    Response.find({ rsvp: /^attend/ }, function (err, responseArray) {
        if (err) return console.error(err);
        console.log('dem responses', responseArray)
    })
}







app.listen(port)