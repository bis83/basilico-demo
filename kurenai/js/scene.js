// Copyright (c) bis83. Distributed under the MIT License.

class Scene {
    constructor() {
        this.sceneNo = 0;
        this.highscore = 0;
        this.reset();
    }

    onload(input, sprite) {
        sprite.load("img/title.png");
        sprite.load("img/title_back.png");
        sprite.load("img/back.png");
        sprite.load("img/back2.png");
        sprite.load("img/frame.png");
        sprite.load("img/player.png");
        sprite.load("img/shoot.png");
        sprite.load("img/gate.png");
        sprite.load("img/tama.png");
        sprite.load("img/number.png");
        sprite.load("img/time.png");
        sprite.load("img/gameover.png");
        sprite.load("img/clear.png");
    }

    reset() {
        this.wait = 0;
        this.isGameOver = false;
        this.isComplete = false;

        this.level = 99;
        this.score = 0;
        this.gateTimer = 0;
        this.backgroundTimer = 0;
        this.scoreTimer = 0;
        this.player = {
            x: 320,
            y: 120
        };
        this.shoot = [];
        this.photon = [];
        this.gate = [];
        this.scoreList = [];
    }

    update(input) {
        if(this.sceneNo == 0) {
            this.updateTitle(input);
        } else if(this.sceneNo == 1) {
            this.updateMain(input);
        }
    }

    updateTitle(input) {
        this.wait += 1;
        if(this.wait >= 240) {
            this.wait -= 240;
        }
        if(input.decide()) {
            this.reset();
            this.sceneNo = 1;
        }
    }

    updateMain(input) {
        if(this.wait > 0) {
            this.wait -= 1;
            return;
        }
        if(this.isGameOver || this.isComplete) {
            if(input.decide()) {
                this.sceneNo = 0;
                this.highscore = Math.max(this.highscore, this.score);
            }
            return;
        }

        this.updateShoot();
        this.updatePlayer(input);
        this.updatePhoton();
        this.updateGate();
        this.increaseGateTimer();
        if(this.hitPhotonAndPlayer()) {
            this.isGameOver = true;
            this.wait = 180;
            return;
        }
        this.hitGateAndShoot();
        this.updateScoreList();
        this.limitScore();
        this.increaseBackgroundTimer();
        this.increaseScoreTimer();
        if(this.level == 0 && this.gate.length <= 0) {
            this.isComplete = true;
            this.wait = 180;
            return;
        }
    }

    updatePlayer(input) {
        if(input.decide()) {
            this.createShoot(this.player.x, this.player.y + 32);
        }
        let move = vec2.fromValues(
            (input.left() ? -1.0 : 0.0) + (input.right() ? 1.0 : 0.0),
            (input.down() ? -1.0 : 0.0) + (input.up() ? 1.0 : 0.0));
        vec2.normalize(move, move);
        vec2.scale(move, move, 2);
        this.player.x += move[0];
        this.player.y += move[1];
        this.player.x = Math.min(Math.max(this.player.x, 110+32), 530-32);
        this.player.y = Math.min(Math.max(this.player.y, 30+32), 450-32);
    }

    createShoot(x, y) {
        if(2 <= this.shoot.length) {
            return;
        }
        this.shoot.push({
            x: x,
            y: y,
            active: true
        });
    }

    updateShoot() {
        for(let shoot of this.shoot) {
            shoot.y += 12.0;
            if(shoot.x < 120-16 || 520+16 < shoot.x || shoot.y < 40-16 || 440+16 < shoot.y) {
                shoot.active = false;
            }
        }
        this.shoot = this.shoot.filter(shoot => shoot.active);
    }

    updatePhoton() {
        for(let photon of this.photon) {
            photon.x += photon.vx;
            photon.y += photon.vy;
            if(photon.x < 120-16 || 510+16 < photon.x || photon.y < 40-16 || 440+16 < photon.y) {
                photon.active = false;
            }
        }
        this.photon = this.photon.filter(photon => photon.active);
    }

