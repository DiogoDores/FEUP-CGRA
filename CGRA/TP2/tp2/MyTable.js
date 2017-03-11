/**
 * MyTable
 * @constructor
 */
 function MyTable(scene) {
	CGFobject.call(this,scene);

	this.quad = new MyUnitCubeQuad(this.scene);
	this.quad.initBuffers();

	//Materials initialization
	this.woodenTableMaterial = new CGFappearance(this.scene);
	this.woodenTableMaterial.setAmbient(0.3,0.1,0,1);
	this.woodenTableMaterial.setDiffuse(0.3,0.1,0,1);
	this.woodenTableMaterial.setSpecular(0.01,0.01, 0.01,0.01);	
	this.woodenTableMaterial.setShininess(120);

	this.metalLegsMaterial = new CGFappearance(this.scene);
	this.metalLegsMaterial.setAmbient(0.3,0.3,0.3,1);
	this.metalLegsMaterial.setDiffuse(0.3,0.3,0.3,1);
	this.metalLegsMaterial.setSpecular(0.7,0.7, 0.7,1);	
	this.metalLegsMaterial.setShininess(200);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor= MyTable;

MyTable.prototype.display = function(){

	this.metalLegsMaterial.apply();
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
    this.woodenTableMaterial.apply();
    this.scene.translate(0, 3.5, 0);
    this.scene.scale(5.0, 0.3, 3.0)
    this.quad.display();
    this.scene.popMatrix();


}