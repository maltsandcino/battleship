import Player from "./player.js"
import Board from './board.js'
import Ship from './ship.js'
let currentBoatID = null;
let previouslyHighlightedCells = [];
let turn = 0;
//Todo: Make logic for turning ships 90 degrees.


class Control{
 
    gameType(){
        
        let p = document.querySelector(".person");
        let c = document.querySelector(".computer");
        p.addEventListener("click", () => this.starthumangame());
        c.addEventListener("click", () => this.startcomputergame());
    }


    starthumangame(){
        
        let buttons = document.querySelector(".buttoncontainerBS");
        // buttons.style.display = "none"
        let instructions = document.querySelector(".starttext")
        instructions.innerHTML = "Player 1: Please place boats onto the grid on the left."
        let displayarea = document.querySelector(".boatholder")       
        // Add and append images player 1
        this.createGrid()
        this.appendimages1(displayarea)
        this.dragBoats()

        buttons.style.gridTemplateColumns = "1fr"
        buttons.innerText = "Ships can be dragged and placed on the grid. Make sure you are happy with your choice before letting go."  
        
    }

    startcomputergame(){
        
        let buttons = document.querySelector(".buttoncontainerBS");
        console.log("buttons")
        buttons.style.display = "none"
    }


    createGrid(size){
        let board1 = document.getElementById("player1boardBS")
        let board2 = document.getElementById("player2boardBS")

        board1.removeEventListener("click", this.attack);
        board1.addEventListener("click", this.attack);
        board2.removeEventListener("click", this.attack);
        board2.addEventListener("click", this.attack);

        board1.innerHTML = ""
        board2.innerHTML = ""

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

    attack(){
        console.log(event.target.id)
    }

    appendimages1(div){
        document.getElementById("player2boardBS").style.display = "none"
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
        instructions.innerHTML = "Player 2: Please place boats onto the grid on the left."
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

            //
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
            for (let i = 0; i < length; i++) {
                if (currentCell) {
                    currentCell.dataset.occupied = true;
                    currentCell.innerHTML = `Boat ${boatName}`
                    currentCell = currentCell.nextElementSibling;
                }
            }
        const cell = event.target; // The cell where the boat is dropped
        // remove image
        boat.remove()

        if (document.getElementsByTagName("img").length == 0 && turn == 0){
            turn = 1
            this.appendimages2(document.querySelector(".boatholder"))
            this.dragBoats()
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let control = new Control();
    control.gameType(); // Now the DOM is ready
});
