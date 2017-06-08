/**
* MyExplosion
* @constructor
*/
function MyExplosion(scene, x, y, z) {
    CGFobject.call(this, scene);

    this.x = x;
    this.y = y;
    this.z = z;

    this.firstSetup = true;
    this.lastTime = 0;

    this.size = 0.6;
    this.transparency = 1;
    this.return = false;

    this.animationEnd = false;

    this.semiSphere = new MyLamp(this.scene,20,20);
}
;MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyExplosion;

MyExplosion.prototype.display = function() {

    //Top half
    this.scene.pushMatrix();
    this.semiSphere.display();
    this.scene.popMatrix();

    //Bottom half
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.semiSphere.display();
    this.scene.popMatrix();

}

MyExplosion.prototype.update = function(currTime) {

    if (this.reverse) {
        if (this.size >= 0)
            this.size -= 0.05;
        else
            this.scene.animationEnd = true;
    } else {
        this.size += 0.05;
        if (this.size >= 2.5)
            this.reverse = true;
    }

}
