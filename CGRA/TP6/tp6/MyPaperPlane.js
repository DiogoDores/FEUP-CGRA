/**
* MyPaperPlane
* @constructor
*/
function MyPaperPlane(scene) {
    CGFobject.call(this, scene);

    this.x = 12;
    this.y = 3.65;
    this.z = 8;
    this.rotZ = -10;
    this.rotX = 0;
    this.lastUpdate = -1;
    //this.diff = 0;
    this.firstSetup = true;
    this.elapsedTime = 0;

    this.initBuffers();
}
;MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor = MyPaperPlane;

MyPaperPlane.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];

    this.vertices.push(0.9, 0.16, 0.35);
    this.vertices.push(0.9, 0.16, 0.03);
    this.vertices.push(0.2, 0.16, 0.03);
    this.vertices.push(0, 0, 0);
    this.vertices.push(0.7, 0, 0);
    this.vertices.push(0.2, 0.16, -0.03);
    this.vertices.push(0.9, 0.16, -0.03);
    this.vertices.push(0.9, 0.16, -0.35);

    this.normals.push(0, 1, -1);
    this.normals.push(0, 1, -1);
    this.normals.push(0, 1, -1);
    this.normals.push(0, 0, 1);
    this.normals.push(0, 0, 1);
    this.normals.push(0, 1, -1);
    this.normals.push(0, 1, -1);
    this.normals.push(0, 1, -1);

    this.indices.push(0, 1, 2);
    this.indices.push(2, 1, 0);
    this.indices.push(1, 2, 4);
    this.indices.push(4, 2, 1);
    this.indices.push(4, 3, 2);
    this.indices.push(2, 3, 4);
    this.indices.push(3, 4, 6);
    this.indices.push(6, 4, 3);
    this.indices.push(3, 6, 5);
    this.indices.push(5, 6, 3);
    this.indices.push(7, 5, 6);
    this.indices.push(6, 5, 7);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
MyPaperPlane.prototype.update = function(currTime) {
    
    //var diff = 0;

    //var diff = currTime - this.lastUpdate;
      //  this.lastUpdate = currTime;

    if (this.firstSetup) {
        this.diff = currTime;
        this.firstSetup = false;
    }

   if (this.x > 0.5 && this.elapsedTime > 1000) {
         var diff = currTime - this.lastUpdate;
        this.lastUpdate = currTime;

        this.x -= (5 * (diff / 1000));
        this.y += diff / 1000;
    } else if (Math.floor(this.y) > 0 && this.elapsedTime > 1000) {
        var diff = currTime - this.lastUpdate;
        this.lastUpdate = currTime;

        this.y -= (diff * (5 / 1000));
        this.rotZ -= (diff * 245 / 1000);
        this.rotX -= (diff * 500 / 1000);
    } else {
        var diff = currTime - this.lastUpdate;
        this.lastUpdate = currTime;
        this.elapsedTime += diff;
    }
}
