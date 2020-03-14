
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


// add a class for a board of the active player to display current information about game flow
function setActiveBoard(notActivePlayer, activePlayer) {
    $('#player-' + notActivePlayer).removeClass('active-board');
    $('#player-' + activePlayer).addClass('active-board');
}


// display random message on active player's board
function displayMessageOnBoard(activePlayer) {  
    let text = turnMessage[Math.floor(Math.random()*turnMessage.length)];
    $('.turn-' + activePlayer).text(text);
    $('.turn-' + notActivePlayer).text(noTurnMessage);
}



// initialize the movment of the players:
// players can move by the mouse click 3 tiles horizontally or vertically, avoiding tiles with obstacles
// and the tiles with another player
function movePlayer() {
    let gameBox = $('.box');
    // mouseover method shows the possible move of the player
    gameBox.hover( function () {
            hover = true;
            let sqHovered = $(this).data('index');
            posNew = getCoordinates(sqHovered);
            //check the posible move horizontally
            for (let i = Math.min(posOld.x, posNew.x); i <= Math.max(posOld.x, posNew.x); i++) {
                let num = getTileIndex(i, posOld.y);
                let tile = $('.box[data-index="' + num + '"]');
                //console.log(tile);
                //$(this).css({'backgroundImage': 'url(images/path-1.jpg ',});
                if (tile.hasClass('obstacle')) {
                    return;
                }
                if (player1Active) {
                    if (tile.hasClass('player2')) {
                        return;
                    }
                } else {
                    if (tile.hasClass('player1')) {
                        return;
                    }
                }
              
            }
            //check the posible move vertically 
            for (let i = Math.min(posOld.y, posNew.y); i <= Math.max(posOld.y, posNew.y); i++) {
                let num = getTileIndex(posOld.x, i);
                let tile = $('.box[data-index="' + num + '"]');
                //$(this).css({'backgroundImage': 'url(images/path-1.jpg ',});
                if (tile.hasClass('obstacle')) {
                    return;
                }
                if (player1Active) {
                    if (tile.hasClass('player2')) {
                        return;
                    }
                } else {
                    if (tile.hasClass('player1')) {
                        return;
                    }
                }
                
            }
            
            if (!attacked) {
                // if players don't cross adjacent tile, their path for possible movement will be shown
                if (posNew.y === posOld.y && posNew.x <= posOld.x + possibleMoves && posNew.x >= posOld.x - possibleMoves
                    || posNew.x === posOld.x && posNew.y <= posOld.y + possibleMoves && posNew.y >= posOld.y - possibleMoves) {

                    if (player1Active) {
                        $(this).css('backgroundImage', 'url(' + player1.activePath + ')');
                        //$(this).css({'backgroundImage': 'url(images/path-1.jpg ',});

                    } else {
                        $(this).css('backgroundImage', 'url(' + player2.activePath + ')');
                        //$(this).css({'backgroundImage': 'url(images/path-2.jpg ',});
                    }
                }

            }
            
            // if the movement isn't possible hover is false and the posible movment won't be shown
        }, 
        function () {
            hover = false;
            $(this).css('backgroundImage', '');
            //$(this).css({'backgroundImage': 'url(images/path-1.jpg ',})
        }
    );
    // by the click method choose the next position of the player 
    gameBox.on('click', function () {
        hover = false;
        let sqClicked = $(this).data('index');
        posNew = getCoordinates(sqClicked);
        //new position of the player choosen by mouse click vertically - coordinate X
        for (let i = Math.min(posOld.x, posNew.x); i <= Math.max(posOld.x, posNew.x); i++) {
            let num = getTileIndex(i, posOld.y);
            let tile = $('.box[data-index="' + num + '"]');
            if (tile.hasClass('obstacle')) {
                $(this).css('cursor', 'not-allowed');
                return;
            }
            if (player1Active) {
                if (tile.hasClass('player2')) {
                    return;
                }
            } else {
                if (tile.hasClass('player1')) {
                    return;
                }
            }
        }
        //check possible new position of the player choosen by mouse click vertically
        for (let i = Math.min(posOld.y, posNew.y); i <= Math.max(posOld.y, posNew.y); i++) {
            let num = getTileIndex(posOld.x, i);
            let tile = $('.box[data-index="' + num + '"]');
            // if new tile includes obstacle - don't move
            if (tile.hasClass('obstacle')) {
                $(this).css('cursor', 'not-allowed');
                return;
            }
            // if new tile includes players - don't move
            if (player1Active) {
                if (tile.hasClass('player2')) {
                    return;
                }
            } else {
                if (tile.hasClass('player1')) {
                    return;
                }
            }
        }
        if (player1Active) {
            if ($(this).hasClass('player1')){
                return;
            }
        }else{
            if ($(this).hasClass('player2')){
                return;
            }
        }

        if (move) {
            // check when the player can move maximum 3 tiles (possibleMoves) horizontally or vertically
            if (posNew.y === posOld.y && posNew.x <= posOld.x + possibleMoves && posNew.x >= posOld.x - possibleMoves
                || posNew.x === posOld.x && posNew.y <= posOld.y + possibleMoves && posNew.y >= posOld.y - possibleMoves) {
                // check the position X
                for (let i = Math.min(posOld.x, posNew.x); i <= Math.max(posOld.x, posNew.x); i++) {
                    let num = getTileIndex(i, posOld.y);
                    checkWeapon(num);
                }
                // check the position Y
                for (let i = Math.min(posOld.y, posNew.y); i <= Math.max(posOld.y, posNew.y); i++) {
                    let num = getTileIndex(posOld.x, i);
                    checkWeapon(num);
                }
                whoIsActive();
                // if the player moved, his tile lose a class 'active', which is set to opposite player
                if (player1Active) {
                    playerPosition = boxPosition('.player2');
                    posOld = getCoordinates(playerPosition);
                    $('.player1').removeClass('player1').removeClass('active');
                    $(this).addClass('player1');
                    $('.player2').addClass('active');
                    fight(posNew, posOld);
                    player1Active = false;

                
                } else {
                    playerPosition = boxPosition('.player1');
                    posOld = getCoordinates(playerPosition);
                    $('.player2').removeClass('player2').removeClass('active');
                    $(this).addClass('player2');
                    $('.player1').addClass('active');
                    fight(posNew, posOld);
                    player1Active = true;
                }
            }
        }
    });
}
