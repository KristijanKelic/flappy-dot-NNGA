//globalne varijable
var birds = [];
var deadBirds = [];
var pipes = [];
var GA = new GeneticAlgorithm(20, 8);

var bodovi = 0;
var pass = true;

//metoda koja postavlja okolinu i likove
function setup() {
    createCanvas(window.innerWidth-150, window.innerHeight - 200);

    for (var i = 0; i < GA.broj_ptica; i++) {
        birds.push(new Bird(i));
    }
    pipes.push(new Pipe(width, random(height * 0.3, height * 0.7), color('green')));
    cijevIspred = pipes[0];
    GA.reset();
    GA.stvoriPopulaciju();
}

//metoda koja crta okolinu i likove
function draw() {
    background('nightsky');
    

    if (frameCount % 100 === 0) {
        pipes.push(new Pipe(width, random(height * 0.3, height * 0.7), color('green')));
    }

    for (var i = 0; i < pipes.length; i++) {
        pipes[i].update();
        pipes[i].draw();
        if (pipes[i].x < -40) {
            pipes.shift();
            bodovi += 1;
            cijevIspred = pipes[0];
        }
    }

    for (var b = 0; b < birds.length; b++) {
        cijevIspred = pipes[0];
        pass = true;
        birds[b].update();
        birds[b].draw();
        GA.aktivirajMozak(birds[b], cijevIspred);
        birds[b].trenutna_spremnost += 4;
        birds[b].trenutni_bodovi = bodovi;
      
        if (birds[b].x > cijevIspred.x + 60 && pass == true) {
            cijevIspred = pipes[1];
            pass = false;         
        }
        if(birds[b].y - 10 < 0 || birds[b].y + 10 > height || birds[b].sudar(cijevIspred)){
            GA.populacija[birds[b].index].spremnost = birds[b].trenutna_spremnost;
            GA.populacija[birds[b].index].bodovi = birds[b].trenutni_bodovi;
            deadBirds.push(birds[b]);
            birds.splice(b, 1);        
        }
        if(birds.length == 0){
            GA.evolucija();
            GA.iteracija += 1;
            bodovi = 0;
            pipes.splice(0, pipes.length -1);
            deadBirds.sort(function(a, b){
                return a.index-b.index;
            });
            for(var j = 0; j < deadBirds.length; j++){
                birds.push(new Bird(j));
                birds[j].prethodna_spremnost = deadBirds[j].trenutna_spremnost;
                birds[j].prethodna_bodovi = deadBirds[j].trenutni_bodovi;
            }
            deadBirds = [];
        }      
    }
    textSize(50);
    text(bodovi, width/2, height - 50);
    textSize(15);
    text("žive: " + birds.length, 20, height - 80);
    text("najdulji put: " + GA.najbolja_spremnost, 20, height - 60);
    text("najbolji bodovi: " + GA.najbolji_bodovi, 20, height - 40);
    text("GENERACIJA: " + GA.iteracija, 20, height - 20);
}


