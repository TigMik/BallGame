class Victim {
    constructor(top, left) {

        this.top = top;
        this.left = left;
        this.victim = document.createElement('div');
        this.victim.className = 'victim';
        this.victimStyle = this.victim.style;
        this.victimStyle.position = 'absolute';
        this.victimStyle.backgroundColor = 'yellow';
        this.victimStyle.width = '30px';
        this.victimStyle.height = '30px';
        document.body.append(this.victim);
        this.victimStyle.top = top + 'px';
        this.victimStyle.left = left + 'px';
    }

    die() {
        document.body.removeChild(this.victim);
    }

    update() {
        this.victimStyle.top = Math.round(Math.random() * document.body.clientHeight - parseInt(this.victimStyle.height)) + 'px';
        this.victimStyle.left = Math.round(Math.random() * document.body.clientWidth - parseInt(this.victimStyle.width)) + 'px';
        document.body.appendChild(this.victim);
    }
}