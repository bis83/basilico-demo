
const setup = (scene) => {
  html_hide_message();

  scene.camera.eye = [0, 1.5, -5];
  basil3d_scene_add_object(scene, "tr_01", mat4translate(-2, 0, 0));
  basil3d_scene_add_object(scene, "tr_01", mat4translate(+2, 0, 0));
  basil3d_scene_add_object(scene, "tr_01", mat4translate(0, 0, 4));
};

html_listen(window, "load", () => {
  basil3d_start(setup);
});
