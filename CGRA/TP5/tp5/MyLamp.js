/**
* MyLamp
* @constructor
*/
function MyLamp(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];

    var internalAngle = (Math.PI * 2) / this.slices;

    for (var j = 0; j <= this.stacks; j++) {
        for (var i = 0; i < this.slices; i++) {

            //Base
            this.vertices.push(Math.cos(i * internalAngle));
            this.vertices.push(Math.sin(i * internalAngle));
            this.vertices.push(j/this.stacks);

            this.normals.push(Math.cos(internalAngle * i));
            this.normals.push(Math.sin(internalAngle * i));
            this.normals.push(0);

        }
    }

    for (var j = 0; j < this.stacks; j++) {
        for (var i = 0; i < this.slices; i++) {

            this.indices.push(this.slices * j + i);
            this.indices.push(this.slices * j + i + 1);
            this.indices.push(this.slices * (j + 1) + i);
            if (i != (this.slices - 1)) {
                this.indices.push(this.slices * (j + 1) + i + 1);
                this.indices.push(this.slices * (j + 1) + i);
                this.indices.push(this.slices * j + i + 1);
            } else {
                this.indices.push(this.slices * j);
                this.indices.push(this.slices * j + i + 1)
                this.indices.push(this.slices * j + i);
            }
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
