// Copyright (c) bis83. Distributed under the MIT License.

class FxOcean {
    constructor(gl) {
        this.gl = gl;
        this.vs = `#version 300 es
        uniform mat4 world;
        uniform mat4 projection;
        uniform vec3 eyePos;
        uniform vec2 wave;
        const vec4 normal = vec4(0.0, 1.0, 0.0, 1.0);
        const vec4 tangent = vec4(1.0 / sqrt(2.0), 0.0, 1.0 / sqrt(2.0), 1.0);
        const vec3 lightDir = vec3(1.0, -1.0, 1.0);
        out vec2 uv;
        out vec3 light;
        out vec3 eye;
        void main() {
            float x = (gl_VertexID & 0x1) == 0 ? -0.5 : +0.5;
            float z = (gl_VertexID & 0x2) == 0 ? -0.5 : +0.5;
            gl_Position = projection * world * vec4(x, 0.0, z, 1.0);
            float u = (gl_VertexID & 0x1) == 0 ? 0.0 : 1.0;
            float v = (gl_VertexID & 0x2) == 0 ? 1.0 : 0.0;
            uv = vec2(u,v) + wave;

            vec3 wNormal = (world * normal).xyz;
            vec3 wTangent = (world * tangent).xyz;
            vec3 biNormal = cross(wNormal.xyz, wTangent.xyz);
            mat3 matT = mat3(wTangent, biNormal, wNormal);
            matT = transpose(matT);
            light = matT * -lightDir;
            eye = matT * (eyePos - vec3(x, 0.0, z));
        }`;
        this.fs = `#version 300 es
        precision mediump float;
        uniform sampler2D textureNormal;
        uniform sampler2D textureReflection;
        uniform float height;
        uniform vec4 mainColor;
        in vec2 uv;
        in vec3 light;
        in vec3 eye;
        out vec4 finalColor;
        void main() {
            finalColor = mainColor;
            //vec3 normal = 2.0 * texture(textureNormal, uv).xyz - 1.0;
            //normal.y = (1.0 - normal.y) * height;
            //normal = normal * 2.0 - 1.0;
            //vec3 ref = reflect(eye, normal);
            //vec4 diffuse = 0.5 * mainColor * max(0.0, dot(normal, light));
            //vec4 specular = vec4(1,1,1,1) * (0.5 * pow(max(0.0, dot(ref, light)), 2.0));
            //vec4 reflection = texture(textureReflection, ref.xy);
            //finalColor = diffuse + specular + reflection * 0.25;
            //finalColor.a = 1.0;
        }`;
        this.program = Util.createProgram(this.gl, this.vs, this.fs);

        // uniforms
        this.world = gl.getUniformLocation(this.program, "world");
        this.worldValue = mat4.create();
        this.projection = this.gl.getUniformLocation(this.program, "projection");
        this.projectionValue = mat4.create();
        this.eyePos = this.gl.getUniformLocation(this.program, "eyePos");
        this.eyePosValue = vec3.fromValues(0,0,0);
        this.mainColor = this.gl.getUniformLocation(this.program, "mainColor");
        this.mainColorValue = vec4.fromValues(1,1,1,1);
        this.wave = this.gl.getUniformLocation(this.program, "wave");
        this.waveValue = vec2.fromValues(0,0);
        this.height = this.gl.getUniformLocation(this.program, "height");
        this.heightValue = 0.0;
        this.textureNormal = this.gl.getUniformLocation(this.program, "textureNormal");
        this.textureReflection = this.gl.getUniformLocation(this.program, "textureReflection");
        this.textures = [null, null];
    }

    load(textureNormal, textureReflection) {
        //Util.loadTextureAsync(this.gl, textureNormal).then((texture) => {
        //    this.textures[0] = texture;
        //});
        //Util.loadTextureAsync(this.gl, textureReflection).then((texture) => {
        //    this.textures[1] = texture;
        //});
    }

    camera(eye, center, up, fovy, aspect, near, far) {
        var lookAt = mat4.create();
        mat4.lookAt(lookAt, eye, center, up);
        var perspective = mat4.create();
        mat4.perspective(perspective, fovy, aspect, near, far);
        mat4.multiply(this.projectionValue, perspective, lookAt);
        vec3.copy(this.eyePosValue, eye);
    }

    param(x, z, height) {
        vec2.set(this.waveValue, x, z);
        this.heightValue = height;
    }

    trans(x, z) {
        mat4.fromTranslation(this.worldValue, vec3.fromValues(x, 0, z));
    }

    color(r, g, b, a) {
        vec4.set(this.mainColorValue, r, g, b, a);
    }

    draw() {
        this.gl.useProgram(this.program);
        this.gl.uniformMatrix4fv(this.world, false, this.worldValue);
        this.gl.uniformMatrix4fv(this.projection, false, this.projectionValue);
        this.gl.uniform3fv(this.eyePos, this.eyePosValue);
        this.gl.uniform2fv(this.wave, this.waveValue);
        this.gl.uniform1f(this.height, this.heightValue);
        //this.gl.activeTexture(this.gl.TEXTURE0);
        //this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[0]);
        //this.gl.uniform1i(this.textureNormal, 0);
        //this.gl.activeTexture(this.gl.TEXTURE1);
        //this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[1]);
        //this.gl.uniform1i(this.textureReflection, 1);
        this.gl.uniform4fv(this.mainColor, this.mainColorValue);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}