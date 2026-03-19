// Copyright (c) bis83. Distributed under the MIT License.

class Scene {
    constructor() {
        this.sceneNo = 0;
        this.menuIndex = 0;
        this.wait = 0;
    }

    onload(input, fx) {
        fx.sprite.load("img/sky.png");
        fx.sprite.load("img/menu0.png");
        fx.sprite.load("img/menu1.png");
        fx.sprite.load("img/menu2.png");
        fx.sprite.load("img/top.png");
        fx.ocean.load("img/normal.png", "img/ref.png");
    }

    reset() {
        this.wait = 0;
        this.ocean = {
            delta: 0.002,
            height: 1.0,
            x: 0,
            y: 0
        };
        this.map = {
            width: 0,
            height: 0,
            treasure: 0,
            space: []
        };
        this.player = {
            rx: 0,
            rz: 0,
            x: 0,
            z: 0,
            dir: 0,
            gold: 0
        };
        this.camera = {
            position: vec4.fromValues(0.0, 30.0, -25.0, 1.0),
            lookAt: vec4.fromValues(0.0, 0.0, 0.0, 1.0),
            up: vec4.fromValues(0.0, 1.0, 0.0, 1.0),
            fov: Math.PI/15,
            zNear: 0.1,
            zFar: 1000.0,
            aspect: 960.0 / 540.0
        };

        this.days = 0;
        this.dateToday = this.dateYesterday = this.dateSonar = this.dateSalvage = Date.now();

        this.isDoSalvage = false;
        this.isDoSonar = false;
        this.isComplete = false;
        this.isGameOver = false;
    }

    update(input) {
        if(this.sceneNo == 0) {
            this.updateMenu(input);
        }
        else if(this.sceneNo == 1) {
            this.updateGame(input);
        }
    }

    updateMenu(input) {
        if(this.wait > 0) {
            this.wait -= 1;
            return;
        }

        if(input.up()) {
            this.menuIndex -= 1;
            if(this.menuIndex < 0) {
                this.menuIndex = 2;
            }
            this.wait = 10;
        }
        if(input.down()) {
            this.menuIndex += 1;
            if(this.menuIndex > 2) {
                this.menuIndex = 0;
            }
            this.wait = 10;
            return;
        }
        if(input.pressZ()) {
            this.reset();
            if(this.menuIndex == 0) {
                this.createNewGame(9, 9, 10, 1);
            } else if(this.menuIndex == 1) {
                this.createNewGame(17, 17, 40, 2);
            } else if(this.menuIndex == 2) {
                this.createNewGame(29, 29, 99, 3);
            }
            this.sceneNo = 1;
            return;
        }
    }

    createNewGame(width, height, treasureNum, difficulty) {
        this.map.width = width;
        this.map.height = height;
        this.map.treasure = treasureNum;
        this.map.space = [];
        for(let i=0; i<this.map.width; ++i) {
            let line = [];
            for(let j=0; j<this.map.height; ++j) {
                line.push({
                    treasure: 0,
                    info: 0,
                    searched: false
                });
            }
            this.map.space.push(line);
        }
        for(let i=0; i<this.map.treasure; ++i) {
            let x = Math.floor(Math.random() * this.map.width);
            let z = Math.floor(Math.random() * this.map.height);
            if(this.map.space[x][z].treasure == 0) {
                this.map.space[x][z].treasure = 12000;
            } else {
                --i;
            }
        }
        this.dateToday = this.dateYesterday = Date.now();
        this.days = 0;
        this.isDoSonar = false;
        this.isDoSalvage = false;
        this.player.gold = 10000 * difficulty;
        this.player.dir = 0;
        this.player.x = Math.floor(width / 2);
        this.player.z = Math.floor(height / 2);
        this.player.rx = 0;
        this.player.rz = 0;
        switch(width) {
            case 9: this.camera.fov = Math.PI / 15; break;
            case 17: this.camera.fov = Math.PI / 8; break;
            case 29: this.camera.fov = Math.PI / 4; break;
        }
    }

