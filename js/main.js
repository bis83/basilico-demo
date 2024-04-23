
$__exec["setup"] = (app) => {
  html_hide_message();
};

$__exec["update"] = (app) => {
  const dt = $hidDelta(app, "t");
  const stage = $stageCurrent(app);
  const eye = stage.mob.find(m => m.name === "p000");
  if (eye) {
    const moveXY = [0, 0];
    moveXY[0] += -$hid(app, "l0");
    moveXY[0] += $hid(app, "l1");
    moveXY[1] += $hid(app, "l2");
    moveXY[1] += -$hid(app, "l3");
    const cameraXY = [0, 0];
    cameraXY[0] += -$hid(app, "r0");
    cameraXY[0] += $hid(app, "r1");
    cameraXY[1] += $hid(app, "r2");
    cameraXY[1] += -$hid(app, "r3");
    const dash = $hid(app, "b1");

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
    const lb = $hid(app, "a2");
    if (lb) {
      eye.offset.y -= 0.75 * dt;
    }
    const rb = $hid(app, "a3");
    if (rb) {
      eye.offset.y += 0.75 * dt;
    }

    const camera = stage.camera;
    camera.offset.x = eye.offset.x;
    camera.offset.y = eye.offset.y;
    camera.offset.z = eye.offset.z;
    camera.offset.ha = eye.offset.ha;
    camera.offset.va = eye.offset.va;
  }

  const light = stage.light;
  light.offset.ha += 45 * dt;
};

html_listen(window, "load", () => {
  html_show_message("Welcome Basilico.");
  $start();
});
