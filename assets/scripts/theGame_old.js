var gameArray = new Array(4);
var checkArray = new Array(4);
for (let array = 0; array < gameArray.length; array++) {
    gameArray[array] = new Array(4).fill(0);
    checkArray[array] = new Array(4).fill(0);
}



function move(direction, cRow, cCol) {
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
        checkArray[cRow][cCol] = 1;
        return;
    }

    if (gameArray[m][n] === 0) {
        gameArray[m][n] = gameArray[cRow][cCol];
        gameArray[cRow][cCol] = 0;
        checkArray[m][n] = 1;
        move(direction, m, n);
        return;
    }
    if (gameArray[m][n] > gameArray[cRow][cCol] || gameArray[m][n] < gameArray[cRow][cCol]) {
        move(direction, m, n);
        if (gameArray[m][n] === 0) {
            move(direction, cRow, cCol);
        }
        checkArray[m][n] = 1;
        return;
    }
    if (checkArray[cRow][cCol] !== 1 && gameArray[m][n] === gameArray[cRow][cCol]) {
        let k = m;
        let s = n;
        switch (direction) {
            case 1:
                k -= 1;
                break;
            case 2:
                k += 1;
                break;
            case 3:
                s -= 1;
                break;
            case 4:
                s += 1;
                break;
        }
        if (gameArray[k][s] === gameArray[m][n]) {
            move(direction, m, n);
            // move(direction, cRow, cCol);
            return
        }
        gameArray[m][n] += gameArray[m][n];
        gameArray[cRow][cCol] = 0;
        checkArray[m][n] = 1;
        return;
    }


    // if (gameArray[m][n] === 0) {

    //     gameArray[m][n] = gameArray[cRow][cCol];
    //     gameArray[cRow][cCol] = 0;
    //     move(direction, m, n);
    //     return;
    // }
    // if (gameArray[m][n] > gameArray[cRow][cCol]) {
    //     move(direction, m, n);
    //     return;
    // }
    // if (gameArray[m][n] === gameArray[cRow][cCol]) {
    //     // move(direction, m, n);
    //     gameArray[m][n] *= 2;
    //     gameArray[cRow][cCol] = 0;
    //     return;
    // }

    // if (gameArray[m][n] < gameArray[cRow][cCol]) {
    //     move(direction, m, n);
    //     // move(direction, cRow, cCol);
    //     return;
    // }
}



const DIRECTIONS = [1, 2, 3, 4];
//1 - Arrow Up
//2 - Arrow Down
//3 - Arrow left
//4 - Arrow right

gameArray[0][2] = 2;

function playTheGame(direction) {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (gameArray[row][col] !== 0) {
                move(direction, row, col);
            }
        }
        checkArray[row].fill(0);
    }

    var randomRow, randomRow;
    do {
        randomRow = Math.floor(Math.random() * 4);
        randomCol = Math.floor(Math.random() * 4);
    } while (gameArray[randomRow][randomCol] !== 0);

    gameArray[randomRow][randomCol] = Math.random() >= 0.75 ? 4 : 2;
    console.log(randomRow + '   ' + randomCol);
}


// playTheGame(2);
// move(2, 0, 2);
// console.log(gameArray);
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_RIGHT = 39;
const KEY_LEFT = 37;

window.addEventListener("keydown", (event) => {
    let direction;
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

    playTheGame(direction);
    // console.log(gameArray);

    for (let r = 0; r < 4; r++) {
        console.log(gameArray[r]);
        for (let c = 0; c < 4; c++) {
            let innerCurrentNumber = gameArray[r][c];
            if (gameArray[r][c] === 0) {
                document.querySelector(`.x${r}y${c}`).innerText = '';
            } else {
                document.querySelector(`.x${r}y${c}`).innerHTML = `<p class="number">${innerCurrentNumber}</p>`;
            }
        }

    }
    console.log('----------------------------------------');


}, false);