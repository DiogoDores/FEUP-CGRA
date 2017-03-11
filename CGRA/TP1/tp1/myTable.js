function myTable(scene) {
	CGFobject.call(this,scene);

	this.quad = new MyUnitCubeQuad(this.scene);
	this.quad.initBuffers();
};

myTable.prototype = Object.create(CGFobject.prototype);
myTable.prototype.constructor= myTable;

myTable.prototype.display = function(){

    this.scene.pushMatrix();
    this.scene.translate(2.0, 3.5/2, 1.0);
    this.scene.scale(0.3, 3.5, 0.3)
    this.quad.display();
    this.scene.popMatrix();
    
	this.scene.pushMatrix();
    this.scene.translate(2.0, 3.5/2, -1.0);
    this.scene.scale(0.3, 3.5, 0.3)
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.0, 3.5/2, -1.0);
    this.scene.scale(0.3, 3.5, 0.3)
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.0, 3.5/2, 1.0);
    this.scene.scale(0.3, 3.5, 0.3)
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 3.5, 0);
    this.scene.scale(5.0, 0.3, 3.0)
    this.quad.display();
    this.scene.popMatrix();


}