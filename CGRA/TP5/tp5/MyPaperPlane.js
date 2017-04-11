/**
* MyPaperPlane
* @constructor
*/
function MyPaperPlane(scene) {
    CGFobject.call(this, scene);

    this.initBuffers();
}
;MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor = MyPaperPlane;

MyPaperPlane.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    //this.texCoords = [];
    
    this.vertices.push(0.5, 0.16, 0.35);
    this.vertices.push(0.5, 0.16, 0.03);
    this.vertices.push(-0.5, 0.16, 0.03);
    this.vertices.push(-0.7, 0, 0);
    this.vertices.push(0.3, 0, 0);
    this.vertices.push(-0.5, 0.16, -0.03);
    this.vertices.push(0.5, 0.16, -0.03);
    this.vertices.push(0.5, 0.16, -0.35);
    
    this.normals.push(0,1,-1);
	this.normals.push(0,1,-1);
	this.normals.push(0,1,-1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,1,-1);
	this.normals.push(0,1,-1);
	this.normals.push(0,1,-1);

    this.indices.push(0, 1, 2);
    this.indices.push(2, 1, 0);
    this.indices.push(1, 2, 4);
    this.indices.push(4, 2, 1);
    this.indices.push(4, 3, 2);
    this.indices.push(2, 3, 4);
    this.indices.push(3, 4, 6);
    this.indices.push(6, 4, 3);
    this.indices.push(3, 6, 5);
    this.indices.push(5, 6, 3);
    this.indices.push(7, 5, 6);
    this.indices.push(6, 5, 7);
    
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
