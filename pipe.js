//konstruktor za cijev
function Pipe(x, y, color) {
    this.x = width;
    this.y = y;
    this.color = color;
}


Pipe.prototype.update = function() {
    this.x -= 3.5;
};

//metoda za crtanje cijevi
Pipe.prototype.draw = function() {
    fill(this.color);
    strokeWeight(0);
    //rect(x-cor, y-cor, sirina, visina)
    //cijevi gornje
    rect(this.x, 0, 60, this.y - 65);
    //cijevi donje
    rect(this.x, this.y + 65, 60, height - this.y - 65);
};