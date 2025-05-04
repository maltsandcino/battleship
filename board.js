import Ship from './ship.js';


export default class Board{
    static sizes =  [4, 3, 3, 2]

    constructor(){
        //We can list co-ordinates and the associated ship in the placements.
        //We shouldn't have to actually make a grid in the object.
        //We will have several entries here, if a key isn't found it's a miss.
        //If a key is found, then it tells us which ship. {1, 2}: ship1
        this.placements = new Map()
        this.ships = {}
        //keep track of hit ships
        this.hits = {}
        for (let i = 0; i <= 3; i++){
            let ship = new Ship(Board.sizes[i])
            this.ships[ship.id] = ship
        }
        //Keep track of shots -> They can be successful or unsuccessful
        this.guesses = {}
        this.ships_remaining = Object.keys(this.ships).length
    }

    receiveAttack(x, y){
        // Check to see if there is a boat at this space, and if there is, we have to carry out the hit on the boat
        let key = [x, y].toString();
        let hit = false;
        let sunken = false;
        if (this.placements.has(key)){
            sunken = this.completeAttack(this.placements.get(key))
            if (sunken == true){
                // Probably we can do a check on the gameboards after each round
                this.ships_remaining -= 1
            }
            hit = true;
        }
        // Return some indication of whether this attack was a hit and whether the boat is sunken
        return [hit, sunken, this.ships_remaining]

    }

    // This method seems a little redundant
    completeAttack(ship){
        console.log("complete attack")
        console.log(ship)
        console.log(this.ships)
        console.log(Object.keys(this.ships));
        console.log(typeof ship)
        let shipo = this.ships[String(ship)]
        let sunken = shipo.hits()
        return sunken
    }

    computerAttack() {
        // If no hits have been recorded, perform a random attack
        if (Object.keys(this.hits).length === 0) {
            let coordString;
            let x, y;
    
            // Generate random coordinates until we find one that hasn't been guessed
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                coordString = [x, y].toString();
            } while (this.guesses.hasOwnProperty(coordString));
    
            // Mark the coordinate as guessed
            this.guesses[coordString] = null;
    
            // Check if the attack hits a ship
            let hit = false;
            let sunken = false;
            if (this.placements.has(coordString)) {
                sunken = this.completeAttack(this.placements.get(coordString));
                if (sunken) {
                    this.ships_remaining -= 1;
                    delete this.hits[this.placements.get(coordString)];
                }
                hit = true;
                this.hits[this.placements.get(coordString)] = [x, y]; // Store as an array
            }
    
            // Return the result of the attack
            return [hit, x, y, sunken, this.ships_remaining];
        } else {
            // If there are recorded hits, target adjacent cells
            const firstKey = Object.keys(this.hits)[0];
            let [x, l, r] = this.hits[firstKey]; // Retrieve the hit coordinates
    
            // Randomly decide whether to target left or right
            let rchoice = Math.floor(Math.random() * 2);
            let z;
    
            if (rchoice === 0) {
                // Target left
                if (l - 1 >= 0) {
                    z = l - 1;
                    if (this.guesses.hasOwnProperty([x, z].toString())) {
                        z = r + 1; // Switch to right if left has already been guessed
                    }
                }
            } else {
                // Target right
                if (r + 1 < 10) {
                    z = r + 1;
                    if (this.guesses.hasOwnProperty([x, z].toString())) {
                        z = l - 1; // Switch to left if right has already been guessed
                    }
                }
            }
    
            // Mark the coordinate as guessed
            this.guesses[[x, z].toString()] = null;
    
            // Check if the attack hits a ship
            let hit = false;
            let sunken = false;
            if (this.placements.has([x, z].toString())) {
                sunken = this.completeAttack(this.placements.get([x, z].toString()));
                if (sunken) {
                    this.ships_remaining -= 1;
                    delete this.hits[this.placements.get([x, z].toString())];
                    hit = true;
                }
                else{
                hit = true;
                this.hits[this.placements.get([x, z].toString())] = [x, l, r]; // Store as an array
                }
            }
    
            // Return the result of the attack
            return [hit, x, z, sunken, this.ships_remaining];
        }
    }

    placeComputer(){
        for(let ship of Object.values(this.ships)){
            //Get ship length
            //Get limitations of board
            //Random X and Y within limits (y can be anything between 0 and 9)
            let max = 10 - ship.hp
            let placed = false
            let coords = [];
            // Check to see if the ship will fit with no overlaps:
            while (!placed) {
                let y = Math.floor(Math.random() * (max + 1));
                let x = Math.floor(Math.random() * 10);
               
            
                for (let i = y; i < y + ship.hp; i++) {
                    let coordString = [x, i].toString(); 
            
                    if (this.placements.has(coordString)) {
                        coords = []; 
                        break;      
                    }
                    
                    coords.push(coordString);
                }
            
                if (coords.length > 0) {
                    placed = true;
                }
            }
            coords.forEach(spot => this.placements.set(spot, ship.id));
            }
            console.table(this.placements)
        }

        
    
}


