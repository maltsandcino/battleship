class Ship{
    static id = 0;

    constructor(hp){
        this.hp = hp;
        this.sunk = false;
        this.hitsTaken = 0;
        this.id = Ship.id++
    }

    hits(){
        this.hitsTaken += 1
        this.sunk = this.isSunk()
    }

    isSunk(){
        return this.hitsTaken === this.hp
    }
}

module.exports = Ship;