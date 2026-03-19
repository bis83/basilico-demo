// Copyright (c) bis83. Distributed under the MIT License.

class FxModel {
    constructor(gl) {
        this.gl = gl;
        this.vs = `#version 300 es
        in vec3 position;
        in vec2 texcoord;
        uniform mat4 world;
        uniform mat4 projection;
        uniform vec3 center;
        out vec2 uv;
        void main() {
            gl_Position = projection * world * vec4(position + center, 1.0);
            uv = vec2(texcoord.x, 1.0 - texcoord.y);
        }`;
        this.fs = `#version 300 es
        precision mediump float;
        uniform sampler2D textureColor;
        in vec2 uv;
        out vec4 finalColor;
        void main() {
            finalColor = texture(textureColor, uv);
        }`;
        this.program = Util.createProgram(this.gl, this.vs, this.fs);

        this.positionAttribute = this.gl.getAttribLocation(this.program, "position");
        this.texcoordAttribute = this.gl.getAttribLocation(this.program, "texcoord");

        this.center = this.gl.getUniformLocation(this.program, "center");
        this.world = this.gl.getUniformLocation(this.program, "world");
        this.worldValue = mat4.create();
        this.projection = this.gl.getUniformLocation(this.program, "projection");
        this.projectionValue = mat4.create();
        this.textureColor = this.gl.getUniformLocation(this.program, "textureColor");
        this.modelValue = "";

        this.models = new Map();
        this.textures = new Map();
        this.textures["white"] = Util.whiteTexture(this.gl);
    }

    load(path) {
        if(this.models[path] != null) {
            return;
        }
        this.models[path] = [];
        fetch(path).then(res => res.json()).then((data) => {
            for(const mesh of data) {
                const vao = this.gl.createVertexArray();
                this.gl.bindVertexArray(vao);
                const buffer0 = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer0);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(mesh.vertex), this.gl.STATIC_DRAW);
                this.gl.enableVertexAttribArray(this.positionAttribute);
                this.gl.vertexAttribPointer(this.positionAttribute, 3, this.gl.FLOAT, false, 20, 0);
                this.gl.enableVertexAttribArray(this.texcoordAttribute);
                this.gl.vertexAttribPointer(this.texcoordAttribute, 2, this.gl.FLOAT, false, 20, 12);
                const ibuffer = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibuffer);
                this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.index), this.gl.STATIC_DRAW);
                this.gl.bindVertexArray(null);

                this.loadTexture(mesh.texture);
                this.models[path].push({
                    vao: vao,
                    buffer0: buffer0,
                    ibuffer: ibuffer,
                    count: mesh.index.length,
                    center: vec3.fromValues(mesh.center[0], mesh.center[1], mesh.center[2]),
                    texture: mesh.texture
                });
            }
        });
    }

    loadTexture(path) {
        if(this.textures[path] != null) {
            return;
        }
        this.textures[path] = "loading";
        Util.loadTextureAsync(this.gl, path).then((texture) => {
            this.textures[path] = texture;
        });
    }

    getTexture(path) {
        let texture = this.textures[path];
        if(texture === "loading") {
            texture = null;
        }
        return texture ? texture : this.textures["white"];
    }

    model(path) {
        this.modelValue = path;
    }

    trans(s, x, y, rot) {
        const scale = mat4.create();
        mat4.fromScaling(scale, vec3.fromValues(s, s, s));
        const rotate = mat4.create();
        mat4.fromZRotation(rotate, rot);
        const translate = mat4.create();
        mat4.fromTranslation(translate, vec3.fromValues(x, y, 0));
        mat4.mul(this.worldValue, rotate, scale);
        mat4.mul(this.worldValue, translate, this.worldValue);
    }

    ortho(left, right, bottom, top) {
        mat4.ortho(this.projectionValue, left, right, bottom, top, -100, 100);
    }

    draw() {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.disable(this.gl.BLEND);
        this.gl.useProgram(this.program);
        this.gl.uniformMatrix4fv(this.world, false, this.worldValue);
        this.gl.uniformMatrix4fv(this.projection, false, this.projectionValue);

        const meshes = this.models[this.modelValue];
        for(const mesh of meshes) {
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.getTexture(mesh.texture));
            this.gl.uniform1i(this.textureColor, 0);
            this.gl.uniform3fv(this.center, mesh.center);

            this.gl.bindVertexArray(mesh.vao);
            this.gl.drawElements(this.gl.TRIANGLES, mesh.count, this.gl.UNSIGNED_SHORT, 0);
            this.gl.bindVertexArray(null);
        }
    }
}