(() => {
  const html_listen = (target, key, func) => {
    target.addEventListener(key, func);
  };
  const basil3d_start = () => {
  };
  html_listen(window, "load", () => {
    basil3d_start();
  });
})();
