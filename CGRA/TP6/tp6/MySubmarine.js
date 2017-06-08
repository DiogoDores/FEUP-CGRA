/**
* MySubmarine
* @constructor
*/
function MySubmarine(scene) {
    CGFobject.call(this, scene);

    this.x = 8;
    this.y = 2;
    this.z = 7;

    this.periscopeY = 1.2;

    this.rotHelix = -Math.PI / 4;
    this.angle = Math.PI;
    this.vHelixAngle = 0;
    this.hHelixAngle = 0;
    this.upAngle = 0;

    this.firstSetup = true;
    this.lastTime = 0;

    this.resetPosition = false;

    this.cylinder = new MyCylinder(this.scene,50,20,false);

    this.semiSphere = new MyLamp(this.scene,20,20);

    this.lids = new MyPolygon(this.scene,50);

    this.helixProtector = new MyCylinder(this.scene,8,20,true);

    this.helix = new MyUnitCubeQuad(this.scene);

    this.trapeze = new MyTrapeze(this.scene);

    /* ----------------------------- Texture Handling -------------------------*/

    this.steelAppearance = new CGFappearance(this.scene);
    this.steelAppearance.setAmbient(0.25, 0.25, 0.25, 1);
    this.steelAppearance.setDiffuse(0.75, 0.75, 0.75, 1);
    this.steelAppearance.setSpecular(0.75, 0.75, 0.75, 1);
    this.steelAppearance.setShininess(10);
    this.steelAppearance.loadTexture("../resources/images/steel.png");

    this.camoAppearance = new CGFappearance(this.scene);
    this.camoAppearance.setAmbient(0.25, 0.25, 0.25, 1);
    this.camoAppearance.setDiffuse(0.75, 0.75, 0.75, 1);
    this.camoAppearance.setSpecular(0.75, 0.75, 0.75, 1);
    this.camoAppearance.setShininess(10);
    this.camoAppearance.loadTexture("../resources/images/camo.png");

    this.yellowAppearance = new CGFappearance(this.scene);
    this.yellowAppearance.setAmbient(0.25, 0.25, 0.25, 1);
    this.yellowAppearance.setDiffuse(1, 1, 0, 1);
    this.yellowAppearance.setSpecular(0.75, 0.75, 0.75, 1);
    this.yellowAppearance.setShininess(10);

    this.submarineAppearances = [];
    this.submarineAppearances.push(this.steelAppearance, this.camoAppearance, this.yellowAppearance);
    this.index = 0;
}
;MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {

    this.submarineAppearances[this.index].apply();

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

    //Top Cylinder
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 3);
    this.scene.scale(0.5, 1.2, 0.5);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.cylinder.display();
    this.scene.popMatrix();

    //Top lid 
    this.scene.pushMatrix();
    this.scene.translate(0, 1.2, 3);
    this.scene.scale(0.5, 1, 0.5);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.lids.display();
    this.scene.popMatrix();

    /*------------Periscope------------*/

    //Bottom
    this.scene.pushMatrix();
    this.scene.translate(0, this.periscopeY, 3.1);
    this.scene.scale(0.1, 1.5, 0.1);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.cylinder.display();
    this.scene.popMatrix();

    //Top
    this.scene.pushMatrix();
    this.scene.translate(0, this.periscopeY + 1.4, 3.1);
    this.scene.scale(0.1, 0.1, 0.2);
    this.cylinder.display();
    this.scene.popMatrix();

    //Lid
    this.scene.pushMatrix();
    this.scene.translate(0, this.periscopeY + 1.5, 3.1);
    this.scene.scale(0.1, 1, 0.1);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.lids.display();
    this.scene.popMatrix();

    /*------------------------------------*/

    /*---------------Helix Protector----------------*/

    //Right
    this.scene.pushMatrix();
    this.scene.translate(-0.95, -0.5, 0);
    this.scene.scale(0.4, 0.4, 0.4);
    this.helixProtector.display();
    this.scene.popMatrix();

    //Left
    this.scene.pushMatrix();
    this.scene.translate(0.95, -0.5, 0);
    this.scene.scale(0.4, 0.4, 0.4);
    this.helixProtector.display();
    this.scene.popMatrix();

    /*------------------------------------*/

    /*---------------------Helix----------------------*/

    //Left
    this.scene.pushMatrix();
    this.scene.translate(0.95, -0.5, 0.1);
    this.scene.rotate(this.rotHelix, 0, 0, 1);
    this.scene.scale(0.25, 0.65, 0.05);
    this.helix.display();
    this.scene.popMatrix();

    //Right
    this.scene.pushMatrix();
    this.scene.translate(-0.95, -0.5, 0.2);
    this.scene.rotate(-this.rotHelix, 0, 0, 1);
    this.scene.scale(0.25, 0.65, 0.05);
    this.helix.display();
    this.scene.popMatrix();

    /*----------------------------------*/

    this.scene.pushMatrix();
    this.scene.translate(0, 0.9, 3);
    this.scene.scale(1, 0.1, 1);
    this.trapeze.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.1);
    this.scene.rotate(this.hHelixAngle, 1, 0, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scene.scale(1.3, 0.1, 1);
    this.trapeze.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.1);
    this.scene.rotate(this.vHelixAngle, 0, 1, 0);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.scale(1.3, 0.1, 1);
    this.trapeze.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.95, -0.5, 0.2);
    this.scene.scale(0.05, 0.05, 0.05);
    this.semiSphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.95, -0.5, 0.2);
    this.scene.scale(0.05, 0.05, 0.05);
    this.semiSphere.display();
    this.scene.popMatrix();
}

