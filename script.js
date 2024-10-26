const gameFlow = (function () {

    const playersArray = [];
    const playerTurn = 1;
    const gameBoard = [["E","E","E"],["E","E","E"],["E","E","E"]];

    function createPlayers() {

        for (i = 0 ; i < 2 ; i++) {

            let player = prompt(`Enter player ${i + 1}'s name.`);
            playersArray.push({player: i + 1, name: player});

        }

        console.log(`Player 1 is ${playersArray[0].name} and player 2 is ${playersArray[1].name}`);

    }

    createPlayers();
    whosTurnIsIt();
    console.log(gameBoard);

    function whosTurnIsIt() {

        console.log(`It's ${playersArray[playerTurn - 1].name}'s turn!`);

    }

    function turnOrder() {

        if (playerTurn === 1) { playerTurn = 2 }
        else { playerTurn = 1 };
        whosTurnIsIt();

    }

})(); 

/* 
1. Create player 1 with a name
2. Create player 2 with a name

gameFlow function {

playersArray

createPlayers function {

loop that runs twice {

prompt "enter player {loop number}'s name"
push player{player: loop number, name: prompt data} to playersArray

}

}

}

3. Print the board with who's turn it is above the board

Create variable for playerTurn

Player 1 at the start and alternate using an if statement

Print out who's turn it is 

Print the gameBoard array

4. Player 1 selects a cell
5. An O appears on the cell player 1 selects

6. The game turn goes to player 2 with player 2's name above the board
7. Player 2 selects a cell
8. An X appears on the cell player 2 selects
9. Play goes on until there is three in a row
10. Once a three in a row is detected, a message appears saying "Player (1/2) wins!"
11. The players are given an option to play again
12. If selected, the game resets
*/
