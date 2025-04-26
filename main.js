import Player from "./player.js"
import Board from './board.js'
import Ship from './ship.js'
let currentBoatID = null;
let previouslyHighlightedCells = [];
let turn = 0;
let gamestyle = "human"

//Todo: Make logic for turning ships 90 degrees.


class Control{
    // Start by Creating two user boards. This is how we will track the data.
    constructor(){
        this.board0 = new Board()
        this.board1 = new Board()

    }
    // Choose Game type
    gameType(){
        let p = document.querySelector(".person");
        let c = document.querySelector(".computer");
        p.addEventListener("click", () => this.getPlayerNames("human"));
        c.addEventListener("click", () => this.startcomputergame("computer"));
    }

    // Starting a human based game
    // MAybe change the input and label divs to make them closer together.
    getPlayerNames(type){
        console.log(type)
        let buttons = document.querySelector(".buttoncontainerBS");
        buttons.style.gridTemplateColumns = "1fr 1fr 1fr 1fr"
        let displayarea = document.querySelector(".boatholder")   
        displayarea.innerHTML = `<button id="namesbutton">Ready? Let's Start!</button>`
        
        buttons.innerHTML = `<label for="playerName1">Player 1: </label><input type="text" id="playerName1" name="playerName1"><label for="playerName2">Player 2: </label><input type="text" id="playerName2" name="playerName2">`
        let instructions = document.querySelector(".starttext")
        instructions.innerHTML = "Choose your Usernames"
        document.getElementById("namesbutton").addEventListener("click", () => {
            this.Player1 = document.getElementById("playerName1").value
            this.Player2 = document.getElementById("playerName2").value

            if (this.Player1 === ""){
                this.Player1 = "Player 1"
            }
            if (this.Player2 == "" && type == "computer" ){
                this.Player2 = "Computer"
            }
            if (this.Player2 === ""){
                this.Player2 = "Player 2"
            }
            if (type === "human"){
                this.starthumangame()
            }
            else{
                this.startcomputergame()
            }
        })

    }
    starthumangame(){
        console.log(this.Player1)
        console.log(this.Player2)
        
        let buttons = document.querySelector(".buttoncontainerBS");
        // buttons.style.display = "none"
        let instructions = document.querySelector(".starttext")
        instructions.innerHTML = `${this.Player1}: Please place boats onto the grid`
        let displayarea = document.querySelector(".boatholder")
        displayarea.innerHTML = ""       
        // Add and append images player 1
        this.createGrid()
        this.appendimages1(displayarea)
        this.dragBoats()

        buttons.style.gridTemplateColumns = "1fr"
        buttons.innerText = "Ships can be dragged and placed on the grid. Make sure you are happy with your choice before letting go."  
        
    }
    // Starting a computer based game. needs to be implemented still.
    startcomputergame(){
        
        let buttons = document.querySelector(".buttoncontainerBS");
        console.log("buttons")
        buttons.style.display = "none"
    }

