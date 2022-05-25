var ballz= [];
var sunz=[];
var food= [];
var dum=[];

var start_pressed = 0;
var MAXpoints=100;

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

function makefood()
{
    let bb = {};
    bb.getfood=document.createElement("div");
    bb.getfood.style.left = (bb.pozx = Math.floor(Math.random() * (window.innerWidth-50-150)+150)) + 'px';
    bb.getfood.style.top = (bb.pozy = Math.floor(Math.random() * (window.innerHeight-50-60)+50)) + 'px';
    bb.getfood.style.width = 20 + 'px';
    bb.getfood.style.height = 20 + 'px';
    bb.getfood.style.borderRadius = '50%';
    bb.getfood.style.position = 'absolute';
    bb.getfood.style.background = "#32CD32";
    bb.getfood.style.border = 1 + 'px';
    bb.getfood.style.border = "solid";
    bb.getfood.style.borderColor = "#348C31";

    document.body.appendChild(bb.getfood);
    return bb;
}

function makedummyball()
{
    let bb = {};

    bb.velx = 0;
    bb.vely = 0;
    bb.pozx =(bb.pozx = Math.floor(Math.random() * (window.innerWidth-50-150)+150));
    bb.pozy =(bb.pozx = Math.floor(Math.random() * (window.innerWidth-50-150)+150));
    bb.vision=200;

    bb.getdummy=document.createElement("div");
    bb.getdummy.style.left=(bb.pozx = Math.floor(Math.random() * (window.innerWidth-50-150)+150))+"px";
    bb.getdummy.style.top=(bb.pozx = Math.floor(Math.random() * (window.innerWidth-50-150)+150))+"px";
    bb.getdummy.style.width = 30 + 'px';
    bb.getdummy.style.height = 30 + 'px';
    bb.getdummy.style.borderRadius = '50%';
    bb.getdummy.style.position = 'absolute';
    bb.getdummy.style.border = 1 + 'px';
    bb.getdummy.style.border = 'solid';

    bb.getdummy.style.background ='#FA8072';
    bb.getdummy.style.borderColor = '#ffffff';
    document.body.appendChild(bb.getdummy);
    return bb;
}

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
    bb.metabolism=0.1;
    bb.eat = 0;

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
    bb.metabolism=ball.metabolism;
    bb.eat=ball.eat;

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
    bb.getsun.style.background ='#ffffe0';

    document.body.appendChild(bb.getsun);
    return bb;
}

/// Limitarea sliderelor pt mai putine puncte
document.getElementById('Visionslider').oninput = function(){
    if(MAXpoints-document.getElementById('Metabolismslider').value-document.getElementById('Speedslider').value-document.getElementById("Visionslider").value<0)
    {
        document.getElementById("Visionslider").value=MAXpoints-document.getElementById('Metabolismslider').value-document.getElementById('Speedslider').value;
    }
    var slider5 = document.getElementById("Visionslider");
    var output5 = document.getElementById("demov");
    output5.innerHTML = slider5.value;
}
document.getElementById('Metabolismslider').oninput = function(){
    if(MAXpoints-document.getElementById('Metabolismslider').value-document.getElementById('Speedslider').value-document.getElementById("Visionslider").value<0)
    {
        document.getElementById("Metabolismslider").value=MAXpoints-document.getElementById('Visionslider').value-document.getElementById('Speedslider').value;
    }
    var slider6 = document.getElementById("Metabolismslider");
    var output6 = document.getElementById("demom");
    output6.innerHTML = slider6.value;
}
document.getElementById('Speedslider').oninput = function(){
    if(MAXpoints-document.getElementById('Metabolismslider').value-document.getElementById('Speedslider').value-document.getElementById("Visionslider").value<0)
    {
        document.getElementById("Speedslider").value=MAXpoints-document.getElementById('Metabolismslider').value-document.getElementById('Visionslider').value;
    }
    var slider4 = document.getElementById("Speedslider");
    var output4 = document.getElementById("demos");
    output4.innerHTML = slider4.value;
}

///Sliderle pt tipuride de mancare sa se reseteze intre ele
document.getElementById('Sunslider').onchange = function(){
    document.getElementById("Grassslider").value=0;
    document.getElementById("Meatslider").value=0;
}
document.getElementById('Grassslider').onchange = function(){
    document.getElementById("Sunslider").value=0;
    document.getElementById("Meatslider").value=0;
}
document.getElementById('Meatslider').onchange = function(){
    document.getElementById("Grassslider").value=0;
    document.getElementById("Sunslider").value=0;
}

