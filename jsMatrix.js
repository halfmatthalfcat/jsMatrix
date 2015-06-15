function JSMatrix(){

	var MatrixN = function(args){
		var _m = null;
		var _d = null;

		if(args.m != null){ 
			_m = args.m; 
			_d = args.depth;
		}
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

	MatrixN.prototype.MV = function(v1, v2){
		var r = 0;
		for(var i = 0; i < v1.length; i++){
			r += (v1[i] * v2[i]);
		}
		return r;
	};

	var Matrix4 = function(matrix){
		var _mm = null;

		if(!matrix){
			MatrixN.call(this, {
				m: null,
				depth: 4
			});
		} else {
			MatrixN.call(this, {
				m: matrix,
				depth: 4
			});
		}

		this.getModelMatrix = function(){ 
			return _mm; 
		};
		this.setModelMatrix = function(mm){
			if(!_mm){
				_mm = mm; 
			} else {
				_mm = _mm.MM4(mm);
			}
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
		return new Matrix4(aug);
	};

	Matrix4.prototype.Translate = function(args){
		var aug = new Float32Array([
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			(args.x * 1.0), (args.y * 1.0), (args.z * 1.0), 1.0
		]);
		this.setModelMatrix(new Matrix4(aug));
		return this;
	};

	Matrix4.prototype.Rotate = function(args){
		switch(args.type){
			case 'RADIAN':
				var aug = new Float32Array([
					Math.cos(args.value), Math.sin(args.value), 0.0, 0.0,
					-Math.sin(args.value), Math.cos(args.value), 0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					0.0, 0.0, 0.0, 1.0
				]);
				this.setModelMatrix(new Matrix4(aug));
				return this;
				break;
			case 'DEGREE':
				var r = (Math.PI * args.value) / 180;
				var aug = new Float32Array([
					Math.cos(r), Math.sin(r), 0.0, 0.0,
					-Math.sin(r), Math.cos(r), 0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					0.0, 0.0, 0.0, 1.0
				]);
				this.setModelMatrix(new Matrix4(aug));
				return this;
				break;
			default:
				console.log("Please specify a valid rotation type");
				break;
		}
	};

	Matrix4.prototype.Scale = function(amount){
		var aug = new Float32Array([
			(amount * 1.0), 0.0, 0.0, 0.0,
			0.0, (amount * 1.0), 0.0, 0.0,
			0.0, 0.0, (amount * 1.0), 0.0,
			0.0, 0.0, 0.0, 1.0
		]);
		this.setModelMatrix(new Matrix4(aug));
		return this;
	};

	JSMatrix.prototype.M4 = function(matrix){ return new Matrix4(matrix); }

}

var $M = new JSMatrix();