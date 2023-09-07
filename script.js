const container = document.querySelector('.grid-container');
const DEFAULT_SIZE = 16;
let mode = '';

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Function to clearGrid
function clearGrid(){
    container.innerHTML = "";
}

// Function to create grid
function createGrid(size) {

    // Remove existing grid before generating new grid
    clearGrid();

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`


    for (let i=0; i< size*size; i++){
        const square = document.createElement('div');
            square.classList.add('square');
            container.addEventListener('mouseover', changeColor);
            container.addEventListener('mousedown', changeColor);
            container.appendChild(square);
    }
}

const chooseColor = document.getElementById("color");
chooseColor.addEventListener('input', changeColor);

// Function to apply color on board
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    
    if ((e.type === 'mouseover' && mouseDown) || (e.type === 'mouseclick')){
        const selectedColor = document.getElementById("color");
        e.target.style.backgroundColor = selectedColor.value;
        console.log(selectedColor.value);
    }
}

// Action listener for clear button
const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener('click', () => {
    const allSquare = document.querySelectorAll(".square");
    allSquare.forEach((square) => {
        square.style.backgroundColor = "white";
    });
});

// Allows slider to change board size
const boardSizeSlider = document.getElementById("board-size");
boardSizeSlider.addEventListener ('input', () => {
    const boardSizeSliderValue = boardSizeSlider.value;
    createGrid(boardSizeSliderValue);
})

// Default
window.onload = () => {
    createGrid(DEFAULT_SIZE);
}
