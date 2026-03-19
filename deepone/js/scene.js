// Copyright (c) bis83. Distributed under the MIT License.

class Scene {
    constructor() {
        this.sceneNo = 0;
        this.reset();
    }

    onload(input, sprite) {
        sprite.load("img/title_back.png");
        sprite.load("img/title.png")
        sprite.load("img/push_start.png");
        sprite.load("img/field01.png");
        sprite.load("img/frame.png");
        sprite.load("img/player_cristal.png");
        sprite.load("img/gate.png");
        sprite.load("img/tama.png");
        sprite.load("img/score.png")
        sprite.load("img/level.png");
        sprite.load("img/time.png");
        sprite.load("img/time_f.png");
        sprite.load("img/number.png");
        sprite.load("img/clear.png");
        sprite.load("img/gameover.png");
    }

    reset() {
        this.wait = 0;
        this.isGameOver = false;
        this.isComplete = false;

        this.score = 0;
        this.level = 0;
        this.timer = 60 * 20;
        this.levelTimer = 0;
        this.player = { x: 320, y: 120, color: 0 };
        this.cristal = { x: 320, y: 184, vx: 0, vy: 0, color: 1 };
        this.gates = [];
        this.photons = [];
    }

    update(input) {
        if(this.sceneNo == 0) {
            this.updateTitle(input);
        } else if(this.sceneNo == 1) {
            this.updateMain(input);
        }
    }

