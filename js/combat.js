function fight(posNew, posOld) {
    if (posNew.x === posOld.x 
        && posNew.y <= posOld.y + 1 && posNew.y >= posOld.y - 1 ||posNew.y === posOld.y 
        && posNew.x <= posOld.x + 1 && posNew.x >= posOld.x - 1) {
        move = false;
        hover = false;
        fightingArea();
        scores = 0;
        fightPlayerOne();
        fightPlayerTwo();
    }
}

// show and hide buttons during the fight
function combat() {
    if(turn == 0) {
        attackBtn1.hide();
        defendBtn1.hide();
        attackBtn2.hide();
        defendBtn2.hide();
    }else if(turn == 1) {
        attackBtn2.hide();
        defendBtn2.hide();
        attackBtn1.show();
        defendBtn1.show();
    } else if (turn == 2) {
        attackBtn1.hide();
        defendBtn1.hide();
        attackBtn2.show();
        defendBtn2.show();       
    }
}

// when the players fight, the board game is hidden
function fightingArea() {
    mapContainer.hide();
    $('#player-1').css('margin-left', '300px');
    $('#player-2').css('margin-right', '300px');
    $(body).css({
        'backgroundImage' : 'url("images/background2.jpg")',
        'backgroundSize'  : 'no-repeat'
    })
    $('div.turn-1').empty();
    $('div.turn-2').empty();
    $('#player-' + activePlayer).removeClass('active-board');
    attackBtn1.show();
    defendBtn1.show();

}

// display Game Over board at the end, when battle is finished.
function gameOverBoard() {
    $('.player-box').hide();
    //$('header').hide();
    $('#gameOver').css({
        'display': 'flex',
        'justifyContent': 'center',
        'color': '#ffffff',
        'marginTop': '200px',
        'textAlign': 'center',
        'fontSize': '45px',
    });
    $('.gameOver-content').css({
        'border': 'solid 2px grey',
        'borderRadius': '10px',
        'backgroundColor': '#000000',
        'opacity': '75%',
        'padding': '10px'

    });
    $('#start-again').css({
        'width': '150px',
        'height': '50px',
        'backgroundColor': 'white',
        'color': 'black',
        'boxShadow': 'darkgray',
        'textAlign': 'center',
        'fontSize': '20px',
    });
    $('#winner').css({'color': 'yellow',});

    gameOverContainer.show();
    player1.winner(player2);
}

// attack and defend buttons connected with attack function mentioned in player function constructor
function fightPlayerOne(){
    attackBtn1.click(function() {
        player1.attack(player2);
        pleyerDefend = 0;
        turn = 2;
        activePlayer = 2;
        combat();
    });
    defendBtn1.click(function(){
        playerDefend = 1;
        turn = 2;
        activePlayer = 2;
        combat();
        
    })
}

function fightPlayerTwo() {
        attackBtn2.click(function() {
        player2.attack(player1);
        pleyerDefend = 0;
        turn = 1;
        activePlayer = 1;
        combat();
    });
    defendBtn2.click(function(){       
        turn = 1;
        playerDefend = 1;
        activePlayer = 1;
        combat();
        
    })
}
