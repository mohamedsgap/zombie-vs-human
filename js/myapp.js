
// declare variables for game's components
const mapSize = 99;
const obstacles = 10;
let possibleMoves = 3;
let activePlayer = 1;
let turn = 0;
let tiles = [];
let playerActive;
let player1Active = true;
let player2Active = false;
let move = true;
let attacked = false;
let hover = false;
let playerDefend = null;
const turnMessage = [
"Let's show us your steps!",
"Be sure that you are strong enough before starting fight!",
"Is your weapon good enough?, start the fight!",
]
const noTurnMessage = "It's not your turn! please, wait";
const startButton = $("#start");
const mapContainer = $("#board-game");
const startContainer = $(".game-intro");
const playerContainerDiv = $(".player-box");
const powerDiv1 = $(".weps-1");
const powerDiv2 = $(".weps-2");
const body = $("body");
const gameOverContainer =$('#gameOver');
const attackBtn1 = $('.btn-attack-1');
const attackBtn2 = $('.btn-attack-2');
const defendBtn1 = $('.btn-defend-1');
const defendBtn2 = $('.btn-defend-2');

// when the game start:

// show player boxes area
playerContainerDiv.show();

// show game board
mapContainer.show();

// make the player1 (human) is active
$('#player-1').addClass('active-board');

// hide attack & defend button
attackBtn1.hide();
attackBtn2.hide(); 
defendBtn1.hide();
defendBtn2.hide();