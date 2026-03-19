// Copyright (c) bis83. Distributed under the MIT License.

class Scene {
    constructor() {
        this.hiscore = 12261;
        this.wait = 0;
        this.reset();
    }

    reset() {
        this.score = 12261;
        this.life = 3 * 60 * 60;
        this.x = 5;
        this.y = 4;
        this.dir = 1;
        this.displayBias = 0;
        this.isGameOver = false;
        this.isGameStart = false;
        this.speed = 0.01;
        this.isSpeedUp = false;
        this.particleBooster = [];
        this.particleDestroy = [];
        this.fillRocks();
    }

    fillRocks() {
        this.rocks = [];
        for(let i=0; i<13; ++i) {
            let line = [];
            for(let j=0; j<9; ++j) {
                line.push({ type: 0, life: 50 });
            }
            this.rocks.push(line);
        }
        for(let i = 0; i < (this.x + 1); ++i) {
            this.rocks[i][this.y].life = 0;
        }
     }

    onload(input, fx) {
        fx.sprite.load("img/title.png");
        fx.sprite.load("img/drillui.png");
        fx.model.load("json/drill.json");
        fx.model.load("json/rock_a.json");
        fx.model.load("json/rock_b.json");
    }

    update(input) {
        if(!this.isGameStart) {
            this.updateStart(input);
            return;
        }
        if(this.isGameOver) {
            this.updateGameOver(input);
            return;
        }
        this.updateMain(input);
    }

    updateStart(input) {
        if(input.decide()) {
            this.isGameStart = true;
        }
    }

    updateMain(input) {
        if(this.wait > 0) {
            this.wait -= 1;
            return;
        }

        this.dirDrill(input);
        if(input.decide()) {
            this.speedUpDrill();
        }
        this.attackDrill();
        this.speedDownDrill();
        this.consumeDrill();
        this.scrollRocks();
    }

    gameOver() {
        this.isGameOver = true;
        this.wait = 120;
        if(this.hiscore < this.score) {
            this.hiscore = this.score;
        }
    }

    dirDrill(input) {
        if(input.up()) {
            this.dir = 0;
            if(this.y <= 0) {
                this.dir = 1;
            }
        } else if(input.down()) {
            this.dir = 2;
            if(this.y >= 8) {
                this.dir = 1;
            }
        } else {
            this.dir = 1;
        }
    }

    speedUpDrill() {
        if(this.speed < 0.5) {
            this.isSpeedUp = true;
            this.speed += 0.01;
            this.emitParticleBooster(50, 40);
        }
    }

    attackDrill() {
        const damage = (this.speed * 100) + (this.isSpeedUp ? 50 : 0);
        this.isSpeedUp = false;

        let x = this.x + ((this.dir == 1) || !(this.y % 2 == 0) ? 1 : 0);
        let y = this.y + this.dir - 1;
        if(x >= 12) {
            return;
        }
        if(this.rocks[x][y].life > 0) {
            this.rocks[x][y].life -= damage;
            if(this.rocks[x][y].life <= 0) {
                this.emitPartcleDestroy(50, 50);
            }
            else {
                this.emitPartcleDestroy(4, 30);
            }
        }
        if(this.rocks[x][y].life <= 0) {
            this.x = x;
            this.y = y;
            if(this.y <= 0 || this.y >= 8) {
                this.dir = 1;
            }
        }
    }

    speedDownDrill() {
        if(this.life % 30 == 0 && this.speed > 0.01) {
            this.speed -= 0.01;
        }
    }

    consumeDrill() {
        this.life -= 1;
        if(this.life < 0) {
            this.gameOver();
        }
    }

    scrollRocks() {
        this.displayBias += this.speed;
        this.score += 100 * this.speed;
        if(this.displayBias >= 1) {
            this.nextRocks();
            this.displayBias = 0;
        }
    }

