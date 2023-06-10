
const setup = (app, scene) => {
  html_hide_message();

  basil3d_scene_setup(scene, app, {
    camera: {
      eye: [0, 1.5, -5],
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
