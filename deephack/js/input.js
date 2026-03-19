// Copyright (c) bis83. Distributed under the MIT License.

class Input {
  constructor() {
    this.keyMap = {
      "ArrowLeft": 0,
      "ArrowRight": 1,
      "ArrowUp": 2,
      "ArrowDown": 3,
      "Space": 4
    };
    this.keyState = new Array(5).fill(false);
    this.keyStateCount = new Array(5).fill(0);

    html_listen(document, "keydown", (e) => {
      const index = this.keyMap[e.code];
      if (index !== null) {
        this.keyState[index] = true;
        e.preventDefault();
      }
    });
    html_listen(document, "keyup", (e) => {
      const index = this.keyMap[e.code];
      if (index !== null) {
        this.keyState[index] = false;
        e.preventDefault();
      }
    });
    html_listen(document, "blur", (e) => {
      this.keyState.fill(false);
    });
  }

  update() {
    for (let i = 0; i < 5; ++i) {
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

  decide() {
    return this.keyStateCount[4] == 1;
  }
}
