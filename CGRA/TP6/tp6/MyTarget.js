/**
* MyTarget
* @constructor
*/
function MyTarget(scene, x, y, z) {
    CGFobject.call(this, scene);

    this.x = x;
    this.y = y;
    this.z = z;

    this.destroyed = false;

    this.target1 = new MyLamp(this.scene,20,20);

    this.spike = new MySpike(this.scene);

}
;MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function() {

    this.scene.pushMatrix();
    this.target1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.target1.display();
    this.scene.popMatrix();

    for (var i = 0; i < Math.PI * 2; i += Math.PI / 2) {
        this.scene.pushMatrix();
        this.scene.translate(Math.sin(i), Math.cos(i), 0);
        this.scene.rotate(-i, 0, 0, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.spike.display();
        this.scene.popMatrix();
    }

     for (var i = 0; i < Math.PI * 2; i += Math.PI / 2) {
        this.scene.pushMatrix();
        this.scene.translate(Math.sin(i), 0, Math.cos(i));
        this.scene.rotate(i, 0, 1, 0);
        this.spike.display();
        this.scene.popMatrix();
    }

}

MyTarget.prototype.setDestroyed = function(destroyed){
    this.destroyed = destroyed;
}
