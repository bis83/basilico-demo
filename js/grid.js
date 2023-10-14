
const addDebugGrid = (app) => {
  const lines = [];

  lines.push({
    from: [-50, 0, 0],
    to: [50, 0, 0],
    color: [255, 0, 0, 255],
  });
  lines.push({
    from: [0, 0, -50],
    to: [0, 0, 50],
    color: [0, 0, 255, 255],
  });

  $viewOpen(app.view, {
    "lines": lines,
  });
};
