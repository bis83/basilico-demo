
const setup = (app, scene) => {
  html_hide_message();

  basil3d_scene_setup(scene, app, {
    camera: {
      eye: [6.0, 2.5, -5.0],
      dir: vec3dir(135, -10),
    },
    entity: [
      { name: "tr_01", matrix: mat4translate(-2, 0, 0) },
      { name: "tr_01", matrix: mat4translate(+2, 0, 0) },
      { name: "wa_00", matrix: mat4translate(0, 0, 4) },
    ],
  });
};

html_listen(window, "load", () => {
  basil3d_start(setup);
});