function updatesliders(ball)
{
    /// Way of eating slider
    if(document.getElementById("Sunslider").value==1)ball.eat=1;
    if(document.getElementById("Grassslider").value==1)ball.eat=2;
    if(document.getElementById("Meatslider").value==1)ball.eat=3;
    ///Metabolism Slider
    ball.metabolism =(10 - document.getElementById("Metabolismslider").value)/50;
    ///Speed Slider
    ball.bonusv = document.getElementById("Speedslider").value/10;
    ball.bonusv = parseFloat(ball.bonusv);
    /// Vision Slider
    ball.vision = document.getElementById("Visionslider").value*100;
    ///Color slider
    colorString = ball.getball.style.background;
    colorsOnly = colorString.substring(colorString.indexOf('(') + 1,colorString.lastIndexOf(')')).split(/,\s*/),
    colorsOnly.map(parseInt);
    colorsOnly[0]=document.getElementById("Redslider").value;
    colorsOnly[1]=document.getElementById("Greenslider").value;
    colorsOnly[2]=document.getElementById("Blueslider").value;
    ball.getball.style.background = 'rgba('+colorsOnly[0]+','+colorsOnly[1]+','+colorsOnly[2]+','+colorsOnly[3]+')';
}

function losehunger(ball)
{
    ball.hunger-=ball.metabolism;
    colorString = ball.getball.style.background;
    colorsOnly = colorString.substring(colorString.indexOf('(') + 1,colorString.lastIndexOf(')')).split(/,\s*/),
    colorsOnly.map(parseInt);
    colorsOnly[3]=ball.hunger/100;
    ball.getball.style.background = 'rgba('+colorsOnly[0]+','+colorsOnly[1]+','+colorsOnly[2]+','+colorsOnly[3]+')';
}

function goeatvelocity(ball,food)
{
    var distantax = ball.pozx-food.pozx;
    var distantay = ball.pozy-food.pozy;
    var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
    ball.velx=-distantax/distanta;
    ball.vely=-distantay/distanta;
}

function spawnfood()
{
    for(let i=0;i<3;i++)
    {
        if(start_pressed==1)
        {
            food.push(makefood());
        }
    }
}

function spawndummy()
{
    for(let i=0;i<5;i++)
    {
        if(start_pressed==1)
        {
            dum.push(makedummyball());
        }
    }
}

function eatfood(ball,food)
{
    food.getfood.remove();
    ball.hunger+=5;
}

function eatdummy(ball,dummy)
{
    dummy.getdummy.remove();
    ball.hunger+=40;
}

function moveball(ball)
{
    if(ball.velx!=0)
    {
        if(ball.velx<0)ball.pozx += ball.velx-ball.bonusv;
        else ball.pozx += ball.velx+ball.bonusv;
    }
    if(ball.vely!=0)
    {
        if(ball.vely<0)ball.pozy += ball.vely-ball.bonusv;
        else ball.pozy += ball.vely+ball.bonusv;
    }
    ball.getball.style.left = ball.pozx+'px';
    ball.getball.style.top = ball.pozy+'px';
}

function movedummy(dummy)
{
    dummy.pozx+=dummy.velx;
    dummy.pozy+=dummy.vely;
    dummy.getdummy.style.left = dummy.pozx + 'px';
    dummy.getdummy.style.top = dummy.pozy + 'px';
}

function movesun(sun)
{
    sun.pozx=window.innerWidth/2.5;
    sun.pozy=window.innerHeight/2.5;
    sun.getsun.style.left = window.innerWidth/2.5 + 'px';
    sun.getsun.style.top = window.innerHeight/2.5 + 'px';
}

