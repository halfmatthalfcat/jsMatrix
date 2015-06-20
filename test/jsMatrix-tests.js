module("Creation Tests");

test("MatrixN", function(assert){
	var n = $M.MatrixN;
	assert.ok(n instanceof $M.MatrixN.constructor,
		"Matrix is an instance of MatrixN");
	assert.ok(n instanceof Object,
		"Matrix is an object");
});

test("Matrix4", function(assert){
	var m = $M.Matrix4;
	assert.ok(m instanceof $M.Matrix4.constructor,
		"Matrix is an instance of Matrix4");
	assert.ok(m instanceof $M.MatrixN.constructor,
		"Matrix is an instance of MatrixN");
	assert.ok(m instanceof Object,
		"Matrix is an object");
});

module("Integrety Tests");

test("Matrix4", function(assert){
	var m = $M.Matrix4;
	assert.ok(m.getMatrix() instanceof Float32Array,
		"New Matrix4 instantiates Float32Array");
	assert.ok(Helper.CompareTypedArrays(
			m.getMatrix(),
			Helper.I
		),
		"New Matrix4 instantiates identity matrix");
	assert.deepEqual(
		m.toString(),
		Helper.IPretty,
		"New Matrix4 toString working");
});