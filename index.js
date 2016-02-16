var db = require('./models');
var express = require('express');
var app = express();

var qs = require('./public/assets/questionsAnswers.json');
var resps = require('./public/assets/resps.json');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/',function(req, res){
	db.user.findAll({order:[['score','ASC']]}).then(function(users){
		res.render('index.ejs',{leaders:users});
	})
});

app.get('/qs',function(req,res){
	res.send(qs)
});

app.get('/resps',function(req,res){
	res.send(resps)
})

app.get('/leaderboard',function(req, res){
	var name = req.query.name;
	var score = req.query.score;
	var picture = req.query.picture;
	db.user.create({
		name: name,
		score: score,
		picture: picture
	}).then(function(user){
		res.send(user.get());
	});
});


app.listen(process.env.PORT || 3000);