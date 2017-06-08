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
    this.firstSetup = true;

    this.clockBody = new MyCylinder(this.scene,slices,stacks);

    this.clockSurface = new MyPolygon(this.scene,slices);

    this.minutesHand = new MyClockHand(this.scene);
    this.minutesHand.setAngle(180);

    this.hoursHand = new MyClockHand(this.scene);
    this.hoursHand.setAngle(90);

    this.secondsHand = new MyClockHand(this.scene);
    this.secondsHand.setAngle(270);

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
}
;MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.cylinderApearance.apply();
    this.scene.translate(8, 5, 0);
    this.scene.scale(0.6, 0.6, 0.1);
    this.clockBody.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.clockApearance.apply();
    this.scene.translate(8, 5, 0.1);
    this.scene.scale(0.6, 0.6, 1);
    this.clockSurface.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.clockHandAppearance.apply();
    this.scene.translate(8, 5, 0.11);
    this.scene.rotate(-this.minutesHand.angle * this.toRad, 0, 0, 1);
    this.scene.scale(0.02, 0.47, 1);
    this.minutesHand.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.clockHandAppearance.apply();
    this.scene.translate(8, 5, 0.11);
    this.scene.rotate(-this.hoursHand.angle * this.toRad, 0, 0, 1);
    this.scene.scale(0.035, 0.3, 1);
    this.hoursHand.display();
    this.scene.popMatrix();

    
    this.scene.pushMatrix();
    this.secondsHandAppearance.apply();
    this.scene.translate(8, 5, 0.12);
    this.scene.rotate(-this.secondsHand.angle * this.toRad, 0, 0, 1);
    this.scene.scale(0.017, 0.5, 1);
    this.secondsHand.display();
    this.scene.popMatrix();
}
;

MyClock.prototype.update = function(currTime) {

	var delta = 0;

    this.delta = currTime - this.lastTime;
    this.lastTime = currTime;

	if (this.firstSetup) {
		this.delta = 0;
		this.firstSetup = false;
	}
	
	this.hoursHand.setAngle((360 / (3600 * 60)) * (this.delta / 1000) + this.hoursHand.angle);
	this.minutesHand.setAngle((360 / 3600) * (this.delta / 1000) + this.minutesHand.angle);
 	this.secondsHand.setAngle(6 * (this.delta / 1000) + this.secondsHand.angle);
}
;
