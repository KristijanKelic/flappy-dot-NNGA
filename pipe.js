//konstruktor za cijev
function Pipe(color) {
    this.goreY = random(100,height/2);
    this.doleY = height - this.goreY - 150;
    this.x = width;
    this.color = color;
    this.index = 0;
}


Pipe.prototype.update = function() {
    this.x -= 4.2;
};

//metoda za crtanje cijevi
Pipe.prototype.draw = function() {
    fill(this.color);
    //rect(x-cor, y-cor, sirina, visina)
    //cijevi gornje
    rect(this.x, 0, 40, this.goreY);
    //cijevi donje
    rect(this.x, height-this.doleY, 40, this.doleY);
};