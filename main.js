import Player from "./player.js"
import Board from './board.js'
import Ship from './ship.js'

let board1 = document.getElementById("player1boardBS")
let board2 = document.getElementById("player2boardBS")

function createGrid(size){
    board1.innerHTML = ""
    board2.innerHTML = ""

    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
        const cell = document.createElement('div')
        cell.dataset.x = i;
        cell.dataset.y = j;
        cell.dataset.player = 0
        cell.addEventListener('click', () => console.log(cell))
        board1.appendChild(cell);
    }}

    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
        const cell = document.createElement('div')
        cell.dataset.x = i;
        cell.dataset.y = j;
        cell.dataset.player = 1
        cell.addEventListener('click', () => console.log(cell))
        board2.appendChild(cell);
    }}
}

createGrid()