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

// Action listener for button
// Button to adjust grid size
const adjustGridButton = document.querySelector('.adjust-grid-button');
adjustGridButton.addEventListener('click', () => {
    
    const squarePerSide = prompt("Enter number of squares per side: ");

    if ((squarePerSide > 0) && (squarePerSide <= 100)){
        createGrid(squarePerSide);
        container.style.gridTemplateColumns = `repeat(${squarePerSide}, 1fr)`;
    } else {
        alert('Please enter a number from 1 to 100 only.');
    }
   
})

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    
    if (e.type === 'mouseover' && mouseDown) {
        e.target.style.backgroundColor = 'black';
    }
}

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener('click', () => {
    const allSquare = document.querySelectorAll(".square");
    allSquare.forEach((square) => {
        square.style.backgroundColor = "white";
    });
});

// const randomColorButton = document.querySelector(".random-color-button");
// randomColorButton.addEventListener('Click', () => {

// })

// function modeSelector() {
//     randomColorButton.addEventListener('Click', () => {
//         mode = 'randomColor';
//     })
// }

// function changeColor(){
    
// }

const boardSizeSlider = document.getElementById("board-size");
boardSizeSlider.addEventListener ('input', () => {
    const boardSizeSliderValue = boardSizeSlider.value;
    createGrid(boardSizeSliderValue);
})

window.onload = () => {
    createGrid(DEFAULT_SIZE);
}