    nextRocks() {
        this.x -= 1;
        if(this.x < 0) {
            this.gameOver();
        }

        this.rocks.shift();
        let line = [];
        for(let j=0; j<9; ++j) {
            if(Math.random() < 0.1) {
                line.push({ type: 1, life: 1000 });
            } else {
                line.push({ type: 0, life: 50 });
            }
        }
        this.rocks.push(line);
    }

    updateGameOver(input) {
        if(this.wait > 0) {
            this.wait -= 1;
            return;
        }
        if(input.decide()) {
            this.reset();
        }
    }

    emitParticleBooster(count, radius) {
        const d3 = 2 * Math.PI * (30 - this.dir * 30) / 360;
        for(let i = 0; i < count; ++i) {
            const d = 2 * Math.PI * Math.random();
            const d2 = radius * Math.random();
            const x = (this.x * 60) - (60 * this.displayBias) - ((this.y % 2 == 0) ? 30 : 0);
            const y = 480 - (this.y * 60) - (2 - Math.floor(Math.random() * 4));
            this.particleBooster.push({
                life: (5 + Math.floor(Math.random() * 35)),
                x: x + d2 * Math.cos(d) - 50 * Math.cos(d3),
                y: y + 0.5 * d2 * Math.sin(d) - 50 * Math.sin(d3)
            });
        }
    }

    emitPartcleDestroy(count, radius) {
        const d3 = 2 * Math.PI * (30 - this.dir * 30) / 360;
        for(let i = 0; i < count; ++i) {
            const d = 2 * Math.PI * Math.random();
            const d2 = radius * Math.random();
            const x = (this.x * 60) - (60 * this.displayBias) - ((this.y % 2 == 0) ? 30 : 0);
            const y = 480 - (this.y * 60) - (2 - Math.floor(Math.random() * 4));
            this.particleDestroy.push({
                life: (4 + Math.floor(Math.random() * 10)),
                x: x + 0.75 * d2 * Math.cos(d) + 40 * Math.cos(d3),
                y: y + d2 * Math.sin(d) + 40 * Math.sin(d3)
            });
        }
    }

    stepParticles() {
        for(let item of this.particleBooster) {
            item.life -= 1;
            item.x -= this.speed * 50;
        }
        for(let item of this.particleDestroy) {
            item.life -= 1;
            item.x -= this.speed * 50;
        }
        this.particleBooster = this.particleBooster.filter(item => item.life > 0);
        this.particleDestroy = this.particleDestroy.filter(item => item.life > 0);
    }

    draw(fx) {
        this.drawBackground(fx);
        this.drawRocks(fx);
        this.drawDrillTank(fx);
        this.stepParticles();
        this.drawParticles(fx);
        this.drawHud(fx);
    }

    drawBackground(fx) {
        fx.sprite.texture("img/drillui.png");
        fx.sprite.color(1, 1, 1, 1);
        fx.sprite.trans(320, 240, 640, 480, 0);
        fx.sprite.uv(0, 480/1024, 640/1024, 960/1024);
        fx.sprite.draw();
    }

    drawRocks(fx) {
        for(let i=0; i<this.rocks.length; ++i) {
            for(let j=0; j<this.rocks[i].length; ++j) {
                if(this.rocks[i][j].life <= 0) {
                    continue;
                }
                if(this.rocks[i][j].type == 0) {
                    fx.model.model("json/rock_a.json");
                } else {
                    fx.model.model("json/rock_b.json");
                }
                const x = (i * 60) - (60 * this.displayBias) - ((j % 2 == 0) ? 30 : 0);
                const y = 480 - (j * 60);
                fx.model.trans(25, x, y, 0);
                fx.model.draw();
            }
        }
    }

    drawDrillTank(fx) {
        fx.model.model("json/drill.json");
        const x = (this.x * 60) - (60 * this.displayBias) - ((this.y % 2 == 0) ? 30 : 0) - (2 - Math.floor(Math.random() * 4));
        const y = 480 - (this.y * 60) - (2 - Math.floor(Math.random() * 4));
        const r = (2 * Math.PI) * (40 - this.dir * 40) / 360;
        fx.model.trans(20, x, y, r);
        fx.model.draw();
    }

