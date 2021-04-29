class Game {
    constructor(inputsForNames, nameplaces, victim, firstBall, secondBall) {
        this.inputsForNames = inputsForNames;
        this.victim = victim; 
        this.firstBall = firstBall;
        this.secondBall = secondBall;
        this.nameplaces = nameplaces;
    }

    start() {
        console.log(this.firstBall)
    } 
}

let inputsForNames = document.querySelectorAll('.playerName');
let namePlaces = document.getElementsByTagName('span');

for (let i = 0; i < inputsForNames.length; i++) {
    inputsForNames[i].addEventListener('input', () => {
        console.log(14)
    });
    
}

let victim = new Victim(300, 700);

let newBall = new Ball(inputsForNames[0].value, 450, 350, {
    top: 'ArrowUp',
    bottom: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
}, victim, 'assets/kokordilos.gif', 'scoreContainer1');

let newBall2 = new Ball(inputsForNames[1].value, 500, 50, {
    top: 'w',
    bottom: 's',
    left: 'a',
    right: 'd'
}, victim, 'assets/balam.gif', 'scoreContainer2');


let newGame = new Game(inputsForNames, namePlaces, victim, newBall, newBall2);
document.getElementById('btn').addEventListener('click', newGame.start);
















