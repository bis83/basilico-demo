
let setuped = false;

const setup = (app) => {
  if (setuped) {
    return;
  }

  html_hide_message();
  Object.assign(app.view, $json(app, "sample"));
  addDebugGrid(app);
  setuped = true;
};

const update = (app) => {
  const view = app.view;
  const eye = view.camera;

  const dt = $signalDelta(app, "t");
  const moveXY = [0, 0];
  moveXY[0] += -$signal(app, "l0");
  moveXY[0] += $signal(app, "l1");
  moveXY[1] += $signal(app, "l2");
  moveXY[1] += -$signal(app, "l3");
  const cameraXY = [0, 0];
  cameraXY[0] += -$signal(app, "r0");
  cameraXY[0] += $signal(app, "r1");
  cameraXY[1] += $signal(app, "r2");
  cameraXY[1] += -$signal(app, "r3");
  const dash = $signal(app, "b1");

  if (cameraXY) {
    const cameraSpeed = 90;
    const cameraX = -cameraXY[0];
    const cameraY = cameraXY[1];
    eye.offset.ha += cameraSpeed * dt * cameraX;
    eye.offset.va += cameraSpeed * dt * cameraY;
    eye.offset.va = Math.max(-60, Math.min(eye.offset.va, 80));
  }
  if (moveXY) {
    const moveSpeed = dash ? 4 : 2;
    const rx = deg2rad(eye.offset.ha + 90);
    const ry = deg2rad(eye.offset.ha);
    const moveX = -moveXY[0];
    const moveY = moveXY[1];
    const vx = moveX * Math.cos(rx) + moveY * Math.cos(ry);
    const vy = moveX * Math.sin(rx) + moveY * Math.sin(ry);
    const dx = moveSpeed * dt * vx;
    const dy = moveSpeed * dt * vy;
    eye.offset.x += dx;
    eye.offset.z += dy;
  }
  const lb = $signal(app, "a2");
  if (lb) {
    eye.offset.y -= 0.75 * dt;
  }
  const rb = $signal(app, "a3");
  if (rb) {
    eye.offset.y += 0.75 * dt;
  }

  const light = view.light;
  light.offset.ha += 45 * dt;
};

html_listen(window, "load", () => {
  html_show_message("Welcome Basilico.");
  $start({
    setup: setup,
    update: update,
  });
});