    updateTitle(input) {
        if(input.decide()) {
            this.sceneNo = 1;
            this.reset();
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
            }
            return;
        }
        this.updatePlayer(input);
        this.updatePhoton();
        this.updateGate();
        this.generateNewGates();
        this.hitPlayerAndPhoton();
        this.hitPlayerAndGate();
        this.limitScore();
        this.increaseTimer();
        this.increaseLevel();
    }

    reflectCristal(x, y) {
        let vel = vec2.fromValues(this.cristal.x - x, this.cristal.y - y);
        vec2.normalize(vel, vel);
        vec2.scale(vel, vel, 6);
        this.cristal.vx = vel[0];
        this.cristal.vy = vel[1];
    }

    updatePlayer(input) {
        if(input.decide()) {
            if(this.player.color == 0) {
                this.player.color = 1;
                this.cristal.color = 0;
            } else {
                this.player.color = 0;
                this.cristal.color = 1;
            }
        }
        let move = vec2.fromValues(
            (input.left() ? -1.0 : 0.0) + (input.right() ? 1.0 : 0.0),
            (input.down() ? -1.0 : 0.0) + (input.up() ? 1.0 : 0.0));
        vec2.normalize(move, move);
        vec2.scale(move, move, 5);
        this.player.x += move[0];
        this.player.y += move[1];
        this.player.x = Math.min(Math.max(this.player.x, 110+32), 530-32);
        this.player.y = Math.min(Math.max(this.player.y, 30+32), 450-32);

        this.cristal.x += this.cristal.vx;
        this.cristal.y += this.cristal.vy;
        if(Math.pow(this.player.x - this.cristal.x, 2) + Math.pow(this.player.y - this.cristal.y, 2) < Math.pow(64, 2)) {
            this.reflectCristal(this.player.x, this.player.y);
        }
        if(this.cristal.x <= 110+32 || this.cristal.x >= 530-32) {
            this.cristal.vx = -this.cristal.vx;
        }
        if(this.cristal.y <= 30+32 || this.cristal.y >= 450-32) {
            this.cristal.vy = -this.cristal.vy;
        }
        this.cristal.x = Math.min(Math.max(this.cristal.x, 110+32), 530-32);
        this.cristal.y = Math.min(Math.max(this.cristal.y, 30+32), 450-32);
    }

    createPhoton(type, x, y, vx, vy) {
        if(512 <= this.photons.length) {
            return;
        }
        this.photons.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            type: type,
            active: true
        });
    }

    updatePhoton() {
        for(let photon of this.photons) {
            photon.x += photon.vx;
            photon.y += photon.vy;
            if(photon.x < 120-16 || 510+16 < photon.x || photon.y < 40-16 || 440+16 < photon.y) {
                photon.active = false;
            }
        }
        this.photons = this.photons.filter(photon => photon.active);
    }

    shoot(type, time, level, x, y) {
        switch(type) {
            case 0: this.shoot0(time, level, x, y); break;
            case 1: this.shoot1(time, level, x, y); break;
            case 2: this.shoot2(time, level, x, y); break;
            case 3: this.shoot3(time, level, x, y); break;
            case 4: this.shoot4(time, level, x, y); break;
            case 5: this.shoot5(time, level, x, y); break;
            case 6: this.shoot6(time, level, x, y); break;
            case 7: this.shoot7(time, level, x, y); break;
        }
    }

    shoot0(time, level, x, y) {
        if(time % (60 - level % 8 * 3) !== 0) {
            return;
        }
        const l = 8 + Math.floor(level / 10);
        for(let i=0; i<l; ++i) {
            const a = glMatrix.toRadian(360 * i / l);
            this.createPhoton(0, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
        }
    }

    shoot1(time, level, x, y) {
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

    shoot2(time, level, x, y) {
        if(time % (12 - Math.floor(level % 10 / 3)) !== 0) {
            return;
        }
        const l = Math.floor(level / 10) * 10 + 60;
        const a = glMatrix.toRadian(360 * (time % l) / l);
        this.createPhoton(2, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
    }

    shoot3(time, level, x, y) {
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

    shoot4(time, level, x, y) {
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

    shoot5(time, level, x, y) {
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

    shoot6(time, level, x, y) {
        if(time % (24 - Math.floor(level % 10 / 3)) !== 0) {
            return;
        }
        const l = Math.floor(level / 10) * 10 + 60;
        const a = glMatrix.toRadian(360 * (time % l) / l);
        this.createPhoton(6, x, y, 2 * Math.cos(a), 2 * Math.sin(a));
        this.createPhoton(6, x, y, -2 * Math.cos(a), -2 * Math.sin(a));
    }

    shoot7(time, level, x, y) {
        if(time % (16 - Math.floor(level % 10 / 3)) !== 0) {
            return;
        }
        const speed = 0.5 * (Math.random() * 5 + 2);
        const l = Math.floor(level / 10) * 10 + 60;
        const a = glMatrix.toRadian(360 * (time % l) / l);
        this.createPhoton(7, x, y, speed * Math.cos(a), speed * Math.sin(a));
    }

    createGate(type, x, y, level) {
        if(Math.floor(this.level / 10) + 1 <= this.gates.length) {
            return;
        }
        let rad = glMatrix.toRadian(Math.random() * 360);
        this.gates.push({
            x: x,
            y: y,
            vx: Math.cos(rad),
            vy: Math.sin(rad),
            level: level,
            type: type,
            time: -60,
            active: true
        });
    }

    generateNewGates() {
        if(this.timer % 60 == 0) {
            this.createGate(
                Math.floor(Math.random() * 8),
                Math.random() * 300 + 160,
                Math.random() * 300 + 80,
                this.level);
        }
    }

    updateGate() {
        for(let gate of this.gates) {
            gate.time += 1;
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
            this.shoot(gate.type, gate.time, gate.level, gate.x, gate.y);
        }
    }

    hitPlayer(x, y, r, color) {
        if(this.player.color !== color) {
            return false;
        }
        if(Math.pow(this.player.x - x, 2) + Math.pow(this.player.y - y, 2) >= Math.pow(r + 24, 2)) {
            return false;
        }
        return true;
    }

    hitCristal(x, y, r, color) {
        if(this.cristal.color !== color) {
            return false;
        }
        if(Math.pow(this.cristal.x - x, 2) + Math.pow(this.cristal.y - y, 2) >= Math.pow(r + 24, 2)) {
            return false;
        }
        this.reflectCristal(x, y);
        return true;
    }

    hitPlayerAndPhoton() {
        for(let photon of this.photons) {
            if(this.hitPlayer(photon.x, photon.y, 10, photon.type % 2)) {
                photon.active = false;
            } else if(this.hitCristal(photon.x, photon.y, 15, photon.type % 2)) {
                photon.active = false;
            }
        }
        this.photons = this.photons.filter(photon => photon.active);
    }

    hitPlayerAndGate() {
        let count = 0;
        for(let gate of this.gates) {
            if(gate.time < 0) {
                continue;
            }
            if(this.hitCristal(gate.x, gate.y, 32, 0) || this.hitCristal(gate.x, gate.y, 32, 1)) {
                gate.active = false;
                count += 1;
            }
        }
        this.gates = this.gates.filter(gate => gate.active);
        this.score += 200 * count;
        this.timer += (5 - Math.floor(this.level / 20)) * 60 * count;
        if(count > 0 && this.gates.length <= 0) {
            this.timer += 60 * Math.floor(this.level / 20);
            this.score += 1000 * Math.floor(this.level / 20);
        }
        this.timer = Math.min(this.timer, 30 * 60);
    }

    limitScore() {
        if(this.score > 99999999) {
            this.score = 99999999;
        }
    }

    increaseTimer() {
        if(this.timer > 0) {
            this.timer -= 1;
        }
        if(this.timer <= 0) {
            this.wait = 180;
            this.isGameOver = true;
        }
    }

    increaseLevel() {
        this.levelTimer += 1;
        if(this.levelTimer >= 60 * 10) {
            this.levelTimer = 0;
            this.level += 1;
            if(this.level >= 100) {
                this.level = 99;
                this.wait = 180;
                this.isComplete = true;
            }
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
        sprite.uv(0, 0, 1, 1);
        sprite.color(1, 1, 1, 1);

        sprite.texture("img/title_back.png");
        sprite.trans(320, 240, 640, 480, 0);
        sprite.draw();
                
        sprite.texture("img/title.png");
        sprite.trans(320, 300, 640, 240, 0);
        sprite.draw();
        
        sprite.texture("img/push_start.png");
        sprite.trans(320, 100, 320, 120, 0);
        sprite.draw();
    }

    drawMain(sprite) {
        this.drawBackground(sprite);
        this.drawGate(sprite);
        this.drawPlayer(sprite);
        this.drawPhoton(sprite);
        this.drawFrame(sprite);
        this.drawStatus(sprite);
        this.drawGameOver(sprite);
        this.drawComplete(sprite);
    }

    drawBackground(sprite) {
        sprite.texture("img/field01.png");
        sprite.trans(320, 240, 400, 400, 0);
        sprite.uv(0, 0, 1, 1);
        sprite.color(1, 1, 1, 1);
        sprite.draw();
    }

    drawFrame(sprite) {
        sprite.texture("img/frame.png");
        sprite.trans(320, 240, 640, 480, 0);
        sprite.uv(0, 0, 1, 1);
        sprite.color(1, 1, 1, 1);
        sprite.draw();
    }

    drawGate(sprite) {
        sprite.texture("img/gate.png");
        sprite.uv(0,0,1,1);
        for(const gate of this.gates) {
            const rad = glMatrix.toRadian(gate.time);
            sprite.trans(gate.x, gate.y, 64, 64, rad);
            const alpha = gate.time >= 0 ? 1.0 : 0.5;
            sprite.color(1,1,1,alpha);
            sprite.draw();
        }
    }

    drawPlayer(sprite) {
        sprite.texture("img/player_cristal.png");
        sprite.color(1, 1, 1, 1);
        
        let offset = this.player.color == 1 ? 0.5 : 0.0;
        sprite.trans(this.player.x, this.player.y, 64, 64, 0);
        sprite.uv(0 + offset, 0, 0.5 + offset, 0.5);
        sprite.draw();

        offset = this.cristal.color == 1 ? 0.5 : 0.0;
        sprite.trans(this.cristal.x, this.cristal.y, 64, 64, 0);
        sprite.uv(0 + offset, 0.5, 0.5 + offset, 1);
        sprite.draw();
    }

    drawPhoton(sprite) {
        sprite.texture("img/tama.png");
        sprite.color(1,1,1,1);
        for(const photon of this.photons) {
            const rad = Math.atan2(photon.vy, photon.vx);
            sprite.trans(photon.x, photon.y, 32, 32, rad);
            const u = Math.floor(photon.type % 4) * 0.25;
            const v = Math.floor(photon.type / 4) * 0.5;
            sprite.uv(u, v, u + 0.25, v + 0.5);
            sprite.draw();
        }
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

    drawTimebar(sprite) {
        let w = (this.timer / (60.0 * 30));
        
        sprite.texture("img/time.png");
        sprite.color(36/255.0, 36/255.0, 36/255.0, 196/255.0);
        sprite.trans(320, 20, 400, 20, 0);
        sprite.uv(0, 0, 1, 1);
        sprite.draw();
        sprite.color(1, 1, 1, 196/255.0);
        sprite.trans(200 * w + 120, 20, 400 * w, 20, 0);
        sprite.uv(0, 0, w, 1);
        sprite.draw();
    }

    drawStatus(sprite) {
        this.drawTimebar(sprite);

        sprite.texture("img/score.png");
        sprite.color(1,1,1,1);
        sprite.uv(0,0,1,1);
        sprite.trans(190, 460, 120, 40, 0);
        sprite.draw();
        this.drawNumber(sprite, 272, 460, 1.0, this.score, 8);

        sprite.texture("img/level.png");
        sprite.color(1,1,1,1);
        sprite.uv(0,0,1,1);
        sprite.trans(60, 400, 120, 80, 0);
        sprite.draw();
        this.drawNumber(sprite, 38, 344, 1.5, this.level, 2);

        sprite.texture("img/time_f.png");
        sprite.color(1,1,1,1);
        sprite.uv(0,0,1,1);
        sprite.trans(60, 40, 120, 40, 0);
        sprite.draw();
        this.drawNumber(sprite, 92, 28, 1.0, this.timer / 60, 3);
    }

    drawGameOver(sprite) {
        if(!this.isGameOver) return;

        sprite.texture("img/gameover.png");
        sprite.color(1, 1, 1, (255-this.wait)/255.0);
        sprite.trans(320, 240, 640, 480, 0);
        sprite.uv(0, 0, 1, 1);
        sprite.draw();

        this.drawNumber(sprite, 144, 120, 2.0, this.score, 8);
    }

    drawComplete(sprite) {
        if(!this.isComplete) return;

        sprite.texture("img/clear.png");
        sprite.color(1, 1, 1, (255-this.wait)/255.0);
        sprite.trans(320, 240, 640, 480, 0);
        sprite.uv(0, 0, 1, 1);
        sprite.draw();

        this.drawNumber(sprite, 144, 120, 2.0, this.score, 8);
    }
}