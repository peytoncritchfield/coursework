

const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')
let player = {
    speed: 5
}
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}

startScreen.addEventListener('click', start)
document.addEventListener('keydown', pressOn)
document.addEventListener('keyup', pressOff)

function moveLines() {
    let lines = document.querySelectorAll('.line')
    lines.forEach( (item) => {
        if (item.y > 1500) {
            item.y -= 1500
        }
        item.y += player.speed
        item.style.top = item.y + 'px'
    })
}

function playGame(car) {
    car = document.querySelector('.car')
    moveLines()
    let road = gameArea.getBoundingClientRect()
    if (player.start) {
        if (keys.ArrowUp && player.y > road.top) {player.y -= player.speed}
        if (keys.ArrowDown && player.y < (road.bottom)) {player.y += player.speed}
        if (keys.ArrowLeft && player.x > 0) {player.x -= player.speed}
        if (keys.ArrowRight && player.x < (road.width - 50)) {player.x += player.speed}
        car.style.left = player.x + 'px'
        car.style.top = player.y + 'px'

        window.requestAnimationFrame(playGame)
    }
}

function pressOn(e) {
    e.preventDefault()
    keys[e.key] = true
}

function pressOff(e) {
    e.preventDefault()
    keys[e.key] = false
}

function start() {
    startScreen.classList.add('hide')
    gameArea.classList.remove('hide')
    player.start = true
    for (let i = 0; i < 10; i++) {
        let div = document.createElement('div')
        div.classList.add('line')
        div.y = i * 150
        div.style.top = (i * 150) + 'px'
        gameArea.appendChild(div)
    }
    window.requestAnimationFrame(playGame)
    let car = document.createElement('div')
    car.innerText = 'CAR'
    car.setAttribute('class','car')
    gameArea.appendChild(car)
    player.x = car.offsetLeft
    player.y = car.offsetTop
}