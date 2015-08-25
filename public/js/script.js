$(function(){

var bkgrnd=Math.random();

if(bkgrnd>=.7){
	$('body').addClass('bkgrnd1');
// }else if(bkgrnd>=.6){
// 	$('body').addClass('bkgrnd2');
}else if(bkgrnd>=.4){
	$('body').addClass('bkgrnd3');
}else if(bkgrnd>=.2){
	$('body').addClass('bkgrnd4');
}else if(bkgrnd>=.0){
	$('body').addClass('bkgrnd5');
}

var qAndA=[{question:"What is your first name?", answers:[1,"Neil",2,"Narl",3,"Niall",4,"Nail",5,"Narwhal"]},{question:"When were you born?", answers:[2,"October 29th, 1964",4,"July 17th, 1934",1,"October 5th, 1958",3,"February 14th, 1959",5,"Today"]},{question:"Where did you go to College?", answers:[1,"Columbia",1,"Harvard",1,"U Texas Austin",4,"Yale",5,"None of the above"]},{question:"Which superhero comic book have you been featured in?", answers:[1,"Superman",4,"Spiderman",2,"Batman",5,"Omega Red",3,"Teen Titans"]},{question:"How many planets are in our solar system?", answers:[3,"At least 4.",5,"There's no way to know for sure.",1,"8",3,"9",5,"I hope you never have to find out."]},{question:"How many dwarf planets are in our solar system?", answers:[3,"13",2,"4",1,"5",4,"17",5,"The limit does not exist."]},{question:"How many moons does Jupiter have?", answers:[4,"17",3,"104",5,"Probably a few.",2,"45",1,"At least 62 that we know of."]},{question:"What is the moon made of?", answers:[5,"Ice and Fire.",5,"Plasma.",1,"Basalt and anorthosites.",1,"Tranquillityite, and pyroxferroite.",5,"Mostly Iron and Nickel."]},{question:"What are the largest objects in the Kuiper Belt?", answers:[2,"Haumea and Sedna",5,"Galifrey and Hoth",3,"Ceres and Makemake.",1,"Pluto and Eris.",4,"The Sun and the Moon."]},{question:"What is the closest galaxy to our own?", answers:[5,"Depeche Mode",1,"Andromeda",2,"Sextans B",3,"Aquarius Dwarf",5,"Bendidly Camberscwanch"]},{question:"Who discovered Venus?", answers:[5,"Me. I did.",3,"Galileo",2,"Clyde Tombaugh",4,"Neil Patrick Harris",1,"No one knows."]},{question:"Which star is closest to the earth.", answers:[1,"The Sun.",5,"Jennifer Lawrence",2,"Alpha Centauri",5,"Riachu",3,"Betelgeuse."]},{question:"Which star is closest to our own?", answers:[2,"Betelgeuse",3,"Procyon A",1,"Alpha Centauri",5,"The close star.",3,"Ganymede."]},{question:"How far does light travel in a year?", answers:[2,"3,878,499,810,000 miles.",2,"A light-year.",5,"A couple miles.",4,"As far as it can.",3,"79,469,830,705 miles."]},{question:"Beer or wine?", answers:[3,"Beer. Craft beer.",1,"Wine. Fine wine.",2,"Wine. Any wine.",4,"Alcohol",5,"PBR"]},{question:"Favorite award you have been given?", answers:[3,"1st Place 1975 NY State 800 Meter Dash.",4,"2007 Nobel Laureate",1,"Sexiest Astrophysicist Alive",2,"An Asteroid.",5,"Dr. Who Trivia Night 1st place."]},{question:"How fast does the Earth spin?", answers:[5,"7",4,"1400 Knots",3,"19,000 clicks.",1,"1000 MPH",4,"Mach 8.45"]},{question:"How many moons does Mars have?", answers:[1,"1",4,"6",5,"More than you could count!",2,"2",3,"0"]},{question:"Who discovered Neptune?", answers:[5,"Johan Sebastian Bach",1,"Johann Gottfried Galle",4,"Patrick Stewart",2,"William Herschel",3,"William Nye"]},{question:"Is there life elsewhere in the Universe?", answers:[4,"Shhhh it's a secret.",5,"No.",1,"Most likely yes.",3,"Who cares??",2,"Yes"]}];
var playerScore=0;
var qNum=0;
var qText=$('#question');
var dText=$('#textDisplay')
var dSplay=$('#dipdiv');
var prgsPcnt=0;
var fSplay = $('#findiv');
var resps=["Hmmmm... interesting choice!","Neil?? Is that you??","Are you Neil?? Could you be him?","Your NDT count... It's off the charts!!","Hurry to the next question Neil!","The world cannot wait any longer. Please be NDT??","Space?? Science?? No, it's Neil deGrasse Tyson!","Oh, Mr. Tyson!!!","A telling reply...","Do you know what that means???"];


var transOut=function(elem,del){
	elem.fadeOut(500);
	elem.addClass('slideOutLeft');
	elem.delay(600).removeClass('slideInRight');
};
var transIn=function(del){
	$('#answers1').delay(del).removeClass('slideOutLeft')
	$('#answers1').delay(del).addClass('slideInRight');
	$('#answers1').delay(del).fadeIn(1400);
	if($(window).width() > 700){
	$('#answers1').children().delay(del).animate({width:"60%"},500);
	}else{
		$('#answers1').children().delay(del).animate({width:"100%"},500);
	}
}
var txtRfrsh=function(){
	var x=Math.floor(Math.random()*(resps.length-1));
	return(resps.splice(x,1));
};
var prgs=function(){
	$('.progress-bar').animate({width:prgsPcnt+'%'},1000,'linear')
};

var transMessage=function(){
	dSplay.delay(600).fadeIn(500).delay(2200);
	dSplay.fadeOut(500);
	qText.fadeOut(500).delay(3600);
	qText.fadeIn(400);
}
var setQ=function(){
	var i=Math.floor(Math.random()*(qAndA.length-1));
	qText.text(qAndA[i].question)
	$('#answers').html("<div class='answers animated' id='answers1'><button class='btn btn-default' sc='"+qAndA[i].answers[0]+"' id='ans1'>"+qAndA[i].answers[1]+"</button><button class='btn btn-default' sc='"+qAndA[i].answers[2]+"' id'ans2'>"+qAndA[i].answers[3]+"</button><button class='btn btn-default' sc='"+qAndA[i].answers[4]+"' id'ans3'>"+qAndA[i].answers[5]+"</button><button class='btn btn-default' sc='"+qAndA[i].answers[6]+"' id'ans4'>"+qAndA[i].answers[7]+"</button><button class='btn btn-default' sc='"+qAndA[i].answers[8]+"' id'ans5'>"+qAndA[i].answers[9]+"</button></div>");
	qAndA.splice(i,1)
};
var playerRank=function(){
	if(playerScore<=7){
		return("<h3 id='textDisplay'>OMG! You're him! The hero this world has been needing! You're Neil deGrasse Tyson!</h3><img class='endImg' src='https://pbs.twimg.com/profile_images/74188698/NeilTysonOriginsA-Crop_400x400.jpg'>");
	}else if(playerScore<=12){
		return("<h3 id='textDisplay'>You're not quite NDT. You are Neil Armstrong though! The first man to set foot on the moon!</h3><img class='endImg' src='http://img2-1.timeinc.net/people/i/2012/news/120910/neil-armstong-2-300.jpg'>");
	}else if(playerScore<=18){
		return("<h3 id='textDisplay'>No, you are not him. You are the charming A-list celebrity Neil Patrick Harris though!</h3><img class='endImg' src='http://vignette1.wikia.nocookie.net/simpsons/images/c/c9/Neil_Patrick_Harris.png/revision/latest?cb=20111107195157'>");
	}else if(playerScore<=24){
		return("<h3 id='textDisplay'>You're not Neil deGrasse Tyson. You are canadian classic rock legend Neil Young!</h3><img class='endImg' src='http://www.theuncool.com/wp-content/uploads/2012/11/neilyounghat.jpg'>")
	}else if(playerScore<=28){
		return("<h3 id='textDisplay'>Nope. You're definitely not NDT. You are Young Neil from Scott Pilgim vs. The World!</h3><img class='endImg' src='http://img2.wikia.nocookie.net/__cb20100809173646/scottpilgrim/images/0/06/Box-neil.jpg'>")
	}else if(playerScore>28){
		return("<h3 id='textDisplay'>Sorry, but you're not even a Neil. You're Niall from 1D. Sucks to suck.</h3><img class='endImg' src='http://datingtheweb.com/wp-content/uploads/2014/02/one-direction-of-niall-horan.jpg'>")
	}
};

// var $grid = $('#ldrboard').isotope({
//   getSortData: {
//     name: '#pr', $('#ldrboard').children('h6').attr('pr');
//     category: '[score]', 'pr';
//     // weight: function( itemElem ) { // function
//     //   var weight = $( itemElem ).find('.weight').text();
//     //   return parseFloat( weight.replace( /[\(\)]/g, '') );
//     // }
//   }
// });


$('#startbtn').on('click',function(e){
	e.preventDefault();
	playerScore=0;
	clkys=0;
	qText.text("Great! This simple quiz will help you find out!").delay(2200);
	$('#startbtn').text('The world needs to know...').delay(1000);
	$('#startbtn').fadeOut(2000);
	$('#board').delay(2500).animate({top:'2vh',height:'96vh'},1500,function(){
		setQ();
		transIn(0);
		$('.progress').fadeIn(1500);
	});
});

$('#board').on('click','#answers .btn',function(){
		playerScore+=Number($(this).attr('sc'));
		prgsPcnt+=14.29;
		prgs();
		if(qNum>5){
		qText.fadeOut(500);
		transOut($('#answers1'));
		fSplay.html(playerRank());
		fSplay.delay(600).fadeIn(500);
		$('#postbtns').delay(600).fadeIn(500);
		if($(window).width() > 700){
		$('#ldrboard').fadeIn(2500);
			};
		}else{
		dText.text(txtRfrsh());
		transOut($('#answers1'));
		window.setTimeout(setQ,500);
		transMessage();
		window.setTimeout(transIn,1000,1000);
		qNum++;}
});

$('#rptbtn').on('click', function(e){
	e.preventDefault();
	clkys=0;
	resps=["Hmmmm... interesting choice!","Neil?? Is that you??","Are you Neil?? Could you be him?","Your NDT count... It's off the charts!!","Hurry to the next question Neil!","The world cannot wait any longer. Please be NDT??","Space?? Science?? No, it's Neil deGrasse Tyson!","Oh, Mr. Tyson!!!","A telling reply...","Do you know what that means???"];
	qAndA=[{question:"What is your first name?", answers:[1,"Neil",2,"Narl",3,"Niall",4,"Nail",5,"Narwhal"]},{question:"When where you born?", answers:[2,"October 29th, 1964",4,"July 17th, 1934",1,"October 5th, 1958",3,"February 14th, 1959",5,"Today"]},{question:"Where did you go to College?", answers:[1,"Columbia",1,"Harvard",1,"U Texas Austin",4,"Yale",5,"None of the above"]},{question:"Which superhero comic book have you been featured in?", answers:[1,"Superman",4,"Spiderman",2,"Batman",5,"Omega Red",3,"Teen Titans"]},{question:"How many planets are in our solar system?", answers:[3,"At least 4.",5,"There's no way to know for sure.",1,"8",3,"9",5,"I hope you never have to find out."]},{question:"How many dwarf planets are in our solar system?", answers:[3,"13",2,"4",1,"5",4,"17",5,"The limit does not exist."]},{question:"How many moons does Jupiter have?", answers:[4,"17",3,"104",5,"Probably a few.",2,"45",1,"At least 62 that we know of."]},{question:"What is the moon made of?", answers:[5,"Ice and Fire.",5,"Plasma.",1,"Basalt and anorthosites.",1,"Tranquillityite, and pyroxferroite.",5,"Mostly Iron and Nickel."]},{question:"What are the largest objects in the Kuiper Belt?", answers:[2,"Haumea and Sedna",5,"Galifrey and Hoth",3,"Ceres and Makemake.",1,"Pluto and Eris.",4,"The Sun and the Moon."]},{question:"What is the closest galaxy to our own?", answers:[5,"Depeche Mode",1,"Andromeda",2,"Sextans B",3,"Aquarius Dwarf",5,"Bendidly Camberscwanch"]},{question:"Who discovered Venus?", answers:[5,"Me. I did.",3,"Galileo",2,"Clyde Tombaugh",4,"Neil Patrick Harris",1,"No one knows."]},{question:"Which star is closest to the earth.", answers:[1,"The Sun.",5,"Jennifer Lawrence",2,"Alpha Centauri",5,"Riachu",3,"Betelgeuse."]},{question:"Which star is closest to our own?", answers:[2,"Betelgeuse",3,"Procyon A",1,"Alpha Centauri",5,"The close star.",3,"Ganymede."]},{question:"How far does light travel in a year?", answers:[2,"3,878,499,810,000 miles.",2,"A light-year.",5,"A couple miles.",4,"As far as it can.",3,"79,469,830,705 miles."]},{question:"Beer or wine?", answers:[3,"Beer. Craft beer.",1,"Wine. Fine wine.",2,"Wine. Any wine.",4,"Alcohol",5,"PBR"]},{question:"Favorite award you have been given?", answers:[3,"1st Place 1975 NY State 800 Meter Dash.",4,"2007 Nobel Laureate",1,"Sexiest Astrophysicist Alive",2,"An Asteroid.",5,"Dr. Who Trivia Night 1st place."]},{question:"How fast does the Earth spin?", answers:[5,"7",4,"1400 Knots",3,"19,000 clicks.",1,"1000 MPH",4,"Mach 8.45"]},{question:"How many moons does Mars have?", answers:[1,"1",4,"6",5,"More than you could count!",2,"2",3,"0"]},{question:"Who discovered Neptune?", answers:[5,"Johan Sebastian Bach",1,"Johann Gottfried Galle",4,"Patrick Stewart",2,"William Herschel",3,"William Nye"]},{question:"Is there life elsewhere in the Universe?", answers:[4,"Shhhh it's a secret.",5,"No.",1,"Most likely yes.",3,"Who cares??",2,"Yes"]}];
	playerScore=0;
	qNum=0;
	prgsPcnt=0;
	prgs();
	$('#postbtns').fadeOut(300);
	setQ()
	fSplay.fadeOut(300)
	qText.fadeOut(0).delay(300);
	$('#ldrboard').fadeOut(1500);
	qText.fadeIn(300);
	window.setTimeout(transIn,300,0);
});

$('#savebtn').on('click',function(){
	var name=$('#name').val();
	var pic=$('.endImg').attr('src');
	if($(window).width() < 700){
		$('#board').fadeOut(300);
		$('#ldrboard').fadeIn(2000);
			};
	if(!clkys){
	$('#leaders').prepend("<div pr="+playerScore+"><img src="+pic+"><h6>"+name+" - Score-"+playerScore+"</h6></div>");
	// $('#ldrboard').children('div').attr('pr').isotope({ sortBy: [pr] });
	clkys++;
	var leader = $.ajax({
		url:'/leaderboard',
		method: 'GET',
		data: {'name':name,'picture':pic,'score':playerScore}
	}).done(function(){
		console.log(leader)
	});

	};
});

});