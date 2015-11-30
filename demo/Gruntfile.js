/*
 * grunt-openui5-classgenerator demo
 *
 * Copyright (c) 2015 André Fiedler
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        openui5_classgenerator: {
			default: {
				options: {
					namespace: 'app',
					dest: {
						controller: 'app/controller',
						view: 'app/view',
						controls: 'app/controls',
					},
					viewType: 'JS'
				}
			}
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('../tasks');

    // By default, run.
    grunt.registerTask('default', ['openui5_classgenerator']);

};
