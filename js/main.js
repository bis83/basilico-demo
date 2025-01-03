
$callback("main", {
  setup: (app) => {
    html_hide_message();
  },
  update: (app) => {
    const dt = app.dt;
    const stage = $stageCurrent(app);
    const mob = stage.mob.find(m => m.data === "p000");
    if (mob) {
      const data = $dataMob(app, mob.data);

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
        mob.ha += cameraSpeed * dt * cameraX;
        mob.va += cameraSpeed * dt * cameraY;
        mob.va = clamp(mob.va, -60, 80);
      }
      if (moveXY) {
        const moveSpeed = dash ? 4 : 2;
        const rx = deg2rad(mob.ha + 90);
        const ry = deg2rad(mob.ha);
        const moveX = -moveXY[0];
        const moveY = moveXY[1];
        const vx = moveX * Math.cos(rx) + moveY * Math.cos(ry);
        const vy = moveX * Math.sin(rx) + moveY * Math.sin(ry);
        const dx = moveSpeed * dt * vx;
        const dy = moveSpeed * dt * vy;
        mob.x += dx;
        mob.z += dy;
      }

      const camera = stage.camera;
      camera.x = mob.x;
      camera.y = mob.y + data.height;
      camera.z = mob.z;
      camera.ha = mob.ha;
      camera.va = mob.va;
    }

    const light = stage.light;
    light.ha += 45 * dt;
  },
});

html_listen(window, "load", () => {
  html_show_message("Welcome Basilico.");
  $start("main");
});
