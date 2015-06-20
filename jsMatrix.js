function jsMatrix(){

	function MatrixN(args){
		var _m = null;
		var _d = null;

		if(args != null){
			if(args.m != null){ 
				_m = args.m; 
				_d = args.depth;
			}
			else if(args.depth != null && args.depth > 0){ 
				_d = args.depth; 
				init(_d); 
			}
		}

		function init(n){
			var a = [];
			for(var i = 0; i < Math.pow(n, 2); i++){
				if(i % (n + 1) == 0) { a.push(1); }
				else{ a.push(0); }
			}
			_m = new Float32Array(a);
		};

		this.getMatrix = function() { return _m; }
		this.setMatrix = function(m) { _m = m; }
		this.getDepth = function() { return _d; }
	};

	MatrixN.prototype.constructor = MatrixN;

	MatrixN.prototype.toString = function() { 
		var d = this.getDepth();
		var m = this.getMatrix();
		var s = "\n";
		for(var i = 0; i < m.length; i++){
			if((i + 1) % d == 0) { s += m[i] + "\n"; }
			else { s += m[i] + "\t"; }
		} 
		return s;
	};

	MatrixN.prototype.getMatrix = function() { return this.getMatrix(); };
	MatrixN.prototype.setMatrix = function(m) { this.setMatrix(m); return this;}
	MatrixN.prototype.getDepth = function() { return this.getDepth(); };
	
	//zero based
	MatrixN.prototype.getRow = function(n) {
		var a = [];
		var d = this.getDepth();
		var m = this.getMatrix();
		if(n > (d - 1)) { throw 'Row ' + n + ' is out of range. Matrix depth: ' + d; }
		else
		for(var i = (d * n); i < ((d * n) + d); i++){
			a.push(m[i]);
		}
		return a;
	};

	//zero based
	MatrixN.prototype.getCol = function(n) {
		var a = [];
		var d = this.getDepth();
		var m = this.getMatrix();
		for(var i = n; i <= (Math.pow(d, 2) - (d - n)); i++){
			if((i + (d - n)) % d == 0){
				a.push(m[i]);
			}
		}
		return a;
	};

	MatrixN.prototype.MV = function(v1, v2){
		var r = 0;
		for(var i = 0; i < v1.length; i++){
			r += (v1[i] * v2[i]);
		}
		return r;
	};

	function Matrix4(matrix){

		if(matrix instanceof Float32Array){
			MatrixN.call(this, {
				m: matrix,
				depth: 4
			});
		} else {
			MatrixN.call(this, {
				m: null,
				depth: 4
			});
		}

	};	

	Matrix4.prototype = Object.create(MatrixN.prototype);
	Matrix4.prototype.constructor = Matrix4;

	Matrix4.prototype.MM4 = function(m) {
		var aug = new Float32Array([
			this.MV(this.getRow(0), m.getCol(0)), this.MV(this.getRow(0), m.getCol(1)), this.MV(this.getRow(0), m.getCol(2)), this.MV(this.getRow(0), m.getCol(3)),
			this.MV(this.getRow(1), m.getCol(0)), this.MV(this.getRow(1), m.getCol(1)), this.MV(this.getRow(1), m.getCol(2)), this.MV(this.getRow(1), m.getCol(3)),
			this.MV(this.getRow(2), m.getCol(0)), this.MV(this.getRow(2), m.getCol(1)), this.MV(this.getRow(2), m.getCol(2)), this.MV(this.getRow(2), m.getCol(3)),
			this.MV(this.getRow(3), m.getCol(0)), this.MV(this.getRow(3), m.getCol(1)), this.MV(this.getRow(3), m.getCol(2)), this.MV(this.getRow(3), m.getCol(3))]);
		return aug;
	};

	Matrix4.prototype.Translate = function(x, y, z){
		//TODO: supposidly, WebGL prefers column major, however when setting this up as
		//column major, WebGL is going freaky...need to investigate further
		var aug = new Float32Array([
			1.0, 0.0, 0.0, (x * 1.0),
			0.0, 1.0, 0.0, (y * 1.0),
			0.0, 0.0, 1.0, (z * 1.0),
			0.0, 0.0, 0.0, 1.0
		]);
		this.setMatrix(this.MM4(new Matrix4(aug)));
		return this;
	};

	Matrix4.prototype.dRotate = function(degree){
		var r = (Math.PI * degree) / 180;
		var aug = new Float32Array([
			Math.cos(r), Math.sin(r), 0.0, 0.0,
			-Math.sin(r), Math.cos(r), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		]);
		this.setMatrix(this.MM4(new Matrix4(aug)));
		return this;
	};

	Matrix4.prototype.rRotate = function(radian){
		var aug = new Float32Array([
			Math.cos(radian), Math.sin(radian), 0.0, 0.0,
			-Math.sin(radian), Math.cos(radian), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		]);
		this.setMatrix(this.MM4(new Matrix4(aug)));
		return this;
	}

	Matrix4.prototype.Scale = function(amount){
		var aug = new Float32Array([
			(amount * 1.0), 0.0, 0.0, 0.0,
			0.0, (amount * 1.0), 0.0, 0.0,
			0.0, 0.0, (amount * 1.0), 0.0,
			0.0, 0.0, 0.0, 1.0
		]);
		this.setMatrix(this.MM4(new Matrix4(aug)));
		return this;
	};

	this.MatrixN = new MatrixN(null);
	this.Matrix4 = new Matrix4(null);

}

var $M = new jsMatrix();