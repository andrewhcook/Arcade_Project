const header_elem = document.querySelector("#header-element");

let snake = {};

function buildInitialState() {
    gameState.snake.body = [[10,10]];
    gameState.snake.direction = [1,0];
    gameState.score = 0;
    gameState.best = 0;
    gameState.speed = 10000/60;
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
    show_apple();
}

function renderState() {
    alter_cell_tags();
}

function alter_cell_tags() {
        let indexer = gameState.snake.body[0];
        let row_index = indexer[0];
        let column_index =indexer[1];
       // console.log("row", row_index);
      //  console.log("column", column_index);
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
    
    if (!determine_size_on_tick()){
        return false
    } else {renderState();
    return true}

}

function detect_self_collision(col, row) {
    for (let i = 0; i < gameState.snake.body.length; i++) {
        if (gameState.snake.body[i][0] === col && gameState.snake.body[i][1] === row) {
            return true
        }
    }
    return false
}


function determine_size_on_tick() {
    let old_first = snake.body[0];
    let new_cell = [old_first[0] + snake.direction[0], old_first[1] + snake.direction[1]]
    if (detect_self_collision(new_cell[0],new_cell[1]) || hits_wall(new_cell[0], new_cell[1])) {
      //  console.log("first trigger");
        return false
    }
    gameState.snake.body.unshift(new_cell);
    if (!eats_apple()) {
        let drop_value = gameState.snake.body.pop();
        document.getElementsByClassName("column")[drop_value[1]].getElementsByClassName("row")[drop_value[0]].className = "row cell";
    }
    return true
}

function eats_apple() {
    for (let i = 0; i < gameState.snake.body.length; i++) {
        if (gameState.snake.body[i][0] === gameState.apple[0] && gameState.snake.body[i][1] === gameState.apple[1]) {
            generate_new_apple();
            gameState.score += 1;
            return true
        }
    };
    return false
}

function generate_new_apple() {
    let apple_in_body = true;
    while (apple_in_body) {
    rand_col =Math.floor(Math.random() * gameState.grid_size);
    rand_row =Math.floor(Math.random() * gameState.grid_size);
    for (let i = 0;i < gameState.snake.body.length; i++) {
        if (gameState.snake.body[i][0] === rand_col && gameState.snake.body[i][1]
 === rand_row) {apple_in_body = true;
break} apple_in_body = false;
  }

}
    // check if new apple spawns in snake body. if so generate a new apple
    gameState.apple = [rand_col, rand_row];
    show_apple();
}


let gameState = {
    apple: [3,3],
    snake: snake,
    grid_size: 20,
    score: 0,
    best: 0,
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
    if (column > gameState.grid_size -1|| row > gameState.grid_size -1|| column < 0 || row < 0) {
        return true
    } else { return false}
    
}

document.addEventListener("keydown", function(event) {
    if (event.code == "ArrowLeft") {
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
    let id = setInterval(function() {
        document.getElementById("score").innerText = gameState.score;
        document.getElementById("best").innerText = gameState.best;
        if (gameState.score > gameState.best) {
            gameState.best = gameState.score;
        }
        if (!tick() || hits_wall(gameState.snake.body[0][0], gameState.snake.body[0][1])) {
       // console.log("triggered");
      //  console.log(gameState.snake.body[0]);
        clearInterval(id);
        return false;
    }}, gameState.speed);
}


function refresh() {
    gameState.score = 0;
    for (i =0; i < gameState.snake.body.length; i++) {
        let column_index= gameState.snake.body[i][1];
        let row_index = gameState.snake.body[i][0];
        let column = document.getElementsByClassName("column")[column_index];
        let row = column.getElementsByClassName("row")[row_index];
        row.className = "row cell"
    }
    gameState.snake.body = [[10,10]];
    gameLoop()
}

document.getElementById("new-game").addEventListener('click', refresh);
document.getElementById("selector").addEventListener("change", function(event) {
    //console.log(event.target.value);
    if (event.target.value === "Hard") {
        gameState.speed = 10000/120;
    } else if (event.target.value === "Easier") {
        gameState.speed = 10000/30;
    } else if (event.target.value === "Standard")  {
        gameState.speed = 10000/50
    }
})

buildInitialState();

//document.getElementsByClassName("column")[gameState.grid_size].getElementsByClassName("row")[gameState.grid_size];
//gameLoop();

