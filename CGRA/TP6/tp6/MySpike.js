/**
* MySpike
* @constructor
*/
function MySpike(scene) {
    CGFobject.call(this, scene);

    this.cylinder = new MyCylinder(this.scene,50,20,false);

    this.semiSphere = new MyLamp(this.scene,20,20);

    this.lid = new MyPolygon(this.scene, 50, 20);
}
;MySpike.prototype = Object.create(CGFobject.prototype);
MySpike.prototype.constructor = MySpike;

MySpike.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.1, 0.1);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.1);
    this.scene.scale(0.1, 0.1, 0.1);
    this.lid.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.1);
    this.scene.scale(0.05, 0.05, 0.25);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.34);
    this.scene.scale(0.05, 0.05, 0.05);
    this.semiSphere.display();
    this.scene.popMatrix();
}