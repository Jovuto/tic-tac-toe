const gameFlow = (function () {

    const title = document.querySelector(".title")
    const subtitle = document.querySelector(".subtitle");
    const gameBoardDOM = document.querySelector(".gameBoard");
    const allSquares = document.querySelectorAll(".square");
    const resetDialog = document.querySelector("dialog");
    const resetButton = document.querySelector("button");
    const dialogText = document.querySelector(".whoWon");

    function render(what, where) {

        where.innerHTML = '';
        where.innerHTML = what;

    }

    let playersArray = [];
    let playerTurn = 1;
    let gameBoard = [["E","E","E"],["E","E","E"],["E","E","E"]];

    function createPlayers() {

        for (i = 0 ; i < 2 ; i++) {

            let player = prompt(`Enter player ${i + 1}'s name.`);
            playersArray.push({player: i + 1, name: player});

        }

        console.log(`Player 1 is ${playersArray[0].name} and player 2 is ${playersArray[1].name}`);
        render(`<h2> Player 1 is ${playersArray[0].name} and player 2 is ${playersArray[1].name} </h2>`, title);
        whosTurnIsIt();

    }

    createPlayers();

    function printGameBoard() {
        console.log(gameBoard);
        console.log("Use the gameTurn() command to play your turn. Input = x coordinate, y coordinate");
    }

    gameBoardDOM.addEventListener("click", function (e) {
            render(`<p class="xAndO">${oOrX()} </p>`, e.target);
            gameTurn(e.target.dataset.x, e.target.dataset.y);
    });

    resetButton.addEventListener("click", function() {
        allSquares.forEach((square) => {
            render(``, square);
        })
        resetDialog.close();
        resetGame();
    })

    function whosTurnIsIt() {

        console.log(`It's ${playersArray[playerTurn - 1].name}'s turn!`);
        render(`<p>It's ${playersArray[playerTurn - 1].name}'s turn!</p>`, subtitle);
        printGameBoard();
        return playersArray[playerTurn - 1].name;

    }

    function oOrX() {
        if (playerTurn === 1) {
            return "O";
        } else return "X";
    }

    function gameTurn(xPlace, yPlace) {
        if (gameBoard[yPlace - 1][xPlace - 1] === "X" || gameBoard[yPlace - 1][xPlace - 1] === "O") {
            console.error("The square must be empty to place X or O");
            return;
        }
        gameBoard[yPlace - 1][xPlace - 1] = oOrX();
        detectWin();
    }

    function turnOrder() {

        if (playerTurn === 1) { playerTurn = 2 }
        else { playerTurn = 1 };
        whosTurnIsIt();

    }

    function detectWin() {
        gameBoard.forEach((item) =>  {
            if (item.every((item) => {
                return item == 'O';
            }) || 
            (item.every((item) => {
                return item == 'X';
            }))) {
                endGame(whosTurnIsIt());
                return; 
            }
        });

        for (col = 0 ; col < 3 ; col++){
            let columnCheck = [];
            columnCheck = [];
            for (row = 0 ; row < 3 ; row++) {
                columnCheck.push(gameBoard[row][col]);
                if (gameBoard[row][col] === "E") break;
            }
            if (columnCheck.every((item) => item == "X") || columnCheck.every((item) => item == "O")) {
                endGame(whosTurnIsIt());
                return;
            }
        }

        let diagonalWin;
        diagonalWin = true;
        let leftDiagonal;
        let rightDiagonal;
        leftDiagonal = [];
        rightDiagonal = [];

        for (diag = 0, rdiag = 2 ; diag < 3 ; diag++, rdiag--) {
            leftDiagonal.push(gameBoard[diag][diag]);
            rightDiagonal.push(gameBoard[diag][rdiag]);
            if ((gameBoard[diag][diag] === "E") && (gameBoard[diag][rdiag] === "E")) break; 
        }
        if (leftDiagonal.every((item) => item == "X") || leftDiagonal.every((item) => item == "O") || 
            rightDiagonal.every((item) => item == "X") || rightDiagonal.every((item) => item == "O")) {
                endGame(whosTurnIsIt());
                return;
        }

        turnOrder();
    }

    function endGame(whoWon) {
        resetDialog.showModal();
        render(`Congratulations ${whoWon}!! You won! Would you like to play again?`, dialogText);
        console.log(`Congratulations ${whoWon}!! You won! Would you like to play again? Just use the reset command.`);
    }

    function resetGame() {
        playersArray = [];
        playerTurn = 1;
        gameBoard = [["E","E","E"],["E","E","E"],["E","E","E"]];
        createPlayers();
    }

    return { gameTurn, gameBoard, resetGame };

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

5.5: Check if the square isn't already filled in

6. The game turn goes to player 2 with player 2's name above the board

7. Player 2 selects a cell
8. An X appears on the cell player 2 selects

9. Play goes on until there is three in a row
10. Once a three in a row is detected, a message appears saying "Player (1/2) wins!"

11. The players are given an option to play again
12. If selected, the game resets
*/
