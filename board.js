//
class Board{
    constructor(){
        //We can list co-ordinates and the associated ship in the placements.
        //We shouldn't have to actually make a grid in the object.
        //We will have several entries here, if a key isn't found it's a miss.
        //If a key is found, then it tells us which ship. {1, 2}: ship1
        this.placements = {}
    }

    receiveAttack(x, y){
        let key = [x, y].toString()
        if (this.placements.has(key)){
            completeAttack(this.placements[key])
        }

    }

    completeAttack(ship){
        

    }
}

module.exports = Ship;