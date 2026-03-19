// Copyright (c) bis83. Distributed under the MIT License.

class Input {
    constructor() {
        this.keyMap = {
            "ArrowLeft"     : 0,
            "ArrowRight"    : 1,
            "ArrowUp"       : 2,
            "ArrowDown"     : 3,
            "KeyZ"          : 4,
            "KeyX"          : 5
        };
        this.keyState = new Array(6).fill(false);
        this.keyStateCount = new Array(6).fill(0);

        document.addEventListener("keydown", (e) => {
            const index = this.keyMap[e.code];
            if(index !== null) {
                this.keyState[index] = true;
                e.preventDefault();
            }
        });
        document.addEventListener("keyup", (e) => {
            const index = this.keyMap[e.code];
            if(index !== null) {
                this.keyState[index] = false;
                e.preventDefault();
            }
        });
        document.addEventListener("blur", (e) => {
            this.keyState.fill(false);
        });
    }

    update() {
        for(let i=0; i<6; ++i) {
            this.keyStateCount[i] = this.keyState[i] ? (this.keyStateCount[i] + 1) : 0;
        }
    }

    left() {
        return this.keyStateCount[0] > 0;
    }

    right() {
        return this.keyStateCount[1] > 0;
    }

    up() {
        return this.keyStateCount[2] > 0;
    }

    down() {
        return this.keyStateCount[3] > 0;
    }

    pressZ() {
        return this.keyStateCount[4] == 1;
    }

    pressX() {
        return this.keyStateCount[5] == 1;
    }
}
