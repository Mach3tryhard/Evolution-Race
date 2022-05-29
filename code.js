var ballz= [];
var food= [];

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

function makeball()
{
    let bb = {};

    bb.race=Math.floor(Math.random() * 3);

    bb.hunger = 25;
    bb.velx = 0;
    bb.vely = 0;
    bb.pozx = Math.floor(Math.random() * (window.innerWidth-50));
    bb.pozy = Math.floor(Math.random() * (window.innerHeight-05));
    bb.vision=2000;  

    bb.getball=document.createElement("div");
    bb.getball.style.width = 50 + 'px';
    bb.getball.style.height = 50 + 'px';
    bb.getball.style.borderRadius = '50%';
    bb.getball.style.position = 'absolute';
    bb.getball.style.border = 1 + 'px';
    bb.getball.style.border = 'solid';

    if(bb.race==0)
      {
        bb.getball.style.background ='#0ed3f1';
        bb.getball.style.borderColor = '#1e4a66';
      }
    if(bb.race==1)
    {
      bb.getball.style.background ='#f10ed3';
      bb.getball.style.borderColor = '#661e4a';
    }
    if(bb.race==2)
    {
      bb.getball.style.background ='#d3f10e';
      bb.getball.style.borderColor = '#4a661e';
    }
    document.body.appendChild(bb.getball);
    return bb;
}

function makechildball(ball)
{
    let bb = {};

    bb.race=ball.race;

    bb.hunger = ball.hunger/4;
    bb.velx = 0;
    bb.vely = 0;
    bb.pozx = ball.pozx+50;
    bb.pozy = ball.pozy;
    bb.vision = ball.vision;
    bb.bonusv = ball.bonusv;

    bb.getball=document.createElement("div");
    bb.getball.style.width = 50 + 'px';
    bb.getball.style.height = 50 + 'px';
    bb.getball.style.borderRadius = '50%';
    bb.getball.style.position = 'absolute';
    bb.getball.style.border = 1 + 'px';
    bb.getball.style.border = 'solid';

    colorString = ball.getball.style.background;
    colorsOnly = colorString.substring(colorString.indexOf('(') + 1,colorString.lastIndexOf(')')).split(/,\s*/),
    colorsOnly.map(parseInt);
    let change = Math.floor(Math.random() * 2.99);
    colorsOnly[change]=(colorsOnly[change]+10)%256;
    bb.getball.style.background = 'rgba('+colorsOnly[0]+','+colorsOnly[1]+','+colorsOnly[2]+',0.8)';
    bb.getball.style.borderColor = ball.getball.style.borderColor;

    document.body.appendChild(bb.getball);
    return bb;
}

function eat(ball,food)
{
    food.getfood.remove();
    ball.hunger+=5;
}

function goeatvelocity(ball,food)
{
    var distantax = ball.pozx-food.pozx;
    var distantay = ball.pozy-food.pozy;
    var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
    ball.velx=-distantax/distanta;
    ball.vely=-distantay/distanta;
}

function losehunger(ball)
{
    ball.hunger-=0.01;
}

function idle(ball)
{
        negx=Math.floor(Math.random() * 2);
        negy=Math.floor(Math.random() * 2);
        ball.velx=Math.random();
        ball.vely=Math.random();
        if(negx==1)ball.velx*=-1;
        if(negy==1)ball.vely*=-1;
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

function move(ball)
{
    ball.pozx += ball.velx;
    ball.pozy += ball.vely;
    ball.getball.style.left = ball.pozx+'px';
    ball.getball.style.top = ball.pozy+'px';
}

function create()
{
    for(let i=0;i<10;i++)
    {
        ballz.push(makeball());
    }
    for(let i=0;i<100;i++)
    {
        food.push(makefood());
    }
}

function spawnfood()
{
    for(let i=0;i<30;i++)
    {
        food.push(makefood());
    }
}

function gravity(ball1,ball2)
{
    var distantax = ball2.pozx-ball1.pozx;
    var distantay = ball2.pozy-ball1.pozy;
    var distanta = Math.sqrt(distantax * distantax + distantay * distantay);
    if(distanta<55)
    {
        ball1.velx += distantax / distanta*-0.1;
        ball1.vely += distantay / distanta*-0.1;
        ball2.velx += distantax / distanta*0.1;
        ball2.vely += distantay / distanta*0.1;
    }
    else
    {
        ball1.velx=0;
        ball1.vely=0;
        ball2.velx=0;
        ball2.vely=0;
    }
    move(ball1);
    move(ball2);    
}

function update()
{
    ///delete out of bounds
    for(let i=0;i<ballz.length;i++)
    {
        outofboundsball(ballz[i]);
    }
    ///devide and spawn
    for(let i=0;i<ballz.length;i++)
    {
        if(ballz[i].hunger>50)
        {
            ballz.push(makechildball(ballz[i]));
            ballz[i].hunger/=4;
            ballz[i].pozx-=50;
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
        move(ballz[i]);
    }
    /// Gravity
    if(ballz.length>1 && food.length>0)
    {
        for(let i=0;i<ballz.length;i++)
        {
            for(let j=i+1;j<ballz.length;j++)
            {
                gravity(ballz[i],ballz[j]);
            }
        }
    }
    ///Changing velocity for eating and idle
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
        if(distantamin>ballz[i].vision && ballz[i].velx==0 && ballz[i].vely==0)
        {
            idle(ballz[i]);
        }
        else
        if(distantamin>60 && distantamin<ballz[i].vision)
        {
            goeatvelocity(ballz[i],food[jmin]);
        }
        if(distantamin<60)
        {
            ballz[i].velx=0;
            ballz[i].vely=0;
            eat(ballz[i],food[jmin]);
            food.splice(jmin, 1);
        }
    }
}


create();
var idupdate = setInterval(update,1);
var idspawnfood = setInterval(spawnfood,5000);
document.addEventListener("visibilitychange", function() {
    if (document.hidden){
        clearInterval(idupdate);
        clearInterval(idspawnfood);
    }
    else 
    {
        idupdate = setInterval(update,1);
        idspawnfood = setInterval(spawnfood,5000);
    }
});

/// MENIU
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
    closeNav();
    document.getElementById("myNav2").style.width = "100%";
}

function closeNav2() {
    document.getElementById("myNav2").style.width = "0%";
    openNav();
}

function openNav3() {
    closeNav();
    document.getElementById("myNav3").style.width = "100%";
}

function closeNav3() {
    document.getElementById("myNav3").style.width = "0%";
    openNav();
}
/// Setari

function DarkMode() {
    document.body.style.backgroundColor = '#0B0B45';
    document.body.style.color = 'whitesmoke';
}
function LightMode() {
    document.body.style.backgroundColor = '#add8e6';
    document.body.style.color = 'black';
}