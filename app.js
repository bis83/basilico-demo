(() => {
  const html_listen = (target, key, func) => {
    target.addEventListener(key, func);
  };
  const html_canvas = () => {
    return document.getElementById("main");
  };
  const html_message = () => {
    return document.getElementById("message");
  };
  const html_hide_message = () => {
    const elem = html_message();
    elem.style.display = `none`;
  };
  const basil3d_gpu_create = (device, canvasFormat) => {
    const obj = {
      bindGroupLayout: [],
      pipelineLayout: [],
      shaderModule: [],
      pipeline: [],
      buffer: [],
      bindGroup: []
    };
    obj.shaderModule.push(device.createShaderModule({
      code: `
    @vertex
    fn mainVertex(@location(0) position: vec3<f32>) -> @builtin(position) vec4<f32> {
      return vec4(position, 1.0);
    }
    @fragment
    fn mainFragment() -> @location(0) vec4<f32> {
      return vec4(1.0, 1.0, 1.0, 1.0);
    }
    `
    }));
    obj.bindGroupLayout.push(device.createBindGroupLayout({
      entries: []
    }));
    obj.bindGroupLayout.push(device.createBindGroupLayout({
      entries: []
    }));
    obj.bindGroupLayout.push(device.createBindGroupLayout({
      entries: []
    }));
    obj.pipelineLayout.push(device.createPipelineLayout({
      bindGroupLayouts: []
    }));
    obj.pipeline.push(device.createRenderPipeline({
      layout: obj.pipelineLayout[0],
      vertex: {
        module: obj.shaderModule[0],
        entryPoint: "mainVertex",
        buffers: [
          { arrayStride: 12, attributes: [{ format: "float32x3", offset: 0, shaderLocation: 0 }] }
        ]
      },
      fragment: {
        module: obj.shaderModule[0],
        entryPoint: "mainFragment",
        targets: [
          { format: canvasFormat }
        ]
      }
    }));
    obj.buffer.push(device.createBuffer({
      size: 3 * 4 * 3,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true
    }));
    new Float32Array(obj.buffer[0].getMappedRange()).set([
      1,
      -1,
      0,
      -1,
      -1,
      0,
      0,
      1,
      0
    ]);
    obj.buffer[0].unmap();
    return obj;
  };
  const basil3d_scene_create = () => {
    return {};
  };
  const basil3d_scene_render = (scene, gpu, pass) => {
    pass.setPipeline(gpu.pipeline[0]);
    pass.setVertexBuffer(0, gpu.buffer[0]);
    pass.draw(3, 1, 0, 0);
  };
  const basil3d_start = async () => {
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    const gpu = basil3d_gpu_create(device, canvasFormat);
    const scene = basil3d_scene_create();
    const canvas = html_canvas();
    const context = canvas.getContext("webgpu");
    context.configure({
      device,
      format: canvasFormat,
      alphaMode: "opaque"
    });
    const frame = () => {
      if (canvas.width !== window.innerWidth) {
        canvas.width = window.innerWidth;
      }
      if (canvas.height !== window.innerHeight) {
        canvas.height = window.innerHeight;
      }
      const ce = device.createCommandEncoder();
      const view = context.getCurrentTexture().createView();
      const renderPassDesc = {
        colorAttachments: [{
          view,
          clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1 },
          loadOp: "clear",
          storeOp: "store"
        }]
      };
      const pass = ce.beginRenderPass(renderPassDesc);
      basil3d_scene_render(scene, gpu, pass);
      pass.end();
      device.queue.submit([ce.finish()]);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  html_listen(window, "load", () => {
    html_hide_message();
    basil3d_start();
  });
})();
