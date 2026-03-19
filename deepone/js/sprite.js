// Copyright (c) bis83. Distributed under the MIT License.

class Sprite {
    constructor(gl) {
        this.gl = gl;
        this.vs = `#version 300 es
        uniform mat4 world;
        uniform mat4 projection;
        uniform vec4 texcoord;
        out vec2 uv;
        void main() {
            float x = (gl_VertexID & 0x1) == 0 ? -0.5 : +0.5;
            float y = (gl_VertexID & 0x2) == 0 ? -0.5 : +0.5;
            gl_Position = projection * world * vec4(x, y, 0.0, 1.0);
            float u = (gl_VertexID & 0x1) == 0 ? texcoord.x : texcoord.z;
            float v = (gl_VertexID & 0x2) == 0 ? texcoord.w : texcoord.y;
            uv = vec2(u,v);
        }`;
        this.fs = `#version 300 es
        precision mediump float;
        uniform vec4 mainColor;
        uniform sampler2D textureColor;
        in vec2 uv;
        out vec4 finalColor;
        void main() {
            finalColor = mainColor * texture(textureColor, uv);
        }`;
        this.program = Util.createProgram(this.gl, this.vs, this.fs);

        // uniforms
        this.world = this.gl.getUniformLocation(this.program, "world");
        this.worldValue = mat4.create();
        this.projection = this.gl.getUniformLocation(this.program, "projection");
        this.projectionValue = mat4.create();
        this.texcoord = this.gl.getUniformLocation(this.program, "texcoord");
        this.texcoordValue = vec4.fromValues(0, 0, 1, 1);
        this.mainColor = this.gl.getUniformLocation(this.program, "mainColor");
        this.mainColorValue = vec4.fromValues(1,1,1,1);
        this.textureColor = this.gl.getUniformLocation(this.program, "textureColor");
        this.textureColorValue = "";

        this.textures = new Map();
        this.textures["white"] = Util.whiteTexture(this.gl);
    }

    load(path) {
        Util.loadTextureAsync(this.gl, path).then((texture) => {
            this.textures[path] = texture;
        });
    }

    ortho(left, right, bottom, top) {
        mat4.ortho(this.projectionValue, left, right, bottom, top, -1, 1);
    }

    trans(x, y, sx, sy, rot) {
        const rotate = mat4.create();
        mat4.fromZRotation(rotate, rot);
        const scale = mat4.create();
        mat4.fromScaling(scale, vec3.fromValues(sx, sy, 1));
        const translate = mat4.create();
        mat4.fromTranslation(translate, vec3.fromValues(x, y, 1));
        mat4.mul(this.worldValue, rotate, scale);
        mat4.mul(this.worldValue, translate, this.worldValue);
    }

    color(r, g, b, a) {
        vec4.set(this.mainColorValue, r, g, b, a);
    }

    texture(path) {
        this.textureColorValue = path;
    }

    uv(u0, v0, u1, v1) {
        vec4.set(this.texcoordValue, u0, v0, u1, v1);
    }

    draw() {
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.useProgram(this.program);
        this.gl.uniformMatrix4fv(this.world, false, this.worldValue);
        this.gl.uniformMatrix4fv(this.projection, false, this.projectionValue);
        this.gl.uniform4fv(this.texcoord, this.texcoordValue);
        this.gl.activeTexture(this.gl.TEXTURE0);
        let texture = this.textures[this.textureColorValue];
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture ? texture : this.textures["white"]);
        this.gl.uniform1i(this.textureColor, 0);
        this.gl.uniform4fv(this.mainColor, this.mainColorValue);        
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}
