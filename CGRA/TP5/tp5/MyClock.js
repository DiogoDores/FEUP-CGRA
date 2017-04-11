/**
* MyClock
* @constructor
*/
function MyClock(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.toRad = Math.PI / 180;
    this.lastTime = 0;
    this.delta = 0;
    this.firstSetup = true;

    this.clockBody = new MyCylinder(this.scene,slices,stacks);
    this.clockBody.initBuffers();

    this.clockSurface = new MyPolygon(this.scene,slices);
    this.clockSurface.initBuffers();

    this.minutesHand = new MyClockHand(this.scene);
    this.minutesHand.setAngle(180);
    this.minutesHand.initBuffers();

    this.hoursHand = new MyClockHand(this.scene);
    this.hoursHand.setAngle(90);
    this.hoursHand.initBuffers();

    this.secondsHand = new MyClockHand(this.scene);
    this.secondsHand.setAngle(270);
    this.secondsHand.initBuffers();

    this.clockApearance = new CGFappearance(this.scene);
    this.clockApearance.setAmbient(0.25, 0.25, 0.25, 1);
    this.clockApearance.setDiffuse(0.85, 0.85, 0.85, 1);
    this.clockApearance.setSpecular(0.65, 0.65, 0.65, 1);
    this.clockApearance.setShininess(120);
    this.clockApearance.loadTexture("../resources/images/clock.png");

    this.clockHandAppearance = new CGFappearance(this.scene);
    this.clockHandAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.clockHandAppearance.setDiffuse(0, 0, 0, 1);
    this.clockHandAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.clockHandAppearance.setShininess(120);

    this.secondsHandAppearance = new CGFappearance(this.scene);
    this.secondsHandAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.secondsHandAppearance.setDiffuse(0.1, 1, 0, 1);
    this.secondsHandAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.secondsHandAppearance.setShininess(120);

    this.initBuffers();
}
;MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(7.3, 7.2, 0);
    this.scene.scale(0.6, 0.6, 0.1);
    this.clockBody.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.clockApearance.apply();
    this.scene.translate(7.3, 7.2, 0.1);
    this.scene.scale(0.6, 0.6, 1);
    this.clockSurface.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.clockHandAppearance.apply();
    this.scene.translate(7.3, 7.2, 0.11);
    this.scene.rotate(-this.minutesHand.angle * this.toRad, 0, 0, 1);
    this.scene.scale(0.02, 0.47, 1);
    this.minutesHand.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.clockHandAppearance.apply();
    this.scene.translate(7.3, 7.2, 0.11);
    this.scene.rotate(-this.hoursHand.angle * this.toRad, 0, 0, 1);
    this.scene.scale(0.035, 0.3, 1);
    this.hoursHand.display();
    this.scene.popMatrix();

    
    this.scene.pushMatrix();
    this.secondsHandAppearance.apply();
    this.scene.translate(7.3, 7.2, 0.12);
    this.scene.rotate(-this.secondsHand.angle * this.toRad, 0, 0, 1);
    this.scene.scale(0.017, 0.5, 1);
    this.secondsHand.display();
    this.scene.popMatrix();

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();

}
;

MyClock.prototype.update = function(currTime) {

    this.delta = currTime - this.lastTime;
    this.lastTime = currTime;

	if (this.firstSetup) {
		this.delta = 0;
		this.firstSetup = false;
	}
	
 	this.secondsHand.setAngle(this.secondsHand.angle + 6 * (this.delta / 1000));
 	this.minutesHand.setAngle(this.minutesHand.angle + (360 / 3600) * (this.delta / 1000));
 	this.hoursHand.setAngle(this.hoursHand.angle + 360 / (3600 * 60) * (this.delta / 1000));
}
;
