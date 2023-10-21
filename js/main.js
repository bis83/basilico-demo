
const setup = (app) => {
  html_hide_message();

  Object.assign(app.view, $json(app, "sample"));
  addDebugGrid(app);
};

const update = (app) => {
  const listen = app.listen;
  const view = app.view;
  const eye = view.camera;

  const dt = $listenDeltaTime(listen);
  const moveXY = $listenGet(listen, "wasd", "ls");
  const cameraXY = $listenGet(listen, "mouse", "rs");
  if (cameraXY) {
    const cameraSpeed = 90; // deg/s
    const cameraX = -cameraXY[0];
    const cameraY = cameraXY[1];
    eye.offset.ha += cameraSpeed * dt * cameraX;
    eye.offset.va += cameraSpeed * dt * cameraY;
    eye.offset.va = Math.max(-60, Math.min(eye.offset.va, 80));
  }
  if (moveXY) {
    const moveSpeed = 2;    // cell/s
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
  const lb = $listenGet(listen, "q", "lb");
  if (lb) {
    eye.offset.y -= 0.75 * dt;
  }
  const rb = $listenGet(listen, "e", "rb");
  if (rb) {
    eye.offset.y += 0.75 * dt;
  }

  const light = view.light;
  light.offset.ha += 45 * dt;
};

html_listen(window, "load", () => {
  html_show_message("Welcome Basilico.");
  $start(setup, update);
});
