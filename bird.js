//konstruktor za pticu
function Bird(index) {
    this.boja = color(random(254), random(254), random(254));
    this.index = index;

    this.ziva = true;

    this.brzina = 0;
    this.y = random(50, 500);
    this.x = 50;

    this.trenutna_spremnost = 0;
    this.trenutni_bodovi = 0;
    this.prethodna_spremnost = 0;
    this.prethodni_bodovi = 0;
}
 
//metoda koja regulira padanje
Bird.prototype.update = function() {
    //povećavamo brzinu padanja ptice, i za taj iznos povećavamo y da ispada ko da ptica pada
    this.brzina += 0.4;
    this.y += this.brzina;

    //ograničimo da ne može izvan granica svijeta
    if(this.y + 16 > height) {
        this.ziva = false;
    }

    if(this.y -16 < 0) {
        this.ziva = false;
    }
};

//metoda koja crta kuglicu(pticu)
Bird.prototype.draw = function() {
    strokeWeight(3);
    fill(this.boja);
    ellipse(this.x, this.y, 32, 32);
};

//metoda za pokret ptice
Bird.prototype.clap = function(f) {
    this.brzina = 0;
    this.brzina += f;
};

//detekcija udara
Bird.prototype.sudar = function(pipe) {
    if(this.y <= pipe.goreY || this.y >= height-pipe.doleY) {
        if(this.x > pipe.x && this.x< pipe.x + 40){
            return true;
        }
    }
};

Bird.prototype.restart = function(iteracija) {
    this.prethodna_spremnost = (iteracija == 1) ? 0 : this.trenutna_spremnost;
    this.trenutna_spremnost = 0;

    this.prethodni_bodovi = (iteracija == 1) ? 0 : this.trenutni_bodovi;
    this.trenutni_bodovi = 0;
};