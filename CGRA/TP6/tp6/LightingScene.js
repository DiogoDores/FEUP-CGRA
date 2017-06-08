var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.enableTextures(true);

    this.gl.clearColor(0.0, 0.2, 0.3, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    // Scene elements
    this.table = new MyTable(this);
    this.wall = new MyQuad(this,-1,2,-0.5,1.5);
    this.floor = new MyQuad(this,0,10,0,12);
    this.prism = new MyPrism(this,8,20);
    this.cylinder = new MyCylinder(this,8,20);
    this.clock = new MyClock(this,12,1);
    this.paperPlane = new MyPaperPlane(this,14,4);
    this.submarine = new MySubmarine(this);

    this.target1 = new MyTarget(this, 0.5, 1, 5);
    this.target2 = new MyTarget(this, 12, 1, 0.5);
    this.targetList = [this.target1, this.target2];

    this.boardA = new Plane(this,BOARD_A_DIVISIONS,0,1,0,1);
    this.boardB = new Plane(this,BOARD_B_DIVISIONS,0,1,0,1);

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.materialA = new CGFappearance(this);
    this.materialA.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialA.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialA.setSpecular(0, 0, 0.8, 1);
    this.materialA.setShininess(120);

    this.materialB = new CGFappearance(this);
    this.materialB.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialB.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialB.setSpecular(0.8, 0.8, 0.8, 1);
    this.materialB.setShininess(120);

    this.floorMaterial = new CGFappearance(this);
    this.floorMaterial.setAmbient(0.7, 0.7, 0.6, 1);
    this.floorMaterial.setDiffuse(0.4, 0.4, 0.4, 1);
    this.floorMaterial.setSpecular(0.7, 0.7, 0.6, 1);
    this.floorMaterial.setShininess(120);

    this.tableAppearence = new CGFappearance(this);
    this.tableAppearence.setAmbient(0.4, 0.2, 0, 1);
    this.tableAppearence.setDiffuse(0.5, 0.5, 0, 5);
    this.tableAppearence.setSpecular(0.01, 0.01, 0.01, 0.01);
    this.tableAppearence.loadTexture("../resources/images/table.png");
    this.tableAppearence.setShininess(10);

    this.metalLegsMaterial = new CGFappearance(this);
    this.metalLegsMaterial.setAmbient(0.3, 0.3, 0.3, 1);
    this.metalLegsMaterial.setDiffuse(0.3, 0.3, 0.3, 1);
    this.metalLegsMaterial.setSpecular(0.7, 0.7, 0.7, 1);
    this.metalLegsMaterial.setShininess(200);

    this.floorMaterial = new CGFappearance(this);
    this.floorMaterial.loadTexture("../resources/images/floor.png");

    this.windowAppearance = new CGFappearance(this);
    this.windowAppearance.loadTexture("../resources/images/window.png");

    this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

    this.waterAppearance = new CGFappearance(this);
    this.waterAppearance.loadTexture("../resources/images/water.png");
    this.waterAppearance.setTextureWrap("REPEAT", "REPEAT");

    this.slidesApearence = new CGFappearance(this);
    this.slidesApearence.setAmbient(0.25, 0.25, 0.25, 1);
    this.slidesApearence.setDiffuse(0.75, 0.75, 0.75, 1);
    this.slidesApearence.setSpecular(0.25, 0.25, 0.25, 1);
    this.slidesApearence.setShininess(5);
    this.slidesApearence.loadTexture("../resources/images/slides.png");

    this.boardApearence = new CGFappearance(this);
    this.boardApearence.setAmbient(0.25, 0.25, 0.25, 1);
    this.boardApearence.setDiffuse(0.85, 0.85, 0.85, 1);
    this.boardApearence.setSpecular(0.65, 0.65, 0.65, 1);
    this.boardApearence.setShininess(120);
    this.boardApearence.loadTexture("../resources/images/board.png");

    this.cylinderApearance = new CGFappearance(this);

    this.cylinderApearance.setAmbient(0.25, 0.25, 0.25, 1);
    this.cylinderApearance.setDiffuse(0.85, 0.85, 0.85, 1);
    this.cylinderApearance.setSpecular(0.65, 0.65, 0.65, 1);
    this.cylinderApearance.setShininess(120);
    this.cylinderApearance.loadTexture("../resources/images/cylinder.png");

    this.paperMaterial = new CGFappearance(this);
    this.paperMaterial.setAmbient(0.3, 0.3, 0.3, 1);
    this.paperMaterial.setDiffuse(1, 1, 1, 1);
    this.paperMaterial.setSpecular(0, 0, 0.8, 1);
    this.paperMaterial.setShininess(120);

    this.explosionAppearance = new CGFappearance(this);
    this.explosionAppearance.setAmbient(0.5, 0.5, 0.5, 1);
    this.explosionAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.explosionAppearance.setSpecular(0, 0, 0, 1);
    this.explosionAppearance.setShininess(100);
    this.explosionAppearance.loadTexture("../resources/images/explosion.png");
    this.explosionAppearance.setTextureWrap("REPEAT", "REPEAT");

    //Interface Options
    this.Light_1 = true;
    this.Light_2 = false;
    this.Light_3 = true;
    this.Light_4 = true;

    this.Stop_Clock = false;
    this.speed = 0;

    //Texture loading
    this.submarineAppearanceList = ['Steel', 'Camo', 'Yellow'];
    this.currSubmarineAppearance = 0;

    //For interacting with the torpedo
    this.drawTorpedo = false;
    this.nextTarget = true;
    this.showExplosion = false;
    this.animationEnd = false;
    this.showTorpedo = true;
    this.torpedoList = [];

    this.i = 0;

    this.setUpdatePeriod(1);
}
;

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
}
;

