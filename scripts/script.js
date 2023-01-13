// DOM elements
const headerColorCode = document.getElementById('header-color-code')
const scoreSpan = document.getElementById('score')
const easyButton = document.getElementById('easy-button')
const hardButton = document.getElementById('hard-button')
const boxesContainer = document.getElementById('boxes-container')
const colorBoxes = document.getElementsByClassName('color-boxes')


// Global variables
let chosenRandomBoxNr, chosenRandomColor
let score = 0

// Event listeners
hardButton.addEventListener('click', difficultySelector)
easyButton.addEventListener('click', difficultySelector)
for (let box of colorBoxes) {
    box.addEventListener('click', confirmGuess)
}


// Functions
function generateRandomColor() {
    // Generates a string with a random RGB code for use in CSS
    let randomRed = Math.floor(Math.random() * 256)
    let randomGreen = Math.floor(Math.random() * 256)
    let randomBlue = Math.floor(Math.random() * 256)
    let randomRGBString = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`
    return randomRGBString
}

function assignRandomColors() {
    // Choose a random number between 0 and 3 for the chosen box index;
    // choose a random color and write its code in the site's header
    chosenRandomBoxNr = Math.floor(Math.random() * colorBoxes.length)
    chosenRandomColor = generateRandomColor()
    headerColorCode.textContent = chosenRandomColor.toUpperCase()
    
    // Loop through the boxes and assign the colors
    for (let index in colorBoxes) {
        if (index.length == 1) {
            if (index == chosenRandomBoxNr) {
                colorBoxes[index].style.backgroundColor = chosenRandomColor
            } else {
                colorBoxes[index].style.backgroundColor = generateRandomColor()
            }
        }
    }

    return [chosenRandomBoxNr, chosenRandomColor]
}

function confirmGuess(event) {
    if (event.target.style.backgroundColor == chosenRandomColor) {
        alert('Correct!')
        score++
        scoreSpan.textContent = score
    } else {
        alert('Wrong!')
        score = 0
        scoreSpan.textContent = score
    }
    assignRandomColors()
}

function difficultySelector(event) {
    switch(event.target.textContent) {        
        case 'HARD':
            if (colorBoxes.length === 3) {
                for (let i = 0; i < 3; i++) {
                    let newBox = document.createElement('div')
                    newBox.classList.add('color-boxes')
                    newBox.addEventListener('click', confirmGuess)
                    boxesContainer.appendChild(newBox)
                }
            } 
            easyButton.classList.remove('activated-difficulty')
            hardButton.classList.add('activated-difficulty')
            score = 0
            scoreSpan.textContent = score            
            assignRandomColors()
            break;            
        case 'EASY':
            if (colorBoxes.length === 6) {
                for (let i = 0; i < 6; i++) {   
                    if (i > 2) {
                        colorBoxes[colorBoxes.length - 1].remove()
                    }
                }
            }
            hardButton.classList.remove('activated-difficulty')
            easyButton.classList.add('activated-difficulty')
            score = 0
            scoreSpan.textContent = score
            assignRandomColors()
            break;
        }
}
        
assignRandomColors()