function myFloor(scene) {
	CGFobject.call(this,scene);

	this.quad = new MyUnitCubeQuad(this.scene);
	this.quad.initBuffers();
};

myFloor.prototype = Object.create(CGFobject.prototype);
myFloor.prototype.constructor= myFloor;

myFloor.prototype.display = function(){

    this.scene.pushMatrix();
    this.scene.scale(8.0, 0.1, 6.0);
    this.quad.display();
    this.scene.popMatrix();

}