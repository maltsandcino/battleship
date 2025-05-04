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
            console.log("Random Choice")
            let coordString;
            let x, y;
    
            // Generate random coordinates until we find one that hasn't been guessed
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                coordString = [x, y].toString();
            } while (this.guesses.hasOwnProperty(coordString));
    
           
            // Check if the attack hits a ship
            let hit = false;
            let sunken = false;
            if (this.placements.has(coordString)) {
                sunken = this.completeAttack(this.placements.get(coordString));
                if (sunken) {
                    this.ships_remaining -= 1;
                    // If this has somehow sunk it, which should not be the case unless a ship is only 1 space, which could be coded later.
                    delete this.hits[this.placements.get(coordString)];
                }
                hit = true;

                this.hits[this.placements.get(coordString)] = [x, y, y]; // Store the X (the row) and the start and end point, in this case, y y
            
            }
            // Update the guesses with the result
            this.guesses[coordString] = hit;
    
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
                [x, z] = this.pickLeft(x, l, r)
            } else {
                [x, z] = this.pickRight(x, l, r)
            }
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
                this.hits[this.placements.get([x, z].toString())] = [x, Math.min(l, z), Math.max(r, z)];
                }
            }
                // Mark the coordinate as guessed
                this.guesses[[x, z].toString()] = hit;
    
            // Return the result of the attack
            return [hit, x, z, sunken, this.ships_remaining];
        }
    }

    pickLeft(x, l, r){
        let z
        if (l - 1 >= 0) {
            z = l - 1;
            while(this.guesses.hasOwnProperty([x, z].toString())) {
                if (this.guesses[[x, z].toString()] == true){
                z = z - 1}
                else if (this.guesses[[x, z].toString()] == false || z === -1){
                    if (!this.guesses.hasOwnProperty([x, r + 1].toString())) {
                        return this.pickRight(x, l, r);
                    }
                    return this.computerAttackFallback();
                }
            }
        }
        else{
            return this.pickRight(x, l, r)
        }
        return [x, z]
    }

    pickRight(x, l, r){
        let z
        if (r + 1 < 10) {
            z = r + 1;
            while(this.guesses.hasOwnProperty([x, z].toString())) {
                if (this.guesses[[x, z].toString()] == true){
                z = z + 1}
                else if (this.guesses[[x, z].toString()] == false || z === 10){
                    if (!this.guesses.hasOwnProperty([x, l - 1].toString())) {
                        return this.pickLeft(x, l, r);
                    }
                    return this.computerAttackFallback();
                }
            }
        }
        else{
            return this.pickLeft(x, l, r)
        }
        return [x, z]
    }

    computerAttackFallback(){
        console.log("Random Choice")
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            coordString = [x, y].toString();
        } while (this.guesses.hasOwnProperty(coordString));

       
        // Check if the attack hits a ship
        let hit = false;
        let sunken = false;
        if (this.placements.has(coordString)) {
            sunken = this.completeAttack(this.placements.get(coordString));
            if (sunken) {
                this.ships_remaining -= 1;
                // If this has somehow sunk it, which should not be the case unless a ship is only 1 space, which could be coded later.
                delete this.hits[this.placements.get(coordString)];
            }
            hit = true;

            this.hits[this.placements.get(coordString)] = [x, y, y]; // Store the X (the row) and the start and end point, in this case, y y
        
        }
        // Update the guesses with the result
        this.guesses[coordString] = hit;

        // Return the result of the attack
        return [hit, x, y, sunken, this.ships_remaining];

    };

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


