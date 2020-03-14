
// player construction function
const Player = function(
    name,
    health,
    itemClass,
    player,
    weapon,
    power,
    activePath
  ) {
    this.name = name;
    this.health = health;
    this.itemClass = itemClass;
    this.player = player;
    this.weapon = weapon;
    this.power = power;
    this.activePath = activePath;
  
    //add players to the map
    this.add = function() {
      addComponents(this.itemClass, this.player);
    };
    // set information about player on the boards;
    this.setData = function() {
      $(".name-" + this.player).text(this.name);
      $("#life-" + this.player).text(this.health);
      $('<img src="images/weapon-1.png">').appendTo(".weps-" + this.player);
      $(".weapons-" + this.player).text(this.power);
    };
      //players fight logic
      this.attack = function(whichPlayer) {
        if(playerDefend == 1) {
            whichPlayer.health -= (this.power/2);
            playerDefend = 0;

            } else {
                whichPlayer.health -= this.power;
            }
                $('#life-' + whichPlayer.player).text(whichPlayer.health);
                if(whichPlayer.health <= 0) {
                    gameOverBoard();
            }
    }
    // check who is the winner and who lost the game and display the information on the Game Over Board 
    this.winner = function(whichPlayer) {
        if(whichPlayer.health <= 0) {
            $('#winner').text(this.name);
            $('#looser').text(whichPlayer.name);
        } else if (this.health <= 0) {
            $('#winner').text(whichPlayer.name);
            $('#looser').text(this.name);

        }
    }  
  };
  
  // create human palyer 
  let player1 = new Player(
    "Human",
    100,
    "player1",
    1,
    "wp-1",
    15,
    "images/path-1.jpg"
  );
  // create zombie palyer 
  let player2 = new Player(
    "Zombie",
    100,
    "player2",
    2,
    "wp-1",
    15,
    "images/path-2.png"
  );
  

// check which player is active:
function whoIsActive() {
    if (player1Active) {
        activePlayer = 2;
        notActivePlayer = 1;
        setActivePlayer(player2, player1, powerDiv2);
        setActiveBoard(notActivePlayer, activePlayer);
        displayMessageOnBoard(activePlayer);  
    } else {
        activePlayer = 1; 
        notActivePlayer = 2;
        setActivePlayer(player1, player2, powerDiv1);
        setActiveBoard(notActivePlayer, activePlayer,);
        displayMessageOnBoard(activePlayer);
    }

}


//set attributes to the acctive player to use them by replacing weapon
function setActivePlayer(Active, notActive, activePowerDiv) {
    playerActive = Active;
    playerNotActive = notActive; 
    activePlayerPowerDiv = activePowerDiv;      
}