    updateGame(input) {
        if(this.isComplete || this.isGameOver) {
            this.sceneNo = 0;
            return;
        }

        if(this.map.treasure <= 0) {
            window.alert("ゲームクリア　おめでとうございます！！");
            this.isComplete = true;
            return;
        }

        this.updateTime();
        if(!this.isDoSalvage && this.player.gold < 0) {
            window.alert("資金が底を尽きました。");
            this.isGameOver = true;
            return;
        }

        if(this.isDoSonar) {
            this.endSonar();
            return;
        }
        if(input.pressZ()) {
            this.startSonar();
            return;
        }

        if(this.isDoSalvage) {
            this.endSalvage();
            return;
        }
        if(input.pressX()) {
            this.startSalvage();
            return;
        }

        if(input.up()) {
            this.menuIndex -= 1;
            if(this.menuIndex < 0) {
                this.menuIndex = 2;
            }
            this.wait = 10;
        }
        if(input.down()) {
            this.menuIndex += 1;
            if(this.menuIndex > 2) {
                this.menuIndex = 0;
            }
            this.wait = 10;
        }

        if(input.up()) {
            this.turnPlayer(0);
        } else if(input.right()) {
            this.turnPlayer(1);
        } else if(input.down()) {
            this.turnPlayer(2);
        } else if(input.left()) {
            this.turnPlayer(3);
        }
        this.movePlayer();
        if(this.player.x < 0 || this.map.width <= this.player.x || this.player.z < 0 || this.map.height <= this.player.z) {
            window.alert("領域外に出ました。");
            this.isGameOver = true;
            return;
        }
    }

    updateTime() {
        this.dateToday = Date.now();
        if(this.dateToday - this.dateYesterday >= 1000) {
            this.dateYesterday = this.dateToday;
            this.days += 1;
            this.player.gold -= 100 * Math.floor(this.days / 100 + 1);
        }
    }

    turnPlayer(dir) {
        this.player.dir = dir;
    }

    movePlayer() {
        if(this.player.dir == 0) {
            this.player.rz += 0.02;
        } else if(this.player.dir == 1) {
            this.player.rx -= 0.02;
        } else if(this.player.dir == 2) {
            this.player.rz -= 0.02;
        } else if(this.player.dir == 3) {
            this.player.rx += 0.02;
        }
        this.player.x = + Math.floor(this.player.rx + 0.5) + Math.floor(this.map.width / 2);
        this.player.z = - Math.floor(this.player.rz + 0.5) + Math.floor(this.map.height / 2);
    }

    startSonar() {
        this.dateSonar = this.dateToday;
        this.isDoSonar = true;
    }

    endSonar() {
        if(this.dateToday - this.dateSonar < 1000) {
            return;
        }
        this.isDoSonar = false;

        for(let i=0; i<this.map.width; ++i) {
            for(let j=0; j<this.map.height; ++j) {
                this.map.space[i][j].info = 0;
                this.map.space[i][j].searched = false;
            }
        }
        if(this.player.x > 0) {
            this.stepSonar(this.player.x - 1, this.player.z);
        }
        if(this.player.x < this.map.width - 1) {
            this.stepSonar(this.player.x + 1, this.player.z);
        }
        if(this.player.z > 0) {
            this.stepSonar(this.player.x, this.player.z - 1);
        }
        if(this.player.z < this.map.height - 1) {
            this.stepSonar(this.player.x, this.player.z + 1);
        }
    }

    stepSonar(x, z) {
        if(this.map.space[x][z].searched) {
            return;
        }
        let count = 0;
        for(let i=-1; i<=1; ++i) {
            for(let j=-1; j<=1; ++j) {
                if(x == 0 && i == -1) {
                    continue;
                }
                if(x == this.map.width - 1 && i == 1) {
                    continue;
                }
                if(z == 0 && j == -1) {
                    continue;
                }
                if(z == this.map.height - 1 && j == 1) {
                    continue;
                }
                if(this.map.space[x+i][z+j].treasure > 0) {
                    count += 1;
                }
            }
        }
        this.map.space[x][z].searched = true;
        if(count == 0) {
            if(x > 0) {
                this.stepSonar(x - 1, z);
            }
            if(x < this.map.width - 1) {
                this.stepSonar(x + 1, z);
            }
            if(z > 0) {
                this.stepSonar(x, z - 1);
            }
            if(z < this.map.height - 1) {
                this.stepSonar(x, z + 1);
            }
        } else {
            this.map.space[x][z].info = count;
        }
    }

    startSalvage() {
        this.dateSalvage = this.dateToday;
        this.isDoSalvage = true;
        this.player.gold -= 10000;
    }

