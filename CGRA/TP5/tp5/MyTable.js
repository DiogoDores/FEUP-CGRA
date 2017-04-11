/**
 * MyTable
 * @constructor
 */
 function MyTable(scene) {
	CGFobject.call(this,scene);

	this.quad = new MyUnitCubeQuad(this.scene);
	this.quad.initBuffers();

};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor= MyTable;

MyTable.prototype.display = function(){

	this.scene.metalLegsMaterial.apply();
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
    this.scene.scale(5.0, 0.3, 3.0);
    this.scene.tableAppearence.apply();
    this.quad.display();
    this.scene.popMatrix();


}