module.exports = function (grunt) {
	grunt.initConfig({
		cssmin: {
			'dist/register.css': 'register.css'
		},
		htmlmin: {
			options: {
				collapseWhitespace: true,
				preserveLineBreaks: false
			},
			files: {
				src: './index.html',
				dest: 'dist/index.html'
			}
		},
		uglify: {
			release:{
				files: {
					'dist/register.js': 'register.js'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('default', ['htmlmin']);
	grunt.registerTask('default', ['uglify:release']);
	grunt.registerTask('default', ['cssmin']); 
};