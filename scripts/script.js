// DOM elements
const headerColorCode = document.getElementById('header-color-code')
const guessResult = document.getElementById('guess-result')
const scoreSpan = document.getElementById('score')
const easyButton = document.getElementById('easy-button')
const hardButton = document.getElementById('hard-button')
const boxesContainer = document.getElementById('boxes-container')
const colorBoxes = document.getElementsByClassName('color-boxes')

console.log(colorBoxes); // TEST PRINT


// Global variables
let chosenRandomBoxNr, chosenRandomColor
let score = 0
let attemptsLeft



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
    headerColorCode.style.display = 'block'
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
}

function toggleHeaderInfo(result) {
    // Helper function: Momentarily hides the RGB info and shows
    // the correct/wrong message of the last guess
    headerColorCode.style.display = 'none'
    guessResult.style.visibility = 'visible'
    guessResult.style.opacity = '1'
    guessResult.textContent = result
    setTimeout(() => {
        guessResult.style.visibility = 'hidden'
        guessResult.style.opacity = '0'
        assignRandomColors()
    }, 1000)
}

function confirmGuess(event) {
    // Updates the score and the header
    // info area after each guess
    if (event.target.style.backgroundColor == chosenRandomColor) {
        score++
        scoreSpan.textContent = score
        toggleHeaderInfo('Correct!')
    } else {
        score = 0
        scoreSpan.textContent = score
        toggleHeaderInfo('Wrong!')
    }
}

function difficultySelector(event) {
    // Creates a new game: updates the score, attempts
    // left, and renews the colors of all boxes;
    // adds or removes boxes according to the selected difficulty level
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
            attemptsLeft = 2
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
            attemptsLeft = 3
            assignRandomColors()
            break;
        }
}
        


assignRandomColors()