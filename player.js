import Board from './board.js'
import Ship from './ship.js'

export default class Player{

    constructor(playerType="computer", playerName="computer"){
        this.playerType = playerType;
        this.playerName = playerName;
        this.gameBoard = new Board();

    }
}
