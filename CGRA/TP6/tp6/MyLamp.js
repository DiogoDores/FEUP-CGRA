/**
* MyLamp
* @constructor
*/
function MyLamp(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.slicesAngle = Math.PI * 2 / slices;
    this.stacksAngle = Math.PI / 2 / stacks;
    this.initBuffers();
}
MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var angIncrement = (2 * Math.PI) / this.slices;

    for (let i = 0; i <= this.stacks; i++) {
        if (i < this.stacks) {
            for (let j = 0; j < this.slices; j++) {
                var x = Math.cos(angIncrement * j) * Math.cos(Math.asin(i / this.stacks));
                var y = Math.sin(angIncrement * j) * Math.cos(Math.asin(i / this.stacks));

                this.vertices.push(x, y, i / this.stacks);
                this.normals.push(x, y, i / this.stacks);

                this.texCoords.push(0.5 * x + 0.5, 0.5 - 0.5 * y);

                if (i < this.stacks - 1) {
                    if (j == this.slices - 1) {
                        this.indices.push(i * this.slices + j);
                        this.indices.push((i - 1) * this.slices + j + 1);
                        this.indices.push(i * this.slices + j + 1);

                        this.indices.push(i * this.slices + j + 1);
                        this.indices.push((i + 1) * this.slices + j);
                        this.indices.push(i * this.slices + j);
                    } else {
                        this.indices.push(i * this.slices + j);
                        this.indices.push(i * this.slices + j + 1);
                        this.indices.push((i + 1) * this.slices + j + 1);

                        this.indices.push((i + 1) * this.slices + j + 1);
                        this.indices.push((i + 1) * this.slices + j);
                        this.indices.push(i * this.slices + j);
                    }
                }
            }
        } else {
            this.vertices.push(0, 0, 1);
            this.normals.push(0, 0, 1);
            this.texCoords.push(0.5, 0.5, 0.5);

            for (let j = 0; j < this.slices - 1; j++) {
                this.indices.push((i - 1) * this.slices + j, 1 + j + this.slices * (i - 1), this.slices * this.stacks);
            }
            this.indices.push(i * this.slices - 1, (i - 1) * this.slices, this.slices * this.stacks);
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
