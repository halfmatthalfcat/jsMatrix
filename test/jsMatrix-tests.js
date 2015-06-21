module("Creation Tests");

test("MatrixN", function(assert){
	var n = $M.MatrixN();
	assert.ok(n instanceof $M.MatrixN().constructor,
		"Matrix is an instance of MatrixN");
	assert.ok(n instanceof Object,
		"Matrix is an object");
});

test("Matrix4", function(assert){
	var m1 = $M.Matrix4();
	assert.ok(m1 instanceof $M.Matrix4().constructor,
		"Matrix is an instance of Matrix4");
	assert.ok(m1 instanceof $M.MatrixN().constructor,
		"Matrix is an instance of MatrixN");
	assert.ok(m1 instanceof Object,
		"Matrix is an object");
});

module("Integrity Tests");

test("MatrixN", function(assert){
	var m2 = $M.MatrixN();
	assert.ok(
		m2.getMatrix() == null,
		"New MatrixN matrix is null");
	assert.ok(
		m2.getDepth() == null,
		"New MatrixN depth is null");
	assert.strictEqual(
		m2.toString(),
		"",
		"New MatrixN toString() is empty (Pretty)");
	m2.setMatrix(Helper.I);
	assert.ok(
		m2.getMatrix() != null,
		"MatrixN setMatrix() working correctly");
	m2.setDepth(4);
	assert.ok(
		m2.getDepth() === 4,
		"MatrixN setDepth() working correctly");
	assert.strictEqual(
		m2.toString(),
		Helper.IPretty,
		"MatrixN toString() working correctly (Pretty)");
	assert.ok(Helper.CompareArrays(
		m2.getRow(0),
		[1, 0, 0, 0]),
		"MatrixN GetRow() working");
	assert.ok(Helper.CompareArrays(
		m2.getCol(0),
		[1, 0, 0, 0]),
		"MatrixN GetCol() working");
	assert.strictEqual(m2.MV(
		[1, 1, 1, 1],
		[1, 1, 1, 1]),
		4,
		"MatrixN MV() working correctly");
});

test("Matrix4", function(assert){
	var m3 = $M.Matrix4();
	assert.ok(m3.getMatrix() instanceof Float32Array,
		"New Matrix4 instantiates Float32Array");
	assert.ok(Helper.CompareTypedArrays(
			m3.getMatrix(),
			Helper.I
		),
		"New Matrix4 instantiates identity matrix");
	assert.ok(m3.getDepth() === 4,
		"New Matrix4 is of depth 4");
	assert.strictEqual(
		m3.toString(),
		Helper.IPretty,
		"New Matrix4 toString() working (Pretty)");
	assert.ok(Helper.CompareArrays(
		m3.getRow(0),
		[1, 0, 0, 0]),
		"Matrix4 GetRow() working correctly");
	assert.ok(Helper.CompareArrays(
		m3.getCol(0),
		[1, 0, 0, 0]),
		"Matrix4 GetCol() working correctly");
	assert.ok(Helper.CompareTypedArrays(
		m3.MM4($M.Matrix4()),
		Helper.I),
		"Matrix4 MM4() working correctly");
});

module("Functional Tests");

test("Matrix4", function(assert){
	var m4 = $M.Matrix4();
	assert.ok(Helper.CompareTypedArrays(
		m4.Scale(2).getMatrix(),
		Helper.Scaled2),
		"Matrix4 Scaling working correctly");
	var m5 = $M.Matrix4();
	assert.ok(Helper.CompareTypedArrays(
		m5.dRotate(90).getMatrix(),
		Helper.Rotated90()),
		"Matrix4 Degree rotation working correctly");
	var m6 = $M.Matrix4();
	m6.rRotate(1.5707963267948966);
	assert.ok(Helper.CompareTypedArrays(
		m6.getMatrix(),
		Helper.Rotated90()),
		"Matrix4 Radian rotation working correctly");
	var m7 = $M.Matrix4();
	m7.dRotate(90).Scale(2);
	assert.ok(Helper.CompareTypedArrays(
		m7.getMatrix(),
		Helper.Rotated90Scale2()),
		"Matrix4 Degree Rotate - Scale working correctly");
});