module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.initConfig({
		qunit: {
			files: ["test/index.html"]
		}
	});

	grunt.registerTask('test', 'qunit');
}