const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor){
    currentColor = newColor;
}

function setCurrentMode(newMode){
    currentMode = newMode;
}

function setCurrentSize(newSize){
    currentSize = newSize;
}

const colorSelector = document.querySelector(".color-selector");
const colorButton = document.querySelector(".color-mode-button");
const randomButton = document.querySelector(".random-color-selector");
const eraserButton = document.querySelector("eraser-button");
const clearButton = document.querySelector(".clear-button");
const sizeValue = document.querySelector(".size-value");
const boardSizeSlider = document.querySelector(".board-size-slider");
const grid = document.querySelector('grid-container');

colorSelector.oninput = (e) => setCurrentColor(e.target.value);
colorButton.onclick = () => setCurrentMode('color');
randomButton.onclick = () => setCurrentMode("random");
eraserButton.onclick = () => setCurrentMode("eraser");
clearButton.onclick = () => reloadGrid();
boardSizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
boardSizeSlider.onmousemove = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function clearGrid(){
    grid.innerHTML = "";
}

function changeSize(value){
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value){
    sizeValue.innerHTML =  `${value} x ${value}`;
}

function reloadGrid(value){
    clearGrid();
    setUpGrid(currentSize);
}

function generateGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    for (let i=0; i<size; i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEvenetListener('mousedown', changeColor);
    }
}

function changeColor(e) {
    if (e.type === 'mouseOver' && !mouseDown) return;
    if (currentColor === 'random'){
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;   
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#000000';
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}