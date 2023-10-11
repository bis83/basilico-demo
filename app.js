(()=>{const m=(e,t,r)=>{e.addEventListener(t,r)},N=()=>document.getElementById("canvas"),A=()=>document.getElementById("message"),F=e=>{const t=A();t.style.display="",t.textContent=e},Q=()=>{const e=A();e.style.display="none"};const Z=(e,t)=>Math.floor(e/t),$=(e,t)=>(e%t+t)%t,v=e=>e/180*Math.PI,ee=(e,t)=>Math.sqrt(e*e+t*t),w=(e,t)=>{const r=ee(e,t);return r!=0?[e/r,t/r]:[0,0]};const te=([e,t],r,o,n,i)=>r<=e&&e<=o&&n<=t&&t<=i;const S=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],re=e=>{const t=S(e,e);return Math.sqrt(t)},oe=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],ne=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]];const E=e=>{const t=re(e);return[e[0]/t,e[1]/t,e[2]/t]},T=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],L=(e,t)=>{const r=v(e),o=v(t);return[Math.cos(o)*Math.cos(r),Math.sin(o),Math.cos(o)*Math.sin(r)]},ie=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],ae=(e,t)=>[e[0]*t[0]+e[1]*t[4]+e[2]*t[8]+e[3]*t[12],e[0]*t[1]+e[1]*t[5]+e[2]*t[9]+e[3]*t[13],e[0]*t[2]+e[1]*t[6]+e[2]*t[10]+e[3]*t[14],e[0]*t[3]+e[1]*t[7]+e[2]*t[11]+e[3]*t[15],e[4]*t[0]+e[5]*t[4]+e[6]*t[8]+e[7]*t[12],e[4]*t[1]+e[5]*t[5]+e[6]*t[9]+e[7]*t[13],e[4]*t[2]+e[5]*t[6]+e[6]*t[10]+e[7]*t[14],e[4]*t[3]+e[5]*t[7]+e[6]*t[11]+e[7]*t[15],e[8]*t[0]+e[9]*t[4]+e[10]*t[8]+e[11]*t[12],e[8]*t[1]+e[9]*t[5]+e[10]*t[9]+e[11]*t[13],e[8]*t[2]+e[9]*t[6]+e[10]*t[10]+e[11]*t[14],e[8]*t[3]+e[9]*t[7]+e[10]*t[11]+e[11]*t[15],e[12]*t[0]+e[13]*t[4]+e[14]*t[8]+e[15]*t[12],e[12]*t[1]+e[13]*t[5]+e[14]*t[9]+e[15]*t[13],e[12]*t[2]+e[13]*t[6]+e[14]*t[10]+e[15]*t[14],e[12]*t[3]+e[13]*t[7]+e[14]*t[11]+e[15]*t[15]],se=e=>{const t=e[0]*e[5]-e[1]*e[4],r=e[0]*e[6]-e[2]*e[4],o=e[0]*e[7]-e[3]*e[4],n=e[1]*e[6]-e[2]*e[5],i=e[1]*e[7]-e[3]*e[5],s=e[2]*e[7]-e[3]*e[6],c=e[8]*e[13]-e[9]*e[12],a=e[8]*e[14]-e[10]*e[12],p=e[8]*e[15]-e[11]*e[12],l=e[9]*e[14]-e[10]*e[13],d=e[9]*e[15]-e[11]*e[13],f=e[10]*e[15]-e[11]*e[14];let u=t*f-r*d+o*l+n*p-i*a+s*c;return u?(u=1/u,[(e[5]*f-e[6]*d+e[7]*l)*u,(e[2]*d-e[1]*f-e[3]*l)*u,(e[13]*s-e[14]*i+e[15]*n)*u,(e[10]*i-e[9]*s-e[11]*n)*u,(e[6]*p-e[4]*f-e[7]*a)*u,(e[0]*f-e[2]*p+e[3]*a)*u,(e[14]*o-e[12]*s-e[15]*r)*u,(e[8]*s-e[10]*o+e[11]*r)*u,(e[4]*d-e[5]*p+e[7]*c)*u,(e[1]*p-e[0]*d-e[3]*c)*u,(e[12]*i-e[13]*o+e[15]*t)*u,(e[9]*o-e[8]*i-e[11]*t)*u,(e[5]*a-e[4]*l-e[6]*c)*u,(e[0]*l-e[1]*a+e[2]*c)*u,(e[13]*r-e[12]*n-e[14]*t)*u,(e[8]*n-e[9]*r+e[10]*t)*u]):ie()};const fe=(e,t,r,o)=>{e[12]=t,e[13]=r,e[14]=o},ue=(e,t)=>{const r=v(e),o=Math.sin(r),n=Math.cos(r);return[n,0,o,0,0,1,0,0,-o,0,n,0,0,0,0,1]};const ce=(e,t,r)=>{const o=E(ne(t,e)),n=E(T(r,o)),i=T(o,n),s=S(e,n),c=S(e,i),a=S(e,o);return[n[0],i[0],o[0],0,n[1],i[1],o[1],0,n[2],i[2],o[2],0,-s,-c,-a,1]},le=(e,t,r,o)=>{const n=1/Math.tan(e),i=n/t,s=o/(o-r),c=-(s*r);return[i,0,0,0,0,n,0,0,0,0,s,1,0,0,c,0]};const de=(e,t)=>{const r={bindGroupLayout:[],pipelineLayout:[],shaderModule:[],pipeline:[],buffer:[],sampler:[],bindGroup:[],gbuffer:[]};return r.buffer[0]=e.createBuffer({size:512,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),r.buffer[1]=e.createBuffer({size:196608,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),r.buffer[2]=e.createBuffer({size:65536,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),r.buffer[3]=e.createBuffer({size:40960,usage:GPUBufferUsage.INDIRECT|GPUBufferUsage.COPY_DST}),r.buffer[4]=e.createBuffer({size:49152,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),r.buffer[5]=e.createBuffer({size:16384,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),r.sampler[0]=e.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),r.shaderModule[0]=e.createShaderModule({code:ve}),r.shaderModule[1]=e.createShaderModule({code:xe}),r.shaderModule[2]=e.createShaderModule({code:ye}),r.bindGroupLayout[0]=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}}]}),r.bindGroupLayout[1]=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"depth"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]}),r.bindGroup[0]=e.createBindGroup({layout:r.bindGroupLayout[0],entries:[{binding:0,resource:{buffer:r.buffer[0]}},{binding:1,resource:{buffer:r.buffer[1]}}]}),r.pipelineLayout[0]=e.createPipelineLayout({bindGroupLayouts:[r.bindGroupLayout[0]]}),r.pipelineLayout[1]=e.createPipelineLayout({bindGroupLayouts:[r.bindGroupLayout[1]]}),r.pipeline[0]=e.createRenderPipeline({layout:r.pipelineLayout[0],vertex:{module:r.shaderModule[0],entryPoint:"VS",buffers:[{arrayStride:4,attributes:[{format:"uint32",offset:0,shaderLocation:0}],stepMode:"instance"},{arrayStride:12,attributes:[{format:"float32x3",offset:0,shaderLocation:1}]},{arrayStride:12,attributes:[{format:"float32x3",offset:0,shaderLocation:2}]}]},fragment:{module:r.shaderModule[0],entryPoint:"FS",targets:[{format:"rgb10a2unorm"},{format:"rgba8unorm"},{format:"rgba8unorm"}]},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth32float"},primitive:{cullMode:"back",frontFace:"cw"}}),r.pipeline[1]=e.createRenderPipeline({layout:r.pipelineLayout[1],vertex:{module:r.shaderModule[1],entryPoint:"VS",buffers:[]},fragment:{module:r.shaderModule[1],entryPoint:"FS_SSAO",targets:[{format:"rgba8unorm",blend:{color:{operation:"min",srcFactor:"one",dstFactor:"one"},alpha:{}},writeMask:GPUColorWrite.RED}]}}),r.pipeline[2]=e.createRenderPipeline({layout:r.pipelineLayout[1],vertex:{module:r.shaderModule[1],entryPoint:"VS",buffers:[]},fragment:{module:r.shaderModule[1],entryPoint:"FS_HDR",targets:[{format:"rgba16float"}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"not-equal",format:"depth32float"}}),r.pipeline[3]=e.createRenderPipeline({layout:r.pipelineLayout[1],vertex:{module:r.shaderModule[1],entryPoint:"VS",buffers:[]},fragment:{module:r.shaderModule[1],entryPoint:"FS_HDRSky",targets:[{format:"rgba16float"}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"equal",format:"depth32float"}}),r.pipeline[4]=e.createRenderPipeline({layout:r.pipelineLayout[1],vertex:{module:r.shaderModule[1],entryPoint:"VS",buffers:[]},fragment:{module:r.shaderModule[1],entryPoint:"FS_HDR2LDR",targets:[{format:t}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"always",format:"depth32float"}}),r.pipeline[5]=e.createRenderPipeline({layout:r.pipelineLayout[0],vertex:{module:r.shaderModule[2],entryPoint:"VS",buffers:[{arrayStride:12,attributes:[{format:"float32x3",offset:0,shaderLocation:0}]},{arrayStride:4,attributes:[{format:"unorm8x4",offset:0,shaderLocation:1}]}]},fragment:{module:r.shaderModule[2],entryPoint:"FS",targets:[{format:t}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"less",format:"depth32float"},primitive:{topology:"line-list"}}),r},pe=(e,t,r)=>{Se(e,t,r)},me=(e,t,r)=>{const o=t.createCommandEncoder();o.beginRenderPass({colorAttachments:[{view:r.getCurrentTexture().createView(),clearValue:{r:.2,g:.2,b:.2,a:1},loadOp:"clear",storeOp:"store"}]}).end(),t.queue.submit([o.finish()])},ge=(e,t,r,o,n,i)=>{we(e,t,o,i),_e(e,t,i);const s=Ge(e,t,n,i),c=t.createCommandEncoder();{const a=c.beginRenderPass({depthStencilAttachment:{view:e.gbuffer[0].createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"},colorAttachments:[{view:e.gbuffer[1].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"},{view:e.gbuffer[2].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"},{view:e.gbuffer[3].createView(),clearValue:{r:1,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});for(const p of s){a.setPipeline(e.pipeline[0]),a.setBindGroup(0,e.bindGroup[0]),a.setVertexBuffer(0,e.buffer[2],p.first*4);const l=n.gpu.mesh[p.id];if(l.vb0){const[d,f,u]=l.vb0;a.setVertexBuffer(1,n.gpu.buffer[d],f,u)}if(l.vb1){const[d,f,u]=l.vb1;a.setVertexBuffer(2,n.gpu.buffer[d],f,u)}if(l.ib){const[d,f,u]=l.ib;a.setIndexBuffer(n.gpu.buffer[d],"uint16",f,u)}a.drawIndexedIndirect(e.buffer[3],p.offset)}a.end()}{const a=c.beginRenderPass({colorAttachments:[{view:e.gbuffer[3].createView(),loadOp:"load",storeOp:"store"}]});a.setPipeline(e.pipeline[1]),a.setBindGroup(0,e.bindGroup[2]),a.draw(4),a.end()}{const a=c.beginRenderPass({depthStencilAttachment:{view:e.gbuffer[0].createView(),depthReadOnly:!0},colorAttachments:[{view:e.gbuffer[4].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});a.setPipeline(e.pipeline[2]),a.setBindGroup(0,e.bindGroup[1]),a.draw(4),a.setPipeline(e.pipeline[3]),a.draw(4),a.end()}{const a=c.beginRenderPass({depthStencilAttachment:{view:e.gbuffer[0].createView(),depthReadOnly:!0},colorAttachments:[{view:r.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});a.setPipeline(e.pipeline[4]),a.setBindGroup(0,e.bindGroup[3]),a.draw(4),i.lines.length>0&&(a.setPipeline(e.pipeline[5]),a.setBindGroup(0,e.bindGroup[0]),a.setVertexBuffer(0,e.buffer[4]),a.setVertexBuffer(1,e.buffer[5]),a.draw(i.lines.length)),a.end()}t.queue.submit([c.finish()])},O=`
struct ViewInput {
  viewProj : mat4x4<f32>,
  invViewProj : mat4x4<f32>,
  view : mat4x4<f32>,
  eyePosition : vec4<f32>,
  lightDir : vec4<f32>,
  lightColor : vec4<f32>,
  ambientColor0 : vec4<f32>,
  ambientColor1 : vec4<f32>,
}`,be=`
struct InstanceInput {
  world : mat4x4<f32>,
  factor0 : vec4<f32>,
  factor1 : vec4<f32>,
}`,C=O+be+`
@group(0) @binding(0) var<uniform> view : ViewInput;
@group(0) @binding(1) var<storage, read> inst : array<InstanceInput>;
`,he=O+`
@group(0) @binding(0) var<uniform> view : ViewInput;
@group(0) @binding(1) var zbuffer : texture_depth_2d;
@group(0) @binding(2) var gbuffer0 : texture_2d<f32>;
@group(0) @binding(3) var gbuffer1 : texture_2d<f32>;
@group(0) @binding(4) var gbuffer2 : texture_2d<f32>;
@group(0) @binding(5) var sampler0 : sampler;
`,ve=C+`
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
`,xe=he+`
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
`,ye=C+`
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
`,we=(e,t,r,o)=>{const n=o.camera,i=new Float32Array(68),s=r.width/r.height,c=v(n.fov),a=L(n.ha,n.va),p=n.eye,l=oe(p,a),f=ce(p,l,[0,1,0]),u=le(c,s,n.near,n.far),g=ae(f,u),h=se(g);i.set(g,0),i.set(h,16),i.set(f,32),i.set(p,48);const b=o.light,x=L(b.ha,b.va);i.set(x,52),i.set(b.color,56),i.set(b.ambient0,60),i.set(b.ambient1,64),t.queue.writeBuffer(e.buffer[0],0,i)},_e=(e,t,r)=>{if(r.lines.length<=0)return;const o=new Float32Array(r.lines.length*3),n=new Uint8Array(r.lines.length*4);for(let i=0;i<r.lines.length;++i){const s=r.lines[i];o[i*3+0]=s.pos[0],o[i*3+1]=s.pos[1],o[i*3+2]=s.pos[2],n[i*4+0]=s.color[0],n[i*4+1]=s.color[1],n[i*4+2]=s.color[2],n[i*4+3]=s.color[3]}t.queue.writeBuffer(e.buffer[4],0,o),t.queue.writeBuffer(e.buffer[5],0,n)},Ge=(e,t,r,o)=>{const n=[];n.length=r.gpu.mesh.length;for(let f=0;f<n.length;++f)n[f]=[];const i=new Float32Array(24),s=4*24;let c=0;for(const f of o.room)for(let u=0;u<f.indices.length;++u){const g=f.node[f.indices[u]];if(!g)continue;const h=$(u,f.divisor),b=Z(u,f.divisor),[x,P,V,D,I]=B(f.offset,h*f.unit,0,b*f.unit,0,0);for(const k of g.mesh){const y=f.mesh[k];if(!y)continue;const U=Re(r,y.name);if(U<0)continue;for(const J of r.gpu.id[U].mesh)n[J].push(c);const[H,W,X,q,Y]=B(y.offset,x,P,V,D,I),R=ue(q,Y);fe(R,H,W,X);const j=_(y.factor0,1,1,1,1),K=_(y.factor1,1,1,1,0);i.set(R,0),i.set(j,16),i.set(K,20),t.queue.writeBuffer(e.buffer[1],c*s,i),c+=1}}const a=[];let p=0,l=0;const d=new Uint32Array(5);for(let f=0;f<n.length;++f){if(n[f].length<=0)continue;const u=r.gpu.mesh[f],g=n[f].length;t.queue.writeBuffer(e.buffer[2],p*4,new Uint32Array(n[f])),d[0]=u.count,d[1]=g,d[2]=0,d[3]=0,d[4]=0,t.queue.writeBuffer(e.buffer[3],l,d),a.push({id:f,first:p,offset:l}),p+=g,l+=20}return a},Se=(e,t,r)=>{if(r.width!==r.clientWidth||r.height!==r.clientHeight){r.width=r.clientWidth,r.height=r.clientHeight;const o=i=>{e.gbuffer[i]!==void 0&&(e.gbuffer[i].destroy(),delete e.gbuffer[i])};o(0),o(1),o(2),o(3),o(4);const n=i=>{e.bindGroup[i]!==void 0&&delete e.bindGroup[i]};n(1),n(2),n(3)}e.gbuffer[0]===void 0&&(e.gbuffer[0]=t.createTexture({size:[r.width,r.height],format:"depth32float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[1]===void 0&&(e.gbuffer[1]=t.createTexture({size:[r.width,r.height],format:"rgb10a2unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[2]===void 0&&(e.gbuffer[2]=t.createTexture({size:[r.width,r.height],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[3]===void 0&&(e.gbuffer[3]=t.createTexture({size:[r.width,r.height],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[4]===void 0&&(e.gbuffer[4]=t.createTexture({size:[r.width,r.height],format:"rgba16float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.bindGroup[1]===void 0&&(e.bindGroup[1]=t.createBindGroup({layout:e.bindGroupLayout[1],entries:[{binding:0,resource:{buffer:e.buffer[0]}},{binding:1,resource:e.gbuffer[0].createView()},{binding:2,resource:e.gbuffer[1].createView()},{binding:3,resource:e.gbuffer[2].createView()},{binding:4,resource:e.gbuffer[3].createView()},{binding:5,resource:e.sampler[0]}]})),e.bindGroup[2]===void 0&&(e.bindGroup[2]=t.createBindGroup({layout:e.bindGroupLayout[1],entries:[{binding:0,resource:{buffer:e.buffer[0]}},{binding:1,resource:e.gbuffer[0].createView()},{binding:2,resource:e.gbuffer[1].createView()},{binding:3,resource:e.gbuffer[1].createView()},{binding:4,resource:e.gbuffer[1].createView()},{binding:5,resource:e.sampler[0]}]})),e.bindGroup[3]===void 0&&(e.bindGroup[3]=t.createBindGroup({layout:e.bindGroupLayout[1],entries:[{binding:0,resource:{buffer:e.buffer[0]}},{binding:1,resource:e.gbuffer[0].createView()},{binding:2,resource:e.gbuffer[4].createView()},{binding:3,resource:e.gbuffer[4].createView()},{binding:4,resource:e.gbuffer[4].createView()},{binding:5,resource:e.sampler[0]}]}))},Pe=()=>{const e={timer:{t:performance.now(),dt:0,n:0},gamepad:{index:null,lx:0,ly:0,rx:0,ry:0,b0:!1,b1:!1,b8:!1,b9:!1,lb:!1,rb:!1,lt:!1,rt:!1},keyboard:{w:!1,a:!1,s:!1,d:!1,up:!1,left:!1,down:!1,right:!1,q:!1,e:!1,z:!1,x:!1,space:!1,lctrl:!1,esc:!1},touch:new Map},t=(r,o,n)=>{switch(o){case"KeyW":r.w=n;break;case"KeyA":r.a=n;break;case"KeyS":r.s=n;break;case"KeyD":r.d=n;break;case"ArrowUp":r.up=n;break;case"ArrowLeft":r.left=n;break;case"ArrowDown":r.down=n;break;case"ArrowRight":r.right=n;break;case"KeyQ":r.q=n;break;case"KeyE":r.e=n;break;case"KeyZ":r.z=n;break;case"KeyX":r.x=n;break;case"Space":r.space=n;break;case"ControlLeft":r.lctrl=n;break;case"Escape":r.esc=n;break;default:return!1}return!0};return m(window,"focus",r=>{}),m(window,"blur",r=>{for(const o in e.keyboard)e.keyboard[o]=!1}),m(window,"resize",r=>{}),m(window,"gamepadconnected",r=>{e.gamepad.index=r.gamepad.index}),m(window,"gamepaddisconnected",r=>{e.gamepad.index===r.gamepad.index&&(e.gamepad.index=null)}),m(document,"keydown",r=>{t(e.keyboard,r.code,!0)&&r.preventDefault()}),m(document,"keyup",r=>{t(e.keyboard,r.code,!1)&&r.preventDefault()}),m(document.body,"contextmenu",r=>{r.preventDefault()}),m(document.body,"pointerdown",r=>{e.touch.set(r.pointerId,{x:r.clientX,y:r.clientY,sx:r.clientX,sy:r.clientY,time:performance.now()})}),m(document.body,"pointerup",r=>{e.touch.delete(r.pointerId)}),m(document.body,"pointerout",r=>{e.touch.delete(r.pointerId)}),m(document.body,"pointermove",r=>{const o=e.touch.get(r.pointerId);o&&(o.x=r.clientX,o.y=r.clientY)}),e},Ve=(e,t)=>{if(e.timer.dt=(t-e.timer.t)/1e3,e.timer.t=t,e.timer.n+=1,e.gamepad.index!==null){const o=navigator.getGamepads()[e.gamepad.index];e.gamepad.lx=Math.trunc(o.axes[0]*4)/4,e.gamepad.ly=Math.trunc(o.axes[1]*4)/4,e.gamepad.rx=Math.trunc(o.axes[2]*4)/4,e.gamepad.ry=Math.trunc(o.axes[3]*4)/4,e.gamepad.b0=o.buttons[0].value>=.5,e.gamepad.b1=o.buttons[1].value>=.5,e.gamepad.b8=o.buttons[8].value>=.5,e.gamepad.b9=o.buttons[9].value>=.5,e.gamepad.lb=o.buttons[4].value>=.5,e.gamepad.rb=o.buttons[5].value>=.5,e.gamepad.lt=o.buttons[6].value>=.5,e.gamepad.rt=o.buttons[7].value>=.5}},Ne=e=>e.timer.dt,G=(e,t,r,o)=>{if(o){for(const n of e.touch.values())if(te([n.sx,n.sy],...o)){const i=n.x-n.sx,s=-(n.y-n.sy);return w(i,s)}}if(t){if(t==="wasd"){const n=e.keyboard,i=n.a?-1:n.d?1:0,s=n.w?1:n.s?-1:0;if(i!==0||s!==0)return w(i,s)}else if(t==="arrow"){const n=e.keyboard,i=n.right?1:n.left?-1:0,s=n.up?1:n.down?-1:0;if(i!==0||s!==0)return w(i,s)}else if(e.keyboard[t])return[1,0]}if(r){if(r==="left-stick"){const n=e.gamepad;return w(n.lx,-n.ly)}else if(r==="right-stick"){const n=e.gamepad;return w(n.rx,-n.ry)}else if(e.gamepad[r])return[1,0]}return null},Me=e=>{const t={gpu:{},audio:{},json:{},loading:0};return fetch("app.json").then(o=>o.json()).then(o=>{o.gpu&&(o.gpu.buffer=o.gpu.buffer.map(n=>{const i=window.atob(o.embed[n.embed]),s=e.createBuffer({size:i.length,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.INDEX,mappedAtCreation:!0}),c=new DataView(s.getMappedRange());for(let a=0;a<i.length;++a)c.setUint8(a,i.charCodeAt(a));return s.unmap(),s}),t.gpu=o.gpu),o.audio&&(t.audio=o.audio),o.json&&(t.json=o.json),t.loading-=1}),t.loading+=1,t},Ue=e=>e.loading>0,Re=(e,t)=>{for(let r=0;r<e.gpu.id.length;++r)if(e.gpu.id[r].name===t)return r;return-1},z=(e,t)=>e.json[t],Ee=()=>{const e={};return Te(e),e},Te=e=>{e.camera={eye:[0,0,0],ha:0,va:0,fov:30,near:.1,far:1e3},e.light={ha:0,va:0,color:[0,0,0,0],ambient0:[0,0,0,0],ambient1:[0,0,0,0]},e.room=[],e.celeste=[],e.mob=[],e.lines=[]},M=(e,t,r)=>{Le(e,r),ze(e,r),Be(e,t,r),Ae(e,r)},Le=(e,t)=>{t.camera&&Object.assign(e.camera,t.camera)},ze=(e,t)=>{t.light&&(t.light.ha!==void 0&&(e.light.ha=t.light.ha),t.light.va!==void 0&&(e.light.va=t.light.va),e.light.color=_(t.light.color,0,0,0,0),e.light.ambient0=_(t.light.ambient0,0,0,0,0),e.light.ambient1=_(t.light.ambient1,0,0,0,0))},Be=(e,t,r)=>{r.room&&(e.room=r.room)},Ae=(e,t)=>{if(t.lines)for(const r of t.lines)e.lines.push({pos:r.from,color:r.color}),e.lines.push({pos:r.to,color:r.color})},B=(e,t,r,o,n,i)=>(e&&(t+=e.x||0,r+=e.y||0,o+=e.z||0,n+=e.ha||0,i+=e.va||0),[t,r,o,n,i]),_=(e,t,r,o,n)=>(e&&(e.r!==void 0&&(t=e.r),e.g!==void 0&&(r=e.g),e.r!==void 0&&(o=e.b),e.a!==void 0&&(n=e.a)),[t,r,o,n]),Fe=async(e,t)=>{if(!navigator.gpu){F("ERROR: WebGPU not supported.");return}const o=await(await navigator.gpu.requestAdapter()).requestDevice(),n=navigator.gpu.getPreferredCanvasFormat(),i=N(),s=i.getContext("webgpu");s.configure({device:o,format:n,alphaMode:"opaque"});const c=de(o,n),a=Pe(),p=Me(o),l=Ee(),d=f=>{Ve(a,f),pe(c,o,i),Ue(p)?me(c,o,s):(e&&(e(p,l),e=null),t&&t(p,l,a),ge(c,o,s,i,p,l)),requestAnimationFrame(d)};requestAnimationFrame(d)},Oe=(e,t)=>{Q(),M(t,e,z(e,"sample")),M(t,e,z(e,"room000")),De(t,e)},Ce=(e,t,r)=>{const o=t.camera,n=[0,N().clientWidth,0,N().clientHeight],i=Ne(r),s=G(r,"wasd","left-stick"),c=G(r,"arrow","right-stick",n);if(c){const f=-c[0],u=c[1];o.ha+=90*i*f,o.va+=90*i*u,o.va=Math.max(-60,Math.min(o.va,80))}if(s){const f=v(o.ha+90),u=v(o.ha),g=-s[0],h=s[1],b=g*Math.cos(f)+h*Math.cos(u),x=g*Math.sin(f)+h*Math.sin(u),P=2*i*b,V=2*i*x;o.eye[0]+=P,o.eye[2]+=V}G(r,"q","lb")&&(o.eye[1]-=.75*i),G(r,"e","rb")&&(o.eye[1]+=.75*i);const l=t.light;l.ha+=45*i};m(window,"load",()=>{F("Welcome Basilico."),Fe(Oe,Ce)});const De=(e,t)=>{const r=[];r.push({from:[-50,0,0],to:[50,0,0],color:[255,0,0,255]}),r.push({from:[0,0,-50],to:[0,0,50],color:[0,0,255,255]}),M(e,t,{lines:r})};})();
