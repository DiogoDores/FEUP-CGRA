/**
* MyPolygon
* @constructor
*/
function MyPolygon(scene, slices) {
    CGFobject.call(this, scene);

    this.slices = slices;

    this.initBuffers();
}
;MyPolygon.prototype = Object.create(CGFobject.prototype);
MyPolygon.prototype.constructor = MyPolygon;

MyPolygon.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    
    var internalAngle = (Math.PI * 2) / this.slices;
    this.vertices.push(0, 0, 0);
    this.normals.push(0, 0, 1);
    this.texCoords.push(0.5,0.5);

    for (var i = 0; i < this.slices; i++) {

        this.vertices.push(Math.cos(i * internalAngle));
        this.vertices.push(Math.sin(i * internalAngle));
        this.vertices.push(0);

        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);

        this.indices.push(i % this.slices + 1);
        this.indices.push((i + 1) % this.slices + 1);
        this.indices.push(0);

        this.texCoords.push(0.5 + Math.cos(i * internalAngle) / 2);
        this.texCoords.push(0.5 - Math.sin(i * internalAngle) / 2);
    }

    

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