    drawParticles(fx) {
        fx.sprite.blend(1);
        fx.sprite.texture("img/drillui.png");
        fx.sprite.color(1, 1, 1, 1);
        fx.sprite.uv(640/1024, 72/1024, 648/1024, 80/1024);
        for(const item of this.particleBooster) {
            fx.sprite.trans(item.x, item.y, 8, 8, 0);
            fx.sprite.draw();
        }
        fx.sprite.uv(648/1024, 72/1024, 656/1024, 80/1024);
        for(const item of this.particleDestroy) {
            fx.sprite.trans(item.x, item.y, 8, 8, 0);
            fx.sprite.draw();
        }
        fx.sprite.blend(0);
    }

    drawHud(fx) {
        fx.sprite.texture("img/drillui.png");
        fx.sprite.uv(0, 0, 640/1024, 480/1024);
        fx.sprite.color(1, 1, 1, 1);
        fx.sprite.trans(320, 240, 640, 480, 0);
        fx.sprite.draw();
        this.drawLifeBar(fx);
        this.drawSpeedBar(fx);
        this.drawDepthBar(fx);
        if(!this.isGameStart) {
            this.drawTitle(fx);
        }
        if(this.isGameOver) {
            this.drawGameOver(fx);
        }
    }

    drawLifeBar(fx) {
        fx.sprite.texture("img/drillui.png");
        fx.sprite.uv(640/1024, 4/1024, 644/1024, 24/1024);
        fx.sprite.color(1, 1, 1, 1);
        const n = Math.floor(this.life / 180);
        for(let i = 0; i < n; ++i) {
            fx.sprite.trans(320 + 6 * i - 178, 240 - 228, 4, 20, 0);
            fx.sprite.draw();
        }
    }

    drawSpeedBar(fx) {
        fx.sprite.texture("img/drillui.png");
        fx.sprite.uv(640/1024, 0/1024, 704/1024, 4/1024);
        fx.sprite.color(1, 1, 1, 1);
        const n = Math.floor(this.speed * 100);
        for(let i = 0; i < n; ++i) {
            fx.sprite.trans(320 - 244, 240 + (6 * i) - 214, 64, 4, 0);
            fx.sprite.draw();
        }
    }

    drawDepthBar(fx) {
        fx.sprite.texture("img/drillui.png");
        fx.sprite.uv(640/1024, 24/1024, 656/1024, 40/1024);
        fx.sprite.color(1, 1, 1, 1);
        fx.sprite.trans(320 + 312, 240 + 220 - 450 * (this.score / 2600000), 16, 16, 0);
        fx.sprite.draw();
        this.drawNumber(fx, 320 + 140, 240 + 208, this.score);
    }

    drawNumber(fx, x, y, val) {
        fx.sprite.texture("img/drillui.png");
        fx.sprite.color(1, 1, 1, 1);
        const digits = 7;
        for(let i = 0; i < digits; ++i) {
            const a = Math.floor(val / Math.pow(10, digits-i-1)) % 10;
            const u = 640 + (a * 20);
            fx.sprite.uv(u/1024, 40/1024, (u+20)/1024, (40+32)/1024);
            fx.sprite.trans(x + (i * 20), y, 20, 32, 0);
            fx.sprite.draw();
        }
    }

    drawTitle(fx) {
        fx.sprite.texture("img/title.png");
        fx.sprite.uv(0, 0, 640/1024, 480/1024);
        fx.sprite.color(1, 1, 1, 1);
        fx.sprite.trans(320, 240, 640, 480, 0);
        fx.sprite.draw();
    }

    drawGameOver(fx) {
        fx.sprite.texture("img/title.png");
        fx.sprite.uv(0, 480/1024, 640/1024, 960/1024);
        fx.sprite.color(1, 1, 1, 1);
        fx.sprite.trans(320, 240, 640, 480, 0);
        fx.sprite.draw();
    }
}