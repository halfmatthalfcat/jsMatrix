function JSMatrix(){

	var MatrixN = function(args){
		var _m = null;
		var _d = null;

		if(args.m != null){ _m = args.m; }
		else if(args.depth != null && args.depth > 0){ 
			_d = args.depth; 
			init(_d); 
		}

		function init(n){
			var a = [];
			for(var i = 0; i < Math.pow(n, 2); i++){
				if(i % (n + 1) == 0) { a.push(1); }
				else{ a.push(0); }
			}
			_m = new Float32Array(a);
		};

		this.getGraph = function() { return _m; }
		this.getDepth = function() { return _d; }
	};

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

	MatrixN.prototype.getMatrix = function() { 
		return this.getGraph(); 
	};
	
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

	var Matrix3 = function(m){
		if(!m){
			MatrixN.call(this, {
				m: null,
				depth: 3
			});
		} else {
			MatrixN.call(this, {
				m: m,
				depth: 3
			});
		}
	};

	Matrix3.prototype = Object.create(MatrixN.prototype);
	Matrix3.prototype.constructor = Matrix3;

	var Matrix4 = function(m){
		if(!m){
			MatrixN.call(this, {
				m: null,
				depth: 4
			});
		} else {
			MatrixN.call(this, {
				m: m,
				depth: 4
			});
		}
	};

	Matrix4.prototype = Object.create(MatrixN.prototype);
	Matrix4.prototype.constructor = Matrix4;

	JSMatrix.prototype.M4 = function(){ return new Matrix4(null); }
	JSMatrix.prototype.M3 = function(){ return new Matrix3(null); }

	var Helper = {
		Slice: function(a, from, to){
			var t = [];
			for(var i = 0; i < (to - from); i++){
				t.push(a[from + i]);
			}
			return new Float32Array(t);
		},
		MV3: function(v1, v2){
			return 
				(v1[0] * v2[0]) +
				(v1[1] * v2[1]) +
				(v1[2] * v2[2]);
		},
		MV4: function(v1, v2){
			return
				(v1[0] * v2[0]) +
				(v1[1] * v2[1]) +
				(v1[2] * v2[2]) +
				(v1[3] * v2[3]);
		},
		MM3: function(m1, m2){
			return new Float32Array([
				Helper.MV3(m1.getRow(0), m2.getCol(0)), Helper.MV3(m1.getRow(0), m2.getCol(1)), Helper.MV3(m1.getRow(0), m2.getCol(2)),
				Helper.MV3(m1.getRow(1), m2.getCol(0)), Helper.MV3(m1.getRow(1), m2.getCol(1)), Helper.MV3(m1.getRow(1), m2.getCol(2)),
				Helper.MV3(m1.getRow(2), m2.getCol(0)), Helper.MV3(m1.getRow(2), m2.getCol(1)), Helper.MV3(m1.getRow(2), m2.getCol(2))
			]);
		}
	};

	function TranslateM(m, x, y, z){
		return new Float32Array([
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			(x * 1.0), (y * 1.0), (z * 1.0), 1
		]);
	};
	
	function RotateM(type, n){
		switch(type){
			case Rotate.RADIAN:
				return new Float32Array([
					Math.cos(n), Math.sin(n), 0.0, 0.0,
					-Math.sin(n), Math.cos(n), 0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					0.0, 0.0, 0.0, 1.0
				]);
				break;
			case Rotate.DEGREE:
				var r = (Math.PI * n) / 180;
				return new Float32Array([
					Math.cos(r), Math.sin(r), 0.0, 0.0,
					-Math.sin(r), Math.cos(r), 0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					0.0, 0.0, 0.0, 1.0
				]);
				break;
			default:
				console.log("Invalid rotation type");
				return null;
				break;
		}
	};

	function ScaleM(x, y, z){
		if(typeof d === 'number'){
			return new Float32Array([
				(s * 1.0), 0.0, 0.0, 0.0,
				0.0, (s * 1.0), 0.0, 0.0,
				0.0, 0.0, (s * 1.0), 0.0,
				0.0, 0.0, 0.0, 1.0
			]);
		} else {
			console.log("Must pass a valid number to ScaleM");
			return null;
		}
	};

	this.I = function(){
		return new Float32Array([
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		]);
	};

	this.E = function(){ return new Float32Array(16); };

	this.TranslateX = function(x){ return typeof x === 'number' ? TranslateM(null, x, 1.0, 1.0) : null; };
	this.TranslateY = function(y){ return typeof y === 'number' ? TranslateM(null, 1.0, y, 1.0) : null; };
	this.TranslateZ = function(z){ return typeof z === 'number' ? TranslateM(null, 1.0, 1.0, z) : null; };
	this.TranslateXY = function(x, y){ TranslateM(x, y, 1.0); };
	this.TranslateXYZ = function(x, y, z){ TranslateM(x, y, z); };

}

var $M = new JSMatrix();