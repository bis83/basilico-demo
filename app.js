(()=>{const V=t=>{const e=window.atob(t),n=new ArrayBuffer(e.length),o=new DataView(n);for(let r=0;r<e.length;++r)o.setUint8(r,e.charCodeAt(r));return n};const S=t=>t/180*Math.PI,st=(t,e)=>Math.sqrt(t*t+e*e),D=(t,e)=>{const n=st(t,e);return n!=0?[t/n,e/n]:[0,0]},ht=([t,e],n)=>[t*n,e*n],mt=([t,e],n,o,r,c)=>n<=t&&t<=o&&r<=e&&e<=c,I=([t,e],n,[o,r])=>{const[c,i]=[o-t,r-e],l=st(c,i);if(n<=l)return[t,e];const[f,E]=D(c,i),[x,A]=ht([f,E],l-n);return[t+x,e+A]},b=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],Et=t=>{const e=b(t,t);return Math.sqrt(e)},xt=(t,e)=>[t[0]+e[0],t[1]+e[1],t[2]+e[2]],At=(t,e)=>[t[0]-e[0],t[1]-e[1],t[2]-e[2]];const K=t=>{const e=Et(t);return[t[0]/e,t[1]/e,t[2]/e]},z=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],wt=(t,e)=>{const n=S(t),o=S(e);return[Math.cos(o)*Math.cos(n),Math.cos(o)*Math.sin(n),Math.sin(o)]},B=(t,e,n)=>[t*2,e*2,n*.5],gt=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],vt=(t,e)=>[t[0]*e[0]+t[1]*e[4]+t[2]*e[8]+t[3]*e[12],t[0]*e[1]+t[1]*e[5]+t[2]*e[9]+t[3]*e[13],t[0]*e[2]+t[1]*e[6]+t[2]*e[10]+t[3]*e[14],t[0]*e[3]+t[1]*e[7]+t[2]*e[11]+t[3]*e[15],t[4]*e[0]+t[5]*e[4]+t[6]*e[8]+t[7]*e[12],t[4]*e[1]+t[5]*e[5]+t[6]*e[9]+t[7]*e[13],t[4]*e[2]+t[5]*e[6]+t[6]*e[10]+t[7]*e[14],t[4]*e[3]+t[5]*e[7]+t[6]*e[11]+t[7]*e[15],t[8]*e[0]+t[9]*e[4]+t[10]*e[8]+t[11]*e[12],t[8]*e[1]+t[9]*e[5]+t[10]*e[9]+t[11]*e[13],t[8]*e[2]+t[9]*e[6]+t[10]*e[10]+t[11]*e[14],t[8]*e[3]+t[9]*e[7]+t[10]*e[11]+t[11]*e[15],t[12]*e[0]+t[13]*e[4]+t[14]*e[8]+t[15]*e[12],t[12]*e[1]+t[13]*e[5]+t[14]*e[9]+t[15]*e[13],t[12]*e[2]+t[13]*e[6]+t[14]*e[10]+t[15]*e[14],t[12]*e[3]+t[13]*e[7]+t[14]*e[11]+t[15]*e[15]],Tt=t=>{const e=t[0]*t[5]-t[1]*t[4],n=t[0]*t[6]-t[2]*t[4],o=t[0]*t[7]-t[3]*t[4],r=t[1]*t[6]-t[2]*t[5],c=t[1]*t[7]-t[3]*t[5],i=t[2]*t[7]-t[3]*t[6],l=t[8]*t[13]-t[9]*t[12],f=t[8]*t[14]-t[10]*t[12],E=t[8]*t[15]-t[11]*t[12],x=t[9]*t[14]-t[10]*t[13],A=t[9]*t[15]-t[11]*t[13],y=t[10]*t[15]-t[11]*t[14];let h=e*y-n*A+o*x+r*E-c*f+i*l;return h?(h=1/h,[(t[5]*y-t[6]*A+t[7]*x)*h,(t[2]*A-t[1]*y-t[3]*x)*h,(t[13]*i-t[14]*c+t[15]*r)*h,(t[10]*c-t[9]*i-t[11]*r)*h,(t[6]*E-t[4]*y-t[7]*f)*h,(t[0]*y-t[2]*E+t[3]*f)*h,(t[14]*o-t[12]*i-t[15]*n)*h,(t[8]*i-t[10]*o+t[11]*n)*h,(t[4]*A-t[5]*E+t[7]*l)*h,(t[1]*E-t[0]*A-t[3]*l)*h,(t[12]*c-t[13]*o+t[15]*e)*h,(t[9]*o-t[8]*c-t[11]*e)*h,(t[5]*f-t[4]*x-t[6]*l)*h,(t[0]*x-t[1]*f+t[2]*l)*h,(t[13]*n-t[12]*r-t[14]*e)*h,(t[8]*r-t[9]*n+t[10]*e)*h]):gt()},X=(t,e,n)=>[1,0,0,0,0,1,0,0,0,0,1,0,t,e,n,1],pt=(t,e,n,o)=>{t[12]=e,t[13]=n,t[14]=o},yt=(t,e,n)=>[t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1],Dt=(t,e,n)=>{const o=K(At(e,t)),r=K(z(n,o)),c=z(o,r),i=b(t,r),l=b(t,c),f=b(t,o);return[r[0],c[0],o[0],0,r[1],c[1],o[1],0,r[2],c[2],o[2],0,-i,-l,-f,1]},Mt=(t,e,n,o)=>{const r=1/Math.tan(t),c=r/e,i=o/(o-n),l=-(i*n);return[c,0,0,0,0,r,0,0,0,0,i,1,0,0,l,0]},Rt=(t,e,n,o)=>{const r=2/t,c=2/e,i=1/(o-n),l=n/(n-o);return[r,0,0,0,0,c,0,0,0,0,i,0,0,0,l,1]};var a=null;const m=(t,e,n)=>{t.addEventListener(e,n)},Pt=()=>{const t=document.body;t.style.userSelect="none",t.style.webkitUserSelect="none",t.style.msUserSelect="none",t.style.mozUserSelect="none"},St=()=>{const t=document.body;t.style.touchAction="none"},Ot=()=>{Pt(),St(),a={},a.mode=0,a.gamepad={index:null,lx:0,ly:0,rx:0,ry:0,b0:!1,b1:!1,b8:!1,b9:!1,lt:!1,rt:!1},a.keyboard={w:!1,a:!1,s:!1,d:!1,up:!1,left:!1,down:!1,right:!1,z:!1,x:!1,space:!1,lctrl:!1,esc:!1},a.touch=new Map,a.click=[],m(window,"focus",t=>{}),m(window,"blur",t=>{}),m(window,"resize",t=>{}),m(window,"gamepadconnected",t=>{a.gamepad.index=t.gamepad.index,a.mode=1}),m(window,"gamepaddisconnected",t=>{a.gamepad.index===t.gamepad.index&&(a.gamepad.index=null)}),m(document,"keydown",t=>{W(a.keyboard,t.code,!0)&&(a.mode=2,t.preventDefault())}),m(document,"keyup",t=>{W(a.keyboard,t.code,!1)&&(a.mode=2,t.preventDefault())}),m(document.body,"contextmenu",t=>{t.preventDefault()}),m(document.body,"pointerdown",t=>{a.touch.set(t.pointerId,{x:t.clientX,y:t.clientY,sx:t.clientX,sy:t.clientY,time:performance.now()}),a.mode=0}),m(document.body,"pointerup",t=>{It(t.pointerId),a.touch.delete(t.pointerId),a.mode=0}),m(document.body,"pointerout",t=>{a.touch.delete(t.pointerId),a.mode=0}),m(document.body,"pointermove",t=>{const e=a.touch.get(t.pointerId);e&&(e.x=t.clientX,e.y=t.clientY,a.mode=0)})},W=(t,e,n)=>{switch(e){case"KeyW":t.w=n;break;case"KeyA":t.a=n;break;case"KeyS":t.s=n;break;case"KeyD":t.d=n;break;case"ArrowUp":t.up=n;break;case"ArrowLeft":t.left=n;break;case"ArrowDown":t.down=n;break;case"ArrowRight":t.right=n;break;case"KeyZ":t.z=n;break;case"KeyX":t.x=n;break;case"Space":t.space=n;break;case"ControlLeft":t.lctrl=n;break;case"Escape":t.esc=n;break;default:return!1}return!0},It=t=>{const e=a.touch.get(t);e&&performance.now()-e.time<250&&a.click.push({x:e.x,y:e.y})},Gt=t=>{if(t.index!==null){const n=navigator.getGamepads()[t.index];t.lx=Math.trunc(n.axes[0]*4)/4,t.ly=Math.trunc(n.axes[1]*4)/4,t.rx=Math.trunc(n.axes[2]*4)/4,t.ry=Math.trunc(n.axes[3]*4)/4,t.b0=n.buttons[0].value>=.5,t.b1=n.buttons[1].value>=.5,t.b8=n.buttons[8].value>=.5,t.b9=n.buttons[9].value>=.5,t.lt=n.buttons[6].value>=.5,t.rt=n.buttons[7].value>=.5,!!(t.lx||t.ly||t.rx||t.ry||t.b0||t.b1||t.b8||t.b9||t.lt||t.rt)&&(a.mode=1)}},kt=()=>{Gt(a.gamepad)},bt=()=>{a.click.length=0},Lt=t=>{const e=localStorage.getItem(t);return e==null?null:JSON.parse(e)},Ut=(t,e)=>{const n=JSON.stringify(e);localStorage.setItem(t,n)};var s=null;const Nt=()=>{s=document.getElementById("main").getContext("webgl2")},q=(t,e)=>{let n=s.createTexture();return s.bindTexture(s.TEXTURE_2D,n),e==0&&(s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.NEAREST)),e==1&&(s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR)),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),s.texImage2D(s.TEXTURE_2D,0,s.RGBA,s.RGBA,s.UNSIGNED_BYTE,t),s.bindTexture(s.TEXTURE_2D,null),n},Ft=(t,e)=>{s.bindTexture(s.TEXTURE_2D,t),s.texSubImage2D(s.TEXTURE_2D,0,0,0,s.RGBA,s.UNSIGNED_BYTE,e),s.bindTexture(s.TEXTURE_2D,null)},J=(t,e)=>{const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),s.getShaderParameter(n,s.COMPILE_STATUS)?n:(s.deleteShader(n),null)},Bt=(t,e)=>{const n=s.createProgram();return s.attachShader(n,t),s.attachShader(n,e),s.linkProgram(n),s.getProgramParameter(n,s.LINK_STATUS)?n:(s.deleteProgram(n),null)},j=(t,e)=>{let n=s.createBuffer();return s.bindBuffer(t,n),s.bufferData(t,e,s.STATIC_DRAW),n},G=(t,e,n,o,r,c)=>{s.enableVertexAttribArray(t),s.vertexAttribPointer(t,e,n,o,r,c)},Xt=()=>{const t=window.innerWidth;t!==s.canvas.width&&(s.canvas.width=t);const e=window.innerHeight;e!==s.canvas.height&&(s.canvas.height=e)},Yt=()=>{s.viewport(0,0,s.canvas.width,s.canvas.height),s.clearColor(0,0,0,1),s.clearDepth(1),s.clear(s.COLOR_BUFFER_BIT|s.DEPTH_BUFFER_BIT)},Ct=(t,e)=>{s.enable(s.CULL_FACE),t?(s.enable(s.DEPTH_TEST),s.depthFunc(s.LEQUAL)):s.disable(s.DEPTH_TEST),e?(s.enable(s.BLEND),s.blendFunc(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA)):(s.disable(s.BLEND),s.blendFunc(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA))},$t=(t,e)=>{e=e||0;const n=t.iv[e*3+0],o=t.iv[e*3+1],r=t.iv[e*3+2],c=[null,s.POINTS,s.LINES,s.TRIANGLES];t.i?s.drawElements(c[n],r,s.UNSIGNED_SHORT,2*o):s.drawArrays(c[n],o,r)},Ht=(t,e)=>{s.activeTexture(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,t.tex),s.uniform1i(e,0)},Vt=(t,e)=>{const n=document.createElement("canvas");return n?(n.width=t,n.height=e,n):null},rt=(t,e)=>{const n=t.getContext("2d");if(!n)return null;n.clearRect(0,0,t.width,t.height),n.fillStyle="white",n.textAlign="center",n.textBaseline="middle",n.font="24px monospace",n.fillText(e,t.width/2,t.height/2)};var Kt=null;const zt=()=>{Kt=new AudioContext};const Q=0,Z=1,tt=2,et=3,Wt=t=>{if(t.vao=s.createVertexArray(),s.bindVertexArray(t.vao),t.b&&(t.b=j(s.ARRAY_BUFFER,V(t.b)),t.bv))for(let e=0;e<t.bv.length;e+=2)switch(t.bv[e]){case Q:G(Q,3,s.FLOAT,!1,0,t.bv[e+1]);break;case Z:G(Z,3,s.HALF_FLOAT,!1,0,t.bv[e+1]);break;case tt:G(tt,4,s.UNSIGNED_BYTE,!0,0,t.bv[e+1]);break;case et:G(et,2,s.HALF_FLOAT,!1,0,t.bv[e+1]);break}return t.i&&(t.i=j(s.ELEMENT_ARRAY_BUFFER,V(t.i))),s.bindVertexArray(null),t},qt=t=>{if(t.vs=J(s.VERTEX_SHADER,t.vs),t.fs=J(s.FRAGMENT_SHADER,t.fs),t.prog=Bt(t.vs,t.fs),t.u){const e={};for(let n of t.u)e[n]=s.getUniformLocation(t.prog,n);t.u=e}if(t.ub){const e={};let n=0;for(let o of t.ub){const r=s.getUniformBlockIndex(t.prog,o);s.uniformBlockBinding(t.prog,r,n),e[o]=n,n+=1}t.ub=e}return t};let Y=0;const Jt=t=>{if(t.cvs){const e=Vt(t.cvs.width,t.cvs.height);rt(e,t.cvs.text),t.cvs=e,t.tex=q(t.cvs,t.s)}else{t.tex=null;const e=new Image;e.onload=()=>{t.tex=q(e,t.s),Y-=1},e.src="img/"+t.src,Y+=1}return t},w={index:null,pack:[]},jt=()=>{fetch("data/index.json").then(e=>e.json()).then(e=>{w.index=e})},Qt=t=>{const e="data/pack"+t+".json";fetch(e).then(n=>n.json()).then(n=>{n.mesh&&(n.mesh=n.mesh.map(o=>Wt(o))),n.texture&&(n.texture=n.texture.map(o=>Jt(o))),n.shader&&(n.shader=n.shader.map(o=>qt(o))),w.pack[t]=n})},p=(t,e)=>{if(e<0)return null;const n=w.index[t];if(!n)return null;const o=n[e];if(!o)return null;const r=w.pack[o.p];return r?r[t][o.i]:null},ct=t=>p("view",t),Zt=t=>p("mesh",t),it=t=>p("texture",t),te=t=>p("shader",t),ee=t=>p("draw",t),L=t=>p("tile",t),lt=t=>p("ui",t),ne=t=>p("event",t),oe=t=>w.index.view.findIndex(e=>e.n===t),se=t=>w.index.texture.findIndex(e=>e.n===t),re=t=>w.index.item.findIndex(e=>e.n===t),nt=t=>w.index.tile.findIndex(e=>e.n===t),ce=t=>w.index.ui.findIndex(e=>e.n===t),ut=()=>!(w.index===null||w.pack.length<=0||Y>0),g={},ie=t=>{const e=g[t[0]];if(!e)return;const n=t.slice(1);e(...n)},M={t:performance.now(),dt:0,n:0},le=t=>{M.dt=(t-M.t)/1e3,M.t=t,M.n+=1},R=[],C=t=>{const e=ce(t);if(e<0)return null;const n=R[e];return n?n.value:null},ue=0,F=0,P=1,H=(t,e)=>{const n=window.innerWidth,o=window.innerHeight,r=window.devicePixelRatio,c=n/2+(t.offset[0]-t.width/2)*r,i=n/2+(t.offset[0]+t.width/2)*r,l=o/2+(t.offset[1]-t.height/2)*r,f=o/2+(t.offset[1]+t.height/2)*r;return mt(e,c,i,l,f)},ae=(t,e)=>{const n=a.mode;if(n===0){let o=!1;const r=a.click;for(let c of r)if(H(e,[c.x,c.y])){o=!0;break}o?(t.value=!0,t.state=P):(t.value=!1,t.state=F)}else n===1?a.gamepad[e.gamepad]?t.state!==P?(t.value=!0,t.state=P):t.value=!1:(t.value=!1,t.state=F):n===2&&(a.keyboard[e.keyboard]?t.state!==P?(t.value=!0,t.state=P):t.value=!1:(t.value=!1,t.state=F))},fe=(t,e)=>{const n=a.mode;if(n===0){t.value=[0,0];for(const o of a.touch.values())if(H(e,[o.sx,o.sy])){const r=o.x-o.sx,c=-(o.y-o.sy);t.value=D(r,c);break}}else if(n===1){const o=a.gamepad;t.value=D(o.lx,-o.ly)}else if(n===2){const o=a.keyboard,r=o.a?-1:o.d?1:0,c=o.w?1:o.s?-1:0;t.value=D(r,c)}},de=(t,e)=>{const n=a.mode;if(n===0){t.value=[0,0];for(const o of a.touch.values())if(H(e,[o.sx,o.sy])){const r=o.x-o.sx,c=-(o.y-o.sy);t.value=D(r,c);break}}else if(n===1){const o=a.gamepad;t.value=D(o.rx,-o.ry)}else if(n===2){const o=a.keyboard,r=o.right?1:o.left?-1:0,c=o.up?1:o.down?-1:0;t.value=D(r,c)}},_e=t=>{for(const e of R)e&&(e.value=null);for(let e of t.ui){const n=lt(e);if(!n)continue;R[e]||(R[e]={m:new Float32Array(16),value:null,state:ue});const o=R[e];switch(n.interact){case 1:ae(o,n);break;case 2:fe(o,n);break;case 3:de(o,n);break;default:break}const r=window.devicePixelRatio,c=yt(n.width/2*r,n.height/2*r,1);pt(c,n.offset[0]*r,-n.offset[1]*r,0),o.m.set(c)}},_={w:0,h:0,a:[],b:[]},N=(t,e)=>(t=Math.floor(t),e=Math.floor(e),t<0||_.w<=t||e<0||_.h<=e?-1:t+e*_.h),O=(t,e)=>_.a[N(t,e)],at=(t,e)=>_.b[N(t,e)],ft=(t,e)=>{const n=O(t,e);if(!n)return 0;const o=L(n.no);return o?o.height*n.count:0},he=(t,e)=>{const n=at(t,e);if(!n)return 0;const o=L(n.no);return o?o.height:0},$=(t,e)=>ft(t,e)+he(t,e),me=(t,e)=>O(t,e)==null,T=(t,e,n,o)=>{if(me(t+n,e+o))return!0;const r=$(t,e),c=$(t+n,e+o);return Math.abs(r-c)>1},Ee=(t,e)=>{_.w=t,_.h=e,_.a=[],_.a.length=t*e,_.b=[],_.b.length=t*e},xe=(t,e,n)=>{const o=N(t,e);o<0||(_.a[o]={no:n,count:1})},k=(t,e,n)=>{const o=N(t,e);o<0||(_.b[o]={no:n,dir:0})},Ae=t=>t,we=t=>t,ge=1.75,u={x:0,y:0,ha:0,va:0,h:0},ve=(t,e,n,o)=>{u.x=t||0,u.y=e||0,u.ha=n||0,u.va=o||0,u.h=0},v={s:[],i:0},Te=t=>v.s.findIndex(e=>e&&e.no===t),pe=()=>v.s.findIndex(t=>!t),ye=(t,e)=>{let n=Te(t);if(n<0){if(n=pe(),n<0)return;v.s[n]={no:t,num:e};return}v.s[n].num+=e};const De=t=>{v.s.length=t,v.s.fill(null),v.i=0},Me=t=>t,Re=t=>t,Pe=t=>{for(let e of t.event){const n=ne(e);if(!n)continue;let o=!1;switch(n.trigger){case 0:o=!0;break;case 1:o=C(n.target);break}if(!!o)for(const r of n.action)ie(r)}},d={view:null,slot:null,cam:{eye:[0,0,0],vp:new Float32Array(16),ivp:new Float32Array(16),o:new Float32Array(16)},m:new Float32Array(16)},dt=()=>{d.slot=null,d.view=w.index.initial_view},Se=t=>{const e=oe(t);e<0||(d.view=e)},Oe=()=>{d.view===null&&dt()},Ie=()=>{const t=window.innerWidth,e=window.innerHeight,n=S(30),o=.1,r=1e3,c=wt(u.ha,u.va),i=B(u.x,u.y,u.h);i[2]+=ge;const l=xt(i,c),E=Dt(i,l,[0,0,1]),x=Mt(n,t/e,o,r),A=vt(E,x);d.cam.vp.set(A),d.cam.ivp.set(Tt(A)),d.cam.o.set(Rt(t,e,0,1)),d.cam.eye=i},Ge=()=>{_.w=0,_.h=0,_.a.length=0,u.x=0,u.y=0,u.ha=0,u.va=0},ke=()=>{if(!d.slot)return!1;const t=Lt(d.slot);return t?(t.pos&&Object.assign(u,t.pos),t.item&&Object.assign(v,Re(t.item)),t.tile&&Object.assign(_,we(t.tile)),!0):!1},be=()=>{if(!d.slot)return;const t={};t.pos=u,t.item=Me(v),t.tile=Ae(_),Ut(d.slot,t)},Le=()=>{Xt(),Yt()},U=(t,e,n)=>{const o=ee(t);if(!o)return;Ct(o.depth,o.alpha);const r=te(o.shader);if(!r)return;s.useProgram(r.prog);const c=Zt(o.mesh);if(!c)return;s.bindVertexArray(c.vao),s.uniformMatrix4fv(r.u.vp,!1,o.ortho?d.cam.o:d.cam.vp);const i=it(o.texture);i&&Ht(i,r.u.tex0);for(let l=0;l<e;++l)n(r.u,l),$t(c)},Ue=()=>{for(let t=0;t<_.w;++t)for(let e=0;e<_.h;++e){const n=O(t,e);if(!n)continue;const o=L(n.no);!o||U(o.draw,n.count,(r,c)=>{const i=B(t,e,c*o.height);d.m.set(X(i[0],i[1],i[2])),s.uniformMatrix4fv(r.w,!1,d.m)})}for(let t=0;t<_.w;++t)for(let e=0;e<_.h;++e){const n=at(t,e);if(!n)continue;const o=L(n.no);if(!o)continue;const r=ft(t,e);U(o.draw,1,(c,i)=>{const l=B(t,e,r);d.m.set(X(l[0],l[1],l[2])),s.uniformMatrix4fv(c.w,!1,d.m)})}},Ne=t=>{for(let e of t.ui){const n=lt(e);if(!n)continue;const o=R[e];!o||U(n.draw,1,(r,c)=>{s.uniformMatrix4fv(r.w,!1,o.m)})}},Fe=t=>{U(t.skybox,1,(e,n)=>{d.m.set(X(...d.cam.eye)),s.uniformMatrix4fv(e.w,!1,d.m)})},Be=t=>{Fe(t),t.draw3d&&Ue(),Ne(t)},Xe=()=>{Nt(),zt(),Ot(),jt(),Qt(0)},Ye=t=>{if(le(t),kt(),ut()){Oe();const e=ct(d.view);if(!e)return;_e(e),Pe(e)}Ie(),bt()},Ce=()=>{if(Le(),ut()){const t=ct(d.view);if(!t)return;Be(t)}};m(window,"load",()=>{Xe();const t=e=>{Ye(e),Ce(),requestAnimationFrame(t)};t()});g.nextview=t=>{Se(t)};g.resetview=()=>{dt()};g.newgame=t=>{d.slot=t,Ge()};g.loadgame=t=>{d.slot=t,ke()};g.savegame=()=>{be()};const ot=(t,e,n,o)=>{const r=Math.floor(t),c=Math.floor(e),i=.25;let l=t+n,f=e+o;return T(r,c,-1,0)&&(l=Math.max(l,r+i)),T(r,c,1,0)&&(l=Math.min(l,r-i+1)),T(r,c,0,-1)&&(f=Math.max(f,c+i)),T(r,c,0,1)&&(f=Math.min(f,c-i+1)),T(r,c,-1,-1)&&([l,f]=I([l,f],i,[r,c])),T(r,c,-1,1)&&([l,f]=I([l,f],i,[r,c+1])),T(r,c,1,-1)&&([l,f]=I([l,f],i,[r+1,c])),T(r,c,1,1)&&([l,f]=I([l,f],i,[r+1,c+1])),[l,f]},$e=(t,e)=>{const n=M.dt,o=C(e);o&&(u.ha+=90*n*o[0],u.va+=90*n*o[1],u.va=Math.max(-60,Math.min(u.va,80)));const r=C(t);if(r){const l=S(u.ha+90),f=S(u.ha),E=r[0],x=r[1],A=E*Math.cos(l)+x*Math.cos(f),y=E*Math.sin(l)+x*Math.sin(f),h=2*n*A,_t=2*n*y;[u.x,u.y]=ot(u.x,u.y,h,_t)}else[u.x,u.y]=ot(u.x,u.y,0,0);const c=$(u.x,u.y);if(Math.abs(c-u.h)<=2){const i=c-u.h;u.h+=10*n*i}else u.h=c};g.fpsmove=(t,e)=>{$e(t,e)};g.makeworld=()=>{const t=nt("tile"),e=nt("mine");Ee(64,64);for(let n=24;n<=40;++n)for(let o=24;o<=40;++o)xe(n,o,t);k(29,29,e),k(35,29,e),k(29,35,e),k(35,35,e),ve(_.w/2+.5,_.h/2+.5),De(8),ye(re("pick"),1)};g.pushtile=()=>{const t=O(u.x,u.y);!t||(t.count+=1)};g.poptile=()=>{const t=O(u.x,u.y);!t||t.count<=1||(t.count-=1)};g.text=t=>{const e=it(se(t));!e||(rt(e.cvs,""+M.n),Ft(e.tex,e.cvs))};})();