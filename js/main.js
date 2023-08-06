
const setup = (app, view) => {
  html_hide_message();
  basil3d_view_setup(view, app, basil3d_app_json(app, "sample"));
};

const update = (app, view, listen) => {
  const mob = view.camera;

  const dt = basil3d_listen_delta_time(listen);
  const moveXY = basil3d_listen_get(listen, "wasd", "left-stick");
  const cameraXY = basil3d_listen_get(listen, "arrow", "right-stick");
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
};

html_listen(window, "load", () => {
  html_show_message("Welcome Basilico.");
  basil3d_start(setup, update);
});