    // Create a DOM grid for players.
    createGrid(size){
        let board1 = document.getElementById("player1boardBS")
        let board2 = document.getElementById("player2boardBS")
        let oppboard1 = document.getElementById("opponentBoard1")
        let oppboard2 = document.getElementById("opponentBoard2")

        oppboard1.removeEventListener("click", this.attack);
        oppboard1.addEventListener("click", this.attack);
        oppboard2.removeEventListener("click", this.attack);
        oppboard2.addEventListener("click", this.attack);

        oppboard1.innerHTML = ""
        oppboard2.innerHTML = ""

        board1.innerHTML = ""
        board2.innerHTML = ""

    // Create opposing view boards. We see these when we are viewing a split screen. In the case of computer games, this will always be visible.
        for (let i = 0; i < 10; i++){
            for (let j = 0; j < 10; j++){
            const cell = document.createElement('div')
            cell.classList.add("cell")
            cell.classList.add("oppCell")
            cell.dataset.x = i;
            cell.dataset.y = j;
            cell.id = `opp${i}${j}1`
            cell.dataset.player = 2
            oppboard1.appendChild(cell);
        }}
        for (let i = 0; i < 10; i++){
            for (let j = 0; j < 10; j++){
            const cell = document.createElement('div')
            cell.classList.add("cell")
            cell.classList.add("oppCell")
            cell.dataset.x = i;
            cell.dataset.y = j;
            cell.id = `opp${i}${j}2`
            cell.dataset.player = 1
            oppboard2.appendChild(cell);
        }}

    // Add cells and place event listeners and other details on the cells.
        for (let i = 0; i < 10; i++){
            for (let j = 0; j < 10; j++){
            const cell = document.createElement('div')
            cell.classList.add("cell")
            cell.id = `${i}${j}0`
            cell.dataset.x = i;
            cell.dataset.y = j;
            cell.dataset.player = 0
            cell.dataset.occupied = false
            board1.addEventListener("dragleave", () => {
                previouslyHighlightedCells.forEach(cell => {
                    if(cell.dataset.occupied !== "true"){
                    cell.style.backgroundColor = "";}
                    if(cell.dataset.occupied == "true"){
                        cell.style.backgroundColor = "tan"
                    }
                });})
            cell.addEventListener("dragover", (event) => this.dragoverHandler(event));
            cell.addEventListener("dragleave", (event) => {cell.style.backgroundColor = "";})
            cell.addEventListener("drop", (event) => this.dropHandler(event));
            
            board1.appendChild(cell);
        }}

        for (let i = 0; i < 10; i++){
            for (let j = 0; j < 10; j++){
            const cell = document.createElement('div')
            cell.classList.add("cell")
            cell.dataset.x = i;
            cell.dataset.y = j;
            cell.id = `${i}${j}1`
            cell.dataset.player = 1
            cell.dataset.occupied = false
            board2.addEventListener("dragleave", () => {
                previouslyHighlightedCells.forEach(cell => {
                    if(cell.dataset.occupied !== "true"){
                    cell.style.backgroundColor = "";}
                    if(cell.dataset.occupied == "true"){
                        cell.style.backgroundColor = "tan"
                    }
                });})
            cell.addEventListener("dragover", (event) => this.dragoverHandler(event));
            cell.addEventListener("dragleave", (event) => {cell.style.backgroundColor = "";})
            cell.addEventListener("drop", (event) => this.dropHandler(event));
            board2.appendChild(cell);
        }}
    }
// Attack event, this is a click.
    attack(){
        //If cell already clicked, we can't attack.
        console.log(event.target.id)
    }
// Add boat images. We want to do this once for player 1 and once for player 2. If there's a computer match, we will use a different method
    appendimages1(div){
        document.getElementById("player2boardBS").style.display = "none"
         document.getElementById("player1boardBS").style.display = "grid"
        const img0 = document.createElement("img");
        img0.src = "assets/5.png"; 
        img0.alt = "longboatislong"
        img0.id = "00-boat"
        img0.dataset.length = 5
        img0.draggable = true
        const img1 = document.createElement("img");
        img1.src = "assets/4.png"; 
        img1.alt = "mediumboat"
        img1.id = "01-boat"
        img1.dataset.length = 4
        img1.draggable = true
        const img2 = document.createElement("img");
        img2.src = "assets/4.png"; 
        img2.alt = "mediumboat"
        img2.id = "02-boat"
        img2.dataset.length = 4
        img2.draggable = true
        const img3 = document.createElement("img");
        img3.src = "assets/3.png"; 
        img3.alt = "shotboat"
        img3.id = "03-boat"
        img3.dataset.length = 3
        img3.draggable = true
        const img4 = document.createElement("img");
        img4.src = "assets/3.png"; 
        img4.alt = "shortboat"
        img4.id = "04-boat"
        img4.dataset.length = 3
        img4.draggable = true
        div.appendChild(img0)
        div.appendChild(img1)
        div.appendChild(img2)
        div.appendChild(img3)
        div.appendChild(img4)
    }