function dummyrun(ball,dummy)
{
    var distantax = dummy.pozx-ball.pozx;
    var distantay = dummy.pozy-ball.pozy;
    var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
    if(distanta<dummy.vision)
    {
        dummy.velx += distantax *0.001;
        dummy.vely += distantay *0.001;
        if(dummy.pozx+dummy.velx<0 || dummy.pozx+dummy.velx>window.innerWidth-20 || dummy.pozy+dummy.vely<0 || dummy.pozy+dummy.vely>window.innerHeight-20)
        {
            dummy.velx=0;
            dummy.vely=0;
        }
    }
    else
    {
        dummy.velx=0;
        dummy.vely=0;
    }
    movedummy(dummy);
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

function GameEndLose()
{
    if(ballz.length==0 && start_pressed==1)
    {
        openNav2()
        closeNav1()
    }
}

function outofboundsball(ball)
{
    if(ball.pozx>window.innerWidth-25)
        ball.pozx=25;
    if(ball.pozy>window.innerHeight-25)
        ball.pozy=25;
    if(ball.pozx<-25)
        ball.pozx=window.innerWidth-25;
    if(ball.pozy<-25)
        ball.pozy=window.innerHeight-25;
}

function update()
{
    ///Out of bounds
    for(let i=0;i<ballz.length;i++)
    {
        outofboundsball(ballz[i]);
    }
    /// Reset game if you lose all cells
    GameEndLose();
    /// update color
    for(let i=0;i<ballz.length;i++)
    {
        updatesliders(ballz[i]);
    }
    /// eating sun
    if(document.getElementById("Sunslider").value==1)
    {
        for(let i=0;i<ballz.length;i++)
        {
            for(let j=0;j<sunz.length;j++)
            {
                if(ballz[i].pozx>sunz[j].pozx-50 && ballz[i].pozy>sunz[j].pozy-50 && ballz[i].pozx<(sunz[j].pozx+sunz[j].size) && ballz[i].pozy<(sunz[j].pozy+sunz[j].size) && ballz[i].eat==1)
                {
                    ballz[i].hunger+=0.2;
                }
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
    for(let i=0;i<sunz.length;i++)
    {
        movesun(sunz[i]);
    }
    for(let i=0;i<ballz.length;i++)
    {
        for(let j=0;j<dum.length;j++)
        {
            dummyrun(ballz[i],dum[j]);
        }
    }
    for(let i=0;i<ballz.length;i++)
    {
        moveball(ballz[i]);
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
    ///Changing velocity for eating food
    if(document.getElementById("Grassslider").value==1)
    {
        for(let i=0;i<ballz.length;i++)
        {
            var distantamin=999999999,jmin;
            for(let j=0;j<food.length;j++)
            {
                var distantax = ballz[i].pozx-food[j].pozx;
                var distantay = ballz[i].pozy-food[j].pozy;
                var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
                if(distanta<distantamin)
                {
                    distantamin=distanta;
                    jmin=j;
                }
            }
            if(distantamin>60 && distantamin<ballz[i].vision)
            {
                goeatvelocity(ballz[i],food[jmin]);
            }
            if(distantamin<60)
            {
                ballz[i].velx=0;
                ballz[i].vely=0;
                eatfood(ballz[i],food[jmin]);
                food.splice(jmin, 1);
            }
        }
    }
    ///Changing velocity for eating dummys
    if(document.getElementById("Meatslider").value==1)
    {
        for(let i=0;i<ballz.length;i++)
        {
            var distantamin=999999999,jmin;
            for(let j=0;j<dum.length;j++)
            {
                var distantax = ballz[i].pozx-dum[j].pozx;
                var distantay = ballz[i].pozy-dum[j].pozy;
                var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
                if(distanta<distantamin)
                {
                    distantamin=distanta;
                    jmin=j;
                }
            }
            if(distantamin>40 && distantamin<ballz[i].vision)
            {
                goeatvelocity(ballz[i],dum[jmin]);
            }
            if(distantamin<40)
            {
                ballz[i].velx=0;
                ballz[i].vely=0;
                eatdummy(ballz[i],dum[jmin]);
                dum.splice(jmin, 1);
            }
        }
    }
}

/// Utilizam functiile la infinit
sunz.push(makesun());
var iddummy = setInterval(spawndummy,5000);
var idspawn = setInterval(spawnfood,1000);
var idupdate = setInterval(update,5);
document.addEventListener("visibilitychange", function() {
    if (document.hidden){
        clearInterval(spawndummy);
        clearInterval(idupdate);
        clearInterval(idspawn);
    }
    else 
    {   
        iddummy = setInterval(spawndummy,5000);
        idspawn = setInterval(spawnfood,1000);
        idupdate = setInterval(update,5);
    }
});

/// Game panel Si MENIU
function openNav(){
    document.getElementById("myNav").style.width = "100%";
}
  
function closeNav(){
    document.getElementById("myNav").style.width = "0%";  
}

function openNav1() {
    document.getElementById("myNav1").style.width = "25%";
}
  
function closeNav1() {
    document.getElementById("myNav1").style.width = "0%";
}

function openNav2() {
    document.getElementById("myNav2").style.width = "100%";
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
