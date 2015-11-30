/*
 * grunt-openui5-classgenerator
 * https://github.com/SunboX/grunt-openui5-classgenerator
 *
 * Copyright (c) 2015 André Fiedler
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // By default, lint.
    grunt.registerTask('default', ['jshint']);

};