    createPhoton(type, x, y, vx, vy) {
        if(512 <= this.photon.length) {
            return;
        }
        this.photon.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            type: type,
            active: true
        });
    }

    updateGate() {
        for(let gate of this.gate) {
            gate.time += 1;
            if(gate.time < 0) {
                continue;
            }

            gate.x += gate.vx;
            gate.y += gate.vy;
            if(gate.x < 110+32 || gate.x > 520-32) {
                gate.vx = -gate.vx;
            }
            if(gate.y < 30+32 || gate.y > 450-32) {
                gate.vy = -gate.vy;
            }
            gate.x = Math.min(Math.max(gate.x, 110+32), 530-32);
            gate.y = Math.min(Math.max(gate.y, 30+32), 450-32);
            this.shootPhoton(gate.type, gate.time, gate.level, gate.x, gate.y);
        }
    }

    shootPhoton(type, time, level, x, y) {
        switch(type) {
            case 0: this.shootPhoton0(time, level, x, y); break;
            case 1: this.shootPhoton1(time, level, x, y); break;
            case 2: this.shootPhoton2(time, level, x, y); break;
            case 3: this.shootPhoton3(time, level, x, y); break;
            case 4: this.shootPhoton4(time, level, x, y); break;
            case 5: this.shootPhoton5(time, level, x, y); break;
            case 6: this.shootPhoton6(time, level, x, y); break;
            case 7: this.shootPhoton7(time, level, x, y); break;
        }
    }

    shootPhoton0(time, level, x, y) {
        if(time % (60 - level % 8 * 3) !== 0) {
            return;
        }
        const l = 8 + Math.floor(level / 10);
        for(let i=0; i<l; ++i) {
            const a = glMatrix.toRadian(360 * i / l);
            this.createPhoton(0, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
        }
    }

    shootPhoton1(time, level, x, y) {
        if(time % (60 - level % 10 * 3) !== 0) {
            return;
        }
        const l = 8 + Math.floor(level / 10);
        const r = Math.random() * 360;
        for(let i=0; i<l; ++i) {
            const a = glMatrix.toRadian(r + 180 * i / l);
            this.createPhoton(1, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
        }
    }

    shootPhoton2(time, level, x, y) {
        if(time % (12 - Math.floor(level % 10 / 3)) !== 0) {
            return;
        }
        const l = Math.floor(level / 10) * 10 + 60;
        const a = glMatrix.toRadian(360 * (time % l) / l);
        this.createPhoton(2, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
    }

    shootPhoton3(time, level, x, y) {
        if(time % (30 - level % 10 * 2) !== 0) {
            return;
        }
        const l = 4 + Math.floor(level / 10);
        for(let i=0; i<l; ++i) {
            const r = Math.random() * 360;
            const a = glMatrix.toRadian(r);
            this.createPhoton(3, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
        }
    }

    shootPhoton4(time, level, x, y) {
        if(time % (60 - level % 8 * 3) == 0) {
            const l = 4 + Math.floor(level / 10);
            for(let i=0; i<l; ++i) {
                const a = glMatrix.toRadian(360 * i / l);
                this.createPhoton(4, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
            }
        }
        if((time+30) % (60 - level % 8 * 3) == 0) {
            const l = 4 + Math.floor(level / 10);
            for(let i=0; i<l; ++i) {
                const a = glMatrix.toRadian(360 * (2 * i + 1) / (2 * l));
                this.createPhoton(4, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
            }
        }
    }

    shootPhoton5(time, level, x, y) {
        if(time % (60 - level % 10 * 3) !== 0) {
            return;
        }
        const l = 4 + Math.floor(level / 10);
        const r = Math.random() * 360;
        for(let i=0; i<l; ++i) {
            const a = glMatrix.toRadian(90 * i / l + r);
            this.createPhoton(5, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
            this.createPhoton(5, x, y, 4 * Math.cos(a), 4 * Math.sin(a));
        }
    }

    shootPhoton6(time, level, x, y) {
        if(time % (24 - Math.floor(level % 10 / 3)) !== 0) {
            return;
        }
        const l = Math.floor(level / 10) * 10 + 60;
        const a = glMatrix.toRadian(360 * (time % l) / l);
        this.createPhoton(6, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
        this.createPhoton(6, x, y, -2 * Math.cos(a), -2 * Math.sin(a));
    }

    shootPhoton7(time, level, x, y) {
        if(time % (16 - Math.floor(level % 10 / 3)) !== 0) {
            return;
        }
        const speed = 0.5 * (Math.random() * 5 + 2);
        const l = Math.floor(level / 10) * 10 + 60;
        const a = glMatrix.toRadian(360 * (time % l) / l);
        this.createPhoton(7, x, y, speed * Math.cos(a), speed * Math.sin(a));
    }

    increaseGateTimer() {
        this.gateTimer += 1;
        if(this.gateTimer % 60 == 0 && this.level > 0) {
            if(this.generateNewGates(Math.floor(Math.random() * 7), Math.random() * 300 + 160, Math.random() * 200 + 80, 100 - this.level)) {
                this.level -= 1;
            }
        }
    }

    generateNewGates(type, x, y, level) {
        if(this.gate.length >= Math.floor(level/10)+1) {
            return false;
        }
        const rad = glMatrix.toRadian(360 * Math.random());
        this.gate.push({
            x: x,
            y: y,
            vx: Math.cos(rad),
            vy: Math.sin(rad),
            type: type,
            level: level,
            time: -60,
            active: true
        });
        return true;
    }

    hitPhotonAndPlayer() {
        for(const photon of this.photon) {
            if(Math.pow(photon.x - this.player.x, 2) + Math.pow(photon.y - this.player.y, 2) < Math.pow(6, 2)) {
                return true;
            }
        }
        return false;
    }

    hitShoot(x, y, r) {
        let hit = false;
        for(let shoot of this.shoot) {
            if(Math.pow(shoot.x - x, 2) + Math.pow(shoot.y - y, 2) < Math.pow(r + 16, 2)) {
                shoot.active = false;
                hit = true;
                break;
            }
        }
        if(hit) {
            this.shoot = this.shoot.filter(shoot => shoot.active);
        }
        return hit;
    }

    hitGateAndShoot() {
        let totalScore = 0;
        for(let gate of this.gate) {
            if(gate.time < 0) {
                continue;
            }
            let hit = this.hitShoot(gate.x, gate.y, 32);
            if(hit) {
                gate.active = false;
                const score = 10 * Math.floor(this.scoreTimer / 6) * (100 - this.level);
                this.createScore(gate.x, gate.y, score);
                totalScore += score;
            }
        }
        this.gate = this.gate.filter(gate => gate.active);
        if(totalScore > 0) {
            this.score += totalScore;
            this.scoreTimer = Math.floor(this.scoreTimer / 2);
        }
    }

    updateScoreList() {
        for(let score of this.scoreList) {
            score.time -= 1;
        }
        this.scoreList = this.scoreList.filter(score => score.time > 0);
    }

    createScore(x, y, score) {
        this.scoreList.push({
            x: x,
            y: y,
            score: score,
            time: 120
        });
    }

    limitScore() {
        if(this.score > 99999999) {
            this.score = 99999999;
        }
    }

    increaseBackgroundTimer() {
        this.backgroundTimer += 1;
        if(this.backgroundTimer > 400) {
            this.backgroundTimer -= 400;
        }
    }

    increaseScoreTimer() {
        this.scoreTimer += 1;
        if(this.scoreTimer > 600) {
            this.scoreTimer = 600;
        }
    }

    draw(sprite) {
        if(this.sceneNo == 0) {
            this.drawTitle(sprite);
        } else if(this.sceneNo == 1) {
            this.drawMain(sprite);
        }
    }

    drawTitle(sprite) {
        sprite.texture("img/title_back.png");
        sprite.uv(0, 0, 1, 1);
        sprite.trans(320, 240, 640, 480, 0);
        sprite.color(1, 1, 1, 1);
        sprite.draw();

        sprite.texture("img/title.png");
        sprite.uv(0, 0, 1, 1);
        sprite.trans(320, 300 + 10 * Math.sin(glMatrix.toRadian(360 * this.wait / 240.0)), 640, 240, 0);
        sprite.color(1, 1, 1, 1);
        sprite.draw();

        this.drawNumber(sprite, 244, 60, 1.0, this.highscore, 8);
    }

    drawMain(sprite) {
        this.drawBackground(sprite);
        this.drawGate(sprite);
        this.drawScoreList(sprite);
        this.drawShoot(sprite);
        this.drawPlayer(sprite);
        this.drawPhoton(sprite);
        this.drawFrame(sprite);
        this.drawTimebar(sprite);
        this.drawStatus(sprite);

        this.drawGameOver(sprite);
        this.drawComplete(sprite);
    }

    drawBackground(sprite) {
        const bgColor = (255 - Math.floor(25 + 25 * Math.sin(glMatrix.toRadian(360 * this.backgroundTimer / 400.0)))) / 255.0;
        sprite.texture("img/back.png");
        sprite.color(bgColor, bgColor, bgColor, 196/255.0);
        sprite.uv(0,0,1,1);
        sprite.trans(320, 240, 400, 400, 0);
        sprite.draw();

        sprite.texture("img/back2.png");
        sprite.color(1,1,1,0.5);
        sprite.uv(0,0,1,1);
        sprite.trans(320,240-this.backgroundTimer,400,400,0);
        sprite.draw();
        sprite.trans(320,640-this.backgroundTimer,400,400,0);
        sprite.draw();
    }

    drawGate(sprite) {
        sprite.texture("img/gate.png");
        sprite.uv(0,0,1,1);
        for(const gate of this.gate) {
            const alpha = gate.time >= 0 ? 1.0 : 0.5;
            sprite.color(1, 1, 1, alpha);
            sprite.trans(gate.x, gate.y, 64, 64, 0);
            sprite.draw();
        }
    }

    drawShoot(sprite) {
        sprite.texture("img/shoot.png");
        sprite.color(1,1,1,1);
        sprite.uv(0,0,1,1);
        for(const shoot of this.shoot) {
            sprite.trans(shoot.x, shoot.y, 32, 64, 0);
            sprite.draw();
        }
    }

    drawPlayer(sprite) {
        sprite.texture("img/player.png");
        sprite.color(1,1,1,1);
        sprite.uv(0,0,1,1);
        sprite.trans(this.player.x, this.player.y, 64, 64, 0);
        sprite.draw();
    }

    drawPhoton(sprite) {
        sprite.texture("img/tama.png");
        sprite.color(1,1,1,1);
        for(const photon of this.photon) {
            const rad = Math.atan2(photon.vy, photon.vx);
            sprite.trans(photon.x, photon.y, 16, 16, rad);
            const u = Math.floor(photon.type % 4) * 0.25;
            const v = Math.floor(photon.type / 4) * 0.5;
            sprite.uv(u, v, u + 0.25, v + 0.5);
            sprite.draw();
        }
    }

    drawScoreList(sprite) {
        for(const score of this.scoreList) {
            const digits = String(score.score).length;
            this.drawNumber(sprite, score.x - digits * 12, score.y, 0.5, score.score, digits);
        }
    }

    drawFrame(sprite) {
        sprite.texture("img/frame.png");
        sprite.color(1,1,1,1);
        sprite.uv(0,0,1,1);
        sprite.trans(320, 240, 640, 480, 0);
        sprite.draw();
    }

    drawTimebar(sprite) {
        sprite.texture("img/time.png");
        sprite.color(36/255.0, 36/255.0, 36/255.0, 196/255.0);
        sprite.uv(0,0,1,1);
        sprite.trans(320, 20, 400, 20, 0);
        sprite.draw();

        const w = this.scoreTimer / 600.0;
        sprite.color(1, 1, 1, 196/255.0);
        sprite.uv(0, 0, w, 1);
        sprite.trans(120 + 200 * w, 20, 400 * w, 20, 0);
        sprite.draw();
    }

    drawStatus(sprite) {
        this.drawNumber(sprite, 244, 460, 1.0, this.score, 8);
        this.drawNumber(sprite, 36, 360, 1.5, this.level, 2);
        this.drawNumber(sprite, 80, 24, 1.0, Math.floor(this.scoreTimer/6), 3);
    }

    drawNumber(sprite, x, y, scale, num, digits) {
        sprite.texture("img/number.png");
        sprite.color(1,1,1,1);
        for(let i=0; i<digits; ++i) {
            let a = Math.floor(num / Math.pow(10, digits-i-1)) % 10;
            sprite.trans(x + (24*scale*i), y, (24*scale), (24*scale), 0);
            sprite.uv(0.1 * a, 0, 0.1 * (a + 1), 1);
            sprite.draw();
        }
    }

    drawGameOver(sprite) {
        if(!this.isGameOver) {
            return;
        }

        sprite.texture("img/gameover.png");
        sprite.color(1, 1, 1, (255-this.wait)/255.0);
        sprite.trans(320, 240, 640, 480, 0);
        sprite.uv(0, 0, 1, 1);
        sprite.draw();

        this.drawNumber(sprite, 144, 120, 2.0, this.score, 8);
    }

    drawComplete(sprite) {
        if(!this.isComplete) {
            return;
        }

        sprite.texture("img/clear.png");
        sprite.color(1, 1, 1, (255-this.wait)/255.0);
        sprite.trans(320, 240, 640, 480, 0);
        sprite.uv(0, 0, 1, 1);
        sprite.draw();

        this.drawNumber(sprite, 144, 120, 2.0, this.score, 8);
    }
}