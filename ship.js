//
class Ship{
    constructor(hp){
        this.hp = hp;
        this.sunk = false;
        this.hitsTaken = 0;
    }

    hits(){
        this.hitsTaken += 1
        this.sunk = this.isSunk()
    }

    isSunk(){
        return this.hitsTaken === this.hp
    }
}