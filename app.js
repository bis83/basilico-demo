(()=>{const m=(e,t,r)=>{e.addEventListener(t,r)},N=()=>document.getElementById("canvas"),z=()=>document.getElementById("message"),A=e=>{const t=z();t.style.display="",t.textContent=e},J=()=>{const e=z();e.style.display="none"};const Q=(e,t)=>Math.floor(e/t),Z=(e,t)=>(e%t+t)%t,h=e=>e/180*Math.PI,$=(e,t)=>Math.sqrt(e*e+t*t),y=(e,t)=>{const r=$(e,t);return r!=0?[e/r,t/r]:[0,0]};const ee=([e,t],r,n,o,i)=>r<=e&&e<=n&&o<=t&&t<=i;const G=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],te=e=>{const t=G(e,e);return Math.sqrt(t)},re=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],ne=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]];const E=e=>{const t=te(e);return[e[0]/t,e[1]/t,e[2]/t]},T=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],L=(e,t)=>{const r=h(e),n=h(t);return[Math.cos(n)*Math.cos(r),Math.sin(n),Math.cos(n)*Math.sin(r)]},oe=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],ie=(e,t)=>[e[0]*t[0]+e[1]*t[4]+e[2]*t[8]+e[3]*t[12],e[0]*t[1]+e[1]*t[5]+e[2]*t[9]+e[3]*t[13],e[0]*t[2]+e[1]*t[6]+e[2]*t[10]+e[3]*t[14],e[0]*t[3]+e[1]*t[7]+e[2]*t[11]+e[3]*t[15],e[4]*t[0]+e[5]*t[4]+e[6]*t[8]+e[7]*t[12],e[4]*t[1]+e[5]*t[5]+e[6]*t[9]+e[7]*t[13],e[4]*t[2]+e[5]*t[6]+e[6]*t[10]+e[7]*t[14],e[4]*t[3]+e[5]*t[7]+e[6]*t[11]+e[7]*t[15],e[8]*t[0]+e[9]*t[4]+e[10]*t[8]+e[11]*t[12],e[8]*t[1]+e[9]*t[5]+e[10]*t[9]+e[11]*t[13],e[8]*t[2]+e[9]*t[6]+e[10]*t[10]+e[11]*t[14],e[8]*t[3]+e[9]*t[7]+e[10]*t[11]+e[11]*t[15],e[12]*t[0]+e[13]*t[4]+e[14]*t[8]+e[15]*t[12],e[12]*t[1]+e[13]*t[5]+e[14]*t[9]+e[15]*t[13],e[12]*t[2]+e[13]*t[6]+e[14]*t[10]+e[15]*t[14],e[12]*t[3]+e[13]*t[7]+e[14]*t[11]+e[15]*t[15]],ae=e=>{const t=e[0]*e[5]-e[1]*e[4],r=e[0]*e[6]-e[2]*e[4],n=e[0]*e[7]-e[3]*e[4],o=e[1]*e[6]-e[2]*e[5],i=e[1]*e[7]-e[3]*e[5],a=e[2]*e[7]-e[3]*e[6],d=e[8]*e[13]-e[9]*e[12],f=e[8]*e[14]-e[10]*e[12],l=e[8]*e[15]-e[11]*e[12],u=e[9]*e[14]-e[10]*e[13],s=e[9]*e[15]-e[11]*e[13],v=e[10]*e[15]-e[11]*e[14];let c=t*v-r*s+n*u+o*l-i*f+a*d;return c?(c=1/c,[(e[5]*v-e[6]*s+e[7]*u)*c,(e[2]*s-e[1]*v-e[3]*u)*c,(e[13]*a-e[14]*i+e[15]*o)*c,(e[10]*i-e[9]*a-e[11]*o)*c,(e[6]*l-e[4]*v-e[7]*f)*c,(e[0]*v-e[2]*l+e[3]*f)*c,(e[14]*n-e[12]*a-e[15]*r)*c,(e[8]*a-e[10]*n+e[11]*r)*c,(e[4]*s-e[5]*l+e[7]*d)*c,(e[1]*l-e[0]*s-e[3]*d)*c,(e[12]*i-e[13]*n+e[15]*t)*c,(e[9]*n-e[8]*i-e[11]*t)*c,(e[5]*f-e[4]*u-e[6]*d)*c,(e[0]*u-e[1]*f+e[2]*d)*c,(e[13]*r-e[12]*o-e[14]*t)*c,(e[8]*o-e[9]*r+e[10]*t)*c]):oe()};const se=(e,t,r,n)=>{e[12]=t,e[13]=r,e[14]=n},ce=(e,t)=>{const r=h(e),n=Math.sin(r),o=Math.cos(r);return[o,0,n,0,0,1,0,0,-n,0,o,0,0,0,0,1]};const fe=(e,t,r)=>{const n=E(ne(t,e)),o=E(T(r,n)),i=T(n,o),a=G(e,o),d=G(e,i),f=G(e,n);return[o[0],i[0],n[0],0,o[1],i[1],n[1],0,o[2],i[2],n[2],0,-a,-d,-f,1]},de=(e,t,r,n)=>{const o=1/Math.tan(e),i=o/t,a=n/(n-r),d=-(a*r);return[i,0,0,0,0,o,0,0,0,0,a,1,0,0,d,0]};const ue=e=>{const t=e.device;e.cbuffer[0]=t.createBuffer({size:512,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),e.cbuffer[1]=t.createBuffer({size:196608,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),e.cbuffer[2]=t.createBuffer({size:65536,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),e.cbuffer[3]=t.createBuffer({size:40960,usage:GPUBufferUsage.INDIRECT|GPUBufferUsage.COPY_DST}),e.cbuffer[4]=t.createBuffer({size:49152,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),e.cbuffer[5]=t.createBuffer({size:16384,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),e.sampler[0]=t.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),e.shaderModule[0]=t.createShaderModule({code:he}),e.shaderModule[1]=t.createShaderModule({code:ge}),e.shaderModule[2]=t.createShaderModule({code:xe}),e.bindGroupLayout[0]=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}}]}),e.bindGroupLayout[1]=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"depth"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]}),e.bindGroup[0]=t.createBindGroup({layout:e.bindGroupLayout[0],entries:[{binding:0,resource:{buffer:e.cbuffer[0]}},{binding:1,resource:{buffer:e.cbuffer[1]}}]}),e.pipelineLayout[0]=t.createPipelineLayout({bindGroupLayouts:[e.bindGroupLayout[0]]}),e.pipelineLayout[1]=t.createPipelineLayout({bindGroupLayouts:[e.bindGroupLayout[1]]}),e.pipeline[0]=t.createRenderPipeline({layout:e.pipelineLayout[0],vertex:{module:e.shaderModule[0],entryPoint:"VS",buffers:[{arrayStride:4,attributes:[{format:"uint32",offset:0,shaderLocation:0}],stepMode:"instance"},{arrayStride:12,attributes:[{format:"float32x3",offset:0,shaderLocation:1}]},{arrayStride:12,attributes:[{format:"float32x3",offset:0,shaderLocation:2}]}]},fragment:{module:e.shaderModule[0],entryPoint:"FS",targets:[{format:"rgb10a2unorm"},{format:"rgba8unorm"},{format:"rgba8unorm"}]},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth32float"},primitive:{cullMode:"back",frontFace:"cw"}}),e.pipeline[1]=t.createRenderPipeline({layout:e.pipelineLayout[1],vertex:{module:e.shaderModule[1],entryPoint:"VS",buffers:[]},fragment:{module:e.shaderModule[1],entryPoint:"FS_SSAO",targets:[{format:"rgba8unorm",blend:{color:{operation:"min",srcFactor:"one",dstFactor:"one"},alpha:{}},writeMask:GPUColorWrite.RED}]}}),e.pipeline[2]=t.createRenderPipeline({layout:e.pipelineLayout[1],vertex:{module:e.shaderModule[1],entryPoint:"VS",buffers:[]},fragment:{module:e.shaderModule[1],entryPoint:"FS_HDR",targets:[{format:"rgba16float"}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"not-equal",format:"depth32float"}}),e.pipeline[3]=t.createRenderPipeline({layout:e.pipelineLayout[1],vertex:{module:e.shaderModule[1],entryPoint:"VS",buffers:[]},fragment:{module:e.shaderModule[1],entryPoint:"FS_HDRSky",targets:[{format:"rgba16float"}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"equal",format:"depth32float"}}),e.pipeline[4]=t.createRenderPipeline({layout:e.pipelineLayout[1],vertex:{module:e.shaderModule[1],entryPoint:"VS",buffers:[]},fragment:{module:e.shaderModule[1],entryPoint:"FS_HDR2LDR",targets:[{format:e.canvasFormat}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"always",format:"depth32float"}}),e.pipeline[5]=t.createRenderPipeline({layout:e.pipelineLayout[0],vertex:{module:e.shaderModule[2],entryPoint:"VS",buffers:[{arrayStride:12,attributes:[{format:"float32x3",offset:0,shaderLocation:0}]},{arrayStride:4,attributes:[{format:"unorm8x4",offset:0,shaderLocation:1}]}]},fragment:{module:e.shaderModule[2],entryPoint:"FS",targets:[{format:e.canvasFormat}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"less",format:"depth32float"},primitive:{topology:"line-list"}})},le=e=>{Ge(e)},ve=e=>{const t=e.device,r=e.context,n=t.createCommandEncoder();n.beginRenderPass({colorAttachments:[{view:r.getCurrentTexture().createView(),clearValue:{r:.2,g:.2,b:.2,a:1},loadOp:"clear",storeOp:"store"}]}).end(),t.queue.submit([n.finish()])},me=(e,t)=>{const r=e.device,n=e.context;ye(e,t),we(e,t);const o=_e(e,t),i=r.createCommandEncoder();{const a=i.beginRenderPass({depthStencilAttachment:{view:e.gbuffer[0].createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"},colorAttachments:[{view:e.gbuffer[1].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"},{view:e.gbuffer[2].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"},{view:e.gbuffer[3].createView(),clearValue:{r:1,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});for(const d of o){a.setPipeline(e.pipeline[0]),a.setBindGroup(0,e.bindGroup[0]),a.setVertexBuffer(0,e.cbuffer[2],d.first*4);const f=e.mesh[d.id];if(f.vb0){const[l,u,s]=f.vb0;a.setVertexBuffer(1,e.buffer[l],u,s)}if(f.vb1){const[l,u,s]=f.vb1;a.setVertexBuffer(2,e.buffer[l],u,s)}if(f.ib){const[l,u,s]=f.ib;a.setIndexBuffer(e.buffer[l],"uint16",u,s)}a.drawIndexedIndirect(e.cbuffer[3],d.offset)}a.end()}{const a=i.beginRenderPass({colorAttachments:[{view:e.gbuffer[3].createView(),loadOp:"load",storeOp:"store"}]});a.setPipeline(e.pipeline[1]),a.setBindGroup(0,e.bindGroup[2]),a.draw(4),a.end()}{const a=i.beginRenderPass({depthStencilAttachment:{view:e.gbuffer[0].createView(),depthReadOnly:!0},colorAttachments:[{view:e.gbuffer[4].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});a.setPipeline(e.pipeline[2]),a.setBindGroup(0,e.bindGroup[1]),a.draw(4),a.setPipeline(e.pipeline[3]),a.draw(4),a.end()}{const a=i.beginRenderPass({depthStencilAttachment:{view:e.gbuffer[0].createView(),depthReadOnly:!0},colorAttachments:[{view:n.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});a.setPipeline(e.pipeline[4]),a.setBindGroup(0,e.bindGroup[3]),a.draw(4),t.lines.length>0&&(a.setPipeline(e.pipeline[5]),a.setBindGroup(0,e.bindGroup[0]),a.setVertexBuffer(0,e.cbuffer[4]),a.setVertexBuffer(1,e.cbuffer[5]),a.draw(t.lines.length)),a.end()}r.queue.submit([i.finish()])},O=`
struct ViewInput {
  viewProj : mat4x4<f32>,
  invViewProj : mat4x4<f32>,
  view : mat4x4<f32>,
  eyePosition : vec4<f32>,
  lightDir : vec4<f32>,
  lightColor : vec4<f32>,
  ambientColor0 : vec4<f32>,
  ambientColor1 : vec4<f32>,
}`,pe=`
struct InstanceInput {
  world : mat4x4<f32>,
  factor0 : vec4<f32>,
  factor1 : vec4<f32>,
}`,C=O+pe+`
@group(0) @binding(0) var<uniform> view : ViewInput;
@group(0) @binding(1) var<storage, read> inst : array<InstanceInput>;
`,be=O+`
@group(0) @binding(0) var<uniform> view : ViewInput;
@group(0) @binding(1) var zbuffer : texture_depth_2d;
@group(0) @binding(2) var gbuffer0 : texture_2d<f32>;
@group(0) @binding(3) var gbuffer1 : texture_2d<f32>;
@group(0) @binding(4) var gbuffer2 : texture_2d<f32>;
@group(0) @binding(5) var sampler0 : sampler;
`,he=C+`
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
fn VS(input : VertexInput) -> VertexOutput {
  var world = inst[input.id].world;
  var nWorld = mat3x3<f32>(world[0].xyz, world[1].xyz, world[2].xyz);

  var output : VertexOutput;
  output.position = (view.viewProj * world * vec4(input.position, 1.0));
  output.normal = normalize(nWorld * input.normal);
  output.id = input.id;
  return output;
}

@fragment
fn FS(input : VertexOutput) -> FragmentOutput {
  var output : FragmentOutput;
  output.gbuffer0 = vec4(normalize(input.normal) * 0.5 + 0.5, 0);
  output.gbuffer1 = inst[input.id].factor0.xyzw;
  output.gbuffer2 = inst[input.id].factor1.xyzw;
  return output;
}
`,ge=be+`
const EPSILON = 0.0001;
const M_PI = 3.141592653589793;

@vertex
fn VS(@builtin(vertex_index) id : u32) -> @builtin(position) vec4<f32> {
  return vec4(2.0f * f32((1 & id) << 1) - 1.0f, -2.0f * f32(2 & id) + 1.0f, 1.0, 1.0);
}

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
fn decodeViewNormal(xy : vec2<i32>) -> vec3<f32> {
  var nView = mat3x3<f32>(view.view[0].xyz, view.view[1].xyz, view.view[2].xyz);
  var N = normalize(textureLoad(gbuffer0, xy, 0).xyz * 2.0 - 1.0);
  N = normalize(nView * N);
  return N;
}
fn sampleEnvMap(R : vec3<f32>) -> vec3<f32> {
  return mix(
    view.ambientColor0.rgb * view.ambientColor0.a,
    view.ambientColor1.rgb * view.ambientColor1.a,
    dot(R, vec3<f32>(0, 1, 0)) * 0.5 + 0.5);
}

fn AO(uv : vec2<f32>, N : vec3<f32>) -> f32 {
  const samples : i32 = 16;
  const sampleSphere = array<vec3<f32>, samples>(
    vec3<f32>( 0.5381, 0.1856,-0.4319),
    vec3<f32>( 0.1379, 0.2486, 0.4430),
    vec3<f32>( 0.3371, 0.5679,-0.0057),
    vec3<f32>(-0.6999,-0.0451,-0.0019),
    vec3<f32>( 0.0689,-0.1598,-0.8547),
    vec3<f32>( 0.0560, 0.0069,-0.1843),
    vec3<f32>(-0.0146, 0.1402, 0.0762),
    vec3<f32>( 0.0100,-0.1924,-0.0344),
    vec3<f32>(-0.3577,-0.5301,-0.4358),
    vec3<f32>(-0.3169, 0.1063, 0.0158),
    vec3<f32>( 0.0103,-0.5869, 0.0046),
    vec3<f32>(-0.0897,-0.4940, 0.3287),
    vec3<f32>( 0.7119,-0.0154,-0.0918),
    vec3<f32>(-0.0533, 0.0596,-0.5411),
    vec3<f32>( 0.0352,-0.0631, 0.5460),
    vec3<f32>(-0.4776, 0.2847,-0.0271));

  var radius = 0.01;
  var depth = textureSample(zbuffer, sampler0, uv);

  var occ : f32 = 0.0;
  for(var i = 0; i < samples; i++) {
    var R = (sampleSphere[i] * radius);
    R *= sign(dot(R, N));
    var uv2 = saturate(uv + vec2(R.x, -R.y));
    var occDepth = textureSample(zbuffer, sampler0, uv2);
    occ += step(occDepth, depth);
  }
  return saturate(1.0 - (occ / f32(samples)) + 0.2);
}
@fragment
fn FS_SSAO(@builtin(position) coord : vec4<f32>) -> @location(0) vec4<f32> {
  var xy = vec2<i32>(floor(coord.xy));
  var uv = vec2<f32>(xy) / vec2<f32>(textureDimensions(zbuffer, 0).xy);
  var N = decodeViewNormal(xy);
  return vec4(AO(uv, N), 0, 0, 0);
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
fn FS_HDR(@builtin(position) coord : vec4<f32>) -> @location(0) vec4<f32> {
  var xy = vec2<i32>(floor(coord.xy));
  var F0 = textureLoad(gbuffer1, xy, 0);
  var F1 = textureLoad(gbuffer2, xy, 0);
  var N = decodeNormal(xy);
  var P = decodeWorldPosition(xy);
  var V = normalize(view.eyePosition.xyz - P);
  var R = normalize(reflect(V, N));

  var L = normalize(view.lightDir.xyz);
  var C_L = (view.lightColor.rgb * view.lightColor.a) * BRDF(N, L, V, F0.rgb, F1.y, F1.z);
  var A = sampleEnvMap(R);
  var C_A = A * F1.x * F0.rgb;
  var C_E = F0.rgb * F1.w;
  return vec4(C_L + C_A + C_E, 1.0);
}

@fragment
fn FS_HDRSky(@builtin(position) coord : vec4<f32>) -> @location(0) vec4<f32> {
  var xy = vec2<i32>(floor(coord.xy));
  var P = decodeWorldPosition(xy);
  var V = normalize(view.eyePosition.xyz - P);
  var C_A = sampleEnvMap(V);
  return vec4(C_A, 1.0);
}

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
  var r = textureSample(gbuffer0, sampler0, uv + dir * redOffset).r;
  var g = textureSample(gbuffer0, sampler0, uv + dir * greenOffset).g;
  var b = textureSample(gbuffer0, sampler0, uv + dir * blueOffset).b;
  return vec3<f32>(r, g, b);
}
@fragment
fn FS_HDR2LDR(@builtin(position) coord : vec4<f32>) -> @location(0) vec4<f32> {
  var uv = coord.xy / vec2<f32>(textureDimensions(gbuffer0, 0).xy);
  var color = chromaticAberration(uv);
  color *= vignette(uv);
  return vec4<f32>(toneMapping(color), 1);
}
`,xe=C+`
struct VertexInput {
  @location(0) position: vec3<f32>,
  @location(1) color : vec4<f32>,
};
struct VertexOutput {
  @builtin(position) position : vec4<f32>,
  @location(0) color : vec4<f32>,
};

@vertex
fn VS(input : VertexInput) -> VertexOutput {
  var output : VertexOutput;
  output.position = view.viewProj * vec4<f32>(input.position, 1.0);
  output.color = input.color;
  return output;
}
@fragment
fn FS(input : VertexOutput) -> @location(0) vec4<f32> {
  return input.color;
}
`,ye=(e,t)=>{const r=e.device,n=t.camera,o=new Float32Array(68),i=canvas.width/canvas.height,a=h(n.fov),d=L(n.ha,n.va),f=n.eye,l=re(f,d),s=fe(f,l,[0,1,0]),v=de(a,i,n.near,n.far),c=ie(s,v),b=ae(c);o.set(c,0),o.set(b,16),o.set(s,32),o.set(f,48);const p=t.light,g=L(p.ha,p.va);o.set(g,52),o.set(p.color,56),o.set(p.ambient0,60),o.set(p.ambient1,64),r.queue.writeBuffer(e.cbuffer[0],0,o)},we=(e,t)=>{const r=e.device;if(t.lines.length<=0)return;const n=new Float32Array(t.lines.length*3),o=new Uint8Array(t.lines.length*4);for(let i=0;i<t.lines.length;++i){const a=t.lines[i];n[i*3+0]=a.pos[0],n[i*3+1]=a.pos[1],n[i*3+2]=a.pos[2],o[i*4+0]=a.color[0],o[i*4+1]=a.color[1],o[i*4+2]=a.color[2],o[i*4+3]=a.color[3]}r.queue.writeBuffer(e.cbuffer[4],0,n),r.queue.writeBuffer(e.cbuffer[5],0,o)},_e=(e,t)=>{const r=e.device,n=[];n.length=e.mesh.length;for(let s=0;s<n.length;++s)n[s]=[];const o=new Float32Array(24),i=4*24;let a=0;for(const s of t.room)for(let v=0;v<s.indices.length;++v){const c=s.node[s.indices[v]];if(!c)continue;const b=Z(v,s.divisor),p=Q(v,s.divisor),[g,S,P,V,D]=F(s.offset,b*s.unit,0,p*s.unit,0,0);for(const I of c.mesh){const x=s.mesh[I];if(!x)continue;const M=Re(e,x.name);if(M<0)continue;for(const K of e.id[M].mesh)n[K].push(a);const[k,H,W,X,q]=F(x.offset,g,S,P,V,D),R=ce(X,q);se(R,k,H,W);const j=w(x.factor0,1,1,1,1),Y=w(x.factor1,1,1,1,0);o.set(R,0),o.set(j,16),o.set(Y,20),r.queue.writeBuffer(e.cbuffer[1],a*i,o),a+=1}}const d=[];let f=0,l=0;const u=new Uint32Array(5);for(let s=0;s<n.length;++s){if(n[s].length<=0)continue;const v=e.mesh[s],c=n[s].length;r.queue.writeBuffer(e.cbuffer[2],f*4,new Uint32Array(n[s])),u[0]=v.count,u[1]=c,u[2]=0,u[3]=0,u[4]=0,r.queue.writeBuffer(e.cbuffer[3],l,u),d.push({id:s,first:f,offset:l}),f+=c,l+=20}return d},Ge=e=>{const t=e.device,r=e.canvas;if(r.width!==r.clientWidth||r.height!==r.clientHeight){r.width=r.clientWidth,r.height=r.clientHeight;const n=i=>{e.gbuffer[i]!==void 0&&(e.gbuffer[i].destroy(),delete e.gbuffer[i])};n(0),n(1),n(2),n(3),n(4);const o=i=>{e.bindGroup[i]!==void 0&&delete e.bindGroup[i]};o(1),o(2),o(3)}e.gbuffer[0]===void 0&&(e.gbuffer[0]=t.createTexture({size:[r.width,r.height],format:"depth32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[1]===void 0&&(e.gbuffer[1]=t.createTexture({size:[r.width,r.height],format:"rgb10a2unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[2]===void 0&&(e.gbuffer[2]=t.createTexture({size:[r.width,r.height],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[3]===void 0&&(e.gbuffer[3]=t.createTexture({size:[r.width,r.height],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[4]===void 0&&(e.gbuffer[4]=t.createTexture({size:[r.width,r.height],format:"rgba16float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.bindGroup[1]===void 0&&(e.bindGroup[1]=t.createBindGroup({layout:e.bindGroupLayout[1],entries:[{binding:0,resource:{buffer:e.cbuffer[0]}},{binding:1,resource:e.gbuffer[0].createView()},{binding:2,resource:e.gbuffer[1].createView()},{binding:3,resource:e.gbuffer[2].createView()},{binding:4,resource:e.gbuffer[3].createView()},{binding:5,resource:e.sampler[0]}]})),e.bindGroup[2]===void 0&&(e.bindGroup[2]=t.createBindGroup({layout:e.bindGroupLayout[1],entries:[{binding:0,resource:{buffer:e.cbuffer[0]}},{binding:1,resource:e.gbuffer[0].createView()},{binding:2,resource:e.gbuffer[1].createView()},{binding:3,resource:e.gbuffer[1].createView()},{binding:4,resource:e.gbuffer[1].createView()},{binding:5,resource:e.sampler[0]}]})),e.bindGroup[3]===void 0&&(e.bindGroup[3]=t.createBindGroup({layout:e.bindGroupLayout[1],entries:[{binding:0,resource:{buffer:e.cbuffer[0]}},{binding:1,resource:e.gbuffer[0].createView()},{binding:2,resource:e.gbuffer[4].createView()},{binding:3,resource:e.gbuffer[4].createView()},{binding:4,resource:e.gbuffer[4].createView()},{binding:5,resource:e.sampler[0]}]}))},Se=e=>{const t=(r,n,o)=>{switch(n){case"KeyW":r.w=o;break;case"KeyA":r.a=o;break;case"KeyS":r.s=o;break;case"KeyD":r.d=o;break;case"ArrowUp":r.up=o;break;case"ArrowLeft":r.left=o;break;case"ArrowDown":r.down=o;break;case"ArrowRight":r.right=o;break;case"KeyQ":r.q=o;break;case"KeyE":r.e=o;break;case"KeyZ":r.z=o;break;case"KeyX":r.x=o;break;case"Space":r.space=o;break;case"ControlLeft":r.lctrl=o;break;case"Escape":r.esc=o;break;default:return!1}return!0};m(window,"focus",r=>{}),m(window,"blur",r=>{for(const n in e.keyboard)e.keyboard[n]=!1}),m(window,"resize",r=>{}),m(window,"gamepadconnected",r=>{e.gamepad.index=r.gamepad.index}),m(window,"gamepaddisconnected",r=>{e.gamepad.index===r.gamepad.index&&(e.gamepad.index=null)}),m(document,"keydown",r=>{t(e.keyboard,r.code,!0)&&r.preventDefault()}),m(document,"keyup",r=>{t(e.keyboard,r.code,!1)&&r.preventDefault()}),m(document.body,"contextmenu",r=>{r.preventDefault()}),m(document.body,"pointerdown",r=>{e.touch.set(r.pointerId,{x:r.clientX,y:r.clientY,sx:r.clientX,sy:r.clientY,time:performance.now()})}),m(document.body,"pointerup",r=>{e.touch.delete(r.pointerId)}),m(document.body,"pointerout",r=>{e.touch.delete(r.pointerId)}),m(document.body,"pointermove",r=>{const n=e.touch.get(r.pointerId);n&&(n.x=r.clientX,n.y=r.clientY)})},Pe=(e,t)=>{if(e.timer.dt=(t-e.timer.t)/1e3,e.timer.t=t,e.timer.n+=1,e.gamepad.index!==null){const n=navigator.getGamepads()[e.gamepad.index];e.gamepad.lx=Math.trunc(n.axes[0]*4)/4,e.gamepad.ly=Math.trunc(n.axes[1]*4)/4,e.gamepad.rx=Math.trunc(n.axes[2]*4)/4,e.gamepad.ry=Math.trunc(n.axes[3]*4)/4,e.gamepad.b0=n.buttons[0].value>=.5,e.gamepad.b1=n.buttons[1].value>=.5,e.gamepad.b8=n.buttons[8].value>=.5,e.gamepad.b9=n.buttons[9].value>=.5,e.gamepad.lb=n.buttons[4].value>=.5,e.gamepad.rb=n.buttons[5].value>=.5,e.gamepad.lt=n.buttons[6].value>=.5,e.gamepad.rt=n.buttons[7].value>=.5}},Ve=e=>e.timer.dt,_=(e,t,r,n)=>{if(n){for(const o of e.touch.values())if(ee([o.sx,o.sy],...n)){const i=o.x-o.sx,a=-(o.y-o.sy);return y(i,a)}}if(t){if(t==="wasd"){const o=e.keyboard,i=o.a?-1:o.d?1:0,a=o.w?1:o.s?-1:0;if(i!==0||a!==0)return y(i,a)}else if(t==="arrow"){const o=e.keyboard,i=o.right?1:o.left?-1:0,a=o.up?1:o.down?-1:0;if(i!==0||a!==0)return y(i,a)}else if(e.keyboard[t])return[1,0]}if(r){if(r==="left-stick"){const o=e.gamepad;return y(o.lx,-o.ly)}else if(r==="right-stick"){const o=e.gamepad;return y(o.rx,-o.ry)}else if(e.gamepad[r])return[1,0]}return null},Ne=async e=>{const t=window.atob(e),r=new Uint8Array(t.length);for(let i=0;i<t.length;++i)r[i]=t.charCodeAt(i);const n=new Blob([r]).stream().pipeThrough(new DecompressionStream("deflate-raw")),o=await new Response(n).arrayBuffer();return new Uint8Array(o)},Ue=e=>{e.loading+=1,(async()=>{const n=await(await fetch("app.json")).json();if(n.gpu){const o=e.gpu.device;for(let i=0;i<n.gpu.buffer.length;++i){const a=n.gpu.buffer[i],d=await Ne(n.embed[a.embed]),f=o.createBuffer({size:d.length,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.INDEX,mappedAtCreation:!0}),l=new DataView(f.getMappedRange());for(let u=0;u<d.length;++u)l.setUint8(u,d[u]);f.unmap(),n.gpu.buffer[i]=f}Object.assign(e.gpu,n.gpu)}n.audio&&Object.assign(e.audio,n.audio),n.json&&(e.json=n.json),e.loading-=1})()},Me=e=>e.loading>0,B=(e,t)=>e.json[t],Re=(e,t)=>{for(let r=0;r<e.id.length;++r)if(e.id[r].name===t)return r;return-1},Ee=e=>{e.camera={eye:[0,0,0],ha:0,va:0,fov:30,near:.1,far:1e3},e.light={ha:0,va:0,color:[0,0,0,0],ambient0:[0,0,0,0],ambient1:[0,0,0,0]},e.room=[],e.celeste=[],e.mob=[],e.lines=[]},U=(e,t)=>{Te(e,t),Le(e,t),Be(e,t),Fe(e,t)},Te=(e,t)=>{t.camera&&Object.assign(e.camera,t.camera)},Le=(e,t)=>{t.light&&(t.light.ha!==void 0&&(e.light.ha=t.light.ha),t.light.va!==void 0&&(e.light.va=t.light.va),e.light.color=w(t.light.color,0,0,0,0),e.light.ambient0=w(t.light.ambient0,0,0,0,0),e.light.ambient1=w(t.light.ambient1,0,0,0,0))},Be=(e,t)=>{t.room&&(e.room=t.room)},Fe=(e,t)=>{if(t.lines)for(const r of t.lines)e.lines.push({pos:r.from,color:r.color}),e.lines.push({pos:r.to,color:r.color})},F=(e,t,r,n,o,i)=>(e&&(t+=e.x||0,r+=e.y||0,n+=e.z||0,o+=e.ha||0,i+=e.va||0),[t,r,n,o,i]),w=(e,t,r,n,o)=>(e&&(e.r!==void 0&&(t=e.r),e.g!==void 0&&(r=e.g),e.r!==void 0&&(n=e.b),e.a!==void 0&&(o=e.a)),[t,r,n,o]),ze=async(e,t)=>{if(!navigator.gpu){A("ERROR: WebGPU not supported.");return}const r={loading:0,gpu:{bindGroupLayout:[],pipelineLayout:[],shaderModule:[],pipeline:[],sampler:[],bindGroup:[],cbuffer:[],gbuffer:[]},audio:{},listen:{timer:{t:performance.now(),dt:0,n:0},gamepad:{index:null,lx:0,ly:0,rx:0,ry:0,b0:!1,b1:!1,b8:!1,b9:!1,lb:!1,rb:!1,lt:!1,rt:!1},keyboard:{w:!1,a:!1,s:!1,d:!1,up:!1,left:!1,down:!1,right:!1,q:!1,e:!1,z:!1,x:!1,space:!1,lctrl:!1,esc:!1},touch:new Map},json:{},view:{}};r.gpu.adapter=await navigator.gpu.requestAdapter(),r.gpu.device=await r.gpu.adapter.requestDevice(),r.gpu.canvasFormat=navigator.gpu.getPreferredCanvasFormat(),r.gpu.canvas=N(),r.gpu.context=r.gpu.canvas.getContext("webgpu"),r.gpu.context.configure({device:r.gpu.device,format:r.gpu.canvasFormat,alphaMode:"opaque"}),ue(r.gpu),Se(r.listen),Ee(r.view),Ue(r);const n=o=>{Pe(r.listen,o),le(r.gpu),Me(r)?ve(r.gpu):(e&&(e(r),e=null),t&&t(r),me(r.gpu,r.view)),requestAnimationFrame(n)};requestAnimationFrame(n)},Ae=e=>{J(),U(e.view,B(e,"sample")),U(e.view,B(e,"room000")),Ce(e)},Oe=e=>{const t=e.listen,r=e.view,n=r.camera,o=[0,N().clientWidth,0,N().clientHeight],i=Ve(t),a=_(t,"wasd","left-stick"),d=_(t,"arrow","right-stick",o);if(d){const v=-d[0],c=d[1];n.ha+=90*i*v,n.va+=90*i*c,n.va=Math.max(-60,Math.min(n.va,80))}if(a){const v=h(n.ha+90),c=h(n.ha),b=-a[0],p=a[1],g=b*Math.cos(v)+p*Math.cos(c),S=b*Math.sin(v)+p*Math.sin(c),P=2*i*g,V=2*i*S;n.eye[0]+=P,n.eye[2]+=V}_(t,"q","lb")&&(n.eye[1]-=.75*i),_(t,"e","rb")&&(n.eye[1]+=.75*i);const u=r.light;u.ha+=45*i};m(window,"load",()=>{A("Welcome Basilico."),ze(Ae,Oe)});const Ce=e=>{const t=[];t.push({from:[-50,0,0],to:[50,0,0],color:[255,0,0,255]}),t.push({from:[0,0,-50],to:[0,0,50],color:[0,0,255,255]}),U(e.view,{lines:t})};})();
