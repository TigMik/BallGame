document.getElementById('btn').addEventListener('click', startGame);

function startGame() { 
    const inputsForNames = document.querySelectorAll('.playerName');


    if (inputsForNames[0].value.length >= 3 && inputsForNames[1].value.length >= 3) {

        const victim = new Victim(300, 700);
        const newBall = new Ball(inputsForNames[0].value, 450, 350, {
            top: 'ArrowUp',
            bottom: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight'
        }, victim, 'assets/kokordilos.gif', 'scoreContainer1', 10, 10);
        const newBall2 = new Ball(inputsForNames[1].value, 200, 50, {
            top: 'w',
            bottom: 's',
            left: 'a',
            right: 'd'
        }, victim, 'assets/200w.webp', 'scoreContainer2', 10, 10);
        newBall.registnerEnemy(newBall2);
        newBall2.registnerEnemy(newBall);

        const namePlaces = document.getElementsByTagName('span');
        namePlaces[0].innerHTML = inputsForNames[0].value;
        namePlaces[1].innerHTML = inputsForNames[1].value;


        document.getElementsByClassName('game')[0].remove();


    } else if (inputsForNames[0].value.length < 3) {
        document.getElementById('errorMessage1').innerHTML = 'Your name must have at least 3 letters';
    } else if (inputsForNames[1].value.length < 3) {
        document.getElementById('errorMessage2').innerHTML = 'Your name must have at least 3 letters';
    }
}