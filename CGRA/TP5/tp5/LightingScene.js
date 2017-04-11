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

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
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
    this.lamp = new MyLamp(this,8,20);
    this.clock = new MyClock(this, 12, 1);
    this.paperPlane = new MyPaperPlane(this);

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

    this.wallsMaterial = new CGFappearance(this);
    this.wallsMaterial.setAmbient(0.5, 0.7, 0.7, 1);
    this.wallsMaterial.setDiffuse(0.5, 0.7, 0.7, 1);
    this.wallsMaterial.setSpecular(0.5, 0.7, 0.7, 1);
    this.wallsMaterial.setShininess(120);

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

    this.setUpdatePeriod(100);
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

    // Floor
    this.pushMatrix();
    this.floorMaterial.apply();
    this.translate(7.5, 0, 7.5);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(15, 15, 0.2);
    this.floor.display();
    this.popMatrix();

    // Left Wall
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
    this.translate(5, 0, 14);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.lamp.display();
    this.popMatrix();

    this.pushMatrix();
    this.clock.display();
    this.popMatrix();

    this.pushMatrix();
    this.paperMaterial.apply();
    this.translate(12, 3.65, 8);
    this.paperPlane.display();
    this.popMatrix();

    // ---- END Primitive drawing section
}
;

LightingScene.prototype.update = function(currTime){
    this.clock.update(currTime);
}