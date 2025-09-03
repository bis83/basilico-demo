(() => {
  const html_listen = (target, key, func) => {
    target.addEventListener(key, func);
  };
  const html_canvas = () => {
    return document.getElementById("canvas");
  };
  const defined = (x) => {
    return x !== void 0;
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
  const mat4identity = () => {
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
      0,
      0,
      0,
      1
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
  const mat4invert = (a) => {
    const b00 = a[0] * a[5] - a[1] * a[4];
    const b01 = a[0] * a[6] - a[2] * a[4];
    const b02 = a[0] * a[7] - a[3] * a[4];
    const b03 = a[1] * a[6] - a[2] * a[5];
    const b04 = a[1] * a[7] - a[3] * a[5];
    const b05 = a[2] * a[7] - a[3] * a[6];
    const b06 = a[8] * a[13] - a[9] * a[12];
    const b07 = a[8] * a[14] - a[10] * a[12];
    const b08 = a[8] * a[15] - a[11] * a[12];
    const b09 = a[9] * a[14] - a[10] * a[13];
    const b10 = a[9] * a[15] - a[11] * a[13];
    const b11 = a[10] * a[15] - a[11] * a[14];
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return mat4identity();
    }
    det = 1 / det;
    return [
      (a[5] * b11 - a[6] * b10 + a[7] * b09) * det,
      (a[2] * b10 - a[1] * b11 - a[3] * b09) * det,
      (a[13] * b05 - a[14] * b04 + a[15] * b03) * det,
      (a[10] * b04 - a[9] * b05 - a[11] * b03) * det,
      (a[6] * b08 - a[4] * b11 - a[7] * b07) * det,
      (a[0] * b11 - a[2] * b08 + a[3] * b07) * det,
      (a[14] * b02 - a[12] * b05 - a[15] * b01) * det,
      (a[8] * b05 - a[10] * b02 + a[11] * b01) * det,
      (a[4] * b10 - a[5] * b08 + a[7] * b06) * det,
      (a[1] * b08 - a[0] * b10 - a[3] * b06) * det,
      (a[12] * b04 - a[13] * b02 + a[15] * b00) * det,
      (a[9] * b02 - a[8] * b04 - a[11] * b00) * det,
      (a[5] * b07 - a[4] * b09 - a[6] * b06) * det,
      (a[0] * b09 - a[1] * b07 + a[2] * b06) * det,
      (a[13] * b01 - a[12] * b03 - a[14] * b00) * det,
      (a[8] * b03 - a[9] * b01 + a[10] * b00) * det
    ];
  };
  const mat4translated = (m, x, y, z) => {
    m[12] = x;
    m[13] = y;
    m[14] = z;
  };
  const mat4angle = (ha, va) => {
    const h = deg2rad(ha);
    const sinH = Math.sin(h);
    const cosH = Math.cos(h);
    return [
      cosH,
      0,
      sinH,
      0,
      0,
      1,
      0,
      0,
      -sinH,
      0,
      cosH,
      0,
      0,
      0,
      0,
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
  const mat4ortho = (w, h, zn, zf) => {
    const sx = 2 / w;
    const sy = 2 / h;
    const sz = 1 / (zf - zn);
    const wz = zn / (zn - zf);
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
      0,
      0,
      0,
      wz,
      1
    ];
  };
  const $__onload = () => {
    $$.data.loading += 1;
    (async () => {
      const path = "app.json";
      const res = await fetch(path);
      const json = await res.json();
      const data = $$.data;
      Object.assign(data, json);
      if (data.wgsl) {
        await $__onloadWGSL(data.wgsl, data.embed);
      }
      if (data.gltf) {
        await $__onloadGLTF(data.gltf, data.embed);
      }
      delete data.embed;
      data.loading -= 1;
    })();
  };
  const $__onloadDone = () => {
    return $$.data.loading <= 0;
  };
  const $__onloadWGSL = async (wgsl, embed) => {
    const device = $$.gpu.device;
    if (wgsl.shader) {
      for (let i = 0; i < wgsl.shader.length; ++i) {
        const data = wgsl.shader[i];
        const code = await $__decodeShaderEmbed(embed[data.embed]);
        const shader = device.createShaderModule({
          code
        });
        wgsl.shader[i] = shader;
      }
    }
    const pipelineLayout = $$.gpu.pipelineLayout;
    const canvasFormat = $$.gpu.canvasFormat;
    wgsl.pipeline = [];
    wgsl.pipeline[0] = device.createRenderPipeline({
      layout: pipelineLayout[0],
      vertex: {
        module: wgsl.shader[0],
        entryPoint: "VS",
        buffers: [
          { arrayStride: 4, attributes: [{ format: "uint32", offset: 0, shaderLocation: 0 }], stepMode: "instance" },
          // instance
          { arrayStride: 12, attributes: [{ format: "float32x3", offset: 0, shaderLocation: 1 }] },
          // position
          { arrayStride: 12, attributes: [{ format: "float32x3", offset: 0, shaderLocation: 2 }] }
          // normal
          /*
          { arrayStride: 4, attributes: [{ format: "float16x2", offset: 0, shaderLocation: 2 }] }, // tangent
          { arrayStride: 4, attributes: [{ format: "float16x2", offset: 0, shaderLocation: 3 }] }, // texcoord0
          { arrayStride: 8, attributes: [{ format: "uint16x4", offset: 0, shaderLocation: 4 }] }, // joints0
          { arrayStride: 8, attributes: [{ format: "float16x4", offset: 0, shaderLocation: 5 }] }, // weights0
          */
        ]
      },
      fragment: {
        module: wgsl.shader[0],
        entryPoint: "FS",
        targets: [
          { format: "rgb10a2unorm" },
          { format: "rgba8unorm" },
          { format: "rgba8unorm" },
          { format: "rgba16float" }
        ]
      },
      depthStencil: {
        depthWriteEnabled: true,
        depthCompare: "less",
        format: "depth32float"
      },
      primitive: {
        cullMode: "back",
        frontFace: "cw"
      }
    });
    wgsl.pipeline[1] = device.createRenderPipeline({
      layout: pipelineLayout[1],
      vertex: {
        module: wgsl.shader[1],
        entryPoint: "VS",
        buffers: []
      },
      fragment: {
        module: wgsl.shader[1],
        entryPoint: "FS_SSAO",
        targets: [
          {
            format: "rgba8unorm",
            blend: {
              color: {
                operation: "min",
                srcFactor: "one",
                dstFactor: "one"
              },
              alpha: {}
            },
            writeMask: GPUColorWrite.RED
          }
        ]
      }
    });
    wgsl.pipeline[2] = device.createRenderPipeline({
      layout: pipelineLayout[1],
      vertex: {
        module: wgsl.shader[1],
        entryPoint: "VS",
        buffers: []
      },
      fragment: {
        module: wgsl.shader[1],
        entryPoint: "FS_HDR",
        targets: [
          {
            format: "rgba16float",
            blend: {
              color: {
                operation: "add",
                srcFactor: "one",
                dstFactor: "one"
              },
              alpha: {}
            }
          }
        ]
      },
      depthStencil: {
        depthWriteEnabled: false,
        depthCompare: "not-equal",
        format: "depth32float"
      }
    });
    wgsl.pipeline[3] = device.createRenderPipeline({
      layout: pipelineLayout[1],
      vertex: {
        module: wgsl.shader[1],
        entryPoint: "VS",
        buffers: []
      },
      fragment: {
        module: wgsl.shader[1],
        entryPoint: "FS_HDRSky",
        targets: [
          {
            format: "rgba16float",
            blend: {
              color: {
                operation: "add",
                srcFactor: "one",
                dstFactor: "one"
              },
              alpha: {}
            }
          }
        ]
      },
      depthStencil: {
        depthWriteEnabled: false,
        depthCompare: "equal",
        format: "depth32float"
      }
    });
    wgsl.pipeline[4] = device.createRenderPipeline({
      layout: pipelineLayout[1],
      vertex: {
        module: wgsl.shader[1],
        entryPoint: "VS",
        buffers: []
      },
      fragment: {
        module: wgsl.shader[1],
        entryPoint: "FS_HDR2LDR",
        targets: [
          { format: canvasFormat }
        ]
      },
      depthStencil: {
        depthWriteEnabled: false,
        depthCompare: "always",
        format: "depth32float"
      }
    });
    wgsl.pipeline[5] = device.createRenderPipeline({
      layout: pipelineLayout[0],
      vertex: {
        module: wgsl.shader[2],
        entryPoint: "VS",
        buffers: [
          { arrayStride: 8, attributes: [{ format: "float32x2", offset: 0, shaderLocation: 0 }] },
          // position
          { arrayStride: 4, attributes: [{ format: "unorm8x4", offset: 0, shaderLocation: 1 }] }
          // color
        ]
      },
      fragment: {
        module: wgsl.shader[2],
        entryPoint: "FS",
        targets: [
          {
            format: canvasFormat,
            blend: {
              color: {
                operation: "add",
                srcFactor: "src-alpha",
                dstFactor: "one-minus-src-alpha"
              },
              alpha: {
                operation: "add",
                srcFactor: "one",
                dstFactor: "zero"
              }
            }
          }
        ]
      },
      depthStencil: {
        depthWriteEnabled: false,
        depthCompare: "always",
        format: "depth32float"
      },
      primitive: {
        cullMode: "back",
        frontFace: "cw"
      }
    });
  };
  const $__onloadGLTF = async (gltf, embed) => {
    const device = $$.gpu.device;
    if (gltf.buffer) {
      for (let i = 0; i < gltf.buffer.length; ++i) {
        const data = gltf.buffer[i];
        const binary = await $__decodeBufferEmbed(embed[data.embed]);
        const buffer = device.createBuffer({
          size: binary.length,
          usage: GPUBufferUsage.VERTEX | GPUBufferUsage.INDEX,
          mappedAtCreation: true
        });
        const view = new DataView(buffer.getMappedRange());
        for (let i2 = 0; i2 < binary.length; ++i2) {
          view.setUint8(i2, binary[i2]);
        }
        buffer.unmap();
        gltf.buffer[i] = buffer;
      }
    }
  };
  const $__decodeBufferEmbed = async (str) => {
    const base64 = window.atob(str);
    const bytes = new Uint8Array(base64.length);
    for (let i = 0; i < base64.length; ++i) {
      bytes[i] = base64.charCodeAt(i);
    }
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    const arrayBuffer = await new Response(stream).arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };
  const $__decodeShaderEmbed = async (str) => {
    const base64 = window.atob(str);
    const bytes = new Uint8Array(base64.length);
    for (let i = 0; i < base64.length; ++i) {
      bytes[i] = base64.charCodeAt(i);
    }
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    const text = await new Response(stream).text();
    return text;
  };
  const __strideOfStageInput = 512;
  const __strideOfMeshInput = 128;
  const __strideOfMeshID = 4;
  const __strideOfIndirectArgs = 20;
  const $__gpuInit = async () => {
    const gpu = $$.gpu;
    gpu.adapter = await navigator.gpu.requestAdapter();
    gpu.device = await gpu.adapter.requestDevice();
    gpu.canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    gpu.canvas = html_canvas();
    gpu.context = gpu.canvas.getContext("webgpu");
    gpu.context.configure({
      device: gpu.device,
      format: gpu.canvasFormat,
      alphaMode: "opaque"
    });
    const device = gpu.device;
    const createCBuffer = (i, size, usage) => {
      gpu.cbuffer[i] = device.createBuffer({
        size,
        usage: usage | GPUBufferUsage.COPY_DST
      });
    };
    createCBuffer(0, __strideOfStageInput * 1, GPUBufferUsage.UNIFORM);
    createCBuffer(1, __strideOfMeshInput * (2 * 1024), GPUBufferUsage.STORAGE);
    createCBuffer(2, __strideOfMeshID * (16 * 1024), GPUBufferUsage.VERTEX);
    createCBuffer(3, __strideOfIndirectArgs * (2 * 1024), GPUBufferUsage.INDIRECT);
    gpu.sampler[0] = device.createSampler({
      magFilter: "linear",
      minFilter: "linear",
      mipmapFilter: "linear"
    });
    gpu.bindGroupLayout[0] = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: {} },
        { binding: 1, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: "read-only-storage" } }
      ]
    });
    gpu.bindGroupLayout[1] = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: {} },
        { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: "depth" } },
        { binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: {} },
        { binding: 3, visibility: GPUShaderStage.FRAGMENT, texture: {} },
        { binding: 4, visibility: GPUShaderStage.FRAGMENT, texture: {} },
        { binding: 5, visibility: GPUShaderStage.FRAGMENT, sampler: {} }
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
    gpu.bindGroup[0] = device.createBindGroup({
      layout: gpu.bindGroupLayout[0],
      entries: [
        { binding: 0, resource: { buffer: gpu.cbuffer[0] } },
        { binding: 1, resource: { buffer: gpu.cbuffer[1] } }
      ]
    });
  };
  const $__gpuUpdateGBuffer = () => {
    const gpu = $$.gpu;
    const device = $$.gpu.device;
    const canvas = $$.gpu.canvas;
    if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const deleteTexture = (no) => {
        if (defined(gpu.gbuffer[no])) {
          gpu.gbuffer[no].destroy();
          delete gpu.gbuffer[no];
        }
      };
      deleteTexture(0);
      deleteTexture(1);
      deleteTexture(2);
      deleteTexture(3);
      deleteTexture(4);
      const deleteBindGroup = (no) => {
        if (defined(gpu.bindGroup[no])) {
          delete gpu.bindGroup[no];
        }
      };
      deleteBindGroup(1);
      deleteBindGroup(2);
      deleteBindGroup(3);
    }
    const createTexture = (i, format) => {
      if (!defined(gpu.gbuffer[i])) {
        gpu.gbuffer[i] = device.createTexture({
          size: [canvas.width, canvas.height],
          format,
          usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
        });
      }
    };
    createTexture(0, "depth32float");
    createTexture(1, "rgb10a2unorm");
    createTexture(2, "rgba8unorm");
    createTexture(3, "rgba8unorm");
    createTexture(4, "rgba16float");
    const createBindGroup = (i, t0, t1, t2, t3) => {
      if (!defined(gpu.bindGroup[i])) {
        gpu.bindGroup[i] = device.createBindGroup({
          layout: gpu.bindGroupLayout[1],
          entries: [
            { binding: 0, resource: { buffer: gpu.cbuffer[0] } },
            { binding: 1, resource: gpu.gbuffer[t0].createView() },
            { binding: 2, resource: gpu.gbuffer[t1].createView() },
            { binding: 3, resource: gpu.gbuffer[t2].createView() },
            { binding: 4, resource: gpu.gbuffer[t3].createView() },
            { binding: 5, resource: gpu.sampler[0] }
          ]
        });
      }
    };
    createBindGroup(1, 0, 1, 2, 3);
    createBindGroup(2, 0, 1, 1, 1);
    createBindGroup(3, 0, 4, 4, 4);
  };
  const $__gpuFrameBegin = () => {
    $__gpuUpdateGBuffer();
    const gpu = $$.gpu;
    gpu.indexOfMeshInput = 0;
    gpu.indexOfMeshID = 0;
    gpu.indexOfIndirectArgs = 0;
    gpu.pass3d = [];
  };
  const $__gpuFrameEnd = () => {
    $__gpuUploadStageInput();
    const device = $$.gpu.device;
    const ce = device.createCommandEncoder();
    $__gpuPassGBuffer(ce);
    $__gpuPassSSAO(ce);
    $__gpuPassHDR(ce);
    $__gpuPassLDR(ce);
    device.queue.submit([ce.finish()]);
  };
  const $__gpuUploadStageInput = () => {
    const gpu = $$.gpu;
    const device = $$.gpu.device;
    const buf = new Float32Array(__strideOfStageInput / 4);
    {
      const camera = gpu.stage.camera;
      const aspect = gpu.canvas.width / gpu.canvas.height;
      const fovy = deg2rad(camera.fov);
      const x = camera.x;
      const y = camera.y;
      const z = camera.z;
      const ha = camera.ha;
      const va = camera.va;
      const dir = vec3dir(ha, va);
      const eye = [x, y, z];
      const at = vec3add(eye, dir);
      const up = [0, 1, 0];
      const look = mat4lookat(eye, at, up);
      const proj = mat4perspective(fovy, aspect, camera.near, camera.far);
      const vp = mat4multiply(look, proj);
      const ivp = mat4invert(vp);
      const ortho = mat4ortho(gpu.canvas.width, gpu.canvas.height, 0, 1);
      buf.set(vp, 0);
      buf.set(ivp, 16);
      buf.set(look, 32);
      buf.set(ortho, 48);
      buf.set(eye, 64);
    }
    {
      const light = gpu.stage.light;
      const ldir = vec3dir(light.ha, light.va);
      const color = light.color;
      const ambient0 = light.ambient0;
      const ambient1 = light.ambient1;
      buf.set(ldir, 68);
      buf.set(color, 72);
      buf.set(ambient0, 76);
      buf.set(ambient1, 80);
    }
    device.queue.writeBuffer(gpu.cbuffer[0], 0, buf);
  };
  const $__gpuPassGBuffer = (ce) => {
    const gpu = $$.gpu;
    const wgsl = $$.data.wgsl;
    const gltf = $$.data.gltf;
    const pass = ce.beginRenderPass({
      depthStencilAttachment: {
        view: gpu.gbuffer[0].createView(),
        depthClearValue: 1,
        depthLoadOp: "clear",
        depthStoreOp: "store"
      },
      colorAttachments: [
        {
          view: gpu.gbuffer[1].createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: "clear",
          storeOp: "store"
        },
        {
          view: gpu.gbuffer[2].createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: "clear",
          storeOp: "store"
        },
        {
          view: gpu.gbuffer[3].createView(),
          clearValue: { r: 1, g: 0, b: 0, a: 0 },
          loadOp: "clear",
          storeOp: "store"
        },
        {
          view: gpu.gbuffer[4].createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: "clear",
          storeOp: "store"
        }
      ]
    });
    pass.setPipeline(wgsl.pipeline[0]);
    pass.setBindGroup(0, gpu.bindGroup[0]);
    for (const p of gpu.pass3d) {
      const segment = gltf.segment[p.sid];
      pass.setVertexBuffer(0, gpu.cbuffer[2], p.indexOfMeshID * __strideOfMeshID);
      if (segment.vb0) {
        const [index, offset, size] = segment.vb0;
        pass.setVertexBuffer(1, gltf.buffer[index], offset, size);
      }
      if (segment.vb1) {
        const [index, offset, size] = segment.vb1;
        pass.setVertexBuffer(2, gltf.buffer[index], offset, size);
      }
      if (segment.ib) {
        const [index, offset, size] = segment.ib;
        pass.setIndexBuffer(gltf.buffer[index], "uint16", offset, size);
      }
      pass.drawIndexedIndirect(gpu.cbuffer[3], p.indexOfIndirectArgs * __strideOfIndirectArgs);
    }
    pass.end();
  };
  const $__gpuPassSSAO = (ce) => {
    const gpu = $$.gpu;
    const wgsl = $$.data.wgsl;
    const pass = ce.beginRenderPass({
      colorAttachments: [{
        view: gpu.gbuffer[3].createView(),
        loadOp: "load",
        storeOp: "store"
      }]
    });
    pass.setPipeline(wgsl.pipeline[1]);
    pass.setBindGroup(0, gpu.bindGroup[2]);
    pass.draw(4);
    pass.end();
  };
  const $__gpuPassHDR = (ce) => {
    const gpu = $$.gpu;
    const wgsl = $$.data.wgsl;
    const pass = ce.beginRenderPass({
      depthStencilAttachment: {
        view: gpu.gbuffer[0].createView(),
        depthReadOnly: true
      },
      colorAttachments: [{
        view: gpu.gbuffer[4].createView(),
        loadOp: "load",
        storeOp: "store"
      }]
    });
    pass.setPipeline(wgsl.pipeline[2]);
    pass.setBindGroup(0, gpu.bindGroup[1]);
    pass.draw(4);
    pass.setPipeline(wgsl.pipeline[3]);
    pass.draw(4);
    pass.end();
  };
  const $__gpuPassLDR = (ce) => {
    const gpu = $$.gpu;
    const wgsl = $$.data.wgsl;
    const pass = ce.beginRenderPass({
      depthStencilAttachment: {
        view: gpu.gbuffer[0].createView(),
        depthReadOnly: true
      },
      colorAttachments: [{
        view: gpu.context.getCurrentTexture().createView(),
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
        loadOp: "clear",
        storeOp: "store"
      }]
    });
    pass.setPipeline(wgsl.pipeline[4]);
    pass.setBindGroup(0, gpu.bindGroup[3]);
    pass.draw(4);
    pass.end();
  };
  const $__audioInit = () => {
    const audio = $$.audio;
    audio.context = new AudioContext();
  };
  const $__audioResume = () => {
    const audio = $$.audio;
    if (audio.context !== "running") {
      audio.context.resume();
    }
  };
  const $$ = {
    dt: 0,
    now: 0,
    data: {
      loading: 0
    },
    gpu: {
      adapter: null,
      device: null,
      canvasFormat: null,
      canvas: null,
      context: null,
      bindGroupLayout: [],
      pipelineLayout: [],
      sampler: [],
      bindGroup: [],
      cbuffer: [],
      gbuffer: [],
      indexOfMeshInput: 0,
      indexOfMeshID: 0,
      indexOfIndirectArgs: 0,
      pass3d: [],
      stage: {
        camera: {
          x: 0,
          y: 0,
          z: 0,
          ha: 0,
          va: 0,
          fov: 0,
          near: 0,
          far: 0
        },
        light: {
          ha: 0,
          va: 0,
          color: 0,
          ambient0: 0,
          ambient1: 0
        }
      }
    },
    audio: {
      context: null
    }
  };
  const $start = async (update2) => {
    if (!navigator.gpu) {
      return;
    }
    await $__gpuInit();
    $__audioInit();
    $__onload();
    html_listen(document.body, "contextmenu", (ev) => {
      ev.preventDefault();
    });
    html_listen(window, "blur", (ev) => {
    });
    html_listen(document, "click", (ev) => {
      $__audioResume();
    });
    html_listen(document, "keydown", (ev) => {
    });
    html_listen(document, "keyup", (ev) => {
    });
    html_listen(document, "mousedown", (ev) => {
    });
    html_listen(document, "mouseup", (ev) => {
    });
    html_listen(document, "mousemove", (ev) => {
    });
    html_listen(document, "touchstart", (ev) => {
    });
    html_listen(document, "touchend", (ev) => {
    });
    html_listen(document, "touchmove", (ev) => {
    });
    html_listen(document, "touchcancel", (ev) => {
    });
    html_listen(document, "gamepadconnected", (ev) => {
    });
    html_listen(document, "gamepaddisconnected", (ev) => {
    });
    const frame = (time) => {
      $$.dt = (time - $$.now) / 1e3;
      $$.now = time;
      if ($__onloadDone()) {
        $__gpuFrameBegin();
        if (update2) {
          update2();
        }
        $__gpuFrameEnd();
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const $submitCamera = (x, y, z, ha, va, fov, near, far) => {
    const camera = $$.gpu.stage.camera;
    camera.x = x;
    camera.y = y;
    camera.z = z;
    camera.ha = ha;
    camera.va = va;
    camera.fov = fov;
    camera.near = near;
    camera.far = far;
  };
  const $submitLightDirectional = (ha, va, color) => {
    const light = $$.gpu.stage.light;
    light.ha = ha;
    light.va = va;
    light.color = color;
  };
  const $submitLightAmbient = (color0, color1) => {
    const light = $$.gpu.stage.light;
    light.ambient0 = color0;
    light.ambient1 = color1;
  };
  const $submitMesh = (id, items) => {
    const gpu = $$.gpu;
    const device = $$.gpu.device;
    const gltf = $$.data.gltf;
    const mesh = gltf.mesh[id];
    if (!mesh) {
      return;
    }
    if (items.length <= 0) {
      return;
    }
    const startIndexOfMeshID = gpu.indexOfMeshID;
    const ids = new Uint32Array(items.length);
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      const matrix = mat4angle(item.ha, item.va);
      mat4translated(matrix, item.x, item.y, item.z);
      const factor0 = item.factor0;
      const factor1 = item.factor1;
      const factor2 = item.factor2;
      const factor3 = item.factor3;
      const buf = new Float32Array(__strideOfMeshInput / 4);
      buf.set(matrix, 0);
      buf.set(factor0, 16);
      buf.set(factor1, 20);
      buf.set(factor2, 24);
      buf.set(factor3, 28);
      device.queue.writeBuffer(gpu.cbuffer[1], gpu.indexOfMeshInput * __strideOfMeshInput, buf);
      ids[i] = gpu.indexOfMeshInput;
      gpu.indexOfMeshInput += 1;
    }
    device.queue.writeBuffer(gpu.cbuffer[2], gpu.indexOfMeshID * __strideOfMeshID, ids);
    gpu.indexOfMeshID += items.length;
    for (const sid of mesh.segment) {
      const segment = gltf.segment[sid];
      if (!segment) {
        continue;
      }
      const args = new Uint32Array(20 / 4);
      args[0] = segment.count;
      args[1] = items.length;
      args[2] = 0;
      args[3] = 0;
      args[4] = 0;
      device.queue.writeBuffer(gpu.cbuffer[3], gpu.indexOfIndirectArgs * __strideOfIndirectArgs, args);
      gpu.pass3d.push({
        sid,
        indexOfMeshID: startIndexOfMeshID,
        indexOfIndirectArgs: gpu.indexOfIndirectArgs
      });
      gpu.indexOfIndirectArgs += 1;
    }
  };
  html_listen(window, "load", () => {
    $start(update);
  });
  const update = () => {
    $submitCamera(0, 2, -5, 90, -20, 35, 0.01, 1e3);
    $submitLightDirectional(0, 65, [0.8, 0.8, 0.8, 1]);
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
        factor3: [0, 0, 0, 0]
      }
    ]);
  };
})();
