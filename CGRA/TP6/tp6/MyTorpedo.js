/**
* MyTorpedo
* @constructor
*/
function MyTorpedo(scene) {
    CGFobject.call(this, scene);

    this.x = this.scene.submarine.x;
    this.y = this.scene.submarine.y;
    this.z = this.scene.submarine.z;

    //To help managing the system's time
    this.firstSetup = true;
    this.lastTime = 0;
    
    //Related to the target
    this.target = null;

    //Related to the Bezier's curve
    this.distance = 0;
    this.t = 0;
    this.tInc = 0;

    this.P1 = [this.x, this.y, this.z];
    this.P2 = [this.x + 6*Math.sin(this.scene.submarine.angle),
               this.y,
               this.z + 6*Math.cos(this.scene.submarine.angle)];

    this.showExplosion = false;
    this.animationEnd = false;

    //Object declaration
    this.cylinder = new MyCylinder(this.scene,50,20,false);

    this.semiSphere = new MyLamp(this.scene,20,20);

    this.trapeze = new MyTrapeze(this.scene);
}
;MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {

    //Main Cylinder
    this.scene.pushMatrix();
    this.scene.scale(0.7, 0.7, 4.08);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 4);
    this.scene.scale(0.7, 0.7, 0.7);
    this.semiSphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.08);
    this.scene.scale(0.7, 0.7, 0.7);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.semiSphere.display();
    this.scene.popMatrix();

    /*----------------------------------*/

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.1);
    this.scene.scale(1.3, 0.1, 1);
    this.trapeze.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.1);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.scale(1.3, 0.1, 1);
    this.trapeze.display();
    this.scene.popMatrix();
}

MyTorpedo.prototype.setX = function(x) {
    this.x = x;
}

MyTorpedo.prototype.setY = function(y) {
    this.y = y;
}

MyTorpedo.prototype.setZ = function(z) {
    this.z = z;
}

MyTorpedo.prototype.setTarget = function(target) {
    this.target = target;

    this.P3 = [this.target.x, this.target.y + 3, this.target.z];
    this.P4 = [this.target.x, this.target.y, this.target.z];

    this.distance = Math.sqrt(
                            Math.pow((this.target.x - this.P1[0]), 2) +
                            Math.pow((this.target.y - this.P1[1]), 2) + 
                            Math.pow((this.target.z - this.P1[2]), 2)
                            );

}

MyTorpedo.prototype.update = function(currTime) {
    
    var delta = 0;

    this.delta = currTime - this.lastTime;
    this.lastTime = currTime;

    if (this.firstSetup) {
        this.delta = 0;
        this.firstSetup = false;
    }

    this.tInc =  (this.delta / 1000) / this.distance;


        if (this.t <= 1) {

            this.q0 = Math.pow((1 - this.t), 3);
            this.q1 = 3 * this.t * Math.pow((1 - this.t), 2);
            this.q2 = 3 * Math.pow(this.t, 2) * (1 - this.t);
            this.q3 = Math.pow(this.t, 3);

            this.transX = (this.q0 * this.P1[0] + this.q1 * this.P2[0] + this.q2 * this.P3[0] + this.q3 * this.P4[0]);

            this.transY = (this.q0 * this.P1[1] + this.q1 * this.P2[1] + this.q2 * this.P3[1] + this.q3 * this.P4[1]);

            this.transZ = (this.q0 * this.P1[2] + this.q1 * this.P2[2] + this.q2 * this.P3[2] + this.q3 * this.P4[2]);

            //To determine the angle
            var a = this.transX - this.x;
            var b = this.transY - this.y;
            var c = this.transZ - this.z;

            //Determines the torpedo's position

            this.x = this.transX;
            this.y = this.transY;
            this.z = this.transZ;

            //Determines the torpedo's angle

            this.yAng = Math.atan(a / c) + (c < 0 ? Math.PI : 0);
	        this.xAng = Math.atan(b / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2)));

            //Bezier's curve t
            this.t += this.tInc;

        } else {

		    this.animationEnd = true;
		    this.scene.showTorpedo = false;
            this.target.setDestroyed(true);
            this.scene.showExplosion = true;
            this.scene.setNextTarget(true);
        }
     

};