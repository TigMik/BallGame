class Ball {

    constructor(name, top, left, directions, victim, imgSrc, id, speed, addSize) {
        this.name = name;
        this.top = top;
        this.left = left;
        this.directions = directions;
        this.victim = victim;
        this.imgSrc = imgSrc;
        this.id = id;
        this.speed = speed;
        this.addSize = addSize;
        this.player = document.createElement('img');
        this.player.src = this.imgSrc;
        this.playerStyle = this.player.style;
        this.playerStyle.position = 'absolute';
        this.playerStyle.width = '100px';
        this.playerStyle.height = '100px';
        this.playerStyle.transform = 'scaleX(1)';
        document.body.append(this.player);
        this.playerStyle.left = left + 'px';
        this.playerStyle.top = top + 'px';
        this.intervalId = null;
        this.score = 0;
        document.addEventListener('keydown', event => {
            this.checkKey(event);
            event.preventDefault();
        })
    }

    checkKey(e) {
        if (Object.values(this.directions).includes(e.key)) {
            clearInterval(this.intervalId);
        }
        switch (e.key) {
            case this.directions.top:
                this.intervalId = setInterval(this.moveUp.bind(this), this.speed);
                break;
            case this.directions.bottom:
                this.intervalId = setInterval(this.moveDown.bind(this), this.speed);
                break;
            case this.directions.left:
                this.intervalId = setInterval(this.moveLeft.bind(this), this.speed);
                break;
            case this.directions.right:
                this.intervalId = setInterval(this.moveRight.bind(this), this.speed);
                break;
            default:
                break;
        }
    }


    moveUp() {
        if (this.top > 0) {
            this.top -= 5;
            this.updateStyle();
        } else {
            clearInterval(this.intervalId);
        }
    }

    moveRight() {
        if (this.left < document.body.clientWidth - 105) {
            this.playerStyle.transform = 'scaleX(1)';
            this.left += 5;
            this.updateStyle();
        } else {
            clearInterval(this.intervalId);
        }
    }

    moveLeft() {
        if (this.left > 0) {
            this.playerStyle.transform = 'scaleX(-1)';
            this.left -= 5;
            this.updateStyle();
        } else {
            clearInterval(this.intervalId);
        }
    }

    getBall() {
        return this.player;
    }

    moveDown() {
        if (this.top < document.body.clientHeight - 105) {
            this.top += 5;
            this.updateStyle();
        } else {
            clearInterval(this.intervalId);
        }
    }


    updateStyle() {
        this.playerStyle.left = this.left + 'px';
        this.playerStyle.top = this.top + 'px';

        if (this.shouldEatVictim(this.player, this.victim.victim)) {
            this.victim.die();
            this.updateScore();
            this.victim.update();
            this.speed++;
            this.playerStyle.width = (parseInt(this.playerStyle.width) + this.addSize) + 'px';
            this.playerStyle.height = (parseInt(this.playerStyle.height) + this.addSize) + 'px';
        }

        if (this.shouldEatBall()) {
            this.enemy.playerStyle.display = 'none';

            setTimeout(() => {
                this.enemy.playerStyle.display = 'block';
                this.enemy.playerStyle.top = Math.round(Math.random() * document.body.clientHeight - parseInt(this.enemy.playerStyle.height)) + 'px';
                this.enemy.playerStyle.left = Math.round(Math.random() * document.body.clientWidth - parseInt(this.enemy.playerStyle.width)) + 'px';
               
            }, 1000);
            console.log('I can eat');
        }
    }


    updateScore() {
        this.score++;
        document.getElementById(this.id).value = this.score;
        if (this.score === 3) {
            this.score = 0;
            document.getElementById(this.id).innerHTML = this.score;
            alert(`${this.name} wins!`);
            clearInterval(this.intervalId);
            this.playerStyle.top = Math.round(Math.random() * document.body.clientHeight - parseInt(this.playerStyle.height)) + 'px';
            this.playerStyle.left = Math.round(Math.random() * document.body.clientWidth - parseInt(this.playerStyle.width)) + 'px';
            this.enemy.playerStyle.top = Math.round(Math.random() * document.body.clientHeight - parseInt(this.enemy.playerStyle.height)) + 'px';
            this.enemy.playerStyle.left = Math.round(Math.random() * document.body.clientWidth - parseInt(this.enemy.playerStyle.width)) + 'px';
            document.getElementById(this.id).innerHTML = 0;
        }
    }

    getScore() {
        this.updateScore();
        return this.score;
    }

    shouldEatVictim(el1, el2) {
        el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
        el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
        el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
        el2.offsetRight = el2.offsetLeft + el2.offsetWidth;

        return !((el1.offsetBottom < el2.offsetTop) ||
            (el1.offsetTop > el2.offsetBottom) ||
            (el1.offsetRight < el2.offsetLeft) ||
            (el1.offsetLeft > el2.offsetRight))
    }

    shouldEatBall() {
        const playersConnected = this.shouldEatVictim(this.player, this.enemy.player);
        const icanEat = this.score > this.enemy.score;
        return playersConnected && icanEat;
    }

    registnerEnemy(enemy) {
        this.enemy = enemy;
    }
}

function log(str) {
    console.log(str);
}

function sayInfo() {
    console.log(`Javascript was created in 1995. It is the best programming language in the world.`);
}


function ProgrammingLanguage(name, creationDate, type, paradigm, typing, oop, log, sayInfo) {
    this.name = name;
    this.creationDate = creationDate;
    this.type = type;
    this.paradigm = paradigm;
    this.typing = typing;
    this.oop = oop;
    this.log = log;
    this.sayInfo = sayInfo;
}


const js = new ProgrammingLanguage('JavaScript', 1995, 'interpreted', 'multi-paradigm', 'dynamic', 'prototype-based', log, sayInfo);
