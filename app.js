const header_elem = document.querySelector("#header-element");




let snake = {};

function buildInitialState() {
    gameState.snake.body = [[10,10]];
    gameState.snake.direction = [1,0];
    // append (board size) grid of cells to body
    // adjust css if the cell is occupied by snake body
    // adjust cells for each tick
    let grid = document.querySelector("#game-grid");
   // console.log(grid);
    for (let j = 0; j < gameState.grid_size; j++) {
        let column = document.createElement("column");
        column.className = "column";
        for (let i = 0; i < gameState.grid_size; i++) {
            let cell = document.createElement("cell");
            cell.className = "row";
            column.appendChild(cell);
        }
        grid.appendChild(column);
    }
}

function renderState() {
    
    alter_cell_tags();
    show_apple();
}

function alter_cell_tags() {
    if (hits_wall(gameState.snake.body[0][0], gameState.snake.body[0][1])) {
        return false
    }

        let indexer = gameState.snake.body[0];
        let row_index = indexer[0];
        let column_index =indexer[1];
        let column = document.getElementsByClassName("column")[column_index];
        let row = column.getElementsByClassName("row")[row_index];
        row.className = "row occupied"

}


function show_apple() {
    
        let indexer = gameState.apple;
        let row_index = indexer[0];
        let column_index =indexer[1];
        let column = document.getElementsByClassName("column")[column_index];
        let row = column.getElementsByClassName("row")[row_index];
        row.className = "row apple"
    
}

function tick() {
    // append the new point to start of snake.body array 
    
    determine_size_on_tick();
    renderState();
}


function determine_size_on_tick() {
    let old_first = snake.body[0];
    let new_cell = [old_first[0] + snake.direction[0], old_first[1] + snake.direction[1]]
    
    gameState.snake.body.unshift(new_cell);
    if (!eats_apple()) {
        let drop_value = gameState.snake.body.pop();
        document.getElementsByClassName("column")[drop_value[1]].getElementsByClassName("row")[drop_value[0]].className = "row cell";
    }
    
}

function eats_apple() {
    for (let i = 0; i < gameState.snake.body.length; i++) {
        if (gameState.snake.body[i][0] === gameState.apple[0] && gameState.snake.body[i][1] === gameState.apple[1]) {
            generate_new_apple();
            return true
        }
    };
    return false

    
 
}

function generate_new_apple() {
    rand_col =Math.floor(Math.random() * gameState.grid_size);
    console.log(rand_col);
    rand_row =Math.floor(Math.random() * gameState.grid_size);
    gameState.apple = [rand_col, rand_row];
}


let gameState = {
    apple: [3,3],
    snake: snake,
    grid_size: 20,
}

function direction_up() {
    gameState.snake.direction = [-1,0];
}

function direction_down() {
    gameState.snake.direction = [1,0];
}
function direction_right() {
    gameState.snake.direction = [0,1];
}
function direction_left() {
    gameState.snake.direction = [0,-1];
}

function hits_wall(column,row) {
    if (column > gameState.grid_size || row > gameState.grid_size || column < 0 || row < 0) {
        return true
    } else { return false}
    
}

document.addEventListener("keydown", function(event) {
    if (event.code == "ArrowLeft") {
        console.log("arrow left logged!")
        direction_left();
    }

    if (event.code == "ArrowDown") {
        direction_down();
    }

    if (event.code == "ArrowUp") {
        direction_up();
    }

    if (event.code == "ArrowRight") {
        direction_right();
    }
});

function gameLoop () {
    let id = setInterval(tick, 10000/30);
    
    setInterval(function () {if (hits_wall(gameState.snake.body[0][0], gameState.snake.body[0][1])) {
        console.log("triggered");
        console.log(gameState.snake.body[0]);
        clearInterval(id);
        return false
    }}, 100)
}

buildInitialState();
gameLoop();