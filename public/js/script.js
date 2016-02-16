$(function(){

var bkgrnd=Math.random();

if(bkgrnd>=.8){
	$('body').addClass('bkgrnd1');
}else if(bkgrnd>=.6){
	$('body').addClass('bkgrnd2');
}else if(bkgrnd>=.4){
	$('body').addClass('bkgrnd3');
}else if(bkgrnd>=.2){
	$('body').addClass('bkgrnd4');
}else if(bkgrnd>=.0){
	$('body').addClass('bkgrnd5');
}

var resps, qAndA;
$.get('/qs', function(data){
	qAndA = data;
});
$.get('/resps', function(data){
	resps = data;
});
var playerScore=0;
var qNum=0;
var qText=$('#question');
var dText=$('#textDisplay')
var dSplay=$('#dipdiv');
var prgsPcnt=0;
var fSplay = $('#findiv');

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
		return("<h3 id='textDisplay'>OMG! You're him! The hero this world has been needing! You're Neil deGrasse Tyson!</h3><img class='endImg' src='/assets/photos/ndt.jpg'>");
	}else if(playerScore<=12){
		return("<h3 id='textDisplay'>You're not quite NDT. You are Neil Armstrong though! The first man to set foot on the moon!</h3><img class='endImg' src='/assets/photos/nas.jpg'>");
	}else if(playerScore<=18){
		return("<h3 id='textDisplay'>No, you are not him. You are the charming A-list celebrity Neil Patrick Harris though!</h3><img class='endImg' src='/assets/photos/nph.png'>");
	}else if(playerScore<=24){
		return("<h3 id='textDisplay'>You're not Neil deGrasse Tyson. You are canadian classic rock legend Neil Young!</h3><img class='endImg' src='/assets/photos/ny.jpg'>")
	}else if(playerScore<=28){
		return("<h3 id='textDisplay'>Nope. You're definitely not NDT. You are Young Neil from Scott Pilgim vs. The World!</h3><img class='endImg' src='/assets/photos/yn.jpg'>")
	}else if(playerScore>28){
		return("<h3 id='textDisplay'>Sorry, but you're not even a Neil. You're Niall from 1D. Sucks to suck.</h3><img class='endImg' src='/assets/photos/nh.jpg'>")
	}
};

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
	$.get('/qs', function(data){
	qAndA = data;
	});
	$.get('/resps', function(data){
		resps = data;
	});
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