    endSalvage() {
        if(this.dateToday - this.dateSalvage < 3000) {
            return;
        }
        this.isDoSalvage = false;

        if(this.map.space[this.player.x][this.player.z].treasure > 0) {
            this.player.gold += this.map.space[this.player.x][this.player.z].treasure;
            this.map.space[this.player.x][this.player.z].treasure = 0;
            this.map.treasure -= 1;
        }
    }

    draw(fx) {
        if(this.sceneNo == 0) {
            this.drawMenu(fx);
        }
        else if(this.sceneNo == 1) {
            this.drawGame(fx);
        }
    }

    drawMenu(fx) {
        this.drawSky(fx);

        fx.sprite.color(1,1,1,1);
        fx.sprite.uv(0,0,1,1);
        fx.sprite.texture("img/top.png");
        fx.sprite.trans(240, 256+16, 512, 512, 0);
        fx.sprite.draw();
        fx.sprite.texture("img/menu0.png");
        fx.sprite.trans(906 - (this.menuIndex == 0 ? 150 : 0), 440 - (150 * 0), 512, 128, 0);
        fx.sprite.draw();
        fx.sprite.texture("img/menu1.png");
        fx.sprite.trans(906 - (this.menuIndex == 1 ? 150 : 0), 440 - (150 * 1), 512, 128, 0);
        fx.sprite.draw();
        fx.sprite.texture("img/menu2.png");
        fx.sprite.trans(906 - (this.menuIndex == 2 ? 150 : 0), 440 - (150 * 2), 512, 128, 0);
        fx.sprite.draw();

        this.clearState();
    }

    drawGame(fx) {
        this.drawSky(fx);
        this.drawOcean(fx);
        this.drawShip(fx);
        
        this.drawState();
    }

    drawSky(fx) {
        fx.sprite.texture("img/sky.png");
        fx.sprite.trans(480,270,960,540,0);
        fx.sprite.color(1,1,1,1);
        fx.sprite.uv(0,0,1,1);
        fx.sprite.draw();
    }

    animateOcean() {
        this.ocean.x += 0.002;
        this.ocean.height += this.ocean.delta;
        if(this.ocean.height <= 0.8) {
            this.ocean.delta = 0.004;
        } else if(this.ocean.height > 1.2) {
            this.ocean.delta = -0.004;
        }
    }

    drawOcean(fx) {
        this.animateOcean();
        fx.ocean.camera(this.camera.position, this.camera.lookAt, this.camera.up, this.camera.fov, this.camera.aspect, this.camera.zNear, this.camera.zFar);
        fx.ocean.param(this.ocean.x, this.ocean.y, this.ocean.height);
        for(let i=0; i<this.map.width; ++i) {
            for(let j=0; j<this.map.height; ++j) {
                let x = -Math.floor(this.map.width /2) + i * 1.0;
                let z = +Math.floor(this.map.height/2) - j * 1.0;
                fx.ocean.trans(x, z);
                switch(this.map.space[i][j].info) {
                    case 0: fx.ocean.color(0.1, 0.1, 0.5, 1.0); break;
                    case 1: fx.ocean.color(0.1, 0.4, 0.5, 1.0); break;
                    case 2: fx.ocean.color(0.5, 0.5, 0.1, 1.0); break;
                    default: fx.ocean.color(0.4, 0.1, 0.5, 1.0); break;
                }
                if(this.player.x == i && this.player.z == j) {
                    fx.ocean.color(0.4, 0.4, 0.4, 1.0);
                }
                fx.ocean.draw();
            }
        }
    }

    drawShip(fx) {
        if(this.isDoSonar) {
            fx.ship.color(0.8, 0.8, 0.0, 1.0);
        } else if(this.isDoSalvage) {
            fx.ship.color(0.8, 0.0, 0.0, 1.0);
        } else {
            fx.ship.color(0.0, 0.8, 0.0, 1.0);
        }
        fx.ship.camera(this.camera.position, this.camera.lookAt, this.camera.up, this.camera.fov, this.camera.aspect, this.camera.zNear, this.camera.zFar);
        fx.ship.trans(this.player.rx, this.player.rz, - this.player.dir * Math.PI/2);
        fx.ship.draw();
    }

    clearState() {
        let text = document.getElementById("textbox");
        if(text != null) {
            text.textContent = "";
        }        
    }

    drawState() {
        let text = document.getElementById("textbox");
        if(text != null) {
            text.textContent = "Days: " + this.days + " / Gold: " + this.player.gold;
        }
    }
}