export default class Ship{
    static id = 0;

    constructor(hp){
        this.hp = hp;
        this.sunk = false;
        this.hitsTaken = 0;
        this.id = Ship.id++
    }

    hits(){
        console.log("hits")
        this.hitsTaken += 1
        this.sunk = this.isSunk()
        return this.sunk
    }

    isSunk(){
        return this.hitsTaken === this.hp
    }
}