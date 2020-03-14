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
