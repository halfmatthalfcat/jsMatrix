var Helper = {
	CompareTypedArrays: function(a1, a2){
		if(a1 instanceof Float32Array &&
			a2 instanceof Float32Array &&
			a1.length == a2.length){
			var l = a1.length;
			for(var i = 0; i < l; i++){
				if(a1[i] != a2[i]) { return false; }
			}
		} else { return false; }
		return true;
	},
	I: new Float32Array([
		1, 0, 0, 0,
		0, 1, 0, 0, 
		0, 0, 1, 0, 
		0, 0, 0, 1
	]),
	IPretty: "\n1\t0\t0\t0\n0\t1\t0\t0\n0\t0\t1\t0\n0\t0\t0\t1\n"
};