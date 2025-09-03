
html_listen(window, "load", () => {
  $start(update);
});

const update = () => {
  $submitCamera(0, 2, -5, 90, -20, 35, 0.01, 1000);
  $submitLightDirectional(0, 65, [0.8, 0.8, 0.8, 1.0]);
  $submitLightAmbient([0.4, 0.4, 0.9, 0.8], [0.5, 0.4, 0.1, 0.4]);

  $submitMesh("tr_01", [
    {
      x: 0,
      y: 0,
      z: 0,
      ha: 0,
      va: 0,
      factor0: [1, 1, 1, 1],
      factor1: [1, 0, 0, 0],
      factor2: [0, 0, 0, 0],
      factor3: [0, 0, 0, 0],
    }
  ]);
};
