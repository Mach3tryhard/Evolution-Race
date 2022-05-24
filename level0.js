var ballz= [];
var sunz=[];

var start_pressed = 0;

function GameStart(event) {
    if(start_pressed==0 && (event.clientX>220 || event.clientY>70))
    {
        /// Adaugam celula
        ballz.push(makeball());
        ballz[0].pozx=event.clientX-27;
        ballz[0].pozy=event.clientY-27;
        moveball(ballz[0]);
        start_pressed=1;
        /// Stergem animatia
        const element = document.getElementById("deleteonplay");
        element.remove();
    }
}

document.addEventListener("click", GameStart);

function makeball()
{
    let bb = {};

    bb.hunger = 50;
    bb.velx = 0;
    bb.vely = 0;
    bb.pozx = NaN;
    bb.pozy = NaN;
    bb.bonusv=0;
    bb.vision=0;

    bb.getball=document.createElement("div");
    bb.getball.style.width = 50 + 'px';
    bb.getball.style.height = 50 + 'px';
    bb.getball.style.borderRadius = '50%';
    bb.getball.style.position = 'absolute';
    bb.getball.style.border = 1 + 'px';
    bb.getball.style.border = 'solid';

    bb.getball.style.background ='#a129d6';
    bb.getball.style.borderColor = '#000000';
    document.body.appendChild(bb.getball);
    return bb;
}

function makechildball(ball)
{
    let bb = {};

    bb.hunger = ball.hunger/2;
    bb.velx = 0;
    bb.vely = 0;
    posx=Math.floor(Math.random() * (10 + 10 + 1)) -10;
    posy=Math.floor(Math.random() * (10 + 10 + 1)) -10;
    bb.pozx = ball.pozx+posx;
    bb.pozy = ball.pozy+posy;
    bb.vision = ball.vision;
    bb.bonusv = ball.bonusv;

    bb.getball=document.createElement("div");
    bb.getball.style.width = 50 + 'px';
    bb.getball.style.height = 50 + 'px';
    bb.getball.style.borderRadius = '50%';
    bb.getball.style.position = 'absolute';
    bb.getball.style.border = 1 + 'px';
    bb.getball.style.border = 'solid';

    bb.getball.style.background = ball.getball.style.background;
    bb.getball.style.borderColor = ball.getball.style.borderColor;

    document.body.appendChild(bb.getball);
    return bb;
}

function makesun()
{
    let bb = {};
    bb.size=300;
    bb.pozx=window.innerWidth/2;
    bb.pozy=window.innerHeight/2;

    bb.getsun=document.createElement("div");
    bb.getsun.style.width = 300 + 'px';
    bb.getsun.style.height = 300 + 'px';
    bb.getsun.style.left = window.innerWidth/2 + 'px';
    bb.getsun.style.top = window.innerHeight/2 + 'px';
    bb.getsun.style.position = 'absolute';
    bb.getsun.style.background ='#FFFF00';

    document.body.appendChild(bb.getsun);
    return bb;
}

function losehunger(ball)
{
    ball.hunger-=0.1;
    colorString = ball.getball.style.background;
    colorsOnly = colorString.substring(colorString.indexOf('(') + 1,colorString.lastIndexOf(')')).split(/,\s*/),
    colorsOnly.map(parseInt);
    colorsOnly[3]=ball.hunger/100;
    ball.getball.style.background = 'rgba('+colorsOnly[0]+','+colorsOnly[1]+','+colorsOnly[2]+','+colorsOnly[3]+')';
}

function updatesliders(ball)
{
    ball.vision = document.getElementById("Visionslider").value;
    //ball.bonusv = document.getElementById("Speedslider").value;
    colorString = ball.getball.style.background;
    colorsOnly = colorString.substring(colorString.indexOf('(') + 1,colorString.lastIndexOf(')')).split(/,\s*/),
    colorsOnly.map(parseInt);
    colorsOnly[0]=document.getElementById("Redslider").value;
    colorsOnly[1]=document.getElementById("Greenslider").value;
    colorsOnly[2]=document.getElementById("Blueslider").value;
    ball.getball.style.background = 'rgba('+colorsOnly[0]+','+colorsOnly[1]+','+colorsOnly[2]+','+colorsOnly[3]+')';
}

