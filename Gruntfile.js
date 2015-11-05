'use strict';

module.exports = function (grunt) {

	pkg: grunt.file.readJSON('package.json'),
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);		
	grunt.loadNpmTasks('flavorstrap');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: {
			// Configurable paths            
			app: 'test'
		},
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: ['<%= config.app %>']
				}
			}
		},
		tag: {
			banner: "/*!\n" +
					" * pkg.name\n" +
					" * @author pkg.author\n" +
					" * @version pkg.version\n" +
					" * Copyright 2015.\n" +
					" */\n"
		},
		uglify: {
			dist: {
				files: {
					'test/js/script.min.js': ['src/js/*.js']
				}
			},
			options: {
				banner: "<%= tag.banner %>"
			}
		},
		flavorstrap: {			
			target: {
				options: {
					debug: false,
					fast: false
				},
				files: {                      
					  src: 'src/modernstrap.scss',
					  dest: 'test/css/modernstrap.css'
				}
			}
		},
		'gh-pages': {
			options: {
			  base: 'test'
			},
			src: ['**']
		},
		watch: {			
			uglify: {
				files: 'src/{,*/}*.js'
			},			
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.app %>/{,*/}*.html',
					'<%= config.app %>/css/{,*/}*.css',
					//'<%= config.app %>/js/{,*/}*.js'
				]
			}
		}
	});

	grunt.registerTask('test', ['uglify']);
	grunt.registerTask('build', ['flavorstrap']);
	/* For Development */
	grunt.registerTask('default', [
		'flavorstrap',
		'connect:livereload',
		'watch'
	]);
};