/**
 * MyPyramid
 * @constructor
 */
 function MyPyramid(scene) {
 	CGFobject.call(this, scene);

 	this.quad = new MyQuad(this.scene);
 	this.triangle = new MyTriangle(this.scene);

 };

 MyPyramid.prototype = Object.create(CGFobject.prototype);
 MyPyramid.prototype.constructor = MyPyramid;

 MyPyramid.prototype.display = function() {
   
 	// front face
 	this.scene.pushMatrix();
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

    // Hypotenuse
    this.scene.pushMatrix();
    this.scene.rotate(3*Math.PI/4, 0, 1, 0);
    this.scene.scale(Math.sqrt(2), 1, 1);
    this.quad.display();
    this.scene.popMatrix();

 	// left face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 0, 1, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// Top face
 	this.scene.pushMatrix();
 	this.scene.translate(0, 0.5, 0.5);
 	this.scene.rotate(Math.PI, 0, 1, 0);
  	this.triangle.display();
 	this.scene.popMatrix();

 	// Bottom face
 	this.scene.pushMatrix();
 	this.scene.translate(-0.5, -0.5, 0);
 	this.scene.rotate(Math.PI, 1, 0, 0);
 	this.scene.rotate(-3*Math.PI/2, 0, 1, 0);
  	this.triangle.display();
 	this.scene.popMatrix();
 };