LightingScene.prototype.initLights = function() {
    this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true);
    // show marker on light position (different from enabled)

    this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
    this.lights[1].setVisible(true);
    // show marker on light position (different from enabled)

    this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
    //this.lights[2].setVisible(true);

    //this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[3].setPosition(4, 6.0, 5.0, 1.0);

    //this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(0.2, 0.2, 0.2, 0.2);
    this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
    this.lights[0].enable();

    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();

    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);

    this.lights[2].setConstantAttenuation(0);
    this.lights[2].setLinearAttenuation(1.0);
    this.lights[2].setQuadraticAttenuation(0);

    this.lights[2].enable;

    this.lights[3].setAmbient(0, 0, 0, 1);
    this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);

    this.lights[3].setConstantAttenuation(0);
    this.lights[3].setLinearAttenuation(0.2);
    this.lights[3].setQuadraticAttenuation(0);

    this.lights[3].enable();
}
;

LightingScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
}

LightingScene.prototype.setNextTarget = function(nextTarget) {
    this.nextTarget = nextTarget;
}

LightingScene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Update all lights used
    this.updateLights();

    // Draw axis
    this.axis.display();

    this.materialDefault.apply();

    // ---- END Background, camera and axis setup

    // ---- BEGIN Geometric transformation section

    // ---- END Geometric transformation section

    // ---- BEGIN Primitive drawing section

    //Displays the torpedo
    if (this.drawTorpedo) {

        this.pushMatrix();
        this.submarine.steelAppearance.apply();
        this.translate(this.torpedo.x, this.torpedo.y, this.torpedo.z);
        this.rotate(this.torpedo.yAng, 0, 1, 0);
        this.rotate(-this.torpedo.xAng, 1, 0, 0);
        this.scale(0.3, 0.3, 0.3);
        this.translate(0, 0, -4.5);

        if (this.showTorpedo)
            this.torpedo.display();

        this.popMatrix();
    }

    //Displays the targets
    for (var i = 0; i < this.targetList.length; i++) {
        if (this.targetList[i] != null) {
            this.pushMatrix();
            this.submarine.steelAppearance.apply();
            this.translate(this.targetList[i].x, this.targetList[i].y, this.targetList[i].z);
            this.scale(0.5, 0.5, 0.5);
            if (!this.targetList[i].destroyed)
                this.targetList[i].display();
            this.popMatrix();
        }
    }

    //Displays the explosion
    if (this.showExplosion && !this.animationEnd) {
        this.pushMatrix();
        this.explosionAppearance.apply();
        this.translate(this.explosion.x, this.explosion.y, this.explosion.z);
        this.scale(this.explosion.size, this.explosion.size, this.explosion.size);
        this.explosion.display();
        this.popMatrix();
    } else {
        this.animationEnd = false;
        this.showExplosion = false;
    }

    //Displays the submarine
    this.pushMatrix();
    this.translate(this.submarine.x, this.submarine.y, this.submarine.z);
    this.rotate(this.submarine.angle, 0, 1, 0);
    this.rotate(-this.submarine.upAngle, 1, 0, 0);
    this.translate(0, 0, -2.04);
    this.submarine.display();
    this.popMatrix();

    //Displays the clock
    this.pushMatrix();
    this.clock.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(8, 0, 0);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.scale(0.1, 0.1, 5);
    this.cylinderApearance.apply();
    this.cylinder.display();
    this.popMatrix();

    // Floor
    this.pushMatrix();
    //this.floorMaterial.apply();
    this.translate(7.5, 0, 7.5);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(15, 15, 0.2);
    this.waterAppearance.apply();
    this.floor.display();
    this.popMatrix();

    /* // Left Wall
    this.pushMatrix();
    this.windowAppearance.apply();
    this.translate(0, 4, 7.5);
    this.rotate(90 * degToRad, 0, 1, 0);
    this.scale(15, 8, 0.2);
    this.wall.display();
    this.popMatrix();

    // Plane Wall
    this.pushMatrix();
    this.wallsMaterial.apply();
    this.translate(7.5, 4, 0);
    this.scale(15, 8, 0.2);
    this.wall.display();
    this.popMatrix();

    // First Table
    this.pushMatrix();
    this.translate(5, 0, 8);
    this.table.display();
    this.popMatrix();

    // Second Table
    this.pushMatrix();
    this.translate(12, 0, 8);
    this.table.display();
    this.popMatrix();

    // Board A
    this.pushMatrix();
    this.translate(4, 4.5, 0.2);
    this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
    this.slidesApearence.apply();
    this.boardA.display();
    this.popMatrix();

    // Board B
    this.pushMatrix();
    this.translate(10.5, 4.5, 0.2);
    this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
    this.boardApearence.apply();
    this.boardB.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(1, 0, 1);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.scale(1, 1, 8);
    this.cylinderApearance.apply();
    this.cylinder.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(1, 0, 14);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.scale(1, 1, 8);
    this.cylinderApearance.apply();
    this.cylinder.display();
    this.popMatrix();

    this.pushMatrix();
    //this.translate(5, 0, 14);
    //this.rotate(-Math.PI / 2, 1, 0, 0);
    this.lamp.display();
    this.popMatrix();

    this.pushMatrix();
    this.clock.display();
    this.popMatrix();

	//Plane
	this.pushMatrix();
	this.paperMaterial.apply();
	this.translate(this.paperPlane.x, this.paperPlane.y, this.paperPlane.z);
	this.rotate(this.paperPlane.rotZ * degToRad, 0, 0, 1);
	this.rotate(this.paperPlane.rotX * degToRad, 1, 0, 0);
	this.paperPlane.display();
	this.popMatrix();*/

    // ---- END Primitive drawing section
}
;
LightingScene.prototype.update = function(currTime) {

    if (this.Stop_Clock === false) {
        this.clock.update(currTime);
    }

    this.submarine.update(currTime);

    //this.paperPlane.update(currTime);

    if (this.drawTorpedo)
        this.torpedo.update(currTime);

    if (this.showExplosion)
        this.explosion.update(currTime);

    this.Options();

}