function moveball(ball)
{
    if(ball.velx<0)ball.pozx += ball.velx-ball.bonusv;
    else ball.pozx += ball.velx+ball.bonusv;
    if(ball.vely<0)ball.pozy += ball.vely-ball.bonusv;
    else ball.pozy += ball.vely+ball.bonusv;
    ball.getball.style.left = ball.pozx+'px';
    ball.getball.style.top = ball.pozy+'px';
}

function movesun(sun)
{
    sun.pozx=window.innerWidth/2.5;
    sun.pozy=window.innerHeight/2.5;
    sun.getsun.style.left = window.innerWidth/2.5 + 'px';
    sun.getsun.style.top = window.innerHeight/2.5 + 'px';
}

function gravity(ball1,ball2)
{
    var distantax = ball2.pozx-ball1.pozx;
    var distantay = ball2.pozy-ball1.pozy;
    var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
    if(distanta<55)
    {
        ball1.velx += distantax / distanta*-2;
        ball1.vely += distantay / distanta*-2;
        ball2.velx += distantax / distanta*2;
        ball2.vely += distantay / distanta*2;
    }
    else
    {
        ball1.velx=0;
        ball1.vely=0;
        ball2.velx=0;
        ball2.vely=0;
    }
    moveball(ball1);
    moveball(ball2);
}

function update()
{
    /// update color
    for(let i=0;i<ballz.length;i++)
    {
        updatesliders(ballz[i]);
    }
    /// eating sun
    for(let i=0;i<ballz.length;i++)
    {
        for(let j=0;j<sunz.length;j++)
        {
            if(ballz[i].pozx>sunz[j].pozx-50 && ballz[i].pozy>sunz[j].pozy-50 && ballz[i].pozx<(sunz[j].pozx+sunz[j].size) && ballz[i].pozy<(sunz[j].pozy+sunz[j].size))
            {
                ballz[i].hunger+=0.15;
            }
        }
    }
    ///devide and spawn
    for(let i=0;i<ballz.length;i++)
    {
        if(ballz[i].hunger>100)
        {
            ballz.push(makechildball(ballz[i]));
            posx=Math.floor(Math.random() * (10 + 10 + 1)) -10;
            posy=Math.floor(Math.random() * (10 + 10 + 1)) -10;
            ballz[i].pozx +=posx;
            ballz[i].pozy +=posy;
            ballz[i].hunger/=2;
        }
    }
    ///hunger and die
    for(let i=0;i<ballz.length;i++)
    {
        losehunger(ballz[i]);
        if(ballz[i].hunger<0)
        {
            ballz[i].getball.remove();
            ballz.splice(i,1);
        }
    }
    /// Rendering Movement
    for(let i=0;i<ballz.length;i++)
    {
        moveball(ballz[i]);
    }
    for(let i=0;i<sunz.length;i++)
    {
        movesun(sunz[i]);
    }
    /// Anti Gravity
    if(ballz.length>1)
    {
        for(let i=0;i<ballz.length;i++)
        {
            for(let j=i+1;j<ballz.length;j++)
            {
                gravity(ballz[i],ballz[j]);
            }
        }
    }
}

/// Utilizam functiile la infinit
sunz.push(makesun());
var idupdate = setInterval(update,1);
document.addEventListener("visibilitychange", function() {
    if (document.hidden){
        clearInterval(idupdate);
    }
    else 
    {
        idupdate = setInterval(update,1);
    }
});

/// Game panel

function openNav1() {
    document.getElementById("myNav1").style.width = "25%";
}
  
function closeNav1() {
    document.getElementById("myNav1").style.width = "0%";
}

/// sliders
var slider1 = document.getElementById("Redslider");
var output1 = document.getElementById("demor");
output1.innerHTML = slider1.value;

slider1.oninput = function() {
  output1.innerHTML = this.value;
}
var slider2 = document.getElementById("Greenslider");
var output2 = document.getElementById("demog");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
  output2.innerHTML = this.value;
}
var slider3 = document.getElementById("Blueslider");
var output3 = document.getElementById("demob");
output3.innerHTML = slider3.value;

slider3.oninput = function() {
  output3.innerHTML = this.value;
}
var slider4 = document.getElementById("Speedslider");
var output4 = document.getElementById("demos");
output4.innerHTML = slider4.value;

slider4.oninput = function() {
  output4.innerHTML = this.value;
}
var slider5 = document.getElementById("Visionslider");
var output5 = document.getElementById("demov");
output5.innerHTML = slider5.value;

slider5.oninput = function() {
  output5.innerHTML = this.value;
}