MySubmarine.prototype.setX = function(x) {
    this.x = x;
}

MySubmarine.prototype.setY = function(y) {
    this.y = y;
}

MySubmarine.prototype.setZ = function(z) {
    this.z = z;
}

MySubmarine.prototype.setPeriscopeY = function(periscopeY) {
    this.periscopeY = periscopeY;
}

MySubmarine.prototype.setAngle = function(angle) {
    this.angle = angle;
}

MySubmarine.prototype.setVHelixAngle = function(helixAngle) {
    this.vHelixAngle = helixAngle;
}

MySubmarine.prototype.setHHelixAngle = function(helixAngle) {
    this.hHelixAngle = helixAngle;
}

MySubmarine.prototype.setUpAngle = function(upAngle) {
    this.upAngle = upAngle;
}

MySubmarine.prototype.setResetPosition = function(resetPosition) {
    this.resetPosition = resetPosition;
}

MySubmarine.prototype.update = function(currTime) {

    var delta = 0;

    this.delta = currTime - this.lastTime;
    this.lastTime = currTime;

    if (this.firstSetup) {
        this.delta = 0;
        this.firstSetup = false;
    }

    this.x += (this.delta / 100) * (-Math.sin(-this.angle) / 10) * this.scene.speed;
    this.z += (this.delta / 100) * (Math.cos(-this.angle) / 10) * this.scene.speed;

    this.rotHelix += (this.delta / 100) * (this.scene.speed / 10) * 6;

    if (this.resetPosition) {
        var diffV = 0 - this.vHelixAngle;
        var diffH = 0 - this.hHelixAngle;
        var diffU = 0 - this.upAngle;

        if (diffV <= 0) {
            this.vHelixAngle = this.vHelixAngle - Math.PI / 180;
        } else {
            this.vHelixAngle = this.vHelixAngle + Math.PI / 180;
        }

        if (diffH <= 0) {
            this.hHelixAngle = this.hHelixAngle - Math.PI / 180;
        } else {
            this.hHelixAngle = this.hHelixAngle + Math.PI / 180;
        }

        if (diffU <= 0) {
            this.upAngle = this.upAngle - Math.PI / 180;
        } else {
            this.upAngle = this.upAngle + Math.PI / 180;
        }
    } 
}
