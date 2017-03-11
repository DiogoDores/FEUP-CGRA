/**
* MyPrism
* @constructor
*/
function MyPrism(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function() {
    /*
* TODO:
* Replace the following lines in order to build a prism with a **single mesh**.
*
* How can the vertices, indices and normals arrays be defined to
* build a prism with varying number of slices and stacks?
*/

    this.vertices = [];
    this.indices = [];
    this.normals = [];

  var ang=(2*Math.PI)/this.slices;

//This cycle creates one stack of the object each iteration
//The inner cycle creates one side of the unitary object every iteration
//Every vertice (and index) gets pushed at least twice, with the ones that are shared
//by stacks getting pushed 4 times

	 var internalAngle = (Math.PI * 2) / this.slices;

    for (var j = 0; j < this.stacks; j++) {
        for (var i = 0; i < this.slices; i++) {

            //Base
            this.vertices.push(Math.cos(i * internalAngle));
            this.vertices.push(Math.sin(i * internalAngle));
            this.vertices.push(j);

            //Repetições de modo a fazer as normais
            this.vertices.push(Math.cos((i + 1) * internalAngle));
            this.vertices.push(Math.sin((i + 1) * internalAngle));
            this.vertices.push(j);

            //Topo
            this.vertices.push(Math.cos(i * internalAngle));
            this.vertices.push(Math.sin(i * internalAngle));
            this.vertices.push(j + 1);

            this.vertices.push(Math.cos((i + 1) * internalAngle));
            this.vertices.push(Math.sin((i + 1) * internalAngle));
            this.vertices.push(j + 1);
        }
    }

    for (var j = 0; j < this.stacks; j++) {
        for (var i = 0; i < this.slices; i++) {

            //Faces exteriores
            this.indices.push(this.slices * 4 * j + 4 * i);
            this.indices.push(this.slices * 4 * j + 4 * i + 1);
            this.indices.push(this.slices * 4 * j + 4 * i + 2);

            this.indices.push(this.slices * 4 * j + 4 * i + 3);
            this.indices.push(this.slices * 4 * j + 4 * i + 2);
            this.indices.push(this.slices * 4 * j + 4 * i + 1);

        }
    }

    for (var j = 0; j < this.stacks; j++) {
        for (var i = 0; i < this.slices; i++) {

            this.normals.push(Math.cos(internalAngle * (i + 0.5)));
            this.normals.push(Math.sin(internalAngle * (i + 0.5)));
            this.normals.push(0);

            this.normals.push(Math.cos(internalAngle * (i + 0.5)));
            this.normals.push(Math.sin(internalAngle * (i + 0.5)));
            this.normals.push(0);

            this.normals.push(Math.cos(internalAngle * (i + 0.5)));
            this.normals.push(Math.sin(internalAngle * (i + 0.5)));
            this.normals.push(0);

            this.normals.push(Math.cos(internalAngle * (i + 0.5)));
            this.normals.push(Math.sin(internalAngle * (i + 0.5)));
            this.normals.push(0);
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
