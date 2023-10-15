
const setup = (app) => {
  html_hide_message();
  $viewOpen(app.view, $json(app, "sample"));
  $viewOpen(app.view, $json(app, "room000"));

  addDebugGrid(app);
};

const update = (app) => {
  const listen = app.listen;
  const view = app.view;
  const mob = view.camera;

  const dt = $listenDeltaTime(listen);
  const moveXY = $listenGet(listen, "wasd", "ls");
  const cameraXY = $listenGet(listen, "mouse", "rs");
  if (cameraXY) {
    const cameraSpeed = 90; // deg/s
    const cameraX = -cameraXY[0];
    const cameraY = cameraXY[1];
    mob.ha += cameraSpeed * dt * cameraX;
    mob.va += cameraSpeed * dt * cameraY;
    mob.va = Math.max(-60, Math.min(mob.va, 80));
  }
  if (moveXY) {
    const moveSpeed = 2;    // cell/s
    const rx = deg2rad(mob.ha + 90);
    const ry = deg2rad(mob.ha);
    const moveX = -moveXY[0];
    const moveY = moveXY[1];
    const vx = moveX * Math.cos(rx) + moveY * Math.cos(ry);
    const vy = moveX * Math.sin(rx) + moveY * Math.sin(ry);
    const dx = moveSpeed * dt * vx;
    const dy = moveSpeed * dt * vy;
    mob.eye[0] += dx;
    mob.eye[2] += dy;
  }
  const lb = $listenGet(listen, "q", "lb");
  if (lb) {
    mob.eye[1] -= 0.75 * dt;
  }
  const rb = $listenGet(listen, "e", "rb");
  if (rb) {
    mob.eye[1] += 0.75 * dt;
  }

  const light = view.light;
  light.ha += 45 * dt;
};

html_listen(window, "load", () => {
  html_show_message("Welcome Basilico.");
  $start(setup, update);
});
