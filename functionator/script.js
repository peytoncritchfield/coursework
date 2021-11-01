let myBlock = document.createElement('div');
let myFunctionList;
let funList = [];
const movementArray = ['right','left','up','down']
document.addEventListener("DOMContentLoaded", function() {
    // myBlock = document.createElement('div')
    myBlock.textContent = 'Hello World'
    myBlock.style.width = '100px'
    myBlock.style.height = '100px'
    myBlock.style.backgroundColor = 'burlywood'
    myBlock.style.color = 'white'
    myBlock.style.lineHeight = '100px'
    myBlock.style.textAlign = 'center'
    myBlock.style.position = 'absolute'
    myBlock.style.top = '400px'
    myBlock.style.left = '250px'
    myBlock.style.zIndex = '-1'
    document.body.appendChild(myBlock)
    myFunctionList = document.createElement('div')
    myFunctionList.style.margin = '30px'
    document.body.appendChild(myFunctionList)
})

let body = document.querySelector('body')

document.addEventListener('keydown', function(e) {
    e.preventDefault()
    let keyC = e.keyCode;
    if(keyC === 37) addFun('left');
    else if (keyC === 38) addFun('up');
    else if (keyC === 39) addFun('right');
    else if (keyC === 40) addFun('down');
    else if (keyC === 66) body.style.backgroundColor = randomColor();
    else if (keyC === 67) myBlock.style.backgroundColor = randomColor();
    else if (keyC === 79) skew(79)
    else if (keyC === 80) skew(80)
    else if (keyC === 82) {
        let temp = movementArray[Math.floor(Math.random() * movementArray.length)]
        addFun(temp)
    }
    else if (keyC === 13 || keyC === 32) mover();
    else if (keyC === 87) goUp();
    else if (keyC === 65) goLeft();
    else if (keyC === 83) goDown();
    else if (keyC === 68) goRight();
    else if (keyC === 84) animationEffect();
    console.log(keyC)
})

let legends = document.getElementById('legend-container')
let legendButton = document.getElementById('legend-button')
let legendInfo = document.getElementById('legend')
legendInfo.style.opacity = '0'
showLegend = false
animation = false
spin = false

function animationEffect() {
    animation = !animation
    // animation ? myBlock.classList.add('animation') && myBlock.classList.remove('animation-reverse') : myBlock.classList.remove('animation-reverse') && myBlock.classList.remove('animation') ;
    if (animation === true) {
        legends.classList.add('animation')
        legends.classList.remove('animation-reverse')
        legendButton.style.display = "none"
        legendInfo.style.display = "block"
        legendInfo.classList.add('legendReveal')
    } else {
        legends.classList.remove('animation')
        legends.classList.add('animation-reverse')
        legendButton.style.display = "block"
        legendInfo.style.display = "none"
    }
}


function spinEffect() {
    spin = !spin
    if (spin === true) {
        myBlock.classList.add('rotationator')
    } else {
        myBlock.classList.remove('rotationator')
    }
}

legends.addEventListener('click', animationEffect)
myBlock.addEventListener('click', spinEffect)

function skew(key) {
    let curSkew
    console.log(myBlock.style.transform)
    if (myBlock.style.transform === '') {
        curSkew = 'skew(0deg)'
    } else {
        curSkew = myBlock.style.transform
    }
    let skewCount = parseInt(curSkew.substr(5,6))

    if (key === 80) {
        skewCount += 5
    }
    else if (key === 79) {
        skewCount -= 5
    }
    myBlock.style.transform = `skew(${skewCount}deg)`
}


function mover() {
    if (funList.length > 0) {
        let cur = myBlock.getBoundingClientRect()
        let el = funList.shift()
        let item = el.textContent.replace('+','')
        myFunctionList.removeChild(el)
        myBlock.innerHTML = "Move: &nbsp" + item;
        if (item == 'left') {
            myBlock.style.left = cur.left - cur.width + 'px'
        }
        if (item == 'right') {
            myBlock.style.left = cur.left + cur.width + 'px'
        }
        if (item == 'up') {
            myBlock.style.top = cur.top - cur.width + 'px'
        }
        if (item == 'down') {
            myBlock.style.top = cur.top + cur.width + 'px'
        }
        setTimeout(mover,300)
    } else {
        myBlock.innerHTML = 'Hello World'
        return
    }
}



function addFun(val) {
    
    let span = document.createElement('span')
    span.textContent = "+"+val
    span.style.padding = '10px'
    span.style.border = '1px solid #ddd'
    span.style.color = 'white'
    span.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'burlywood'
        this.style.color = 'white'
    })
    span.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'rosybrown'
        this.style.color = 'white'
    })
    span.addEventListener('click', function() {
        let curIndex = funList.indexOf(this)
        funList.splice(curIndex,1)
        myFunctionList.removeChild(this)
    })
    myFunctionList.appendChild(span)
    funList.push(span)
}

function randomColor() {
    return "#"+Math.random().toString(16).substr(-6)
}

function goRight() {
    let temp = myBlock.offsetLeft
    temp += 50
    myBlock.style.left = temp + "px"
    return temp
}

function goLeft() {
    let temp = myBlock.offsetLeft
    temp -= 50 
    myBlock.style.left = temp + "px"
}

function goUp() {
    let temp = myBlock.offsetTop
    temp -= 50 
    myBlock.style.top = temp + "px"
}

function goDown() {
    let temp = myBlock.offsetTop
    temp += 50 
    myBlock.style.top = temp + "px"
}

let grows = document.getElementById('grow-button')
let shrinks = document.getElementById('shrink-button')

let scaleInt = 0

function grow() {
    let curWidth = myBlock.clientWidth
    let curHeight = myBlock.clientHeight
    let newWidth = curWidth + 50
    let newHeight = curHeight + 50
    let newTextSize = newHeight * 0.15
    myBlock.style.width = newWidth + 'px'
    myBlock.style.height = newHeight + 'px'
    myBlock.style.fontSize = newHeight + 'px'
    myBlock.style.lineHeight = newHeight + 'px'
    myBlock.style.fontSize = newTextSize + 'px'
    if (myBlock.clientHeight > 1) {
        shrinks.style.visibility = 'visible'
    } else {
        shrinks.style.visibility = 'hidden'
    }
}
function shrink() {
    let curWidth = myBlock.clientWidth
    let curHeight = myBlock.clientHeight
    let newWidth = curWidth - 50
    let newHeight = curHeight - 50
    let newTextSize = newHeight * 0.15
    myBlock.style.width = newWidth + 'px'
    myBlock.style.height = newHeight + 'px'
    myBlock.style.fontSize = newTextSize + 'px'
    myBlock.style.lineHeight = newHeight + 'px'
    if (myBlock.clientHeight > 100) {
        shrinks.style.visibility = 'visible'
    } else {
        shrinks.style.visibility = 'hidden'
    }
}




grows.addEventListener('click', grow)
shrinks.addEventListener('click', shrink)

