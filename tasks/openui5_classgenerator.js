/*
 * grunt-openui5-classgenerator
 * https://github.com/SunboX/grunt-openui5-classgenerator
 *
 * Copyright (c) 2015 André Fiedler
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    var path = require('path'),
        inquirer = require('inquirer'),
        _ = require('lodash');

    grunt.registerMultiTask('openui5_classgenerator', 'Grunt tasks for SAP OpenUI5 to generate the basic class structure for Views and Components.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            namespace: '',
            dest: {
                controller: 'controller',
                view: 'view',
                controls: 'controls',
            },
            viewType: 'JS'
        });

        // Cleanup namespace
        options.namespace = options.namespace || '';

        if (options.namespace !== '' && options.namespace.indexOf('.', this.length - 1) === -1) {
            options.namespace += '.';
        }

        var done = this.async();

        grunt.log.writeln();
        grunt.log.writeln();

        function generateJsViewAndController(name, done) {

            // Cleanup the name
            name = name.replace(/[^a-z0-9]/gi, '_');

            function writeFiles(name, done) {

                // Load the templates
                var viewTemplate = grunt.file.read(path.join(__dirname, 'templates', 'view.js'));
                var controllerTemplate = grunt.file.read(path.join(__dirname, 'templates', 'controller.js'));

                // Replace the namespace placeholder
                viewTemplate = viewTemplate
                    .replace(/\{%= namespace %\}/g, options.namespace)
                    .replace(/\{%= name %\}/g, name);
                controllerTemplate = controllerTemplate
                    .replace(/\{%= namespace %\}/g, options.namespace)
                    .replace(/\{%= name %\}/g, name);

                // Write the files
                grunt.file.write(path.join(options.dest.view, name + '.view.js'), viewTemplate);
                grunt.file.write(path.join(options.dest.controller, name + '.controller.js'), controllerTemplate);

                done();
            }

            if (
                grunt.file.exists(options.dest.view, name + '.view.js') ||
                grunt.file.exists(options.dest.controller, name + '.controller.js')
            ) {
                inquirer.prompt([{
                    name: 'confirmOverwrite',
                    message: 'This View/Controller already exists! Do you want to overwrite it?',
                    type: 'confirm',
                    default: false
                }], function(answers) {
                    if (!answers.confirmOverwrite) {
                        done();
                    } else {
                        writeFiles(name, done);
                    }
                });
            } else {
                writeFiles(name, done);
            }
        }

        function generateControl(parentControlPath, name, done) {

            // Cleanup the name
            name = name.replace(/[^a-z0-9]/gi, '_');

            // Get parent name
            var parentName = '',
                parentNameMatch = parentControlPath.match(/[^\.]+$/);

            if (parentNameMatch.length === 1) {
                parentName = parentNameMatch[0];
            } else {
                grunt.fail.warn('The path of the control to extend from is wrong.');
                // Fail asynchronously.
                done(false);
                return;
            }

            function writeFiles(name, done) {

                // Load the templates
                var controlTemplate = grunt.file.read(path.join(__dirname, 'templates', 'control.js'));
                var controlRendererTemplate = grunt.file.read(path.join(__dirname, 'templates', 'controlRenderer.js'));

                // Replace the namespace placeholder
                controlTemplate = controlTemplate
                    .replace(/\{%= parent\.control\.path %\}/g, parentControlPath)
                    .replace(/\{%= namespace %\}/g, options.namespace)
                    .replace(/\{%= name %\}/g, name);
                controlRendererTemplate = controlRendererTemplate
                    .replace(/\{%= parent\.control\.renderer\.require %\}/g, (parentControlPath + 'Renderer').replace(/\./g, '/'))
                    .replace(/\{%= parent\.control\.renderer\.name %\}/g, parentName + 'Renderer')
                    .replace(/\{%= control\.renderer\.name %\}/g, name + 'Renderer');

                // Write the files
                grunt.file.write(path.join(options.dest.controls, name + '.js'), controlTemplate);
                grunt.file.write(path.join(options.dest.controls, name + 'Renderer.js'), controlRendererTemplate);

                done();
            }

            if (
                grunt.file.exists(options.dest.controls, name + '.js') ||
                grunt.file.exists(options.dest.controls, name + 'Renderer.js')
            ) {
                inquirer.prompt([{
                    name: 'confirmOverwrite',
                    message: 'This Control already exists! Do you want to overwrite it?',
                    type: 'confirm',
                    default: false
                }], function(answers) {
                    if (!answers.confirmOverwrite) {
                        done();
                    } else {
                        writeFiles(name, done);
                    }
                });
            } else {
                writeFiles(name, done);
            }
        }

        inquirer.prompt([{
            name: 'componentType',
            message: 'What type of class(es) do you want to create?',
            type: 'list',
            choices: [{
                name: 'View/Controller',
                value: 'View'
            }, {
                name: 'Control',
                value: 'Control'
            }]
        }], function(answers) {

            _.forEach(answers, function(answer, configName) {
                grunt.config.set(configName, answer);
            });

            inquirer.prompt([{
                name: 'controlName',
                message: 'Please enter the name of the ' + grunt.config.get('componentType') + ':',
                default: 'MyClass',
            }], function(answers) {
                _.forEach(answers, function(answer, configName) {
                    grunt.config.set(configName, answer);
                });

                switch (grunt.config.get('componentType')) {
                    case 'View':
                        switch (options.viewType) {
                            case 'JS':
                                generateJsViewAndController(grunt.config.get('controlName'), done);
                                break;
                            case 'HTML':
                            case 'JSON':
                            case 'Template':
                            case 'XML':
                                grunt.fail.warn('The view type ' + options.viewType + ' is not implemented.');
                                // Fail asynchronously.
                                done(false);
                                break;
                            default:
                                grunt.fail.warn('The view type ' + options.viewType + ' is not implemented.');
                                // Fail asynchronously.
                                done(false);
                                return;
                        }
                        break;

                    case 'Control':
                        inquirer.prompt([{
                            name: 'parentControlPath',
                            message: 'Please enter the control you want to extend from:',
                            default: 'sap.m.Panel',
                        }], function(answers) {
                            _.forEach(answers, function(answer, configName) {
                                grunt.config.set(configName, answer);
                            });

                            generateControl(grunt.config.get('parentControlPath'), grunt.config.get('controlName'), done);
                        });
                        break;
                    default:
                        grunt.fail.warn('The generation of Controls is not implemented.');
                        // Fail asynchronously.
                        done(false);
                        return;
                }
            });
        });
    });
};