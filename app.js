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
  const deg2rad = (deg) => {
    return deg / 180 * Math.PI;
  };
  const vec3dot = (a, b) => {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  };
  const vec3length = (a) => {
    const d = vec3dot(a, a);
    return Math.sqrt(d);
  };
  const vec3add = (a, b) => {
    return [
      a[0] + b[0],
      a[1] + b[1],
      a[2] + b[2]
    ];
  };
  const vec3sub = (a, b) => {
    return [
      a[0] - b[0],
      a[1] - b[1],
      a[2] - b[2]
    ];
  };
  const vec3normalize = (v) => {
    const l = vec3length(v);
    return [
      v[0] / l,
      v[1] / l,
      v[2] / l
    ];
  };
  const vec3cross = (a, b) => {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ];
  };
  const mat4multiply = (a, b) => {
    return [
      a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
      a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
      a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
      a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],
      a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
      a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
      a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
      a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],
      a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
      a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
      a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
      a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],
      a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
      a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
      a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
      a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15]
    ];
  };
  const mat4translate = (x, y, z) => {
    return [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      x,
      y,
      z,
      1
    ];
  };
  const mat4lookat = (eye, at, up) => {
    const tz = vec3normalize(vec3sub(at, eye));
    const tx = vec3normalize(vec3cross(up, tz));
    const ty = vec3cross(tz, tx);
    const dx = vec3dot(eye, tx);
    const dy = vec3dot(eye, ty);
    const dz = vec3dot(eye, tz);
    return [
      tx[0],
      ty[0],
      tz[0],
      0,
      tx[1],
      ty[1],
      tz[1],
      0,
      tx[2],
      ty[2],
      tz[2],
      0,
      -dx,
      -dy,
      -dz,
      1
    ];
  };
  const mat4perspective = (fovy, aspect, near, far) => {
    const sy = 1 / Math.tan(fovy);
    const sx = sy / aspect;
    const sz = far / (far - near);
    const wz = -(sz * near);
    return [
      sx,
      0,
      0,
      0,
      0,
      sy,
      0,
      0,
      0,
      0,
      sz,
      1,
      0,
      0,
      wz,
      0
    ];
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
    @binding(0) @group(0) var<uniform> viewProj : mat4x4<f32>;
    @binding(1) @group(0) var<uniform> world : mat4x4<f32>;
    @vertex
    fn mainVertex(@location(0) position: vec3<f32>) -> @builtin(position) vec4<f32> {
      return viewProj * world * vec4(position, 1.0);
    }
    @fragment
    fn mainFragment() -> @location(0) vec4<f32> {
      return vec4(1.0, 1.0, 1.0, 1.0);
    }
    `
    }));
    obj.bindGroupLayout.push(device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: {} },
        { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { hasDynamicOffset: true } }
      ]
    }));
    obj.pipelineLayout.push(device.createPipelineLayout({
      bindGroupLayouts: [
        obj.bindGroupLayout[0]
      ]
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
      size: 64 * 1,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    }));
    obj.buffer.push(device.createBuffer({
      size: 256 * 1024,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    }));
    obj.bindGroup.push(device.createBindGroup({
      layout: obj.bindGroupLayout[0],
      entries: [
        { binding: 0, resource: { buffer: obj.buffer[0] } },
        { binding: 1, resource: { buffer: obj.buffer[1], size: 256, offset: 0 } }
      ]
    }));
    return obj;
  };
  const basil3d_update_canvas = (gpu, canvas) => {
    if (canvas.width !== window.innerWidth) {
      canvas.width = window.innerWidth;
    }
    if (canvas.height !== window.innerHeight) {
      canvas.height = window.innerHeight;
    }
  };
  const basil3d_app_load = (device) => {
    const obj = {
      gpu: {},
      audio: {},
      loading: 0
    };
    const path = "app.json";
    fetch(path).then((res) => res.json()).then((json) => {
      if (json.gpu) {
        json.gpu.buffer = json.gpu.buffer.map((data) => {
          const binary = window.atob(json.embed[data.embed]);
          const buffer = device.createBuffer({
            size: binary.length,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.INDEX,
            mappedAtCreation: true
          });
          const view = new DataView(buffer.getMappedRange());
          for (let i = 0; i < binary.length; ++i) {
            view.setUint8(i, binary.charCodeAt(i));
          }
          buffer.unmap();
          return buffer;
        });
        obj.gpu = json.gpu;
      }
      if (json.audio) {
        obj.audio = json.audio;
      }
      obj.loading -= 1;
    });
    obj.loading += 1;
    return obj;
  };
  const basil3d_app_is_loading = (app) => {
    return app.loading > 0;
  };
  const basil3d_app_gpu_id = (app, name) => {
    for (let i = 0; i < app.gpu.id.length; ++i) {
      if (app.gpu.id[i].name === name) {
        return i;
      }
    }
    return -1;
  };
  const basil3d_scene_create = () => {
    return {
      camera: {
        aspect: 1,
        fovy: deg2rad(30),
        zNear: 0.1,
        zFar: 1e3,
        dir: [0, 0, 1],
        eye: [0, 0, 0],
        up: [0, 1, 0]
      },
      entity: []
    };
  };
  const basil3d_scene_setup = (scene, app, desc) => {
    if (desc.camera) {
      Object.assign(scene.camera, desc.camera);
    }
    if (desc.entity) {
      for (const e of desc.entity) {
        const id = basil3d_app_gpu_id(app, e.name);
        if (id < 0) {
          continue;
        }
        scene.entity.push({
          id,
          matrix: e.matrix
        });
      }
    }
  };
  const basil3d_scene_write_buffers = (scene, app, gpu, canvas, device) => {
    const mat = new Float32Array(16);
    {
      scene.camera.aspect = canvas.width / canvas.height;
      const at = vec3add(scene.camera.eye, scene.camera.dir);
      const view = mat4lookat(scene.camera.eye, at, scene.camera.up);
      const proj = mat4perspective(scene.camera.fovy, scene.camera.aspect, scene.camera.zNear, scene.camera.zFar);
      const vp = mat4multiply(view, proj);
      mat.set(vp);
      device.queue.writeBuffer(gpu.buffer[0], 0, mat);
    }
    const batch = [];
    batch.length = app.gpu.mesh.length;
    for (let i = 0; i < batch.length; ++i) {
      batch[i] = [];
    }
    let offset = 0;
    for (const e of scene.entity) {
      for (const i of app.gpu.id[e.id].mesh) {
        batch[i].push(offset);
      }
      mat.set(e.matrix);
      device.queue.writeBuffer(gpu.buffer[1], offset, mat);
      offset += 256;
    }
    return batch;
  };
  const basil3d_scene_render_pass = (batch, app, gpu, pass) => {
    for (let i = 0; i < batch.length; ++i) {
      if (batch[i].length <= 0) {
        continue;
      }
      const mesh = app.gpu.mesh[i];
      pass.setPipeline(gpu.pipeline[0]);
      if (mesh.vb0) {
        const [index, offset, size] = mesh.vb0;
        pass.setVertexBuffer(0, app.gpu.buffer[index], offset, size);
      }
      if (mesh.ib) {
        const [index, offset, size] = mesh.ib;
        pass.setIndexBuffer(app.gpu.buffer[index], "uint16", offset, size);
      }
      for (const offset of batch[i]) {
        pass.setBindGroup(0, gpu.bindGroup[0], [offset]);
        pass.drawIndexed(mesh.count);
      }
    }
  };
  const basil3d_start = async (setup2) => {
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    const gpu = basil3d_gpu_create(device, canvasFormat);
    const app = basil3d_app_load(device);
    const scene = basil3d_scene_create();
    const canvas = html_canvas();
    const context = canvas.getContext("webgpu");
    context.configure({
      device,
      format: canvasFormat,
      alphaMode: "opaque"
    });
    const frame = () => {
      basil3d_update_canvas(gpu, canvas);
      if (basil3d_app_is_loading(app)) {
        const ce = device.createCommandEncoder();
        const renderPassDesc = {
          colorAttachments: [{
            view: context.getCurrentTexture().createView(),
            clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1 },
            loadOp: "clear",
            storeOp: "store"
          }]
        };
        const pass = ce.beginRenderPass(renderPassDesc);
        pass.end();
        device.queue.submit([ce.finish()]);
      } else {
        if (setup2) {
          setup2(app, scene);
          setup2 = null;
        }
        const batch = basil3d_scene_write_buffers(scene, app, gpu, canvas, device);
        const ce = device.createCommandEncoder();
        const renderPassDesc = {
          colorAttachments: [{
            view: context.getCurrentTexture().createView(),
            clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1 },
            loadOp: "clear",
            storeOp: "store"
          }]
        };
        const pass = ce.beginRenderPass(renderPassDesc);
        basil3d_scene_render_pass(batch, app, gpu, pass);
        pass.end();
        device.queue.submit([ce.finish()]);
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const setup = (app, scene) => {
    html_hide_message();
    basil3d_scene_setup(scene, app, {
      camera: {
        eye: [0, 1.5, -5]
      },
      entity: [
        { name: "tr_01", matrix: mat4translate(-2, 0, 0) },
        { name: "tr_01", matrix: mat4translate(2, 0, 0) },
        { name: "tr_01", matrix: mat4translate(0, 0, 4) }
      ]
    });
  };
  html_listen(window, "load", () => {
    basil3d_start(setup);
  });
})();
