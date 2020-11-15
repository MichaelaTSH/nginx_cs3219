// JavaScript Document
let size;
let number_of_cells;
const x = "x";
const o = "o";
let count = 0;
let o_win = 0;
let x_win = 0;
let cells = 0;

$(document).ready(function () {
    console.log("READY")
});

function createBoard() {
    //remove all existing cells (i.e. tic tac toe tiles) first
    cells = 0;
    const list = document.getElementById("game");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    size = document.getElementById("board-input").value;
    if (!Number.isInteger(parseInt(size))) {
        alert("Please input a valid number")
        return;
    }
    if (size <= 2) {
        alert("Please choose a number greater than 2");
        return;
    } else if (size > 44) {
        alert("Please choose a smaller number");
        return;
    }

    //fill in the cells. The number of cells should be the input squared
    number_of_cells = Math.pow(size, 2);
    const width = (220 - (5 * size)) / size;
    const font_size = width * 2 / 3;
    for (; cells < number_of_cells; cells++) {
        document.getElementById("game").insertAdjacentHTML('beforeend', '<li class="btn span1" style="width:' + width + 'px;line-height:' + width + 'px;font-size:' + font_size + 'px;" id="c' + cells + '" class="btn span1">+</li>');
        document.getElementById("c" + cells).addEventListener("click", move, false);
    }
}

function move() {
    if ($(this).hasClass('disable')) {
        alert('Already selected')
        return
    }

    //curr contains the letter that is being filled in
    var curr;
    if (count % 2 == 0) {
        count++
        $(this).text(o)
        $(this).addClass('disable o btn-primary')
        curr = "o"
    }
    else {
        count++
        $(this).text(x)
        $(this).addClass('disable x btn-info')
        curr = "x"
    }

    var index = $(this).index();
    var row = Math.floor(index / size);
    var col = index % size;
    var is_win = false;

    //if the row == col, it belongs to the diagonal line beginning from the top left cell
    //if the index % (size - 1) == 0, it belongs to the diagonal line beginning from the top right cell
    if (row == col || (index % (size - 1) == 0)) {
        is_win = is_win || checkWithDiagonals(curr);
    }
    is_win = is_win || checkRow(row, curr) || checkCol(col, curr);

    if (is_win) {
        if (curr == "x") {
            alert('X wins')
            count = 0
            x_win++
            $('#x_win').text(x_win)
            reset()
        } else {
            alert('O wins')
            count = 0
            o_win++
            $('#o_win').text(o_win)
            reset()
        }
    }
    
    if (count == number_of_cells) {
        alert('Its a tie. It will restart.')
        reset()
    }
}

function checkWithDiagonals(curr) {
    //counts diagonals starting from the left
    var left_counter = 0;
    //counts diagonals starting from the right
    var right_counter = 0;
    var i;
    for (i = 0; i < size; i++) {
        var left_index = i + (size * i);
        if (document.getElementById("c" + left_index).classList.contains(curr)) {
            left_counter++;
        }

        var right_index = (size * (i + 1)) - (i + 1);
        if (document.getElementById("c" + right_index).classList.contains(curr)) {
            right_counter++;
        }
    }
    return ((left_counter == size) || (right_counter == size));
}

//checks the row of the cell that was just clicked
function checkRow(row, curr) {
    var counter = 0;
    var index = (row * size);
    var i;
    for (i = 0; i < size; i++) {
        if (document.getElementById("c" + index).classList.contains(curr)) {
            counter++;
        }
        index++;
    }
    return (counter == size);
}

//checks the col of the cell that was just clicked
function checkCol(col, curr) {
    var counter = 0;
    var index = col;
    var i;
    for (i = 0; i < size; i++) {
        if (document.getElementById("c" + index).classList.contains(curr)) {
            counter++;
        }
        index = col + (size * (i + 1));
    }
    return (counter == size);
}

function reset() {
    const list = document.getElementById("game").childNodes;
    var i;
    for (i = 0; i < list.length; i++) {
        list[i].textContent = "+"
        list[i].classList.remove('disable')
        list[i].classList.remove('o')
        list[i].classList.remove('x')
        list[i].classList.remove('btn-primary')
        list[i].classList.remove('btn-info')
    }
    count = 0
}
