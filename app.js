(() => {
  const html_listen = (target, key, func) => {
    target.addEventListener(key, func);
  };
  const html_canvas = () => {
    return document.getElementById("canvas");
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
  const div = (v, n) => {
    return Math.floor(v / n);
  };
  const mod = (v, n) => {
    return (v % n + n) % n;
  };
  const deg2rad = (deg) => {
    return deg / 180 * Math.PI;
  };
  const xy_length = (x, y) => {
    return Math.sqrt(x * x + y * y);
  };
  const xy_normalize = (x, y) => {
    const l = xy_length(x, y);
    return l != 0 ? [x / l, y / l] : [0, 0];
  };
  const xy_hit_rect = ([x, y], minX, maxX, minY, maxY) => {
    return minX <= x && x <= maxX && minY <= y && y <= maxY;
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
  const basil3d_gpu_create = (device, canvasFormat) => {
    const gpu = {
      bindGroupLayout: [],
      pipelineLayout: [],
      shaderModule: [],
      pipeline: [],
      buffer: [],
      sampler: [],
      bindGroup: [],
      gbuffer: []
    };
    const buffer0struct = `
  struct ViewInput {
    viewProj : mat4x4<f32>,
    invViewProj : mat4x4<f32>,
    eyePosition : vec4<f32>,
    lightDir : vec4<f32>,
    lightColor : vec4<f32>,
    ambientColor0 : vec4<f32>,
    ambientColor1 : vec4<f32>,
  }`;
    gpu.buffer[0] = device.createBuffer({
      size: 256 * 1,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    const buffer1struct = `
  struct InstanceInput {
    world : mat4x4<f32>,
    factor0 : vec4<f32>,
    factor1 : vec4<f32>,
  }`;
    gpu.buffer[1] = device.createBuffer({
      size: 96 * (2 * 1024),
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    });
    gpu.buffer[2] = device.createBuffer({
      size: 4 * (16 * 1024),
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    gpu.buffer[3] = device.createBuffer({
      size: 20 * (2 * 1024),
      usage: GPUBufferUsage.INDIRECT | GPUBufferUsage.COPY_DST
    });
    gpu.buffer[4] = device.createBuffer({
      size: 12 * (4 * 1024),
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    gpu.buffer[5] = device.createBuffer({
      size: 4 * (4 * 1024),
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    gpu.sampler[0] = device.createSampler({
      magFilter: "linear",
      minFilter: "linear",
      mipmapFilter: "linear"
    });
    gpu.shaderModule[0] = device.createShaderModule({
      code: buffer0struct + buffer1struct + `
    @group(0) @binding(0) var<uniform> view : ViewInput;
    @group(0) @binding(1) var<storage, read> inst : array<InstanceInput>;

    struct VertexInput {
      @location(0) id: u32,
      @location(1) position: vec3<f32>,
      @location(2) normal : vec3<f32>,
    };
    struct VertexOutput {
      @builtin(position) position : vec4<f32>,
      @location(0) normal : vec3<f32>,
      @location(1) @interpolate(flat) id : u32,
    };
    struct FragmentOutput {
      @location(0) gbuffer0 : vec4<f32>,
      @location(1) gbuffer1 : vec4<f32>,
      @location(2) gbuffer2 : vec4<f32>,
    };
    @vertex
    fn mainVertex(input : VertexInput) -> VertexOutput {
      var world = inst[input.id].world;
      var nWorld = mat3x3<f32>(world[0].xyz, world[1].xyz, world[2].xyz);

      var output : VertexOutput;
      output.position = (view.viewProj * world * vec4(input.position, 1.0));
      output.normal = normalize(nWorld * input.normal);
      output.id = input.id;
      return output;
    }
    @fragment
    fn mainFragment(input : VertexOutput) -> FragmentOutput {
      var output : FragmentOutput;
      output.gbuffer0 = vec4(normalize(input.normal) * 0.5 + 0.5, 0);
      output.gbuffer1 = inst[input.id].factor0.xyzw;
      output.gbuffer2 = inst[input.id].factor1.xyzw;
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
      code: buffer0struct + `
    const EPSILON = 0.0001;
    const M_PI = 3.141592653589793;

    @group(0) @binding(0) var<uniform> view : ViewInput;
    @group(0) @binding(1) var zbuffer : texture_depth_2d;
    @group(0) @binding(2) var gbuffer0 : texture_2d<f32>;
    @group(0) @binding(3) var gbuffer1 : texture_2d<f32>;
    @group(0) @binding(4) var gbuffer2 : texture_2d<f32>;

    fn decodeWorldPosition(xy : vec2<i32>) -> vec3<f32> {
      var d = textureLoad(zbuffer, xy, 0);
      var uv = vec2<f32>(xy) / vec2<f32>(textureDimensions(zbuffer, 0).xy);
      var posClip = vec4<f32>(uv * vec2(2.0, -2.0) + vec2(-1.0, 1.0), d, 1);
      var posWorldW = view.invViewProj * posClip;
      var posWorld = posWorldW.xyz / posWorldW.www;
      return posWorld;
    }
    fn decodeNormal(xy : vec2<i32>) -> vec3<f32> {
      return normalize(textureLoad(gbuffer0, xy, 0).xyz * 2.0 - 1.0);
    }

    fn D_GGX(NdH : f32, roughness : f32) -> f32 {
      var a  = roughness * roughness;
      var a2 = a * a;
      var d  = NdH * NdH * (a2 - 1.0) + 1.0;
      return (a2) / (M_PI * d*d);
    }
    fn G_SchlicksmithGGX(NdL : f32, NdV : f32, roughness : f32) -> f32 {
      var r = (roughness + 1.0);
      var k = (r * r) / 8.0;
      var GL = NdL / (NdL * (1.0 - k) + k);
      var GV = NdV / (NdV * (1.0 - k) + k);
      return GL * GV;
    }
    fn F_Schlick(VdH : f32, baseColor : vec3<f32>, metallic : f32) -> vec3<f32> {
      var F0 = mix(vec3(0.04), baseColor, metallic);
      return vec3<f32>(F0 + (1.0 - F0) * pow(1.0 - VdH, 5.0));
    }
    fn BRDF(N : vec3<f32>, L : vec3<f32>, V : vec3<f32>, baseColor : vec3<f32>, metallic : f32, roughness : f32) -> vec3<f32> {
      var NdL = saturate(dot(N, L));
      if(NdL > 0.0) {
        var NdV = saturate(dot(N, V));
        var H = normalize(V + L);
        var NdH = saturate(dot(N, H));
        var VdH = saturate(dot(V, H));
        
        var D = D_GGX(NdH, roughness);
        var G = G_SchlicksmithGGX(NdL, NdV, roughness);
        var F = F_Schlick(VdH, baseColor, metallic);

        var spec = (F * G * D) / max(4.0 * NdL * NdV, EPSILON);
        var diff = (1.0 - F) * (1.0 - metallic) / M_PI;
        return NdL * (diff + spec);
      } else {
        return vec3<f32>(0);
      }
    }

    @fragment
    fn mainFragment(@builtin(position) coord : vec4<f32>) -> @location(0) vec4<f32> {
      var xy = vec2<i32>(floor(coord.xy));
      var F0 = textureLoad(gbuffer1, xy, 0);
      var F1 = textureLoad(gbuffer2, xy, 0);
      var N = decodeNormal(xy);
      var P = decodeWorldPosition(xy);
      var V = normalize(view.eyePosition.xyz - P);

      var L = normalize(view.lightDir.xyz);
      var C_L = (view.lightColor.rgb * view.lightColor.a) * BRDF(N, L, V, F0.rgb, F1.y, F1.z);
      var C_A = mix(view.ambientColor0.rgb * view.ambientColor0.a, view.ambientColor1.rgb * view.ambientColor1.a, -dot(N, vec3<f32>(0, 1, 0)) * 0.5 + 0.5) * (F1.x * F0.rgb);
      var C_E = F0.rgb * F1.w;
      return vec4(C_L + C_A + C_E, 1.0);
    }
    `
    });
    gpu.shaderModule[3] = device.createShaderModule({
      code: buffer0struct + `
    @group(0) @binding(0) var<uniform> view : ViewInput;
    @group(0) @binding(1) var zbuffer : texture_depth_2d;

    fn decodeWorldPosition(xy : vec2<i32>) -> vec3<f32> {
      var d = textureLoad(zbuffer, xy, 0);
      var uv = vec2<f32>(xy) / vec2<f32>(textureDimensions(zbuffer, 0).xy);
      var posClip = vec4<f32>(uv * vec2(2.0, -2.0) + vec2(-1.0, 1.0), d, 1);
      var posWorldW = view.invViewProj * posClip;
      var posWorld = posWorldW.xyz / posWorldW.www;
      return posWorld;
    }

    @fragment
    fn mainFragment(@builtin(position) coord : vec4<f32>) -> @location(0) vec4<f32> {
      var xy = vec2<i32>(floor(coord.xy));
      var P = decodeWorldPosition(xy);
      var V = normalize(view.eyePosition.xyz - P);

      var C_A = mix(view.ambientColor0.rgb * view.ambientColor0.a, view.ambientColor1.rgb * view.ambientColor1.a, dot(V, vec3<f32>(0, 1, 0)) * 0.5 + 0.5);
      return vec4(C_A, 1.0);
    }
    `
    });
    gpu.shaderModule[4] = device.createShaderModule({
      // tonemapping: https://knarkowicz.wordpress.com/2016/01/06/aces-filmic-tone-mapping-curve/
      code: `
    @group(0) @binding(2) var lbuffer0 : texture_2d<f32>;
    @group(0) @binding(5) var sampler0 : sampler;
    fn toneMapping(x : vec3<f32>) -> vec3<f32> {
      var a = 2.51f;
      var b = 0.03f;
      var c = 2.43f;
      var d = 0.59f;
      var e = 0.14f;
      return saturate((x * (a * x + b)) / (x * (c * x + d) + e));
    }
    fn vignette(uv : vec2<f32>) -> f32 {
      var a = uv * (1.0 - uv.yx);
      return pow(a.x * a.y * 15.0, 0.25);
    }
    fn chromaticAberration(uv : vec2<f32>) -> vec3<f32> {
      var redOffset = 0.002;
      var greenOffset = 0.0001;
      var blueOffset = -0.0001;
      var dir = uv - vec2<f32>(0.5, 0.5);
      var r = textureSample(lbuffer0, sampler0, uv + dir * redOffset).r;
      var g = textureSample(lbuffer0, sampler0, uv + dir * greenOffset).g;
      var b = textureSample(lbuffer0, sampler0, uv + dir * blueOffset).b;
      return vec3<f32>(r, g, b);
    }
    @fragment
    fn mainFragment(@builtin(position) coord : vec4<f32>) -> @location(0) vec4<f32> {
      var uv = coord.xy / vec2<f32>(textureDimensions(lbuffer0, 0).xy);
      var color = chromaticAberration(uv);
      color *= vignette(uv);
      return vec4<f32>(toneMapping(color), 1);
    }
    `
    });
    gpu.shaderModule[5] = device.createShaderModule({
      code: buffer0struct + `
    @group(0) @binding(0) var<uniform> view : ViewInput;

    struct VertexInput {
      @location(0) position: vec3<f32>,
      @location(1) color : vec4<f32>,
    };
    struct VertexOutput {
      @builtin(position) position : vec4<f32>,
      @location(0) color : vec4<f32>,
    };
    @vertex
    fn mainVertex(input : VertexInput) -> VertexOutput {
      var output : VertexOutput;
      output.position = view.viewProj * vec4<f32>(input.position, 1.0);
      output.color = input.color;
      return output;
    }
    @fragment
    fn mainFragment(input : VertexOutput) -> @location(0) vec4<f32> {
      return input.color;
    }
    `
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
    gpu.bindGroup[0] = device.createBindGroup({
      layout: gpu.bindGroupLayout[0],
      entries: [
        { binding: 0, resource: { buffer: gpu.buffer[0] } },
        { binding: 1, resource: { buffer: gpu.buffer[1] } }
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
        module: gpu.shaderModule[0],
        entryPoint: "mainFragment",
        targets: [
          { format: "rgb10a2unorm" },
          { format: "rgba8unorm" },
          { format: "rgba8unorm" }
        ]
      },
      depthStencil: {
        depthWriteEnabled: true,
        depthCompare: "less",
        format: "depth24plus"
      },
      primitive: {
        cullMode: "back",
        frontFace: "cw"
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
      },
      depthStencil: {
        depthWriteEnabled: false,
        depthCompare: "always",
        format: "depth24plus"
      }
    });
    gpu.pipeline[4] = device.createRenderPipeline({
      layout: gpu.pipelineLayout[0],
      vertex: {
        module: gpu.shaderModule[5],
        entryPoint: "mainVertex",
        buffers: [
          { arrayStride: 12, attributes: [{ format: "float32x3", offset: 0, shaderLocation: 0 }] },
          // position
          { arrayStride: 4, attributes: [{ format: "unorm8x4", offset: 0, shaderLocation: 1 }] }
          // color
        ]
      },
      fragment: {
        module: gpu.shaderModule[5],
        entryPoint: "mainFragment",
        targets: [
          { format: canvasFormat }
        ]
      },
      depthStencil: {
        depthWriteEnabled: false,
        depthCompare: "less",
        format: "depth24plus"
      },
      primitive: {
        topology: "line-list"
      }
    });
    return gpu;
  };
  const basil3d_gpu_on_frame_start = (gpu, device, canvas) => {
    basil3d_gpu_gbuffer(gpu, device, canvas);
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
  const basil3d_gpu_on_frame_view = (gpu, device, context, canvas, app, view) => {
    basil3d_gpu_upload_view_input(gpu, device, canvas, view);
    basil3d_gpu_upload_lines(gpu, device, view);
    const batch = basil3d_gpu_upload_instance_input(gpu, device, app, view);
    const ce = device.createCommandEncoder();
    {
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
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
            loadOp: "clear",
            storeOp: "store"
          }
        ]
      });
      for (const b of batch) {
        pass.setPipeline(gpu.pipeline[0]);
        pass.setBindGroup(0, gpu.bindGroup[0]);
        pass.setVertexBuffer(0, gpu.buffer[2], b.first * 4);
        const mesh = app.gpu.mesh[b.id];
        if (mesh.vb0) {
          const [index, offset, size] = mesh.vb0;
          pass.setVertexBuffer(1, app.gpu.buffer[index], offset, size);
        }
        if (mesh.vb1) {
          const [index, offset, size] = mesh.vb1;
          pass.setVertexBuffer(2, app.gpu.buffer[index], offset, size);
        }
        if (mesh.ib) {
          const [index, offset, size] = mesh.ib;
          pass.setIndexBuffer(app.gpu.buffer[index], "uint16", offset, size);
        }
        pass.drawIndexedIndirect(gpu.buffer[3], b.offset);
      }
      pass.end();
    }
    {
      const pass = ce.beginRenderPass({
        depthStencilAttachment: {
          view: gpu.gbuffer[0].createView(),
          depthReadOnly: true
        },
        colorAttachments: [{
          view: gpu.gbuffer[4].createView(),
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
        depthStencilAttachment: {
          view: gpu.gbuffer[0].createView(),
          depthReadOnly: true
        },
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
      if (view.lines.length > 0) {
        pass.setPipeline(gpu.pipeline[4]);
        pass.setBindGroup(0, gpu.bindGroup[0]);
        pass.setVertexBuffer(0, gpu.buffer[4]);
        pass.setVertexBuffer(1, gpu.buffer[5]);
        pass.draw(view.lines.length);
      }
      pass.end();
    }
    device.queue.submit([ce.finish()]);
  };
  const basil3d_gpu_upload_view_input = (gpu, device, canvas, view) => {
    const camera = view.camera;
    const buf = new Float32Array(52);
    const aspect = canvas.width / canvas.height;
    const fovy = deg2rad(camera.fov);
    const dir = vec3dir(camera.ha, camera.va);
    const eye = camera.eye;
    const at = vec3add(eye, dir);
    const up = [0, 1, 0];
    const look = mat4lookat(eye, at, up);
    const proj = mat4perspective(fovy, aspect, camera.near, camera.far);
    const vp = mat4multiply(look, proj);
    const ivp = mat4invert(vp);
    buf.set(vp, 0);
    buf.set(ivp, 16);
    buf.set(eye, 32);
    const light = view.light;
    const ldir = vec3dir(light.ha, light.va);
    buf.set(ldir, 36);
    buf.set(light.color, 40);
    buf.set(light.ambient0, 44);
    buf.set(light.ambient1, 48);
    device.queue.writeBuffer(gpu.buffer[0], 0, buf);
  };
  const basil3d_gpu_upload_lines = (gpu, device, view) => {
    if (view.lines.length <= 0) {
      return;
    }
    const position = new Float32Array(view.lines.length * 3);
    const color = new Uint8Array(view.lines.length * 4);
    for (let i = 0; i < view.lines.length; ++i) {
      const line = view.lines[i];
      position[i * 3 + 0] = line.pos[0];
      position[i * 3 + 1] = line.pos[1];
      position[i * 3 + 2] = line.pos[2];
      color[i * 4 + 0] = line.color[0];
      color[i * 4 + 1] = line.color[1];
      color[i * 4 + 2] = line.color[2];
      color[i * 4 + 3] = line.color[3];
    }
    device.queue.writeBuffer(gpu.buffer[4], 0, position);
    device.queue.writeBuffer(gpu.buffer[5], 0, color);
  };
  const basil3d_gpu_upload_instance_input = (gpu, device, app, view) => {
    const instance = [];
    instance.length = app.gpu.mesh.length;
    for (let i = 0; i < instance.length; ++i) {
      instance[i] = [];
    }
    const buf = new Float32Array(24);
    const stride = 4 * 24;
    let index = 0;
    for (const room of view.room) {
      for (let i = 0; i < room.indices.length; ++i) {
        const node = room.node[room.indices[i]];
        if (!node) {
          continue;
        }
        const dx = mod(i, room.divisor);
        const dz = div(i, room.divisor);
        for (const mesh of node.mesh) {
          const id = basil3d_app_gpu_id(app, mesh.name);
          if (id < 0) {
            continue;
          }
          for (const n of app.gpu.id[id].mesh) {
            instance[n].push(index);
          }
          let x = dx * room.unit;
          let y = 0;
          let z = dz * room.unit;
          let ha = 0;
          let va = 0;
          if (mesh.transform) {
            x += mesh.transform.x || 0;
            y += mesh.transform.y || 0;
            z += mesh.transform.z || 0;
            ha = mesh.transform.ha || 0;
            va = mesh.transform.va || 0;
          }
          const matrix = mat4angle(ha, va);
          mat4translated(matrix, x, y, z);
          const factor0 = [1, 1, 1, 1];
          if (mesh.albedo) {
            factor0[0] = mesh.albedo.r !== void 0 ? mesh.albedo.r : 1;
            factor0[1] = mesh.albedo.g !== void 0 ? mesh.albedo.g : 1;
            factor0[2] = mesh.albedo.b !== void 0 ? mesh.albedo.b : 1;
            factor0[3] = mesh.albedo.a !== void 0 ? mesh.albedo.a : 1;
          }
          const factor1 = [1, 0.5, 0.5, 0];
          if (mesh.occlusion !== void 0) {
            factor1[0] = mesh.occlusion;
          }
          if (mesh.metallic !== void 0) {
            factor1[1] = mesh.metallic;
          }
          if (mesh.roughness !== void 0) {
            factor1[2] = mesh.roughness;
          }
          if (mesh.emission !== void 0) {
            factor1[3] = mesh.emission;
          }
          buf.set(matrix, 0);
          buf.set(factor0, 16);
          buf.set(factor1, 20);
          device.queue.writeBuffer(gpu.buffer[1], index * stride, buf);
          index += 1;
        }
      }
    }
    const batch = [];
    let first = 0;
    let offset = 0;
    const args = new Uint32Array(5);
    for (let i = 0; i < instance.length; ++i) {
      if (instance[i].length <= 0) {
        continue;
      }
      const mesh = app.gpu.mesh[i];
      const count = instance[i].length;
      device.queue.writeBuffer(gpu.buffer[2], first * 4, new Uint32Array(instance[i]));
      args[0] = mesh.count;
      args[1] = count;
      args[2] = 0;
      args[3] = 0;
      args[4] = 0;
      device.queue.writeBuffer(gpu.buffer[3], offset, args);
      batch.push({
        id: i,
        first,
        offset
      });
      first += count;
      offset += 20;
    }
    return batch;
  };
  const basil3d_gpu_gbuffer = (gpu, device, canvas) => {
    if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const deleteTexture = (no) => {
        if (gpu.gbuffer[no] !== void 0) {
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
        if (gpu.bindGroup[no] !== void 0) {
          delete gpu.bindGroup[no];
        }
      };
      deleteBindGroup(1);
      deleteBindGroup(2);
    }
    if (gpu.gbuffer[0] === void 0) {
      gpu.gbuffer[0] = device.createTexture({
        size: [canvas.width, canvas.height],
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
      });
    }
    if (gpu.gbuffer[1] === void 0) {
      gpu.gbuffer[1] = device.createTexture({
        size: [canvas.width, canvas.height],
        format: "rgb10a2unorm",
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
      });
    }
    if (gpu.gbuffer[2] === void 0) {
      gpu.gbuffer[2] = device.createTexture({
        size: [canvas.width, canvas.height],
        format: "rgba8unorm",
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
      });
    }
    if (gpu.gbuffer[3] === void 0) {
      gpu.gbuffer[3] = device.createTexture({
        size: [canvas.width, canvas.height],
        format: "rgba8unorm",
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
      });
    }
    if (gpu.gbuffer[4] === void 0) {
      gpu.gbuffer[4] = device.createTexture({
        size: [canvas.width, canvas.height],
        format: "rgba16float",
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
      });
    }
    if (gpu.bindGroup[1] === void 0) {
      gpu.bindGroup[1] = device.createBindGroup({
        layout: gpu.bindGroupLayout[1],
        entries: [
          { binding: 0, resource: { buffer: gpu.buffer[0] } },
          { binding: 1, resource: gpu.gbuffer[0].createView() },
          { binding: 2, resource: gpu.gbuffer[1].createView() },
          { binding: 3, resource: gpu.gbuffer[2].createView() },
          { binding: 4, resource: gpu.gbuffer[3].createView() },
          { binding: 5, resource: gpu.sampler[0] }
        ]
      });
    }
    if (gpu.bindGroup[2] === void 0) {
      gpu.bindGroup[2] = device.createBindGroup({
        layout: gpu.bindGroupLayout[1],
        entries: [
          { binding: 0, resource: { buffer: gpu.buffer[0] } },
          { binding: 1, resource: gpu.gbuffer[0].createView() },
          { binding: 2, resource: gpu.gbuffer[4].createView() },
          { binding: 3, resource: gpu.gbuffer[4].createView() },
          { binding: 4, resource: gpu.gbuffer[4].createView() },
          { binding: 5, resource: gpu.sampler[0] }
        ]
      });
    }
  };
  const basil3d_listen_create = () => {
    const listen = {
      timer: {
        t: performance.now(),
        dt: 0,
        n: 0
      },
      gamepad: {
        index: null,
        lx: 0,
        ly: 0,
        rx: 0,
        ry: 0,
        b0: false,
        b1: false,
        b8: false,
        b9: false,
        lb: false,
        rb: false,
        lt: false,
        rt: false
      },
      keyboard: {
        w: false,
        a: false,
        s: false,
        d: false,
        up: false,
        left: false,
        down: false,
        right: false,
        q: false,
        e: false,
        z: false,
        x: false,
        space: false,
        lctrl: false,
        esc: false
      },
      touch: /* @__PURE__ */ new Map()
    };
    const keymap = (keyboard, code, value) => {
      switch (code) {
        case "KeyW":
          keyboard.w = value;
          break;
        case "KeyA":
          keyboard.a = value;
          break;
        case "KeyS":
          keyboard.s = value;
          break;
        case "KeyD":
          keyboard.d = value;
          break;
        case "ArrowUp":
          keyboard.up = value;
          break;
        case "ArrowLeft":
          keyboard.left = value;
          break;
        case "ArrowDown":
          keyboard.down = value;
          break;
        case "ArrowRight":
          keyboard.right = value;
          break;
        case "KeyQ":
          keyboard.q = value;
          break;
        case "KeyE":
          keyboard.e = value;
          break;
        case "KeyZ":
          keyboard.z = value;
          break;
        case "KeyX":
          keyboard.x = value;
          break;
        case "Space":
          keyboard.space = value;
          break;
        case "ControlLeft":
          keyboard.lctrl = value;
          break;
        case "Escape":
          keyboard.esc = value;
          break;
        default:
          return false;
      }
      return true;
    };
    html_listen(window, "focus", (ev) => {
    });
    html_listen(window, "blur", (ev) => {
    });
    html_listen(window, "resize", (ev) => {
    });
    html_listen(window, "gamepadconnected", (ev) => {
      listen.gamepad.index = ev.gamepad.index;
    });
    html_listen(window, "gamepaddisconnected", (ev) => {
      if (listen.gamepad.index === ev.gamepad.index) {
        listen.gamepad.index = null;
      }
    });
    html_listen(document, "keydown", (ev) => {
      if (keymap(listen.keyboard, ev.code, true)) {
        ev.preventDefault();
      }
    });
    html_listen(document, "keyup", (ev) => {
      if (keymap(listen.keyboard, ev.code, false)) {
        ev.preventDefault();
      }
    });
    html_listen(document.body, "contextmenu", (ev) => {
      ev.preventDefault();
    });
    html_listen(document.body, "pointerdown", (ev) => {
      listen.touch.set(ev.pointerId, {
        x: ev.clientX,
        y: ev.clientY,
        sx: ev.clientX,
        sy: ev.clientY,
        time: performance.now()
      });
    });
    html_listen(document.body, "pointerup", (ev) => {
      listen.touch.delete(ev.pointerId);
    });
    html_listen(document.body, "pointerout", (ev) => {
      listen.touch.delete(ev.pointerId);
    });
    html_listen(document.body, "pointermove", (ev) => {
      const touch = listen.touch.get(ev.pointerId);
      if (touch) {
        touch.x = ev.clientX;
        touch.y = ev.clientY;
      }
    });
    return listen;
  };
  const basil3d_listen_tick = (listen, time) => {
    listen.timer.dt = (time - listen.timer.t) / 1e3;
    listen.timer.t = time;
    listen.timer.n += 1;
    if (listen.gamepad.index !== null) {
      const gamepads = navigator.getGamepads();
      const gp = gamepads[listen.gamepad.index];
      listen.gamepad.lx = Math.trunc(gp.axes[0] * 4) / 4;
      listen.gamepad.ly = Math.trunc(gp.axes[1] * 4) / 4;
      listen.gamepad.rx = Math.trunc(gp.axes[2] * 4) / 4;
      listen.gamepad.ry = Math.trunc(gp.axes[3] * 4) / 4;
      listen.gamepad.b0 = gp.buttons[0].value >= 0.5;
      listen.gamepad.b1 = gp.buttons[1].value >= 0.5;
      listen.gamepad.b8 = gp.buttons[8].value >= 0.5;
      listen.gamepad.b9 = gp.buttons[9].value >= 0.5;
      listen.gamepad.lb = gp.buttons[4].value >= 0.5;
      listen.gamepad.rb = gp.buttons[5].value >= 0.5;
      listen.gamepad.lt = gp.buttons[6].value >= 0.5;
      listen.gamepad.rt = gp.buttons[7].value >= 0.5;
    }
  };
  const basil3d_listen_delta_time = (listen) => {
    return listen.timer.dt;
  };
  const basil3d_listen_get = (listen, shortcut_key, shortcut_gamepad, touch_rect) => {
    if (touch_rect) {
      for (const touch of listen.touch.values()) {
        if (xy_hit_rect([touch.sx, touch.sy], ...touch_rect)) {
          const x = touch.x - touch.sx;
          const y = -(touch.y - touch.sy);
          return xy_normalize(x, y);
        }
      }
    }
    if (shortcut_key) {
      if (shortcut_key === "wasd") {
        const keyboard = listen.keyboard;
        const x = keyboard.a ? -1 : keyboard.d ? 1 : 0;
        const y = keyboard.w ? 1 : keyboard.s ? -1 : 0;
        if (x !== 0 || y !== 0) {
          return xy_normalize(x, y);
        }
      } else if (shortcut_key === "arrow") {
        const keyboard = listen.keyboard;
        const x = keyboard.right ? 1 : keyboard.left ? -1 : 0;
        const y = keyboard.up ? 1 : keyboard.down ? -1 : 0;
        if (x !== 0 || y !== 0) {
          return xy_normalize(x, y);
        }
      } else {
        if (listen.keyboard[shortcut_key]) {
          return [1, 0];
        }
      }
    }
    if (shortcut_gamepad) {
      if (shortcut_gamepad === "left-stick") {
        const gamepad = listen.gamepad;
        return xy_normalize(gamepad.lx, -gamepad.ly);
      } else if (shortcut_gamepad === "right-stick") {
        const gamepad = listen.gamepad;
        return xy_normalize(gamepad.rx, -gamepad.ry);
      } else {
        if (listen.gamepad[shortcut_gamepad]) {
          return [1, 0];
        }
      }
    }
    return null;
  };
  const basil3d_app_load = (device) => {
    const app = {
      gpu: {},
      audio: {},
      json: {},
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
        app.gpu = json.gpu;
      }
      if (json.audio) {
        app.audio = json.audio;
      }
      if (json.json) {
        app.json = json.json;
      }
      app.loading -= 1;
    });
    app.loading += 1;
    return app;
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
  const basil3d_app_json = (app, name) => {
    return app.json[name];
  };
  const basil3d_view_create = () => {
    const view = {};
    basil3d_view_reset(view);
    return view;
  };
  const basil3d_view_reset = (view) => {
    view.camera = {
      eye: [0, 0, 0],
      ha: 0,
      va: 0,
      fov: 30,
      near: 0.1,
      far: 1e3
    };
    view.light = {
      ha: 0,
      va: 0,
      color: [0, 0, 0, 0],
      ambient0: [0, 0, 0, 0],
      ambient1: [0, 0, 0, 0]
    };
    view.room = [];
    view.celeste = [];
    view.mob = [];
    view.lines = [];
  };
  const basil3d_view_open = (view, app, desc) => {
    basil3d_view_camera(view, desc);
    basil3d_view_light(view, desc);
    basil3d_view_room(view, app, desc);
    basil3d_view_lines(view, desc);
  };
  const basil3d_view_camera = (view, desc) => {
    if (desc.camera) {
      Object.assign(view.camera, desc.camera);
    }
  };
  const basil3d_view_light = (view, desc) => {
    if (desc.light) {
      if (desc.light.ha !== void 0) {
        view.light.ha = desc.light.ha;
      }
      if (desc.light.va !== void 0) {
        view.light.va = desc.light.va;
      }
      if (desc.light.color) {
        view.light.color[0] = desc.light.color.r !== void 0 ? desc.light.color.r : 0;
        view.light.color[1] = desc.light.color.g !== void 0 ? desc.light.color.g : 0;
        view.light.color[2] = desc.light.color.b !== void 0 ? desc.light.color.b : 0;
        view.light.color[3] = desc.light.color.a !== void 0 ? desc.light.color.a : 0;
      }
      if (desc.light.ambient0) {
        view.light.ambient0[0] = desc.light.ambient0.r !== void 0 ? desc.light.ambient0.r : 0;
        view.light.ambient0[1] = desc.light.ambient0.g !== void 0 ? desc.light.ambient0.g : 0;
        view.light.ambient0[2] = desc.light.ambient0.b !== void 0 ? desc.light.ambient0.b : 0;
        view.light.ambient0[3] = desc.light.ambient0.a !== void 0 ? desc.light.ambient0.a : 0;
      }
      if (desc.light.ambient1) {
        view.light.ambient1[0] = desc.light.ambient1.r !== void 0 ? desc.light.ambient1.r : 0;
        view.light.ambient1[1] = desc.light.ambient1.g !== void 0 ? desc.light.ambient1.g : 0;
        view.light.ambient1[2] = desc.light.ambient1.b !== void 0 ? desc.light.ambient1.b : 0;
        view.light.ambient1[3] = desc.light.ambient1.a !== void 0 ? desc.light.ambient1.a : 0;
      }
    }
  };
  const basil3d_view_room = (view, app, desc) => {
    if (desc.room) {
      view.room = desc.room;
    }
  };
  const basil3d_view_lines = (view, desc) => {
    if (desc.lines) {
      for (const line of desc.lines) {
        view.lines.push({
          pos: line.from,
          color: line.color
        });
        view.lines.push({
          pos: line.to,
          color: line.color
        });
      }
    }
  };
  const basil3d_start = async (setup2, update2) => {
    if (!navigator.gpu) {
      html_show_message("ERROR: WebGPU not supported.");
      return;
    }
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    const canvas = html_canvas();
    const context = canvas.getContext("webgpu");
    context.configure({
      device,
      format: canvasFormat,
      alphaMode: "opaque"
    });
    const gpu = basil3d_gpu_create(device, canvasFormat);
    const listen = basil3d_listen_create();
    const app = basil3d_app_load(device);
    const view = basil3d_view_create();
    const frame = (time) => {
      basil3d_listen_tick(listen, time);
      basil3d_gpu_on_frame_start(gpu, device, canvas);
      if (basil3d_app_is_loading(app)) {
        basil3d_gpu_on_frame_loading(gpu, device, context);
      } else {
        if (setup2) {
          setup2(app, view);
          setup2 = null;
        }
        if (update2) {
          update2(app, view, listen);
        }
        basil3d_gpu_on_frame_view(gpu, device, context, canvas, app, view);
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const setup = (app, view) => {
    html_hide_message();
    basil3d_view_open(view, app, basil3d_app_json(app, "sample"));
    basil3d_view_open(view, app, basil3d_app_json(app, "room000"));
    addDebugGrid(view, app);
  };
  const update = (app, view, listen) => {
    const mob = view.camera;
    const rect = [
      0,
      html_canvas().clientWidth,
      0,
      html_canvas().clientHeight
    ];
    const dt = basil3d_listen_delta_time(listen);
    const moveXY = basil3d_listen_get(listen, "wasd", "left-stick");
    const cameraXY = basil3d_listen_get(listen, "arrow", "right-stick", rect);
    if (cameraXY) {
      const cameraSpeed = 90;
      const cameraX = -cameraXY[0];
      const cameraY = cameraXY[1];
      mob.ha += cameraSpeed * dt * cameraX;
      mob.va += cameraSpeed * dt * cameraY;
      mob.va = Math.max(-60, Math.min(mob.va, 80));
    }
    if (moveXY) {
      const moveSpeed = 2;
      const rx = deg2rad(mob.ha + 90);
      const ry = deg2rad(mob.ha);
      const moveX = -moveXY[0];
      const moveY = moveXY[1];
      const vx = moveX * Math.cos(rx) + moveY * Math.cos(ry);
      const vy = moveX * Math.sin(rx) + moveY * Math.sin(ry);
      const dx = moveSpeed * dt * vx;
      const dy = moveSpeed * dt * vy;
      mob.eye[0] += dx;
      mob.eye[2] += dy;
    }
    const lb = basil3d_listen_get(listen, "q", "lb");
    if (lb) {
      mob.eye[1] -= 0.75 * dt;
    }
    const rb = basil3d_listen_get(listen, "e", "rb");
    if (rb) {
      mob.eye[1] += 0.75 * dt;
    }
    const light = view.light;
    light.ha += 45 * dt;
  };
  html_listen(window, "load", () => {
    html_show_message("Welcome Basilico.");
    basil3d_start(setup, update);
  });
  const addDebugGrid = (view, app) => {
    const lines = [];
    lines.push({
      from: [-50, 0, 0],
      to: [50, 0, 0],
      color: [255, 0, 0, 255]
    });
    lines.push({
      from: [0, 0, -50],
      to: [0, 0, 50],
      color: [0, 0, 255, 255]
    });
    basil3d_view_open(view, app, {
      "lines": lines
    });
  };
})();
