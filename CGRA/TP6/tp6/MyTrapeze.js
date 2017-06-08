/**
* MyTrapeze
* @constructor
*/
function MyTrapeze(scene) {
    CGFobject.call(this, scene);

    this.rectangle = new MyUnitCubeQuad(this.scene);

    this.triangle = new MyPyramid(this.scene);

}
;MyTrapeze.prototype = Object.create(CGFobject.prototype);
MyTrapeze.prototype.constructor = MyTrapeze;

MyTrapeze.prototype.display = function() {
  
  this.scene.pushMatrix();
  this.scene.scale(1.3, 1, 0.2);
  this.rectangle.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(0.75, 0, 0);
  this.scene.scale(0.2, 1, 0.2);
  this.triangle.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(-0.75, 0, 0);
  this.scene.rotate(Math.PI, 0, 0, 1);
  this.scene.scale(0.2, 1, 0.2);
  this.triangle.display();
  this.scene.popMatrix();
   
}