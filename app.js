(() => {
  const base64ToArrayBuffer = (base64) => {
    const b = window.atob(base64);
    const a = new ArrayBuffer(b.length);
    const v = new DataView(a);
    for (let i = 0; i < b.length; ++i) {
      v.setUint8(i, b.charCodeAt(i));
    }
    return a;
  };
  const mod = (v, n) => {
    return (v % n + n) % n;
  };
  const deg2rad = (deg) => {
    return deg / 180 * Math.PI;
  };
  const xy_length = (x, y) => {
    return Math.sqrt(x * x + y * y);
  };
  const xy_normalize = (x, y) => {
    const l = xy_length(x, y);
    return l != 0 ? [x / l, y / l] : [0, 0];
  };
  const xy_reverse = ([x, y]) => {
    return [-x, -y];
  };
  const xy_mul = ([x, y], l) => {
    return [x * l, y * l];
  };
  const xy_hit_rect = ([x, y], minX, maxX, minY, maxY) => {
    return minX <= x && x <= maxX && minY <= y && y <= maxY;
  };
  const xy_bounds = ([x0, y0], r, [x1, y1]) => {
    const [dx, dy] = [x1 - x0, y1 - y0];
    const l = xy_length(dx, dy);
    if (r <= l) {
      return [x0, y0];
    }
    const [nx, ny] = xy_normalize(dx, dy);
    const [sx, sy] = xy_mul([nx, ny], l - r);
    return [x0 + sx, y0 + sy];
  };
  const vec3dot = (a, b) => {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  };
  const vec3length = (a) => {
    const d = vec3dot(a, a);
    return Math.sqrt(d);
  };
  const vec3add = (a, b) => {
    return [
      a[0] + b[0],
      a[1] + b[1],
      a[2] + b[2]
    ];
  };
  const vec3sub = (a, b) => {
    return [
      a[0] - b[0],
      a[1] - b[1],
      a[2] - b[2]
    ];
  };
  const vec3normalize = (v) => {
    const l = vec3length(v);
    return [
      v[0] / l,
      v[1] / l,
      v[2] / l
    ];
  };
  const vec3cross = (a, b) => {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ];
  };
  const vec3dir = (hang, vang) => {
    const h = deg2rad(hang);
    const v = deg2rad(vang);
    return [
      Math.cos(v) * Math.cos(h),
      Math.cos(v) * Math.sin(h),
      Math.sin(v)
    ];
  };
  const mat4identity = () => {
    return [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ];
  };
  const mat4multiply = (a, b) => {
    return [
      a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
      a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
      a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
      a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],
      a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
      a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
      a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
      a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],
      a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
      a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
      a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
      a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],
      a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
      a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
      a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
      a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15]
    ];
  };
  const mat4invert = (a) => {
    const b00 = a[0] * a[5] - a[1] * a[4];
    const b01 = a[0] * a[6] - a[2] * a[4];
    const b02 = a[0] * a[7] - a[3] * a[4];
    const b03 = a[1] * a[6] - a[2] * a[5];
    const b04 = a[1] * a[7] - a[3] * a[5];
    const b05 = a[2] * a[7] - a[3] * a[6];
    const b06 = a[8] * a[13] - a[9] * a[12];
    const b07 = a[8] * a[14] - a[10] * a[12];
    const b08 = a[8] * a[15] - a[11] * a[12];
    const b09 = a[9] * a[14] - a[10] * a[13];
    const b10 = a[9] * a[15] - a[11] * a[13];
    const b11 = a[10] * a[15] - a[11] * a[14];
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return mat4identity();
    }
    det = 1 / det;
    return [
      (a[5] * b11 - a[6] * b10 + a[7] * b09) * det,
      (a[2] * b10 - a[1] * b11 - a[3] * b09) * det,
      (a[13] * b05 - a[14] * b04 + a[15] * b03) * det,
      (a[10] * b04 - a[9] * b05 - a[11] * b03) * det,
      (a[6] * b08 - a[4] * b11 - a[7] * b07) * det,
      (a[0] * b11 - a[2] * b08 + a[3] * b07) * det,
      (a[14] * b02 - a[12] * b05 - a[15] * b01) * det,
      (a[8] * b05 - a[10] * b02 + a[11] * b01) * det,
      (a[4] * b10 - a[5] * b08 + a[7] * b06) * det,
      (a[1] * b08 - a[0] * b10 - a[3] * b06) * det,
      (a[12] * b04 - a[13] * b02 + a[15] * b00) * det,
      (a[9] * b02 - a[8] * b04 - a[11] * b00) * det,
      (a[5] * b07 - a[4] * b09 - a[6] * b06) * det,
      (a[0] * b09 - a[1] * b07 + a[2] * b06) * det,
      (a[13] * b01 - a[12] * b03 - a[14] * b00) * det,
      (a[8] * b03 - a[9] * b01 + a[10] * b00) * det
    ];
  };
  const mat4translate = (x, y, z) => {
    return [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      x,
      y,
      z,
      1
    ];
  };
  const mat4translated = (m, x, y, z) => {
    m[12] = x;
    m[13] = y;
    m[14] = z;
  };
  const mat4angle = (ha, va) => {
    const h = deg2rad(ha);
    const sinH = Math.sin(h);
    const cosH = Math.cos(h);
    return [
      cosH,
      sinH,
      0,
      0,
      -sinH,
      cosH,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ];
  };
  const mat4scale = (x, y, z) => {
    return [
      x,
      0,
      0,
      0,
      0,
      y,
      0,
      0,
      0,
      0,
      z,
      0,
      0,
      0,
      0,
      1
    ];
  };
  const mat4lookat = (eye, at, up) => {
    const tz = vec3normalize(vec3sub(at, eye));
    const tx = vec3normalize(vec3cross(up, tz));
    const ty = vec3cross(tz, tx);
    const dx = vec3dot(eye, tx);
    const dy = vec3dot(eye, ty);
    const dz = vec3dot(eye, tz);
    return [
      tx[0],
      ty[0],
      tz[0],
      0,
      tx[1],
      ty[1],
      tz[1],
      0,
      tx[2],
      ty[2],
      tz[2],
      0,
      -dx,
      -dy,
      -dz,
      1
    ];
  };
  const mat4perspective = (fovy, aspect, near, far) => {
    const sy = 1 / Math.tan(fovy);
    const sx = sy / aspect;
    const sz = far / (far - near);
    const wz = -(sz * near);
    return [
      sx,
      0,
      0,
      0,
      0,
      sy,
      0,
      0,
      0,
      0,
      sz,
      1,
      0,
      0,
      wz,
      0
    ];
  };
  const mat4ortho = (w, h, zn, zf) => {
    const sx = 2 / w;
    const sy = 2 / h;
    const sz = 1 / (zf - zn);
    const wz = zn / (zn - zf);
    return [
      sx,
      0,
      0,
      0,
      0,
      sy,
      0,
      0,
      0,
      0,
      sz,
      0,
      0,
      0,
      wz,
      1
    ];
  };
  const grid_to_world = (x, y, h) => {
    return [x * 2, y * 2, h * 0.5];
  };
  const $timer = {
    t: performance.now(),
    dt: 0,
    n: 0
  };
  const timer_tick = (time) => {
    $timer.dt = (time - $timer.t) / 1e3;
    $timer.t = time;
    $timer.n += 1;
  };
  var $listen = null;
  const listen = (target, key, func) => {
    target.addEventListener(key, func);
  };
  const listen_disable_user_select = () => {
    const body = document.body;
    body.style.userSelect = "none";
    body.style.webkitUserSelect = "none";
    body.style.msUserSelect = "none";
    body.style.mozUserSelect = "none";
  };
  const listen_disable_touch_action = () => {
    const body = document.body;
    body.style.touchAction = "none";
  };
  const listen_init = () => {
    listen_disable_user_select();
    listen_disable_touch_action();
    $listen = {};
    $listen.gamepad = {
      index: null,
      lx: 0,
      ly: 0,
      rx: 0,
      ry: 0,
      b0: false,
      b1: false,
      b8: false,
      b9: false,
      lb: false,
      rb: false,
      lt: false,
      rt: false
    };
    $listen.keyboard = {
      w: false,
      a: false,
      s: false,
      d: false,
      up: false,
      left: false,
      down: false,
      right: false,
      q: false,
      e: false,
      z: false,
      x: false,
      space: false,
      lctrl: false,
      esc: false
    };
    $listen.touch = /* @__PURE__ */ new Map();
    listen(window, "focus", (ev) => {
    });
    listen(window, "blur", (ev) => {
    });
    listen(window, "resize", (ev) => {
    });
    listen(window, "gamepadconnected", (ev) => {
      $listen.gamepad.index = ev.gamepad.index;
    });
    listen(window, "gamepaddisconnected", (ev) => {
      if ($listen.gamepad.index === ev.gamepad.index) {
        $listen.gamepad.index = null;
      }
    });
    listen(document, "keydown", (ev) => {
      if (listen_keyboard($listen.keyboard, ev.code, true)) {
        ev.preventDefault();
      }
    });
    listen(document, "keyup", (ev) => {
      if (listen_keyboard($listen.keyboard, ev.code, false)) {
        ev.preventDefault();
      }
    });
    listen(document.body, "contextmenu", (ev) => {
      ev.preventDefault();
    });
    listen(document.body, "pointerdown", (ev) => {
      $listen.touch.set(ev.pointerId, {
        x: ev.clientX,
        y: ev.clientY,
        sx: ev.clientX,
        sy: ev.clientY,
        time: performance.now()
      });
    });
    listen(document.body, "pointerup", (ev) => {
      $listen.touch.delete(ev.pointerId);
    });
    listen(document.body, "pointerout", (ev) => {
      $listen.touch.delete(ev.pointerId);
    });
    listen(document.body, "pointermove", (ev) => {
      const touch = $listen.touch.get(ev.pointerId);
      if (touch) {
        touch.x = ev.clientX;
        touch.y = ev.clientY;
      }
    });
  };
  const listen_keyboard = (keyboard, code, value) => {
    switch (code) {
      case "KeyW":
        keyboard.w = value;
        break;
      case "KeyA":
        keyboard.a = value;
        break;
      case "KeyS":
        keyboard.s = value;
        break;
      case "KeyD":
        keyboard.d = value;
        break;
      case "ArrowUp":
        keyboard.up = value;
        break;
      case "ArrowLeft":
        keyboard.left = value;
        break;
      case "ArrowDown":
        keyboard.down = value;
        break;
      case "ArrowRight":
        keyboard.right = value;
        break;
      case "KeyQ":
        keyboard.q = value;
        break;
      case "KeyE":
        keyboard.e = value;
        break;
      case "KeyZ":
        keyboard.z = value;
        break;
      case "KeyX":
        keyboard.x = value;
        break;
      case "Space":
        keyboard.space = value;
        break;
      case "ControlLeft":
        keyboard.lctrl = value;
        break;
      case "Escape":
        keyboard.esc = value;
        break;
      default:
        return false;
    }
    return true;
  };
  const listen_tick_gamepad = (gamepad) => {
    if (gamepad.index !== null) {
      const gamepads = navigator.getGamepads();
      const gp = gamepads[gamepad.index];
      gamepad.lx = Math.trunc(gp.axes[0] * 4) / 4;
      gamepad.ly = Math.trunc(gp.axes[1] * 4) / 4;
      gamepad.rx = Math.trunc(gp.axes[2] * 4) / 4;
      gamepad.ry = Math.trunc(gp.axes[3] * 4) / 4;
      gamepad.b0 = gp.buttons[0].value >= 0.5;
      gamepad.b1 = gp.buttons[1].value >= 0.5;
      gamepad.b8 = gp.buttons[8].value >= 0.5;
      gamepad.b9 = gp.buttons[9].value >= 0.5;
      gamepad.lb = gp.buttons[4].value >= 0.5;
      gamepad.rb = gp.buttons[5].value >= 0.5;
      gamepad.lt = gp.buttons[6].value >= 0.5;
      gamepad.rt = gp.buttons[7].value >= 0.5;
    }
  };
  const listen_tick = () => {
    listen_tick_gamepad($listen.gamepad);
  };
  const listen_touch = (rect, keyboard, gamepad) => {
    for (const touch of $listen.touch.values()) {
      if (xy_hit_rect([touch.sx, touch.sy], ...rect)) {
        const x = touch.x - touch.sx;
        const y = -(touch.y - touch.sy);
        return xy_normalize(x, y);
      }
    }
    if (keyboard) {
      if (keyboard === "wasd") {
        const keyboard2 = $listen.keyboard;
        const x = keyboard2.a ? -1 : keyboard2.d ? 1 : 0;
        const y = keyboard2.w ? 1 : keyboard2.s ? -1 : 0;
        if (x !== 0 || y !== 0) {
          return xy_normalize(x, y);
        }
      } else if (keyboard === "arrow") {
        const keyboard2 = $listen.keyboard;
        const x = keyboard2.right ? 1 : keyboard2.left ? -1 : 0;
        const y = keyboard2.up ? 1 : keyboard2.down ? -1 : 0;
        if (x !== 0 || y !== 0) {
          return xy_normalize(x, y);
        }
      } else {
        if ($listen.keyboard[keyboard]) {
          return [1, 0];
        }
      }
    }
    if (gamepad) {
      if (gamepad === "left-stick") {
        const gamepad2 = $listen.gamepad;
        return xy_normalize(gamepad2.lx, -gamepad2.ly);
      } else if (gamepad === "right-stick") {
        const gamepad2 = $listen.gamepad;
        return xy_normalize(gamepad2.rx, -gamepad2.ry);
      } else {
        if ($listen.gamepad[gamepad]) {
          return [1, 0];
        }
      }
    }
    return null;
  };
  const localstorage_get = (key) => {
    const data = localStorage.getItem(key);
    if (data == null) {
      return null;
    }
    return JSON.parse(data);
  };
  const localstorage_set = (key, data) => {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  };
  var $gl = null;
  const gl_init = () => {
    const canvas = document.getElementById("main");
    $gl = canvas.getContext("webgl2");
  };
  const gl_createGLTexture2D = (img, sampler) => {
    let texture = $gl.createTexture();
    $gl.bindTexture($gl.TEXTURE_2D, texture);
    if (sampler == 0) {
      $gl.texParameteri($gl.TEXTURE_2D, $gl.TEXTURE_MAG_FILTER, $gl.NEAREST);
      $gl.texParameteri($gl.TEXTURE_2D, $gl.TEXTURE_MIN_FILTER, $gl.NEAREST);
    }
    if (sampler == 1) {
      $gl.texParameteri($gl.TEXTURE_2D, $gl.TEXTURE_MAG_FILTER, $gl.LINEAR);
      $gl.texParameteri($gl.TEXTURE_2D, $gl.TEXTURE_MIN_FILTER, $gl.LINEAR);
    }
    $gl.texParameteri($gl.TEXTURE_2D, $gl.TEXTURE_WRAP_S, $gl.CLAMP_TO_EDGE);
    $gl.texParameteri($gl.TEXTURE_2D, $gl.TEXTURE_WRAP_T, $gl.CLAMP_TO_EDGE);
    $gl.texImage2D($gl.TEXTURE_2D, 0, $gl.RGBA, $gl.RGBA, $gl.UNSIGNED_BYTE, img);
    $gl.bindTexture($gl.TEXTURE_2D, null);
    return texture;
  };
  const gl_updateGLTexture2D = (tex, img) => {
    $gl.bindTexture($gl.TEXTURE_2D, tex);
    $gl.texSubImage2D($gl.TEXTURE_2D, 0, 0, 0, $gl.RGBA, $gl.UNSIGNED_BYTE, img);
    $gl.bindTexture($gl.TEXTURE_2D, null);
  };
  const gl_createGLShader = (type, source) => {
    const shader = $gl.createShader(type);
    $gl.shaderSource(shader, source);
    $gl.compileShader(shader);
    const success = $gl.getShaderParameter(shader, $gl.COMPILE_STATUS);
    if (!success) {
      $gl.deleteShader(shader);
      return null;
    }
    return shader;
  };
  const gl_createGLProgram = (vs, fs) => {
    const prog = $gl.createProgram();
    $gl.attachShader(prog, vs);
    $gl.attachShader(prog, fs);
    $gl.linkProgram(prog);
    const success = $gl.getProgramParameter(prog, $gl.LINK_STATUS);
    if (!success) {
      $gl.deleteProgram(prog);
      return null;
    }
    return prog;
  };
  const gl_staticBuffer = (type, data) => {
    let b = $gl.createBuffer();
    $gl.bindBuffer(type, b);
    $gl.bufferData(type, data, $gl.STATIC_DRAW);
    return b;
  };
  const gl_bindVertexAttribArray = (location, size, type, normalized, stride, offset) => {
    $gl.enableVertexAttribArray(location);
    $gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
  };
  const gl_resizeCanvas = () => {
    const width = window.innerWidth;
    if (width !== $gl.canvas.width) {
      $gl.canvas.width = width;
    }
    const height = window.innerHeight;
    if (height !== $gl.canvas.height) {
      $gl.canvas.height = height;
    }
  };
  const gl_clear = () => {
    $gl.viewport(0, 0, $gl.canvas.width, $gl.canvas.height);
    $gl.clearColor(0, 0, 0, 1);
    $gl.clearDepth(1);
    $gl.clear($gl.COLOR_BUFFER_BIT | $gl.DEPTH_BUFFER_BIT);
  };
  const gl_state = (depth, alpha, cw) => {
    $gl.enable($gl.CULL_FACE);
    $gl.frontFace(cw ? $gl.CW : $gl.CCW);
    if (depth) {
      $gl.enable($gl.DEPTH_TEST);
      $gl.depthFunc($gl.LEQUAL);
    } else {
      $gl.disable($gl.DEPTH_TEST);
    }
    if (alpha) {
      $gl.enable($gl.BLEND);
      $gl.blendFunc($gl.SRC_ALPHA, $gl.ONE_MINUS_SRC_ALPHA);
    } else {
      $gl.disable($gl.BLEND);
      $gl.blendFunc($gl.SRC_ALPHA, $gl.ONE_MINUS_SRC_ALPHA);
    }
  };
  const gl_drawMesh = (mesh, no) => {
    no = no || 0;
    const mode = mesh.iv[no * 3 + 0];
    const first = mesh.iv[no * 3 + 1];
    const count = mesh.iv[no * 3 + 2];
    const TYPES = [null, $gl.POINTS, $gl.LINES, $gl.TRIANGLES];
    if (mesh.i) {
      $gl.drawElements(TYPES[mode], count, $gl.UNSIGNED_SHORT, 2 * first);
    } else {
      $gl.drawArrays(TYPES[mode], first, count);
    }
  };
  const gl_useTexture = (tex, location) => {
    $gl.activeTexture($gl.TEXTURE0);
    $gl.bindTexture($gl.TEXTURE_2D, tex);
    $gl.uniform1i(location, 0);
  };
  const cvs_create = (width, height) => {
    const canvas = document.createElement("canvas");
    if (!canvas) {
      return null;
    }
    canvas.width = width;
    canvas.height = height;
    return canvas;
  };
  const cvs_text = (cvs, text) => {
    const context = cvs.getContext("2d");
    if (!context) {
      return null;
    }
    context.clearRect(0, 0, cvs.width, cvs.height);
    context.fillStyle = "rgba(0 0 0 / 0.5)";
    context.fillRect(0, 0, cvs.width, cvs.height);
    context.fillStyle = "white";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.font = "14px monospace";
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; ++i) {
      context.fillText(lines[i], 0, 12 * i);
    }
  };
  var $audio = null;
  const audio_init = () => {
    $audio = new AudioContext();
  };
  const $action = {};
  const action_invoke = (self, action) => {
    if (!action) {
      return;
    }
    for (const act of action) {
      const func = $action[act[0]];
      if (!func) {
        continue;
      }
      const args = act.slice(1);
      func(self, ...args);
    }
  };
  const define_action = (label, func) => {
    $action[label] = func;
  };
  const VS_LAYOUT_POSITION = 0;
  const VS_LAYOUT_NORMAL = 1;
  const VS_LAYOUT_COLOR = 2;
  const VS_LAYOUT_UV = 3;
  const decodeMesh = (data, base64) => {
    data.vao = $gl.createVertexArray();
    $gl.bindVertexArray(data.vao);
    if (data.b >= 0) {
      data.b = gl_staticBuffer($gl.ARRAY_BUFFER, base64ToArrayBuffer(base64[data.b]));
      if (data.bv) {
        for (let i = 0; i < data.bv.length; i += 2) {
          switch (data.bv[i]) {
            case VS_LAYOUT_POSITION:
              gl_bindVertexAttribArray(VS_LAYOUT_POSITION, 3, $gl.FLOAT, false, 0, data.bv[i + 1]);
              break;
            case VS_LAYOUT_NORMAL:
              gl_bindVertexAttribArray(VS_LAYOUT_NORMAL, 3, $gl.HALF_FLOAT, false, 0, data.bv[i + 1]);
              break;
            case VS_LAYOUT_COLOR:
              gl_bindVertexAttribArray(VS_LAYOUT_COLOR, 4, $gl.UNSIGNED_BYTE, true, 0, data.bv[i + 1]);
              break;
            case VS_LAYOUT_UV:
              gl_bindVertexAttribArray(VS_LAYOUT_UV, 2, $gl.HALF_FLOAT, false, 0, data.bv[i + 1]);
              break;
          }
        }
      }
    }
    if (data.i >= 0) {
      data.i = gl_staticBuffer($gl.ELEMENT_ARRAY_BUFFER, base64ToArrayBuffer(base64[data.i]));
    }
    $gl.bindVertexArray(null);
    return data;
  };
  const decodeShader = (data) => {
    data.vs = gl_createGLShader($gl.VERTEX_SHADER, data.vs);
    data.fs = gl_createGLShader($gl.FRAGMENT_SHADER, data.fs);
    data.prog = gl_createGLProgram(data.vs, data.fs);
    if (data.u) {
      const umap = {};
      for (let u of data.u) {
        umap[u] = $gl.getUniformLocation(data.prog, u);
      }
      data.u = umap;
    }
    if (data.ub) {
      const umap = {};
      let bindIndex = 0;
      for (let u of data.ub) {
        const index = $gl.getUniformBlockIndex(data.prog, u);
        $gl.uniformBlockBinding(data.prog, index, bindIndex);
        umap[u] = bindIndex;
        bindIndex += 1;
      }
      data.ub = umap;
    }
    return data;
  };
  let $imageLoading = 0;
  const decodeImage = (data, base64) => {
    data.tex = null;
    const img = new Image();
    img.onload = () => {
      data.tex = gl_createGLTexture2D(img, data.s);
      $imageLoading -= 1;
    };
    img.src = "data:image/png;base64," + base64[data.b];
    $imageLoading += 1;
    return data;
  };
  const $data = {
    index: null,
    pack: []
  };
  const data_loadIndex = () => {
    const path = "data/index.json";
    fetch(path).then((res) => res.json()).then((json) => {
      $data.index = json;
      for (const no of $data.index.pack) {
        data_loadPack(no);
      }
    });
  };
  const data_loadPack = (no) => {
    const path = "data/pack" + no + ".json";
    fetch(path).then((res) => res.json()).then((json) => {
      if (json.mesh) {
        json.mesh = json.mesh.map((data) => decodeMesh(data, json.base64));
      }
      if (json.image) {
        json.image = json.image.map((data) => decodeImage(data, json.base64));
      }
      if (json.shader) {
        json.shader = json.shader.map((data) => decodeShader(data));
      }
      $data.pack[no] = json;
    });
  };
  const data_loaded = () => {
    if ($data.index === null) {
      return false;
    }
    if ($data.pack.length <= 0) {
      return false;
    }
    if ($imageLoading > 0) {
      return false;
    }
    return true;
  };
  const data_lookup = (type, no) => {
    if (no <= 0) {
      return null;
    }
    const table = $data.index[type];
    if (!table) {
      return null;
    }
    const entry = table[no];
    if (!entry) {
      return null;
    }
    const pack = $data.pack[entry.p];
    if (!pack) {
      return null;
    }
    return pack[type][entry.i];
  };
  const data_mesh = (no) => {
    return data_lookup("mesh", no);
  };
  const data_image = (no) => {
    return data_lookup("image", no);
  };
  const data_shader = (no) => {
    return data_lookup("shader", no);
  };
  const data_draw = (no) => {
    return data_lookup("draw", no);
  };
  const data_item = (no) => {
    return data_lookup("item", no);
  };
  const data_base = (no) => {
    return data_lookup("base", no);
  };
  const data_tile = (no) => {
    return data_lookup("tile", no);
  };
  const data_mob = (no) => {
    return data_lookup("mob", no);
  };
  const data_hit = (no) => {
    return data_lookup("hit", no);
  };
  const data_grid = (no) => {
    return data_lookup("grid", no);
  };
  const data_com = (no) => {
    return data_lookup("com", no);
  };
  const data_view = (no) => {
    return data_lookup("view", no);
  };
  const data_lookup_index = (type, name) => {
    const table = $data.index[type];
    if (!table) {
      return 0;
    }
    const i = table.findIndex((o) => o && o.n === name);
    if (i <= 0) {
      return 0;
    }
    return i;
  };
  const data_base_index = (name) => {
    return data_lookup_index("base", name);
  };
  const data_hit_index = (name) => {
    return data_lookup_index("hit", name);
  };
  const data_grid_index = (name) => {
    return data_lookup_index("grid", name);
  };
  const data_com_index = (name) => {
    return data_lookup_index("com", name);
  };
  const data_view_index = (name) => {
    return data_lookup_index("view", name);
  };
  const $grid = {
    w: 0,
    h: 0,
    t: [],
    m: []
  };
  const grid_init_empty = (w, h) => {
    w = w || 0;
    h = h || 0;
    $grid.w = w;
    $grid.h = h;
    $grid.t = [];
    $grid.t.length = w * h;
    for (let i = 0; i < $grid.t.length; ++i) {
      $grid.t[i] = tile_make();
    }
    $grid.m = [];
  };
  const grid_load = (no) => {
    const data = data_grid(no);
    if (!data) {
      return;
    }
    grid_init_empty(data.w, data.h);
    if (data.b) {
      for (const a of data.b) {
        for (let x = a.x; x < a.x + a.w; ++x) {
          for (let y = a.y; y < a.y + a.h; ++y) {
            tile_base_push(grid_tile(x, y), a.no);
          }
        }
      }
    }
    if (data.t) {
      for (const a of data.t) {
        tile_set(grid_tile(a.x, a.y), a.no, a.ha);
      }
    }
    if (data.m) {
      for (const a of data.m) {
        grid_add_mob(a.no, a.x + 0.5, a.y + 0.5, a.ha);
      }
    }
  };
  const grid_index = (x, y) => {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || $grid.w <= x) {
      return -1;
    }
    if (y < 0 || $grid.h <= y) {
      return -1;
    }
    return x + y * $grid.h;
  };
  const grid_tile = (x, y) => {
    return $grid.t[grid_index(x, y)];
  };
  const grid_mob = (no) => {
    return $grid.m.find((o) => o.no === no);
  };
  const grid_mob_ranges = (ranges) => {
    return $grid.m.filter((mob) => {
      const x = Math.floor(mob.x);
      const y = Math.floor(mob.y);
      for (const r of ranges) {
        if (r.x === x && r.y === y) {
          return true;
        }
      }
      return false;
    });
  };
  const grid_add_mob = (no, x, y, ha) => {
    const h = tile_height(grid_tile(x, y));
    $grid.m.push(mob_make(no, x, y, h, ha, 0));
  };
  const grid_tick = () => {
    for (const mob of $grid.m) {
      mob_tick_before(mob);
    }
    mob_resolve_overlaps($grid.m);
    for (const mob of $grid.m) {
      mob_tick_after(mob);
    }
    $grid.m = $grid.m.filter((mob) => mob_is_alive(mob));
  };
  const $view = {
    w: 0,
    h: 0,
    view: null,
    slot: null,
    com: [],
    cam: {
      eye: [0, 0, 0],
      vp: new Float32Array(16),
      ivp: new Float32Array(16),
      o: new Float32Array(16)
    },
    m: new Float32Array(16)
  };
  const view_reset = () => {
    $view.slot = null;
    $view.view = $data.index.init;
  };
  const view_camera_mob = () => {
    const data = data_view($view.view);
    if (!data) {
      return null;
    }
    if (data.cam <= 0) {
      return null;
    }
    return grid_mob(data.cam);
  };
  const view_next = (view) => {
    const i = data_view_index(view);
    if (i < 0) {
      return;
    }
    $view.view = i;
  };
  const view_tick_before = () => {
    if ($view.view === null) {
      view_reset();
    }
    $view.w = window.innerWidth;
    $view.h = window.innerHeight;
  };
  const view_tick_after = () => {
    const fovy = deg2rad(30);
    const zNear = 0.1;
    const zFar = 1e3;
    let dir = [1, 0, 0];
    let eye = [0, 0, 0];
    const mob = view_camera_mob();
    if (mob) {
      const EYE_HEIGHT = 1.75;
      dir = vec3dir(mob.ha, mob.va);
      eye = grid_to_world(mob.x, mob.y, mob.h);
      eye[2] += EYE_HEIGHT;
    }
    const at = vec3add(eye, dir);
    const up = [0, 0, 1];
    const view = mat4lookat(eye, at, up);
    const proj = mat4perspective(fovy, $view.w / $view.h, zNear, zFar);
    const vp = mat4multiply(view, proj);
    $view.cam.vp.set(vp);
    $view.cam.ivp.set(mat4invert(vp));
    $view.cam.eye = eye;
    $view.cam.o.set(mat4ortho($view.w, $view.h, 0, 1));
  };
  const view_tick = () => {
    view_tick_before();
    const data = data_view($view.view);
    if (data) {
      for (const com of $view.com) {
        if (com) {
          com.value = null;
        }
      }
      if (data.com) {
        for (let no of data.com) {
          const data2 = data_com(no);
          if (!data2) {
            continue;
          }
          if (!$view.com[no]) {
            $view.com[no] = com_make();
          }
          const com = $view.com[no];
          com_tick(com, data2);
        }
      }
    }
    if (data.draw3d) {
      grid_tick();
    }
    view_tick_after();
  };
  const tile_make = () => {
    return {
      base: [],
      no: 0,
      ha: 0
    };
  };
  const tile_is_empty = (tile) => {
    if (!tile) {
      return true;
    }
    return tile.base.length <= 0 && tile.no <= 0;
  };
  const tile_is_full = (tile) => {
    if (!tile) {
      return false;
    }
    return tile.no > 0;
  };
  const tile_is_noentry = (tile, h0) => {
    if (tile_is_empty(tile)) {
      return true;
    }
    if (tile_is_full(tile)) {
      return true;
    }
    const h1 = tile_height(tile);
    if (Math.abs(h0 - h1) > 1) {
      return true;
    }
    return false;
  };
  const tile_height = (tile) => {
    if (!tile) {
      return 0;
    }
    return tile.base.length;
  };
  const tile_set = (tile, no, ha) => {
    if (!tile) {
      return;
    }
    tile.no = no;
    tile.ha = ha || 0;
  };
  const tile_del = (tile) => {
    if (!tile) {
      return;
    }
    tile.no = 0;
    tile.ha = 0;
  };
  const tile_base_push = (tile, no) => {
    if (!tile) {
      return;
    }
    tile.base.push(no);
  };
  const tile_base_pop = (tile) => {
    if (!tile) {
      return;
    }
    tile.base.pop();
  };
  const item_make = (slot) => {
    slot = slot || 0;
    const item = {
      s: [],
      i: 0
    };
    item.s.length = slot;
    item.s.fill(null);
    item.i = 0;
    return item;
  };
  const item_index = (item, no) => {
    return item.s.findIndex((o) => o && o.no === no);
  };
  const item_null_index = (item) => {
    return item.s.findIndex((o) => !o);
  };
  const item_select = (item, i) => {
    const idx = i == null ? item.i : i;
    return item.s[idx];
  };
  const item_set_cursor = (item, offset) => {
    const idx = mod(item.i + offset, item.s.length);
    item.i = idx;
  };
  const item_gain = (item, no, count) => {
    let i = item_index(item, no);
    if (i < 0) {
      i = item_null_index(item);
      if (i < 0) {
        return;
      }
      item.s[i] = { no, n: count };
      return;
    }
    item.s[i].n += count;
  };
  const item_lose = (item, no, count) => {
    const i = item_index(item, no);
    if (i < 0) {
      return;
    }
    item.s[i].n -= count;
    if (item.s[i].n <= 0) {
      item.s[i] = null;
    }
  };
  const mob_make = (no, x, y, h, ha, va) => {
    const mob = {
      no,
      x,
      y,
      h,
      ha: ha || 0,
      va: va || 0,
      hit: null,
      dmg: 0,
      item: item_make(8)
    };
    const data = data_mob(no);
    if (!data) {
      return null;
    }
    if (data.item) {
      for (const item of data.item) {
        item_gain(mob.item, item.no, item.n);
      }
    }
    return mob;
  };
  const mob_tick_before = (mob) => {
    const data = data_mob(mob.no);
    if (!data) {
      return;
    }
    if (data.action) {
      action_invoke(mob, data.action);
    }
    mob_fall(mob);
  };
  const mob_tick_after = (mob) => {
    if (mob.hit) {
      const data = data_hit(mob.hit.no);
      if (!data) {
        return;
      }
      if (data.action) {
        action_invoke(mob, data.action);
      }
      mob.hit = null;
    }
  };
  const mob_fall = (mob) => {
    const h = tile_height(grid_tile(mob.x, mob.y));
    if (Math.abs(h - mob.h) <= 2) {
      const dt = $timer.dt;
      const vh = h - mob.h;
      mob.h += 10 * dt * vh;
    } else {
      mob.h = h;
    }
  };
  const mob_adjust_position = (r, x, y, dx, dy) => {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const h0 = tile_height(grid_tile(ix, iy));
    let xx = x + dx;
    let yy = y + dy;
    if (tile_is_noentry(grid_tile(ix - 1, iy), h0)) {
      xx = Math.max(xx, ix + r);
    }
    if (tile_is_noentry(grid_tile(ix + 1, iy), h0)) {
      xx = Math.min(xx, ix - r + 1);
    }
    if (tile_is_noentry(grid_tile(ix, iy - 1), h0)) {
      yy = Math.max(yy, iy + r);
    }
    if (tile_is_noentry(grid_tile(ix, iy + 1), h0)) {
      yy = Math.min(yy, iy - r + 1);
    }
    if (tile_is_noentry(grid_tile(ix - 1, iy - 1), h0)) {
      [xx, yy] = xy_bounds([xx, yy], r, [ix, iy]);
    }
    if (tile_is_noentry(grid_tile(ix - 1, iy + 1), h0)) {
      [xx, yy] = xy_bounds([xx, yy], r, [ix, iy + 1]);
    }
    if (tile_is_noentry(grid_tile(ix + 1, iy - 1), h0)) {
      [xx, yy] = xy_bounds([xx, yy], r, [ix + 1, iy]);
    }
    if (tile_is_noentry(grid_tile(ix + 1, iy + 1), h0)) {
      [xx, yy] = xy_bounds([xx, yy], r, [ix + 1, iy + 1]);
    }
    return [xx, yy];
  };
  const mob_fps_movement = (mob, moveXY, cameraXY) => {
    const data = data_mob(mob.no);
    if (!data) {
      return;
    }
    const dt = $timer.dt;
    if (cameraXY) {
      const cameraSpeed = 90;
      mob.ha += cameraSpeed * dt * cameraXY[0];
      mob.va += cameraSpeed * dt * cameraXY[1];
      mob.va = Math.max(-60, Math.min(mob.va, 80));
    }
    if (moveXY) {
      const moveSpeed = 2;
      const rx = deg2rad(mob.ha + 90);
      const ry = deg2rad(mob.ha);
      const moveX = moveXY[0];
      const moveY = moveXY[1];
      const vx = moveX * Math.cos(rx) + moveY * Math.cos(ry);
      const vy = moveX * Math.sin(rx) + moveY * Math.sin(ry);
      const dx = moveSpeed * dt * vx;
      const dy = moveSpeed * dt * vy;
      [mob.x, mob.y] = mob_adjust_position(data.r, mob.x, mob.y, dx, dy);
    } else {
      [mob.x, mob.y] = mob_adjust_position(data.r, mob.x, mob.y, 0, 0);
    }
  };
  const mob_resolve_overlaps = (mobs) => {
    for (let i = 0; i < mobs.length; ++i) {
      for (let j = i + 1; j < mobs.length; ++j) {
        const a = mobs[i];
        const b = mobs[j];
        const adata = data_mob(a.no);
        if (!adata) {
          continue;
        }
        const bdata = data_mob(b.no);
        if (!bdata) {
          continue;
        }
        const [dx, dy] = [b.x - a.x, b.y - a.y];
        const l = xy_length(dx, dy);
        const d = adata.r + bdata.r - l;
        if (d <= 0) {
          continue;
        }
        const ab = xy_normalize(dx, dy);
        const ba = xy_reverse(ab);
        const wa = adata.m == 0 && bdata.m == 0 ? 0.5 : adata.m / (adata.m + bdata.m);
        const wb = 1 - wa;
        [a.x, a.y] = mob_adjust_position(adata.r, a.x, a.y, ba[0] * wa * d, ba[1] * wa * d);
        [b.x, b.y] = mob_adjust_position(bdata.r, b.x, b.y, ab[0] * wb * d, ab[1] * wb * d);
      }
    }
  };
  const mob_set_hit = (mob, no, item) => {
    mob.hit = hit_make(no, item);
  };
  const mob_is_alive = (mob) => {
    const data = data_mob(mob.no);
    if (!data) {
      return false;
    }
    return data.hp == 0 || mob.dmg < data.hp;
  };
  const mob_damage = (mob, value) => {
    mob.dmg += value;
  };
  const STATE_RESET = 0;
  const BUTTON_STATE_RELEASED = 0;
  const BUTTON_STATE_PRESSED = 1;
  const com_make = () => {
    return {
      m: new Float32Array(16),
      rect: [0, 0, 0, 0],
      value: null,
      state: STATE_RESET,
      img: null,
      cvs: null
    };
  };
  const com_value = (name) => {
    const no = data_com_index(name);
    if (no <= 0) {
      return null;
    }
    const com = $view.com[no];
    if (!com) {
      return null;
    }
    return com.value;
  };
  const com_matrix = (data, w, h) => {
    const ox = data.rect.ox * w / 2;
    const oy = data.rect.oy * h / 2;
    const m = mat4scale(data.rect.w / 2, data.rect.h / 2, 1);
    mat4translated(m, ox + data.rect.x, -(oy + data.rect.y), 0);
    return m;
  };
  const com_rect = (data, w, h) => {
    const ox = w / 2 + w / 2 * data.rect.ox;
    const oy = h / 2 + h / 2 * data.rect.oy;
    const minX = ox + (data.rect.x - data.rect.w / 2);
    const maxX = ox + (data.rect.x + data.rect.w / 2);
    const minY = oy + (data.rect.y - data.rect.h / 2);
    const maxY = oy + (data.rect.y + data.rect.h / 2);
    return [minX, maxX, minY, maxY];
  };
  const com_tick = (com, data) => {
    if (data.rect) {
      com.m.set(com_matrix(data, $view.w, $view.h));
      com.rect = com_rect(data, $view.w, $view.h);
    }
    if (data.text) {
      if (com.img === null) {
        com.cvs = cvs_create(data.rect.w, data.rect.h);
        cvs_text(com.cvs, data.text.contents);
        com.img = gl_createGLTexture2D(com.cvs, data.text.s);
      }
    }
    if (data.touch) {
      com.value = listen_touch(com.rect, data.touch.keyboard, data.touch.gamepad);
      let press = false;
      if (com.value !== null) {
        if (com.state !== BUTTON_STATE_PRESSED) {
          com.state = BUTTON_STATE_PRESSED;
          press = true;
        }
      } else {
        com.state = BUTTON_STATE_RELEASED;
      }
      if (press) {
        action_invoke(com, data.touch.action);
      }
    }
    if (data.tick) {
      action_invoke(com, data.tick.action);
    }
  };
  const hit_make = (no, item) => {
    return {
      no: no || 0,
      item: item || 0
    };
  };
  const hit_ranges = (x, y, ha) => {
    const bx = Math.floor(x);
    const by = Math.floor(y);
    let ranges = [];
    const hr = deg2rad(ha);
    const tx = Math.floor(x + Math.cos(hr) * 0.8);
    const ty = Math.floor(y + Math.sin(hr) * 0.8);
    if (bx != tx || by != ty) {
      ranges.push({ x: tx, y: ty });
    }
    return ranges;
  };
  const draw_start_frame = () => {
    gl_resizeCanvas();
    gl_clear();
  };
  const draw_call = (no, func) => {
    const data = data_draw(no);
    if (!data) {
      return;
    }
    gl_state(data.depth, data.alpha, data.cw);
    const shader = data_shader(data.shader);
    if (!shader) {
      return;
    }
    $gl.useProgram(shader.prog);
    const mesh = data_mesh(data.mesh);
    if (!mesh) {
      return;
    }
    $gl.bindVertexArray(mesh.vao);
    $gl.uniformMatrix4fv(shader.u.vp, false, data.ortho ? $view.cam.o : $view.cam.vp);
    const img = data_image(data.image);
    if (img) {
      gl_useTexture(img.tex, shader.u.tex0);
    } else {
      gl_useTexture(null, shader.u.tex0);
    }
    func(shader.u);
    gl_drawMesh(mesh);
  };
  const draw_tile = (x, y) => {
    const tile = grid_tile(x, y);
    if (!tile) {
      return;
    }
    for (let i = 0; i < tile.base.length; ++i) {
      const data2 = data_base(tile.base[i]);
      if (!data2) {
        continue;
      }
      draw_call(data2.draw, (u) => {
        const pos = grid_to_world(x, y, i);
        $view.m.set(mat4translate(pos[0], pos[1], pos[2]));
        $gl.uniformMatrix4fv(u.w, false, $view.m);
      });
    }
    const data = data_tile(tile.no);
    if (!data) {
      return;
    }
    const h = tile_height(tile);
    draw_call(data.draw, (u) => {
      const pos = grid_to_world(x, y, h);
      const m = mat4angle(tile.ha || 0, tile.va || 0);
      mat4translated(m, pos[0] + 1, pos[1] + 1, pos[2]);
      $view.m.set(m);
      $gl.uniformMatrix4fv(u.w, false, $view.m);
    });
  };
  const draw_mob = (mob) => {
    const data = data_mob(mob.no);
    if (!data) {
      return;
    }
    if (data.draw <= 0) {
      return;
    }
    draw_call(data.draw, (u) => {
      const pos = grid_to_world(mob.x, mob.y, mob.h);
      const m = mat4angle(mob.ha || 0, mob.va || 0);
      mat4translated(m, pos[0], pos[1], pos[2]);
      $view.m.set(m);
      $gl.uniformMatrix4fv(u.w, false, $view.m);
    });
  };
  const draw_grid = () => {
    for (let x = 0; x < $grid.w; ++x) {
      for (let y = 0; y < $grid.h; ++y) {
        draw_tile(x, y);
      }
    }
    for (const mob of $grid.m) {
      draw_mob(mob);
    }
  };
  const draw_com = (com, no) => {
    const data = data_com(no);
    if (!data) {
      return;
    }
    if (!data.rect) {
      return;
    }
    if (data.rect.draw <= 0) {
      return;
    }
    draw_call(data.rect.draw, (u) => {
      $gl.uniformMatrix4fv(u.w, false, com.m);
      if (com.img) {
        gl_useTexture(com.img, u.tex0);
      }
    });
  };
  const draw_view = () => {
    const data = data_view($view.view);
    if (!data) {
      return;
    }
    if (data.draw) {
      for (let no of data.draw) {
        draw_call(no, (u) => {
          $view.m.set(mat4translate(...$view.cam.eye));
          $gl.uniformMatrix4fv(u.w, false, $view.m);
        });
      }
    }
    if (data.draw3d) {
      draw_grid();
    }
    if (data.com) {
      for (let no of data.com) {
        const com = $view.com[no];
        if (com) {
          draw_com(com, no);
        }
      }
    }
  };
  const grid_encode = (data) => {
    return data;
  };
  const grid_decode = (data) => {
    return data;
  };
  const newgame = () => {
    grid_init_empty();
  };
  const loadgame = () => {
    if (!$view.slot) {
      return false;
    }
    const data = localstorage_get($view.slot);
    if (!data) {
      return false;
    }
    if (data.grid) {
      Object.assign($grid, grid_decode(data.grid));
    }
    return true;
  };
  const savegame = () => {
    if (!$view.slot) {
      return;
    }
    const data = {};
    data.grid = grid_encode($grid);
    localstorage_set($view.slot, data);
  };
  const init = () => {
    gl_init();
    audio_init();
    listen_init();
    data_loadIndex();
  };
  const update = (time) => {
    timer_tick(time);
    listen_tick();
    if (data_loaded()) {
      view_tick();
    }
  };
  const draw = () => {
    draw_start_frame();
    if (data_loaded()) {
      draw_view();
    }
  };
  listen(window, "load", () => {
    init();
    const tick = (time) => {
      update(time);
      draw();
      requestAnimationFrame(tick);
    };
    tick();
  });
  define_action("nextview", (self, view) => {
    view_next(view);
  });
  define_action("resetview", (self) => {
    view_reset();
  });
  define_action("newgame", (self, slot) => {
    $view.slot = slot;
    newgame();
  });
  define_action("loadgame", (self, slot) => {
    $view.slot = slot;
    loadgame();
  });
  define_action("savegame", (self) => {
    savegame();
  });
  define_action("newgrid", (self, name) => {
    const no = data_grid_index(name);
    if (no <= 0) {
      return;
    }
    grid_load(no);
  });
  define_action("fpsmove", (self, lstick, rstick) => {
    const moveXY = com_value(lstick);
    const cameraXY = com_value(rstick);
    mob_fps_movement(self, moveXY, cameraXY);
  });
  define_action("inventory_next", (self) => {
    const mob = view_camera_mob();
    if (!mob) {
      return;
    }
    item_set_cursor(mob.item, 1);
  });
  define_action("inventory_prev", (self) => {
    const mob = view_camera_mob();
    if (!mob) {
      return;
    }
    item_set_cursor(mob.item, -1);
  });
  define_action("inventory", (self) => {
    const mob = view_camera_mob();
    if (!mob) {
      return;
    }
    let text = "";
    for (let i = 0; i < mob.item.s.length; ++i) {
      if (mob.item.i === i) {
        text += ">";
      } else {
        text += " ";
      }
      text += "[" + i + "]";
      if (mob.item.s[i] != null) {
        const item = data_item(mob.item.s[i].no);
        if (!item) {
          continue;
        }
        text += item.text + ":" + mob.item.s[i].n;
      }
      text += "\n";
    }
    text += "\n";
    {
      const slot = item_select(mob.item);
      if (slot != null) {
        const item = data_item(slot.no);
        if (item != null) {
          text += item.desc + "\n";
        }
      }
    }
    cvs_text(self.cvs, text);
    gl_updateGLTexture2D(self.img, self.cvs);
  });
  define_action("hand", (self) => {
    const mob = view_camera_mob();
    if (!mob) {
      return;
    }
    const item = item_select(mob.item);
    if (!item) {
      return;
    }
    const data = data_item(item.no);
    if (!data) {
      return;
    }
    if (!data.usable) {
      return;
    }
    mob_set_hit(mob, data.usable.hit, item.no);
  });
  define_action("activate", (self) => {
    const mob = view_camera_mob();
    if (!mob) {
      return;
    }
    const hit = data_hit_index("activate");
    if (hit <= 0) {
      return;
    }
    mob_set_hit(mob, hit);
  });
  define_action("activate-target", (self) => {
    const mob = view_camera_mob();
    if (!mob) {
      return;
    }
    let text = "";
    const ranges = hit_ranges(mob.x, mob.y, mob.ha);
    for (const r of ranges) {
      const tile = grid_tile(r.x, r.y);
      if (!tile) {
        continue;
      }
      const data = data_tile(tile.no);
      if (!data) {
        continue;
      }
      text += data.desc;
      text += "\n";
    }
    cvs_text(self.cvs, text);
    gl_updateGLTexture2D(self.img, self.cvs);
  });
  define_action("hit-activate", (self) => {
    const ranges = hit_ranges(self.x, self.y, self.ha);
    for (const r of ranges) {
      const tile = grid_tile(r.x, r.y);
      if (!tile) {
        continue;
      }
      const data = data_tile(tile.no);
      if (!data) {
        continue;
      }
      if (data.device) {
        action_invoke(tile, data.device.action);
      }
    }
  });
  define_action("hit-mining", (self) => {
    const mob = view_camera_mob();
    if (!mob) {
      return;
    }
    const ranges = hit_ranges(self.x, self.y, self.ha);
    for (const r of ranges) {
      const tile = grid_tile(r.x, r.y);
      if (!tile) {
        continue;
      }
      const data = data_tile(tile.no);
      if (!data) {
        continue;
      }
      if (data.mine) {
        item_gain(mob.item, data.mine.item, data.mine.count);
        tile_del(tile);
      }
    }
  });
  define_action("hit-dig", (self) => {
    const ranges = hit_ranges(self.x, self.y, self.ha);
    for (const r of ranges) {
      const tile = grid_tile(r.x, r.y);
      if (tile_is_empty(tile)) {
        continue;
      }
      if (tile_is_full(tile)) {
        continue;
      }
      tile_base_pop(tile);
    }
  });
  define_action("hit-put", (self, base) => {
    const value = data_base_index(base);
    if (value <= 0) {
      return;
    }
    const mob = view_camera_mob();
    if (!mob) {
      return;
    }
    const ranges = hit_ranges(self.x, self.y, self.ha);
    let count = 0;
    for (const r of ranges) {
      const tile = grid_tile(r.x, r.y);
      if (tile_is_full(tile)) {
        continue;
      }
      tile_base_push(tile, value);
      count += 1;
    }
    if (self.hit.item > 0 && count > 0) {
      item_lose(mob.item, self.hit.item, count);
    }
  });
  define_action("hit-damage", (self) => {
    const ranges = hit_ranges(self.x, self.y, self.ha);
    const targets = grid_mob_ranges(ranges);
    for (const mob of targets) {
      mob_damage(mob, 1);
    }
  });
})();
