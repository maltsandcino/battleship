import Ship from './ship.js';


export default class Board{
    static sizes =  [2, 2, 3, 3, 5]

    constructor(){
        //We can list co-ordinates and the associated ship in the placements.
        //We shouldn't have to actually make a grid in the object.
        //We will have several entries here, if a key isn't found it's a miss.
        //If a key is found, then it tells us which ship. {1, 2}: ship1
        this.placements = new Map()
        this.ships = {}
        for (let i = 0; i <= 4; i++){
            let ship = new Ship(Board.sizes[i])
            this.ships[ship.id] = ship
        }
        //Keep track of shots -> They can be successful or unsuccessful
        this.guesses = {}
        this.ships_remaining = this.ships.length
    }

    receiveAttack(x, y){
        // Check to see if there is a boat at this space, and if there is, we have to carry out the hit on the boat
        let key = [x, y].toString()
        let hit = false;
        let sunken = false;
        if (this.placements.has(key)){
            sunken = this.completeAttack(this.placements[key])
            if (sunken == true){
                // Probably we can do a check on the gameboards after each round
                this.ships_remaining -= 1
            }
            hit = true;
        }
        // Return some indication of whether this attack was a hit and whether the boat is sunken
        return [hit, sunken]

    }

    // This method seems a little redundant
    completeAttack(ship){
        let sunken = this.ships[ship].hits()
        return sunken
    }
}


