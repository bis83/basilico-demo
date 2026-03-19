// Copyright (c) bis83. Distributed under the MIT License.

class FxShip {
    constructor(gl) {
        this.gl = gl;
        this.vs = `#version 300 es
        uniform mat4 world;
        uniform mat4 projection;
        void main() {
            vec4 position = vec4(0, 0, 0, 1);
            if(gl_VertexID == 0) {
                position.xy = vec2(0.0, 0.23);
            } else if(gl_VertexID == 1) {
                position.xy = vec2(0.12, -0.23);
            } else if(gl_VertexID == 2) {
                position.xy = vec2(-0.12, -0.23);
            }
            gl_Position = projection * world * position;
        }`;
        this.fs = `#version 300 es
        precision mediump float;
        uniform vec4 mainColor;
        out vec4 finalColor;
        void main() {
            finalColor = mainColor;
        }`;
        this.program = Util.createProgram(this.gl, this.vs, this.fs);

        // uniforms
        this.world = gl.getUniformLocation(this.program, "world");
        this.worldValue = mat4.create();
        this.projection = this.gl.getUniformLocation(this.program, "projection");
        this.projectionValue = mat4.create();
        this.mainColor = this.gl.getUniformLocation(this.program, "mainColor");
        this.mainColorValue = vec4.fromValues(1,1,1,1);
    }

    color(r, g, b, a) {
        vec4.set(this.mainColorValue, r, g, b, a);
    }

    trans(x, z, rot) {
        const pitch = mat4.create();
        mat4.fromXRotation(pitch, Math.PI/2);
        const roll = mat4.create();
        mat4.fromYRotation(roll, rot);
        const translate = mat4.create();
        mat4.fromTranslation(translate, vec3.fromValues(x, 0, z));
        mat4.mul(this.worldValue, roll, pitch);
        mat4.mul(this.worldValue, translate, this.worldValue);
    }

    camera(eye, center, up, fovy, aspect, near, far) {
        var lookAt = mat4.create();
        mat4.lookAt(lookAt, eye, center, up);
        var perspective = mat4.create();
        mat4.perspective(perspective, fovy, aspect, near, far);
        mat4.multiply(this.projectionValue, perspective, lookAt);
    }

    draw() {
        this.gl.useProgram(this.program);
        this.gl.uniformMatrix4fv(this.world, false, this.worldValue);
        this.gl.uniformMatrix4fv(this.projection, false, this.projectionValue);
        this.gl.uniform4fv(this.mainColor, this.mainColorValue);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    }
}