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

    getBall () {
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
    }


    updateScore() {
        this.score++;
        document.getElementById(this.id).value = this.score;
        if (this.score === 100) {
            this.score = 0;
            document.getElementById(this.id).innerHTML = this.score;
            alert(`${this.name} wins!`);
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

    shouldEatBall(el) {
        this.player.offsetBottom = this.player.offsetTop + this.player.offsetHeight;
        this.player.offsetRight = this.player.offsetLeft + this.player.offsetWidth;
        el.offsetBottom = el.offsetTop + el.offsetHeight;
        el.offsetRight = el.offsetLeft + el.offsetWidth;
    
        return !((this.player.offsetBottom < el.offsetTop) ||
            (this.player.offsetTop > el.offsetBottom) ||
            (this.player.offsetRight < el.offsetLeft) ||
            (this.player.offsetLeft > el.offsetRight))
    }
}