    appendimages2(div){
        let instructions = document.querySelector(".starttext")
        instructions.innerHTML = `${this.Player2}: Please place boats onto the grid`
        document.getElementById("player2boardBS").style.display = "grid"
        document.getElementById("player1boardBS").style.display = "none"
        const img0 = document.createElement("img");
        img0.src = "assets/5.png"; 
        img0.alt = "longboatislong"
        img0.id = "10-boat"
        img0.dataset.length = 5
        img0.draggable = true
        const img1 = document.createElement("img");
        img1.src = "assets/4.png"; 
        img1.alt = "mediumboat"
        img1.id = "11-boat"
        img1.dataset.length = 4
        img1.draggable = true
        const img2 = document.createElement("img");
        img2.src = "assets/4.png"; 
        img2.alt = "mediumboat"
        img2.id = "12-boat"
        img2.dataset.length = 4
        img2.draggable = true
        const img3 = document.createElement("img");
        img3.src = "assets/3.png"; 
        img3.alt = "shotboat"
        img3.id = "13-boat"
        img3.dataset.length = 3
        img3.draggable = true
        const img4 = document.createElement("img");
        img4.src = "assets/3.png"; 
        img4.alt = "shortboat"
        img4.id = "14-boat"
        img4.dataset.length = 3
        img4.draggable = true
        div.appendChild(img0)
        div.appendChild(img1)
        div.appendChild(img2)
        div.appendChild(img3)
        div.appendChild(img4)
    }
    // Making boats draggable
    dragBoats() {
        const boats = document.querySelectorAll("img[draggable='true']");
        boats.forEach(boat => {
            boat.addEventListener("dragstart", (event) => {
                currentBoatID = event.target.id
                event.dataTransfer.setDragImage(event.target, 0, 0); // Use the original image as the drag image

            });
        });
    }

    dragoverHandler(ev) {
        ev.preventDefault();
    
        previouslyHighlightedCells.forEach(cell => {
            if(cell.dataset.occupied !== "true"){
            cell.style.backgroundColor = "";}
            if(cell.dataset.occupied == "true"){
                cell.style.backgroundColor = "tan"
            }
        });

        previouslyHighlightedCells = []; // Empty the reference array
    
        const boat = document.getElementById(currentBoatID);
        const length = parseInt(boat.dataset.length);
        let right = parseInt(ev.target.dataset.y) + length - 1;
        let no_neighbours = true;

        if (right <= 9) {
          
            let cur = ev.target; // Start from the target cell
            let i = 0;
            
            while (cur && i < length - 1) {
                cur = cur.nextElementSibling;
                if (cur && cur.dataset.occupied === "true") {
                    no_neighbours = false; // Found a neighbor
                }
                i++;
            }
        }

        if (right <= 9 && no_neighbours == true) {
            let currentCell = ev.target;
            for (let i = 0; i < length; i++) {
                if (currentCell) {
                    currentCell.style.backgroundColor = "tan"; 
                    previouslyHighlightedCells.push(currentCell); 
                    currentCell = currentCell.nextElementSibling; 
                }
            }
        } else if (right > 9 || no_neighbours == false) {
            // Only apply the red background if the cell is not already highlighted
            {
                ev.target.style.backgroundColor = "red"; // Highlight invalid cell
                previouslyHighlightedCells.push(ev.target)
            }
        }
    }   
    
