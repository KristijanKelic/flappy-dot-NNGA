//globalne varijable
var birds = [];
var deadBirds = [];
var pipes = [];
var GA = new GeneticAlgorithm(50, 18);

var STATE ;
var STATE_INIT = 1;
var STATE_START = 2;
var STATE_PLAY = 3;
var STATE_GAMEOVER = 4;
var POCETNA_UDALJENOST;
var distance = 0;
var bodovi = 0;
STATE = STATE_INIT;


//metoda koja postavlja okolinu i likove
function setup() {
    createCanvas(window.innerWidth - 200, window.innerHeight - 200);
    POCETNA_UDALJENOST = width - 100;

    for (var i = 0; i < GA.broj_ptica; i++) {
        birds.push(new Bird(i));
    }
    pipes.push(new Pipe(color(random(254), random(254), random(254))));
    cijevIspred = pipes[0];
    GA.reset();
    GA.stvoriPopulaciju();
}

//metoda koja crta okolinu i likove
function draw() {
    background(220,222,224);
    if (frameCount % 100 === 0) {
        pipes.push(new Pipe(color(random(254), random(254), random(254))));
    }

    for (var i = 0; i < pipes.length; i++) {
        pipes[i].update();
        pipes[i].draw();
        if (pipes[i].x < -40) {
            pipes.shift();
        }
    }

    for (var b = 0; b < birds.length; b++) {
        cijevIspred = pipes[0];
        birds[b].update();
        birds[b].draw();
        GA.aktivirajMozak(birds[b], cijevIspred);
        birds[b].trenuta_spremnost = cijevIspred.x - birds[b].x;
        birds[b].trenutni_bodovi = bodovi;
        if (birds[b].x > cijevIspred.x + 15) {        
            pipes.shift();
            cijevIspred = pipes[0];
            bodovi += 1;
            birds[b].trenuta_spremnost = cijevIspred.x - birds[b].x;
            birds[b].trenutni_bodovi = bodovi;
        }
        if(birds[b].y < 0 || birds[b].y > height || birds[b].sudar(cijevIspred)){
            GA.populacija[birds[b].index].spremnost = birds[b].trenuta_spremnost;
            GA.populacija[birds[b].index].bodovi = birds[b].trenutni_bodovi;
            deadBirds.push(birds[b]);
            birds.splice(b, 1);        
        }
        if(birds.length == 0){
            GA.evolucija();
            GA.iteracija += 1;
            bodovi = 0;
            distance = 0;
            pipes.splice(0, pipes.length-1);
            for(var j = 0; j < deadBirds.length; j++){
                birds.push(new Bird(j));
                birds[j].prethodna_spremnost = deadBirds[j].trenuta_spremnost;
                birds[j].prethodna_bodovi = deadBirds[j].trenutni_bodovi;
            }
            deadBirds.splice(0, deadBirds.length);
        }
    }
}


