//layout the game board
let vowelGame = {
    vowelIndex: 0,
    nepali: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अ:',],
    english: ['a', 'aa', 'i', 'ee', 'u', 'oo', 'eh', 'aih', 'o', 'au', 'ahm', 'aha',],
    backFace: "Click",
    layBoardTiles: function (boardId) {
        let gameBoard = document.getElementById(boardId)
        this.nepali.forEach(vowel => {
            let cardSet = `
            <div class="vowel-card">
                <span class="vowel" data-vowel="${vowel}">${vowel}</span>
            </div>
            <div class="vowel-card">
                <span class="vowel" data-vowel="${vowel}">${vowel}</span>
            </div>     
        `
            gameBoard.innerHTML += cardSet
        })
    }
}
vowelGame.layBoardTiles('vowel-board')

// Game functions 

let cards = document.querySelectorAll('.vowel-card')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

(function shuffleCards() {
    let random_array = new Array(24).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5)
    cards.forEach((card, index) => {
        card.style.order = random_array[index]
    })
})()

// shuffleCards()

function flipCard() {
    if (lockBoard) return
    if (this.firstElementChild === firstCard) return

    this.firstElementChild.classList.add('flip')
    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this.firstElementChild
        return
    }

    secondCard = this.firstElementChild



    checkMatch()
}

function checkMatch() {
    let isMatch = firstCard.dataset.vowel === secondCard.dataset.vowel

    isMatch ? disableCards() : unFlipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard()
}

function unFlipCards() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard()
    }, 1500)

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
    console.log('board-reset')
}

cards.forEach(card => card.addEventListener('click', flipCard))

