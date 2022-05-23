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

    bb.race=Math.floor(Math.random() * 3);
    bb.hunger = 25;
    bb.velx = 0;
    bb.vely = 0;
    bb.pozx = NaN;
    bb.pozy = NaN;

    if(bb.race==0)bb.vision=200;  
    if(bb.race==1)bb.vision=200;
    if(bb.race==2)bb.vision=200;

    bb.getball=document.createElement("div");
    bb.getball.style.width = 50 + 'px';
    bb.getball.style.height = 50 + 'px';
    bb.getball.style.borderRadius = '50%';
    bb.getball.style.position = 'absolute';
    bb.getball.style.border = 1 + 'px';
    bb.getball.style.border = 'solid';

    if(bb.race==0)
      {
        bb.getball.style.background ='#a129d6';
        bb.getball.style.borderColor = '#520475';
      }
    if(bb.race==1)
    {
      bb.getball.style.background ='#d6a129';
      bb.getball.style.borderColor = '#805a05';
    }
    if(bb.race==2)
    {
      bb.getball.style.background ='#29d6a1';
      bb.getball.style.borderColor = '#048059';
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

function eat(ball,food)
{
    food.getfood.remove();
    ball.hunger+=5;
}

function losehunger(ball)
{
    ball.hunger-=0.01;
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

function moveball(ball)
{
    ball.pozx+=ball.velx;
    ball.pozy+=ball.vely;
    ball.getball.style.left = ball.pozx+'px';
    ball.getball.style.top = ball.pozy+'px';
}

function movesun(sun)
{
    sun.pozx=window.innerWidth/2;
    sun.pozy=window.innerHeight/2;
    sun.getsun.style.left = window.innerWidth/2 + 'px';
    sun.getsun.style.top = window.innerHeight/2 + 'px';
}

function create()
{
    sunz.push(makesun());
}

function update()
{
    /// eating sun
    for(let i=0;i<ballz.length;i++)
    {
        for(let j=0;j<sunz.length;j++)
        {
            if(ballz[i].pozx>sunz[j].pozx && ballz[i].pozy>sunz[j].pozy && ballz[i].pozx<(sunz[j].pozx+sunz[j].size) && ballz[i].pozy<(sunz[j].pozy+sunz[j].size))
            {
                ballz[i].hunger+=1;
            }
        }
    }
    ///tp out of bounds
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
        moveball(ballz[i]);
    }
    for(let i=0;i<sunz.length;i++)
    {
        movesun(sunz[i]);
    }
}


create();
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

function openNav1() {
    document.getElementById("myNav1").style.width = "25%";
}
  
function closeNav1() {
    document.getElementById("myNav1").style.width = "0%";
}