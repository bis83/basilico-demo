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
  const html_show_message = (text) => {
    const elem = html_message();
    elem.style.display = ``;
    elem.textContent = text;
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
  const vec3dir = (hang, vang) => {
    const h = deg2rad(hang);
    const v = deg2rad(vang);
    return [
      Math.cos(v) * Math.cos(h),
      Math.sin(v),
      Math.cos(v) * Math.sin(h)
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
    const gpu = {
      bindGroupLayout: [],
      pipelineLayout: [],
      shaderModule: [],
      pipeline: [],
      buffer: [],
      texture: [],
      bindGroup: []
    };
    gpu.shaderModule[0] = device.createShaderModule({
      code: `
    @binding(0) @group(0) var<uniform> viewProj : mat4x4<f32>;
    @binding(1) @group(0) var<uniform> world : mat4x4<f32>;
    struct VertexInput {
      @location(0) position: vec3<f32>,
      @location(1) normal : vec3<f32>,
    };
    struct VertexOutput {
      @builtin(position) position : vec4<f32>,
      @location(0) normal : vec3<f32>,
    };
    struct FragmentOutput {
      @location(0) normal : vec4<f32>,
    };
    @vertex
    fn mainVertex(input : VertexInput) -> VertexOutput {
      var output : VertexOutput;
      output.position = (viewProj * world * vec4(input.position, 1.0));
      output.normal = normalize((world * vec4(input.normal, 1.0)).xyz);
      return output;
    }
    @fragment
    fn mainFragment(input : VertexOutput) -> FragmentOutput {
      var output : FragmentOutput;
      output.normal = vec4(input.normal * 0.5 + 0.5, 0);
      return output;
    }
    `
    });
    gpu.shaderModule[1] = device.createShaderModule({
      code: `
    @vertex
    fn mainVertex(@builtin(vertex_index) id : u32) -> @builtin(position) vec4<f32> {
      return vec4(2.0f * f32((1 & id) << 1) - 1.0f, -2.0f * f32(2 & id) + 1.0f, 1.0, 1.0);
    }
    `
    });
    gpu.shaderModule[2] = device.createShaderModule({
      code: `
    @group(0) @binding(0) var gbuffer0 : texture_2d<f32>;
    @fragment
    fn mainFragment(@builtin(position) coord : vec4<f32>) -> @location(0) vec4<f32> {
      var N = normalize(textureLoad(gbuffer0, vec2<i32>(floor(coord.xy)), 0).xyz * 2.0 - 1.0);
      var L = normalize(vec3<f32>(0.0, 1.0, 0.0));
      var C_L = vec3<f32>(1.0, 1.0, 1.0);
      var C_A = vec3<f32>(1.0, 1.0, 1.0);
      return vec4(C_L * max(dot(N, L), 0) + C_A, 1.0);
    }
    `
    });
    gpu.shaderModule[3] = device.createShaderModule({
      code: `
    @fragment
    fn mainFragment(@builtin(position) coord : vec4<f32>) -> @location(0) vec4<f32> {
      var C_A = vec3<f32>(0.1, 0.1, 0.12);
      return vec4(C_A, 1.0);
    }
    `
    });
    gpu.shaderModule[4] = device.createShaderModule({
      code: `
    @group(0) @binding(0) var lbuffer0 : texture_2d<f32>;
    fn toneMapping(x : vec3<f32>) -> vec3<f32> {
      var a = 2.51f;
      var b = 0.03f;
      var c = 2.43f;
      var d = 0.59f;
      var e = 0.14f;
      return saturate((x * (a * x + b)) / (x * (c * x + d) + e));
    }
    fn vignette(coord : vec2<f32>) -> f32 {
      var uv = coord.xy / vec2<f32>(textureDimensions(lbuffer0, 0).xy);
      uv *= 1.0 - uv.yx;
      return pow(uv.x * uv.y * 15.0, 0.25);
    }
    @fragment
    fn mainFragment(@builtin(position) coord : vec4<f32>) -> @location(0) vec4<f32> {
      var color = textureLoad(lbuffer0, vec2<i32>(floor(coord.xy)), 0).rgb;
      color *= vignette(coord.xy);
      return vec4<f32>(toneMapping(color), 1);
    }
    `
    });
    gpu.bindGroupLayout[0] = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: {} },
        { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { hasDynamicOffset: true } }
      ]
    });
    gpu.bindGroupLayout[1] = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: "unfilterable-float" } }
      ]
    });
    gpu.pipelineLayout[0] = device.createPipelineLayout({
      bindGroupLayouts: [
        gpu.bindGroupLayout[0]
      ]
    });
    gpu.pipelineLayout[1] = device.createPipelineLayout({
      bindGroupLayouts: [
        gpu.bindGroupLayout[1]
      ]
    });
    gpu.pipeline[0] = device.createRenderPipeline({
      layout: gpu.pipelineLayout[0],
      vertex: {
        module: gpu.shaderModule[0],
        entryPoint: "mainVertex",
        buffers: [
          { arrayStride: 12, attributes: [{ format: "float32x3", offset: 0, shaderLocation: 0 }] },
          { arrayStride: 12, attributes: [{ format: "float32x3", offset: 0, shaderLocation: 1 }] }
        ]
      },
      fragment: {
        module: gpu.shaderModule[0],
        entryPoint: "mainFragment",
        targets: [
          { format: "rgb10a2unorm" }
        ]
      },
      depthStencil: {
        depthWriteEnabled: true,
        depthCompare: "less",
        format: "depth24plus"
      }
    });
    gpu.pipeline[1] = device.createRenderPipeline({
      layout: gpu.pipelineLayout[1],
      vertex: {
        module: gpu.shaderModule[1],
        entryPoint: "mainVertex",
        buffers: []
      },
      fragment: {
        module: gpu.shaderModule[2],
        entryPoint: "mainFragment",
        targets: [
          { format: "rgba16float" }
        ]
      },
      depthStencil: {
        depthWriteEnabled: false,
        depthCompare: "not-equal",
        format: "depth24plus"
      }
    });
    gpu.pipeline[2] = device.createRenderPipeline({
      layout: gpu.pipelineLayout[1],
      vertex: {
        module: gpu.shaderModule[1],
        entryPoint: "mainVertex",
        buffers: []
      },
      fragment: {
        module: gpu.shaderModule[3],
        entryPoint: "mainFragment",
        targets: [
          { format: "rgba16float" }
        ]
      },
      depthStencil: {
        depthWriteEnabled: false,
        depthCompare: "equal",
        format: "depth24plus"
      }
    });
    gpu.pipeline[3] = device.createRenderPipeline({
      layout: gpu.pipelineLayout[1],
      vertex: {
        module: gpu.shaderModule[1],
        entryPoint: "mainVertex",
        buffers: []
      },
      fragment: {
        module: gpu.shaderModule[4],
        entryPoint: "mainFragment",
        targets: [
          { format: canvasFormat }
        ]
      }
    });
    gpu.buffer[0] = device.createBuffer({
      size: 64 * 1,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    gpu.buffer[1] = device.createBuffer({
      size: 256 * 1024,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    gpu.bindGroup[0] = device.createBindGroup({
      layout: gpu.bindGroupLayout[0],
      entries: [
        { binding: 0, resource: { buffer: gpu.buffer[0] } },
        { binding: 1, resource: { buffer: gpu.buffer[1], size: 256, offset: 0 } }
      ]
    });
    return gpu;
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
  const basil3d_gpu_on_frame_start = (gpu, device, canvas) => {
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const deleteTexture = (no) => {
        if (gpu.texture[no] !== void 0) {
          gpu.texture[no].destroy();
          delete gpu.texture[no];
        }
      };
      deleteTexture(0);
      deleteTexture(1);
      deleteTexture(2);
      const deleteBindGroup = (no) => {
        if (gpu.bindGroup[no] !== void 0) {
          delete gpu.bindGroup[no];
        }
      };
      deleteBindGroup(1);
      deleteBindGroup(2);
    }
    if (gpu.texture[0] === void 0) {
      gpu.texture[0] = device.createTexture({
        size: [canvas.width, canvas.height],
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
      });
    }
    if (gpu.texture[1] === void 0) {
      gpu.texture[1] = device.createTexture({
        size: [canvas.width, canvas.height],
        format: "rgb10a2unorm",
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
      });
    }
    if (gpu.texture[2] === void 0) {
      gpu.texture[2] = device.createTexture({
        size: [canvas.width, canvas.height],
        format: "rgba16float",
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
      });
    }
    if (gpu.bindGroup[1] === void 0) {
      gpu.bindGroup[1] = device.createBindGroup({
        layout: gpu.bindGroupLayout[1],
        entries: [
          { binding: 0, resource: gpu.texture[1].createView() }
        ]
      });
    }
    if (gpu.bindGroup[2] === void 0) {
      gpu.bindGroup[2] = device.createBindGroup({
        layout: gpu.bindGroupLayout[1],
        entries: [
          { binding: 0, resource: gpu.texture[2].createView() }
        ]
      });
    }
  };
  const basil3d_gpu_on_frame_loading = (gpu, device, context) => {
    const ce = device.createCommandEncoder();
    const pass = ce.beginRenderPass({
      colorAttachments: [{
        view: context.getCurrentTexture().createView(),
        clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1 },
        loadOp: "clear",
        storeOp: "store"
      }]
    });
    pass.end();
    device.queue.submit([ce.finish()]);
  };
  const basil3d_gpu_on_frame_scene = (gpu, device, context, canvas, scene, app) => {
    const batch = [];
    {
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
    }
    const ce = device.createCommandEncoder();
    {
      const pass = ce.beginRenderPass({
        depthStencilAttachment: {
          view: gpu.texture[0].createView(),
          depthClearValue: 1,
          depthLoadOp: "clear",
          depthStoreOp: "store"
        },
        colorAttachments: [{
          view: gpu.texture[1].createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: "clear",
          storeOp: "store"
        }]
      });
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
        if (mesh.vb1) {
          const [index, offset, size] = mesh.vb1;
          pass.setVertexBuffer(1, app.gpu.buffer[index], offset, size);
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
      pass.end();
    }
    {
      const pass = ce.beginRenderPass({
        depthStencilAttachment: {
          view: gpu.texture[0].createView(),
          depthReadOnly: true
        },
        colorAttachments: [{
          view: gpu.texture[2].createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: "clear",
          storeOp: "store"
        }]
      });
      pass.setPipeline(gpu.pipeline[1]);
      pass.setBindGroup(0, gpu.bindGroup[1]);
      pass.draw(4);
      pass.setPipeline(gpu.pipeline[2]);
      pass.draw(4);
      pass.end();
    }
    {
      const pass = ce.beginRenderPass({
        colorAttachments: [{
          view: context.getCurrentTexture().createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: "clear",
          storeOp: "store"
        }]
      });
      pass.setPipeline(gpu.pipeline[3]);
      pass.setBindGroup(0, gpu.bindGroup[2]);
      pass.draw(4);
      pass.end();
    }
    device.queue.submit([ce.finish()]);
  };
  const basil3d_start = async (setup2) => {
    if (!navigator.gpu) {
      html_show_message("ERROR: WebGPU not supported.");
      return;
    }
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
      basil3d_gpu_on_frame_start(gpu, device, canvas);
      if (basil3d_app_is_loading(app)) {
        basil3d_gpu_on_frame_loading(gpu, device, context);
      } else {
        if (setup2) {
          setup2(app, scene);
          setup2 = null;
        }
        basil3d_gpu_on_frame_scene(gpu, device, context, canvas, scene, app);
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const setup = (app, scene) => {
    html_hide_message();
    basil3d_scene_setup(scene, app, {
      camera: {
        eye: [6, 2.5, -5],
        dir: vec3dir(135, -10)
      },
      entity: [
        { name: "tr_01", matrix: mat4translate(-2, 0, 0) },
        { name: "tr_01", matrix: mat4translate(2, 0, 0) },
        { name: "wa_00", matrix: mat4translate(0, 0, 4) }
      ]
    });
  };
  html_listen(window, "load", () => {
    html_show_message("Welcome Basilico.");
    basil3d_start(setup);
  });
})();
