(()=>{const p=(e,t,r)=>{e.addEventListener(t,r)},E=()=>document.getElementById("canvas"),O=()=>document.getElementById("message"),I=e=>{const t=O();t.style.display="",t.textContent=e},W=()=>{const e=O();e.style.display="none"};const k=(e,t)=>Math.floor(e/t),X=(e,t)=>(e%t+t)%t,x=e=>e/180*Math.PI,H=(e,t)=>Math.sqrt(e*e+t*t),G=(e,t)=>{const r=H(e,t);return r!=0?[e/r,t/r]:[0,0]};const q=([e,t],r,n,o,i)=>r<=e&&e<=n&&o<=t&&t<=i;const U=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],Y=e=>{const t=U(e,e);return Math.sqrt(t)},j=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],K=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]];const z=e=>{const t=Y(e);return[e[0]/t,e[1]/t,e[2]/t]},F=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],R=(e,t)=>{const r=x(e),n=x(t);return[Math.cos(n)*Math.cos(r),Math.sin(n),Math.cos(n)*Math.sin(r)]},J=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],Q=(e,t)=>[e[0]*t[0]+e[1]*t[4]+e[2]*t[8]+e[3]*t[12],e[0]*t[1]+e[1]*t[5]+e[2]*t[9]+e[3]*t[13],e[0]*t[2]+e[1]*t[6]+e[2]*t[10]+e[3]*t[14],e[0]*t[3]+e[1]*t[7]+e[2]*t[11]+e[3]*t[15],e[4]*t[0]+e[5]*t[4]+e[6]*t[8]+e[7]*t[12],e[4]*t[1]+e[5]*t[5]+e[6]*t[9]+e[7]*t[13],e[4]*t[2]+e[5]*t[6]+e[6]*t[10]+e[7]*t[14],e[4]*t[3]+e[5]*t[7]+e[6]*t[11]+e[7]*t[15],e[8]*t[0]+e[9]*t[4]+e[10]*t[8]+e[11]*t[12],e[8]*t[1]+e[9]*t[5]+e[10]*t[9]+e[11]*t[13],e[8]*t[2]+e[9]*t[6]+e[10]*t[10]+e[11]*t[14],e[8]*t[3]+e[9]*t[7]+e[10]*t[11]+e[11]*t[15],e[12]*t[0]+e[13]*t[4]+e[14]*t[8]+e[15]*t[12],e[12]*t[1]+e[13]*t[5]+e[14]*t[9]+e[15]*t[13],e[12]*t[2]+e[13]*t[6]+e[14]*t[10]+e[15]*t[14],e[12]*t[3]+e[13]*t[7]+e[14]*t[11]+e[15]*t[15]],Z=e=>{const t=e[0]*e[5]-e[1]*e[4],r=e[0]*e[6]-e[2]*e[4],n=e[0]*e[7]-e[3]*e[4],o=e[1]*e[6]-e[2]*e[5],i=e[1]*e[7]-e[3]*e[5],u=e[2]*e[7]-e[3]*e[6],l=e[8]*e[13]-e[9]*e[12],a=e[8]*e[14]-e[10]*e[12],g=e[8]*e[15]-e[11]*e[12],d=e[9]*e[14]-e[10]*e[13],m=e[9]*e[15]-e[11]*e[13],s=e[10]*e[15]-e[11]*e[14];let f=t*s-r*m+n*d+o*g-i*a+u*l;return f?(f=1/f,[(e[5]*s-e[6]*m+e[7]*d)*f,(e[2]*m-e[1]*s-e[3]*d)*f,(e[13]*u-e[14]*i+e[15]*o)*f,(e[10]*i-e[9]*u-e[11]*o)*f,(e[6]*g-e[4]*s-e[7]*a)*f,(e[0]*s-e[2]*g+e[3]*a)*f,(e[14]*n-e[12]*u-e[15]*r)*f,(e[8]*u-e[10]*n+e[11]*r)*f,(e[4]*m-e[5]*g+e[7]*l)*f,(e[1]*g-e[0]*m-e[3]*l)*f,(e[12]*i-e[13]*n+e[15]*t)*f,(e[9]*n-e[8]*i-e[11]*t)*f,(e[5]*a-e[4]*d-e[6]*l)*f,(e[0]*d-e[1]*a+e[2]*l)*f,(e[13]*r-e[12]*o-e[14]*t)*f,(e[8]*o-e[9]*r+e[10]*t)*f]):J()};const $=(e,t,r,n)=>{e[12]=t,e[13]=r,e[14]=n},ee=(e,t)=>{const r=x(e),n=Math.sin(r),o=Math.cos(r);return[o,0,n,0,0,1,0,0,-n,0,o,0,0,0,0,1]};const te=(e,t,r)=>{const n=z(K(t,e)),o=z(F(r,n)),i=F(n,o),u=U(e,o),l=U(e,i),a=U(e,n);return[o[0],i[0],n[0],0,o[1],i[1],n[1],0,o[2],i[2],n[2],0,-u,-l,-a,1]},re=(e,t,r,n)=>{const o=1/Math.tan(e),i=o/t,u=n/(n-r),l=-(u*r);return[i,0,0,0,0,o,0,0,0,0,u,1,0,0,l,0]};const ne=(e,t)=>{const r={bindGroupLayout:[],pipelineLayout:[],shaderModule:[],pipeline:[],buffer:[],sampler:[],bindGroup:[],gbuffer:[]},n=`
  struct ViewInput {
    viewProj : mat4x4<f32>,
    invViewProj : mat4x4<f32>,
    eyePosition : vec4<f32>,
    lightDir : vec4<f32>,
    lightColor : vec4<f32>,
    ambientColor0 : vec4<f32>,
    ambientColor1 : vec4<f32>,
  }`;r.buffer[0]=e.createBuffer({size:256,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const o=`
  struct InstanceInput {
    world : mat4x4<f32>,
    factor0 : vec4<f32>,
    factor1 : vec4<f32>,
  }`;return r.buffer[1]=e.createBuffer({size:196608,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),r.buffer[2]=e.createBuffer({size:65536,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),r.buffer[3]=e.createBuffer({size:40960,usage:GPUBufferUsage.INDIRECT|GPUBufferUsage.COPY_DST}),r.buffer[4]=e.createBuffer({size:49152,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),r.buffer[5]=e.createBuffer({size:16384,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),r.sampler[0]=e.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),r.shaderModule[0]=e.createShaderModule({code:n+o+`
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
    `}),r.shaderModule[1]=e.createShaderModule({code:`
    @vertex
    fn mainVertex(@builtin(vertex_index) id : u32) -> @builtin(position) vec4<f32> {
      return vec4(2.0f * f32((1 & id) << 1) - 1.0f, -2.0f * f32(2 & id) + 1.0f, 1.0, 1.0);
    }
    `}),r.shaderModule[2]=e.createShaderModule({code:n+`
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
    `}),r.shaderModule[3]=e.createShaderModule({code:n+`
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
    `}),r.shaderModule[4]=e.createShaderModule({code:`
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
    `}),r.shaderModule[5]=e.createShaderModule({code:n+`
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
    `}),r.bindGroupLayout[0]=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}}]}),r.bindGroupLayout[1]=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"depth"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]}),r.bindGroup[0]=e.createBindGroup({layout:r.bindGroupLayout[0],entries:[{binding:0,resource:{buffer:r.buffer[0]}},{binding:1,resource:{buffer:r.buffer[1]}}]}),r.pipelineLayout[0]=e.createPipelineLayout({bindGroupLayouts:[r.bindGroupLayout[0]]}),r.pipelineLayout[1]=e.createPipelineLayout({bindGroupLayouts:[r.bindGroupLayout[1]]}),r.pipeline[0]=e.createRenderPipeline({layout:r.pipelineLayout[0],vertex:{module:r.shaderModule[0],entryPoint:"mainVertex",buffers:[{arrayStride:4,attributes:[{format:"uint32",offset:0,shaderLocation:0}],stepMode:"instance"},{arrayStride:12,attributes:[{format:"float32x3",offset:0,shaderLocation:1}]},{arrayStride:12,attributes:[{format:"float32x3",offset:0,shaderLocation:2}]}]},fragment:{module:r.shaderModule[0],entryPoint:"mainFragment",targets:[{format:"rgb10a2unorm"},{format:"rgba8unorm"},{format:"rgba8unorm"}]},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"},primitive:{cullMode:"back",frontFace:"cw"}}),r.pipeline[1]=e.createRenderPipeline({layout:r.pipelineLayout[1],vertex:{module:r.shaderModule[1],entryPoint:"mainVertex",buffers:[]},fragment:{module:r.shaderModule[2],entryPoint:"mainFragment",targets:[{format:"rgba16float"}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"not-equal",format:"depth24plus"}}),r.pipeline[2]=e.createRenderPipeline({layout:r.pipelineLayout[1],vertex:{module:r.shaderModule[1],entryPoint:"mainVertex",buffers:[]},fragment:{module:r.shaderModule[3],entryPoint:"mainFragment",targets:[{format:"rgba16float"}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"equal",format:"depth24plus"}}),r.pipeline[3]=e.createRenderPipeline({layout:r.pipelineLayout[1],vertex:{module:r.shaderModule[1],entryPoint:"mainVertex",buffers:[]},fragment:{module:r.shaderModule[4],entryPoint:"mainFragment",targets:[{format:t}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"always",format:"depth24plus"}}),r.pipeline[4]=e.createRenderPipeline({layout:r.pipelineLayout[0],vertex:{module:r.shaderModule[5],entryPoint:"mainVertex",buffers:[{arrayStride:12,attributes:[{format:"float32x3",offset:0,shaderLocation:0}]},{arrayStride:4,attributes:[{format:"unorm8x4",offset:0,shaderLocation:1}]}]},fragment:{module:r.shaderModule[5],entryPoint:"mainFragment",targets:[{format:t}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"less",format:"depth24plus"},primitive:{topology:"line-list"}}),r},oe=(e,t,r)=>{le(e,t,r)},ie=(e,t,r)=>{const n=t.createCommandEncoder();n.beginRenderPass({colorAttachments:[{view:r.getCurrentTexture().createView(),clearValue:{r:.2,g:.2,b:.2,a:1},loadOp:"clear",storeOp:"store"}]}).end(),t.queue.submit([n.finish()])},ae=(e,t,r,n,o,i)=>{se(e,t,n,i),ue(e,t,i);const u=fe(e,t,o,i),l=t.createCommandEncoder();{const a=l.beginRenderPass({depthStencilAttachment:{view:e.gbuffer[0].createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"},colorAttachments:[{view:e.gbuffer[1].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"},{view:e.gbuffer[2].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"},{view:e.gbuffer[3].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});for(const g of u){a.setPipeline(e.pipeline[0]),a.setBindGroup(0,e.bindGroup[0]),a.setVertexBuffer(0,e.buffer[2],g.first*4);const d=o.gpu.mesh[g.id];if(d.vb0){const[m,s,f]=d.vb0;a.setVertexBuffer(1,o.gpu.buffer[m],s,f)}if(d.vb1){const[m,s,f]=d.vb1;a.setVertexBuffer(2,o.gpu.buffer[m],s,f)}if(d.ib){const[m,s,f]=d.ib;a.setIndexBuffer(o.gpu.buffer[m],"uint16",s,f)}a.drawIndexedIndirect(e.buffer[3],g.offset)}a.end()}{const a=l.beginRenderPass({depthStencilAttachment:{view:e.gbuffer[0].createView(),depthReadOnly:!0},colorAttachments:[{view:e.gbuffer[4].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});a.setPipeline(e.pipeline[1]),a.setBindGroup(0,e.bindGroup[1]),a.draw(4),a.setPipeline(e.pipeline[2]),a.draw(4),a.end()}{const a=l.beginRenderPass({depthStencilAttachment:{view:e.gbuffer[0].createView(),depthReadOnly:!0},colorAttachments:[{view:r.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});a.setPipeline(e.pipeline[3]),a.setBindGroup(0,e.bindGroup[2]),a.draw(4),i.lines.length>0&&(a.setPipeline(e.pipeline[4]),a.setBindGroup(0,e.bindGroup[0]),a.setVertexBuffer(0,e.buffer[4]),a.setVertexBuffer(1,e.buffer[5]),a.draw(i.lines.length)),a.end()}t.queue.submit([l.finish()])},se=(e,t,r,n)=>{const o=n.camera,i=new Float32Array(52),u=r.width/r.height,l=x(o.fov),a=R(o.ha,o.va),g=o.eye,d=j(g,a),s=te(g,d,[0,1,0]),f=re(l,u,o.near,o.far),b=Q(s,f),v=Z(b);i.set(b,0),i.set(v,16),i.set(g,32);const h=n.light,y=R(h.ha,h.va);i.set(y,36),i.set(h.color,40),i.set(h.ambient0,44),i.set(h.ambient1,48),t.queue.writeBuffer(e.buffer[0],0,i)},ue=(e,t,r)=>{if(r.lines.length<=0)return;const n=new Float32Array(r.lines.length*3),o=new Uint8Array(r.lines.length*4);for(let i=0;i<r.lines.length;++i){const u=r.lines[i];n[i*3+0]=u.pos[0],n[i*3+1]=u.pos[1],n[i*3+2]=u.pos[2],o[i*4+0]=u.color[0],o[i*4+1]=u.color[1],o[i*4+2]=u.color[2],o[i*4+3]=u.color[3]}t.queue.writeBuffer(e.buffer[4],0,n),t.queue.writeBuffer(e.buffer[5],0,o)},fe=(e,t,r,n)=>{const o=[];o.length=r.gpu.mesh.length;for(let s=0;s<o.length;++s)o[s]=[];const i=new Float32Array(24),u=4*24;let l=0;for(const s of n.room)for(let f=0;f<s.indices.length;++f){const b=s.node[s.indices[f]];if(!b)continue;const v=X(f,s.divisor),h=k(f,s.divisor);for(const y of b.mesh){const c=s.mesh[y];if(!c)continue;const P=be(r,c.name);if(P<0)continue;for(const D of r.gpu.id[P].mesh)o[D].push(l);let M=v*s.unit,S=0,T=h*s.unit,C=0,L=0;s.transform&&(M+=s.transform.x||0,S+=s.transform.y||0,T+=s.transform.z||0),c.transform&&(M+=c.transform.x||0,S+=c.transform.y||0,T+=c.transform.z||0,C=c.transform.ha||0,L=c.transform.va||0);const B=ee(C,L);$(B,M,S,T);const w=[1,1,1,1];c.albedo&&(w[0]=c.albedo.r!==void 0?c.albedo.r:1,w[1]=c.albedo.g!==void 0?c.albedo.g:1,w[2]=c.albedo.b!==void 0?c.albedo.b:1,w[3]=c.albedo.a!==void 0?c.albedo.a:1);const _=[1,.5,.5,0];c.occlusion!==void 0&&(_[0]=c.occlusion),c.metallic!==void 0&&(_[1]=c.metallic),c.roughness!==void 0&&(_[2]=c.roughness),c.emission!==void 0&&(_[3]=c.emission),i.set(B,0),i.set(w,16),i.set(_,20),t.queue.writeBuffer(e.buffer[1],l*u,i),l+=1}}const a=[];let g=0,d=0;const m=new Uint32Array(5);for(let s=0;s<o.length;++s){if(o[s].length<=0)continue;const f=r.gpu.mesh[s],b=o[s].length;t.queue.writeBuffer(e.buffer[2],g*4,new Uint32Array(o[s])),m[0]=f.count,m[1]=b,m[2]=0,m[3]=0,m[4]=0,t.queue.writeBuffer(e.buffer[3],d,m),a.push({id:s,first:g,offset:d}),g+=b,d+=20}return a},le=(e,t,r)=>{if(r.width!==r.clientWidth||r.height!==r.clientHeight){r.width=r.clientWidth,r.height=r.clientHeight;const n=i=>{e.gbuffer[i]!==void 0&&(e.gbuffer[i].destroy(),delete e.gbuffer[i])};n(0),n(1),n(2),n(3),n(4);const o=i=>{e.bindGroup[i]!==void 0&&delete e.bindGroup[i]};o(1),o(2)}e.gbuffer[0]===void 0&&(e.gbuffer[0]=t.createTexture({size:[r.width,r.height],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[1]===void 0&&(e.gbuffer[1]=t.createTexture({size:[r.width,r.height],format:"rgb10a2unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[2]===void 0&&(e.gbuffer[2]=t.createTexture({size:[r.width,r.height],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[3]===void 0&&(e.gbuffer[3]=t.createTexture({size:[r.width,r.height],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.gbuffer[4]===void 0&&(e.gbuffer[4]=t.createTexture({size:[r.width,r.height],format:"rgba16float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),e.bindGroup[1]===void 0&&(e.bindGroup[1]=t.createBindGroup({layout:e.bindGroupLayout[1],entries:[{binding:0,resource:{buffer:e.buffer[0]}},{binding:1,resource:e.gbuffer[0].createView()},{binding:2,resource:e.gbuffer[1].createView()},{binding:3,resource:e.gbuffer[2].createView()},{binding:4,resource:e.gbuffer[3].createView()},{binding:5,resource:e.sampler[0]}]})),e.bindGroup[2]===void 0&&(e.bindGroup[2]=t.createBindGroup({layout:e.bindGroupLayout[1],entries:[{binding:0,resource:{buffer:e.buffer[0]}},{binding:1,resource:e.gbuffer[0].createView()},{binding:2,resource:e.gbuffer[4].createView()},{binding:3,resource:e.gbuffer[4].createView()},{binding:4,resource:e.gbuffer[4].createView()},{binding:5,resource:e.sampler[0]}]}))},ce=()=>{const e={timer:{t:performance.now(),dt:0,n:0},gamepad:{index:null,lx:0,ly:0,rx:0,ry:0,b0:!1,b1:!1,b8:!1,b9:!1,lb:!1,rb:!1,lt:!1,rt:!1},keyboard:{w:!1,a:!1,s:!1,d:!1,up:!1,left:!1,down:!1,right:!1,q:!1,e:!1,z:!1,x:!1,space:!1,lctrl:!1,esc:!1},touch:new Map},t=(r,n,o)=>{switch(n){case"KeyW":r.w=o;break;case"KeyA":r.a=o;break;case"KeyS":r.s=o;break;case"KeyD":r.d=o;break;case"ArrowUp":r.up=o;break;case"ArrowLeft":r.left=o;break;case"ArrowDown":r.down=o;break;case"ArrowRight":r.right=o;break;case"KeyQ":r.q=o;break;case"KeyE":r.e=o;break;case"KeyZ":r.z=o;break;case"KeyX":r.x=o;break;case"Space":r.space=o;break;case"ControlLeft":r.lctrl=o;break;case"Escape":r.esc=o;break;default:return!1}return!0};return p(window,"focus",r=>{}),p(window,"blur",r=>{}),p(window,"resize",r=>{}),p(window,"gamepadconnected",r=>{e.gamepad.index=r.gamepad.index}),p(window,"gamepaddisconnected",r=>{e.gamepad.index===r.gamepad.index&&(e.gamepad.index=null)}),p(document,"keydown",r=>{t(e.keyboard,r.code,!0)&&r.preventDefault()}),p(document,"keyup",r=>{t(e.keyboard,r.code,!1)&&r.preventDefault()}),p(document.body,"contextmenu",r=>{r.preventDefault()}),p(document.body,"pointerdown",r=>{e.touch.set(r.pointerId,{x:r.clientX,y:r.clientY,sx:r.clientX,sy:r.clientY,time:performance.now()})}),p(document.body,"pointerup",r=>{e.touch.delete(r.pointerId)}),p(document.body,"pointerout",r=>{e.touch.delete(r.pointerId)}),p(document.body,"pointermove",r=>{const n=e.touch.get(r.pointerId);n&&(n.x=r.clientX,n.y=r.clientY)}),e},de=(e,t)=>{if(e.timer.dt=(t-e.timer.t)/1e3,e.timer.t=t,e.timer.n+=1,e.gamepad.index!==null){const n=navigator.getGamepads()[e.gamepad.index];e.gamepad.lx=Math.trunc(n.axes[0]*4)/4,e.gamepad.ly=Math.trunc(n.axes[1]*4)/4,e.gamepad.rx=Math.trunc(n.axes[2]*4)/4,e.gamepad.ry=Math.trunc(n.axes[3]*4)/4,e.gamepad.b0=n.buttons[0].value>=.5,e.gamepad.b1=n.buttons[1].value>=.5,e.gamepad.b8=n.buttons[8].value>=.5,e.gamepad.b9=n.buttons[9].value>=.5,e.gamepad.lb=n.buttons[4].value>=.5,e.gamepad.rb=n.buttons[5].value>=.5,e.gamepad.lt=n.buttons[6].value>=.5,e.gamepad.rt=n.buttons[7].value>=.5}},me=e=>e.timer.dt,V=(e,t,r,n)=>{if(n){for(const o of e.touch.values())if(q([o.sx,o.sy],...n)){const i=o.x-o.sx,u=-(o.y-o.sy);return G(i,u)}}if(t){if(t==="wasd"){const o=e.keyboard,i=o.a?-1:o.d?1:0,u=o.w?1:o.s?-1:0;if(i!==0||u!==0)return G(i,u)}else if(t==="arrow"){const o=e.keyboard,i=o.right?1:o.left?-1:0,u=o.up?1:o.down?-1:0;if(i!==0||u!==0)return G(i,u)}else if(e.keyboard[t])return[1,0]}if(r){if(r==="left-stick"){const o=e.gamepad;return G(o.lx,-o.ly)}else if(r==="right-stick"){const o=e.gamepad;return G(o.rx,-o.ry)}else if(e.gamepad[r])return[1,0]}return null},ge=e=>{const t={gpu:{},audio:{},json:{},loading:0};return fetch("app.json").then(n=>n.json()).then(n=>{n.gpu&&(n.gpu.buffer=n.gpu.buffer.map(o=>{const i=window.atob(n.embed[o.embed]),u=e.createBuffer({size:i.length,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.INDEX,mappedAtCreation:!0}),l=new DataView(u.getMappedRange());for(let a=0;a<i.length;++a)l.setUint8(a,i.charCodeAt(a));return u.unmap(),u}),t.gpu=n.gpu),n.audio&&(t.audio=n.audio),n.json&&(t.json=n.json),t.loading-=1}),t.loading+=1,t},pe=e=>e.loading>0,be=(e,t)=>{for(let r=0;r<e.gpu.id.length;++r)if(e.gpu.id[r].name===t)return r;return-1},A=(e,t)=>e.json[t],he=()=>{const e={};return ve(e),e},ve=e=>{e.camera={eye:[0,0,0],ha:0,va:0,fov:30,near:.1,far:1e3},e.light={ha:0,va:0,color:[0,0,0,0],ambient0:[0,0,0,0],ambient1:[0,0,0,0]},e.room=[],e.celeste=[],e.mob=[],e.lines=[]},N=(e,t,r)=>{xe(e,r),ye(e,r),we(e,t,r),_e(e,r)},xe=(e,t)=>{t.camera&&Object.assign(e.camera,t.camera)},ye=(e,t)=>{t.light&&(t.light.ha!==void 0&&(e.light.ha=t.light.ha),t.light.va!==void 0&&(e.light.va=t.light.va),t.light.color&&(e.light.color[0]=t.light.color.r!==void 0?t.light.color.r:0,e.light.color[1]=t.light.color.g!==void 0?t.light.color.g:0,e.light.color[2]=t.light.color.b!==void 0?t.light.color.b:0,e.light.color[3]=t.light.color.a!==void 0?t.light.color.a:0),t.light.ambient0&&(e.light.ambient0[0]=t.light.ambient0.r!==void 0?t.light.ambient0.r:0,e.light.ambient0[1]=t.light.ambient0.g!==void 0?t.light.ambient0.g:0,e.light.ambient0[2]=t.light.ambient0.b!==void 0?t.light.ambient0.b:0,e.light.ambient0[3]=t.light.ambient0.a!==void 0?t.light.ambient0.a:0),t.light.ambient1&&(e.light.ambient1[0]=t.light.ambient1.r!==void 0?t.light.ambient1.r:0,e.light.ambient1[1]=t.light.ambient1.g!==void 0?t.light.ambient1.g:0,e.light.ambient1[2]=t.light.ambient1.b!==void 0?t.light.ambient1.b:0,e.light.ambient1[3]=t.light.ambient1.a!==void 0?t.light.ambient1.a:0))},we=(e,t,r)=>{r.room&&(e.room=r.room)},_e=(e,t)=>{if(t.lines)for(const r of t.lines)e.lines.push({pos:r.from,color:r.color}),e.lines.push({pos:r.to,color:r.color})},Ge=async(e,t)=>{if(!navigator.gpu){I("ERROR: WebGPU not supported.");return}const n=await(await navigator.gpu.requestAdapter()).requestDevice(),o=navigator.gpu.getPreferredCanvasFormat(),i=E(),u=i.getContext("webgpu");u.configure({device:n,format:o,alphaMode:"opaque"});const l=ne(n,o),a=ce(),g=ge(n),d=he(),m=s=>{de(a,s),oe(l,n,i),pe(g)?ie(l,n,u):(e&&(e(g,d),e=null),t&&t(g,d,a),ae(l,n,u,i,g,d)),requestAnimationFrame(m)};requestAnimationFrame(m)},Pe=(e,t)=>{W(),N(t,e,A(e,"sample")),N(t,e,A(e,"room000")),Ue(t,e)},Ve=(e,t,r)=>{const n=t.camera,o=[0,E().clientWidth,0,E().clientHeight],i=me(r),u=V(r,"wasd","left-stick"),l=V(r,"arrow","right-stick",o);if(l){const s=-l[0],f=l[1];n.ha+=90*i*s,n.va+=90*i*f,n.va=Math.max(-60,Math.min(n.va,80))}if(u){const s=x(n.ha+90),f=x(n.ha),b=-u[0],v=u[1],h=b*Math.cos(s)+v*Math.cos(f),y=b*Math.sin(s)+v*Math.sin(f),c=2*i*h,P=2*i*y;n.eye[0]+=c,n.eye[2]+=P}V(r,"q","lb")&&(n.eye[1]-=.75*i),V(r,"e","rb")&&(n.eye[1]+=.75*i);const d=t.light;d.ha+=45*i};p(window,"load",()=>{I("Welcome Basilico."),Ge(Pe,Ve)});const Ue=(e,t)=>{const r=[];r.push({from:[-50,0,0],to:[50,0,0],color:[255,0,0,255]}),r.push({from:[0,0,-50],to:[0,0,50],color:[0,0,255,255]}),N(e,t,{lines:r})};})();
