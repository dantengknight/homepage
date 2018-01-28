
// set variables
var score = 0;
cd = 35;
evilRatAddr = "images/evilHamtaro.jpg"
ratAddr = ["images/hamtaro0.gif",
    "images/hamtaro1.png",
    "images/hamtaro2.jpg",
    "images/hamtaro3.jpg",
    evilRatAddr];
surpriseRatAddr = "images/surprise.png";
ratStatus = [false,false,false,false,false];
Wwidth = $(window).width();
Wheight = $(window).height();
ratWidth = $("img").width();
ratHeight = $("img").height();


// start game
startGame();

countdown();

function startGame() {

    // init time interval function
    interval0 = setInterval("showRat()", 2600);
    interval1 = setInterval("showRat()", 2100);


}

function countdown() {


    if ( cd == 0) {
        gameOver();
    }
    else {
        cd -= 1;
        document.getElementById("countdown").innerHTML = cd;
        timeout1 = setTimeout(countdown, 1000);
    }

}



function showRat() {

    // pick a random rat and check rat status
    var ratNum; 
    do {
        ratNum = Math.floor(Math.random() * 5);
    }
    while (ratStatus[ratNum] == true)
        var ratId = "ham" + ratNum;

    // update ratStatus
    ratStatus[ratNum] = true;

    // put img into the div
    document.getElementById(ratId).innerHTML =
        "<img src=" + ratAddr[ratNum] +">";
    // show that rat, set width, height, according the viewpoint size
    var top = Math.random() * (Wheight-ratHeight);
    var left = Math.random() * (Wwidth-ratWidth);
    document.getElementById(ratId).style.top = top + "px";
    document.getElementById(ratId).style.left = left + "px";

    // disappear in a random time range
    var disappearTime = Math.random() * 1000 + 1200;
    timeout = setTimeout(disappear(ratId), disappearTime);

}


function disappear(ratId) {

    return function() {
        document.getElementById(ratId).innerHTML="";
        // update ratStatus
        var ratNum = ratId.charAt(ratId.length-1);
        ratStatus[ratNum] = false;
    }

}

function hit(ratNum) {

    // disappear the rat, and update status
    var ratId = "ham" + ratNum;
    var addrOfRat = document.querySelectorAll("#"+ratId+" img")[0].src;
    // do nothing if hit the surprise rat
    if (addrOfRat.indexOf(surpriseRatAddr) != -1) return;
    // lose score if hit evil rat
    if (addrOfRat.indexOf(evilRatAddr) != -1) {
        score -= 3;
    }
    // score other rats
    else {
        score += 1;
    }
    document.getElementById("score").innerHTML = score;
    document.getElementById(ratId).innerHTML="";

    // make a surprise face
    document.getElementById(ratId).innerHTML=
        "<img src=" + surpriseRatAddr +">";

}

function gameOver() {

    clearInterval(interval0);
    clearInterval(interval1);
    clearTimeout(timeout);
    clearTimeout(timeout1);
    clearRats();
    //   fade in the result
    $("#result").css("display", "none");
    $("#result").html("Your final score is " + score + " !");
    $("#result").fadeIn(2000);


}

function clearRats() {

    for (var i=0; i < 5; i++) {
        document.getElementById("ham"+i).innerHTML="";
    }

}
