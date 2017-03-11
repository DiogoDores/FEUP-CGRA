function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [

	/* Exercício 1:
			-0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0,

			0, 0.5, 0,
            0, 1.5, 0,
            1.0, 0.5, 0,
            -1.0, 0.5, 0
            */

			//Vértices da face traseira (z = -0.5)
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,

			//Vértices da face dianteira (z = 0.5)
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5

           
			];

	this.indices = [

			//Face traseira, ou seja, contida no plano xOy
            0, 2, 1, 
			3, 1, 2,

			//Face frontal, ou seja, contida no plano z=1
			4, 5, 6,
			7, 6, 5,
			
			//Face lateral contida no plano x = 0.5
			5, 1, 7,
			3, 7, 1,
			
			//Face lateral contida no plano x = - 0.5
			4, 6, 0,
			2, 0, 6,

			//Topo do cubo
			6, 7, 2,
			3, 2, 7,

			//Base do cubo
			4, 0, 5,
			1, 5, 0


	/*Exercício 1:
			0, 1, 2, 
			3, 2, 1,

			6, 5, 4,
			7, 4, 5*/
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};