    dropHandler(event) {
        event.preventDefault();
        previouslyHighlightedCells = [];
        const boat = document.getElementById(currentBoatID)
        const boatName = currentBoatID[1]
        currentBoatID = null
        const length = parseInt(boat.dataset.length);
        let right = parseInt(event.target.dataset.y) + length - 1;

            
            let no_neighbours = true;

            if (right <= 9) {
                let cur = event.target; // Start from the target cell
                let i = 0;
                
                while (cur && i < length - 1) {
                    cur = cur.nextElementSibling;
                    if (cur && cur.dataset.occupied === "true") {
                        no_neighbours = false; // Found a neighbor
                    }
                    i++;
                }
            }
            console.log(no_neighbours)
            if (no_neighbours === false || right > 9){
                if (event.target.dataset.occupied === "true"){
                    event.target.style.backgroundColor = "tan"
                }
                else{
                    event.target.style.backgroundColor = ""
                }
                return
            }

            let currentCell = event.target;
            let player_board = null
            if(boat.id[0] == 0){
                player_board = this.board0
            }
            else{
                player_board = this.board1
            }
            console.log(boat.id)
            let boat_num = boat.id[1]

            for (let i = 0; i < length; i++) {
                if (currentCell) {
                    currentCell.dataset.occupied = true;
                    currentCell.classList.add("cellOccupied")
                    let key = JSON.stringify([currentCell.dataset.x, currentCell.dataset.y])
                    player_board.placements.set(key, boat_num)
                    currentCell.innerHTML = `Boat ${boatName}`
                    currentCell = currentCell.nextElementSibling;
                }
            }
        const cell = event.target; // The cell where the boat is dropped
        // remove image
        boat.remove()
    
        if (document.getElementsByTagName("img").length == 0 && turn == 0 && gamestyle == "human"){
            turn = 1
            this.appendimages2(document.querySelector(".boatholder"))
            this.dragBoats()
        }
        if (document.getElementsByTagName("img").length == 0 && turn == 1 && gamestyle == "human"){
            turn = 0
            setTimeout(() => this.switchScreen(0), 2000)
        }

    }
    //We pass the player number to the switch screen, and mod it by 2 to determine which player goes.
    switchScreen(player){
        document.getElementById("topthirdsBS").style.gridTemplateColumns = "1fr 1fr"
        document.getElementById("player2boardBS").style.display = "none"
        document.getElementById("player1boardBS").style.display = "none"
         document.getElementById("opponentBoard1").style.display = "none"
        document.getElementById("opponentBoard2").style.display = "none"
        let player_num = player % 2
        let message = ""
        if (player_num == 0){
            message = `Switching to ${this.Player1}'s view.`
            document.querySelector(".boatholder").innerHTML = '<button id="playerViewbutton">Show My View</button>'
            document.getElementById("playerViewbutton").addEventListener("click", () => this.showScreen(0))
        }
        else{
            message = `Switching to ${this.Player2}'s view`
            document.querySelector(".boatholder").innerHTML = '<button id="playerViewbutton">Show My View</button>'
            document.getElementById("playerViewbutton").addEventListener("click", () => this.showScreen(1))
        }
        document.querySelector(".starttext").innerHTML = message
        document.querySelector(".buttoncontainerBS").innerHTML = "When you're ready, click the button above to reveal your screen. Don't let your opponent see your screen."
        
    }

    showScreen(player){
        console.log(`showing player ${player}`)
        if (player == 0){
             document.getElementById("player1boardBS").style.display = "grid"
             document.getElementById("opponentBoard1").style.display = "grid"
        }
        else{
        document.getElementById("player2boardBS").style.display = "grid"        
        document.getElementById("opponentBoard2").style.display = "grid"
    }
        document.querySelector(".starttext").innerHTML = ""
        document.querySelector(".buttoncontainerBS").innerHTML = "Click on a space on the board on the right to launch your attack. Only click a space you haven't tried already."
        document.querySelector(".boatholder").innerHTML = '<button id="playerViewbutton">temp example</button>'
        document.getElementById("playerViewbutton").addEventListener("click", () => this.switchScreen(player + 1))
    }
}



document.addEventListener("DOMContentLoaded", () => {
    // Get user Info (like names)
    let control = new Control();
    control.gameType(); // Now the DOM is ready
});
