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
};

//metoda koja crta kuglicu(pticu)
Bird.prototype.draw = function() {
    strokeWeight(3);
    fill(this.boja);
    ellipse(this.x, this.y, 25, 25);
};

//metoda za pokret ptice
Bird.prototype.clap = function(f) {
    this.brzina = 0;
    this.brzina += f;
};

//detekcija udara
Bird.prototype.sudar = function(pipe) {
    if(this.y <= pipe.y - 65 || this.y >= pipe.y + 65){ 
        if (this.x + 10 > pipe.x && this.x + 10 <= pipe.x + 60) return true;
    }
};