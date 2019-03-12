const DIRECTIONS = [1, 2, 3, 4];
//1 - Arrow Up
//2 - Arrow Down
//3 - Arrow left
//4 - Arrow right


const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_RIGHT = 39;
const KEY_LEFT = 37;
var currentGame;

class Game {
    constructor() {
        this.playBoard = new Array(4);
        for (let array = 0; array < this.playBoard.length; array++) {
            this.playBoard[array] = new Array(4).fill(0);
        }
        this.score = 0;
    }


    move(direction, cRow, cCol) {
        // let trr = Date.now();
        var m = cRow,
            n = cCol;
        switch (direction) {
            case 1:
                m -= 1;
                break;
            case 2:
                m += 1;
                break;
            case 3:
                n -= 1;
                break;
            case 4:
                n += 1;
                break;
        }

        if (m === 4 || m === -1 || n === 4 || n === -1) {
            return;
        }
        if (this.playBoard[cRow][cCol] === 0) {
            this.move(direction, m, n);
            return;
        }
        if (this.playBoard[m][n] === 0) {
            this.playBoard[m][n] = this.playBoard[cRow][cCol];
            this.playBoard[cRow][cCol] = 0;
            this.move(direction, m, n);
            return;
        }
        if (this.playBoard[m][n] > this.playBoard[cRow][cCol] || this.playBoard[m][n] < this.playBoard[cRow][cCol]) {
            this.move(direction, m, n);
            if (this.playBoard[m][n] === 0) {
                this.playBoard[m][n] = this.playBoard[cRow][cCol];
                this.playBoard[cRow][cCol] = 0;
                // this.move(direction, cRow, cCol);
            }
            return;
        }
        if (this.playBoard[m][n] === this.playBoard[cRow][cCol]) {
            this.move(direction, m, n);
            if (this.playBoard[m][n] === this.playBoard[cRow][cCol]) {
                this.playBoard[m][n] += this.playBoard[m][n];
                this.score += this.playBoard[m][n];
                this.playBoard[cRow][cCol] = 0;
                return;
            }
            if (this.playBoard[cRow][cCol] > this.playBoard[m][n]) {
                this.move(direction, cRow, cCol);
                return;
            } else {
                if (this.playBoard[cRow][cCol] < this.playBoard[m][n]) {
                    return;
                }
                return;
            }
        }
    }

    giveRandomNumber() {
        let controlFlag = 0;
        for (let row = 0; row < this.playBoard.length; row++) {
            for (let col = 0; col < this.playBoard.length; col++) {
                if (this.playBoard[row][col] === 0) {
                    controlFlag = 1;
                }
            }

        }
        if (controlFlag === 1) {
            var randomRow, randomCol;
            do {
                randomRow = Math.floor(Math.random() * 4);
                randomCol = Math.floor(Math.random() * 4);
            } while (this.playBoard[randomRow][randomCol] !== 0);
            this.playBoard[randomRow][randomCol] = Math.random() >= 0.85 ? 4 : 2;
        } else {
            document.querySelector('#game-over').style.display = 'flex';
            document.querySelector('#reset-game').style.zIndex = '99';
            document.querySelector('button').style.backgroundColor = 'white';
            document.querySelector('button').style.transform = 'scale(1.1)';

            return;
        }
    }

    playTheGame(direction) {
        var r, c;
        switch (direction) {
            case 1:
                r = 3;
                for (let column = 0; column < 4; column++) {
                    this.move(direction, r, column);
                }
                break;
            case 2:
                r = 0;
                for (let column = 0; column < 4; column++) {
                    this.move(direction, r, column);
                }
                break;
            case 3:
                c = 3;
                for (let row = 0; row < 4; row++) {
                    this.move(direction, row, c);
                }
                break;
            case 4:
                c = 0;
                for (let row = 0; row < 4; row++) {
                    this.move(direction, row, c);
                }
                break;
        }

        this.giveRandomNumber();
    }

    outputResults() {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                let innerCurrentNumber = this.playBoard[r][c];
                if (this.playBoard[r][c] === 0) {
                    document.querySelector(`.x${r}y${c}`).innerText = '';
                } else {
                    document.querySelector(`.x${r}y${c}`).innerText = innerCurrentNumber;
                    document.querySelector('#score-field > #number').innerText = this.score;
                }
                document.querySelector(`.x${r}y${c}`).setAttribute('val', `x${innerCurrentNumber}`);
            }
        }
    }

}


window.addEventListener("DOMContentLoaded", () => {

    var byId = (somestring) => document.querySelector(`#${somestring}`);
    byId('new-game').addEventListener("click", () => {
        document.querySelector('#game-over').style.display = 'none';
        currentGame = new Game();
        currentGame.giveRandomNumber();
        currentGame.outputResults();
    })

}, false);

window.addEventListener("keydown", (event) => {
    let trr = Date.now();
    let direction;
    if (event.keyCode >= 37 && event.keyCode <= 40) {

        if (event.keyCode === 38) {
            direction = 1;
        };
        if (event.keyCode === 40) {
            direction = 2;
        };
        if (event.keyCode === 37) {
            direction = 3;
        };
        if (event.keyCode === 39) {
            direction = 4;
        };

        currentGame.playTheGame(direction);
        currentGame.outputResults();
    }


}, false);