LightingScene.prototype.Options = function() {

    if (this.Light_1 === true) {
        this.lights[0].setVisible(true);
        this.lights[0].enable();
    } else {
        this.lights[0].disable();
        this.lights[0].setVisible(false);
    }

    if (this.Light_2 === true) {
        this.lights[1].setVisible(true);
        this.lights[1].enable();
    } else {
        this.lights[1].disable();
        this.lights[1].setVisible(false);
    }

    if (this.Light_3 === true) {
        this.lights[2].setVisible(true);
        this.lights[2].enable();
    } else {
        this.lights[2].disable();
        this.lights[2].setVisible(false);
    }

    if (this.Light_4 === true) {
        this.lights[3].setVisible(true);
        this.lights[3].enable();
    } else {
        this.lights[3].disable();
        this.lights[3].setVisible(false);
    }

    if (this.currSubmarineAppearance === 'Steel') {
        this.submarine.index = 0;
    } else if (this.currSubmarineAppearance === 'Camo') {
        this.submarine.index = 1;
    } else if (this.currSubmarineAppearance === 'Yellow') {
        this.submarine.index = 2;
    }

}
;

LightingScene.prototype.changePos = function(key) {

    if (this.submarine.angle === 2 * Math.PI)
        this.submarine.setAngle(0);

    if (key === 'w') {

        if (this.speed < 5)
            this.speed += 1;

    } else if (key === 's') {

        if (this.speed > -5)
            this.speed -= 1;

    } else if (key === 'a' && this.speed != 0) {

        this.submarine.setAngle(this.submarine.angle + (Math.PI / 180));

        if (this.submarine.vHelixAngle > -Math.PI / 4 && this.speed != 0)
            this.submarine.setVHelixAngle(this.submarine.vHelixAngle - Math.PI / 180);

    } else if (key === 'd' && this.speed != 0) {

        this.submarine.setAngle(this.submarine.angle - (Math.PI / 180));

        if (this.submarine.vHelixAngle < Math.PI / 4 && this.speed != 0)
            this.submarine.setVHelixAngle(this.submarine.vHelixAngle + Math.PI / 180);

    } else if (key === 'q') {

        this.submarine.setY(this.submarine.y + 0.05);

        if (this.submarine.hHelixAngle > -Math.PI / 4)
            this.submarine.setHHelixAngle(this.submarine.hHelixAngle - Math.PI / 180);

        if (this.submarine.upAngle < Math.PI / 12)
            this.submarine.setUpAngle(this.submarine.upAngle + Math.PI / 180);
    } else if (key === 'e') {

        if (this.submarine.y > 1.5)
            this.submarine.setY(this.submarine.y - 0.05);

        if (this.submarine.hHelixAngle < Math.PI / 4)
            this.submarine.setHHelixAngle(this.submarine.hHelixAngle + Math.PI / 180);

        if (this.submarine.upAngle > -Math.PI / 12)
            this.submarine.setUpAngle(this.submarine.upAngle - Math.PI / 180);

    } else if (key === 'p') {

        if (this.submarine.periscopeY < 1.2)
            this.submarine.setPeriscopeY(this.submarine.periscopeY + 0.05);

    } else if (key === 'l') {

        if (this.submarine.periscopeY > 0.01)
            this.submarine.setPeriscopeY(this.submarine.periscopeY - 0.05);

    } else if (key === 'f') {

        if (this.nextTarget && this.targetList[this.i] != null) {

            this.nextTarget = false;
            this.torpedo = new MyTorpedo(this);
            this.showTorpedo = true;

            var first = this.targetList[this.i];
            this.torpedo.setTarget(first);
            this.explosion = new MyExplosion(this,this.targetList[this.i].x,this.targetList[this.i].y,this.targetList[this.i].z);

            this.drawTorpedo = true;

            this.i++;

        } else if (this.nextTarget) {

            window.alert("You've destroyed all the targets!");
        }

    }
}
