
html_listen(window, "load", () => {
  $start(update);
});

const update = () => {
  {
    const camera = $newCamera();
    $cameraPosition(camera, 0, 2, -5);
    $cameraAngle(camera, 90, -10);
    $cameraFov(camera, 35);
    $cameraZClip(camera, 0.01, 1000);

    const light = $newLight();
    $lightDirection(light, 0, 65);
    $lightColor(light, 0.8, 0.8, 0.8, 1.0);
    $lightAmbient0(light, 0.4, 0.4, 0.9, 0.8);
    $lightAmbient1(light, 0.5, 0.4, 0.1, 0.4);

    $writeSlot(
      $writePack($packCamera(camera)),
      $writePack($packLight(light)));
  }
  {
    const lst = [];
    const m = $newMesh();

    $meshPosition(m, -2, 0, 0);
    lst.push($writePack($packMesh(m)));
    $meshPosition(m, 0, 0, 0);
    lst.push($writePack($packMesh(m)));
    $meshPosition(m, 2, 0, 0);
    lst.push($writePack($packMesh(m)));
    $meshPosition(m, -2, 0, -2);
    lst.push($writePack($packMesh(m)));
    $meshPosition(m, 0, 0, -2);
    lst.push($writePack($packMesh(m)));
    $meshPosition(m, 2, 0, -2);
    lst.push($writePack($packMesh(m)));

    const name = "tr_01";
    const slot = $writeDrawSlot(lst);
    const args = $writeDrawArgs(name, lst.length);
    $draw(name, slot, args);
  }
  {
    const lst = [];
    const m = $newMesh();
    $meshAngle(m, 90, 0);

    $meshPosition(m, -2, 0, 2);
    lst.push($writePack($packMesh(m)));
    $meshPosition(m, 0, 0, 2);
    lst.push($writePack($packMesh(m)));
    $meshPosition(m, 2, 0, 2);
    lst.push($writePack($packMesh(m)));

    const name = "wa_00";
    const slot = $writeDrawSlot(lst);
    const args = $writeDrawArgs(name, lst.length);
    $draw(name, slot, args);
  }
};
