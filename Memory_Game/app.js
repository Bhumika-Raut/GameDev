const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    
]

// console.log(cardArray)
cardArray.sort(() => 0.5 - Math.random())
const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardChosen = []
let cardChosenId = []
const cardsWon = []

function createBoard() {
    for (let i = 0; i<cardArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
        // console.log(card, i)
    }
}
createBoard()
function checkMatch(){
    const cards = document.querySelectorAll('img')
    const optionOneId = cardChosenId[0]
    const optionTwoId = cardChosenId[1]
    console.log('check for match!')

    if(optionOneId == optionTwoId){
        alert('You clicked the same card!')
        cards[optionOneId].setAttribute('src', 'images/blank.png' )
        cards[optionTwoId].setAttribute('src', 'images/blank.png' )
    } 
    if (cardChosen[0] == cardChosen[1]){
        alert('You found a match!')
        cards[optionOneId].setAttribute('src', 'images/white.png' )
        cards[optionTwoId].setAttribute('src', 'images/white.png' )
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        
        cardsWon.push(cardChosen)
    }
    else{
        cards[optionOneId].setAttribute('src', 'images/blank.png' )
        cards[optionTwoId].setAttribute('src', 'images/blank.png' )
        alert('Sorry try again')
        
    }
    resultDisplay.textContent = cardsWon.length
    cardChosen = []
    cardChosenId = []

    if (cardsWon.length == cardArray.length/2){
        resultDisplay.innerHTML = 'Congratulations, you found them all'
    }
}

function flipCard(){
    console.log(cardArray)
    const cardId = this.getAttribute('data-id')
    console.log(cardArray[cardId].name)
    cardChosen.push(cardArray[cardId].name)
    console.log('clicked', cardId)
    console.log(cardChosen)
    cardChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardChosen.length === 2){
        setTimeout(checkMatch, 500)
    } 


}