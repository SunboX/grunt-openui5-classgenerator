# grunt-openui5-classgenerator

Grunt tasks for **SAP OpenUI5** to generate the basic class structure for Views and Components.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-openui5-classgenerator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-openui5-classgenerator');
```

## The "openui5_classgenerator" task

### Overview
In your project's Gruntfile, add a section named `openui5_classgenerator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    openui5_classgenerator: {
        default: {
            options: {
                namespace: 'app',
                dest: {
                    controller: 'src/app/controller',
                    view: 'src/app/view',
                    controls: 'src/app/controls',
                },
                viewType: 'JS'
            }
        }
    }
});
```

### Options

#### options.namespace
Type: `String`

The namespace of your app or library.

#### options.dest
Type: `Object`

The detsination folders, where the generated classes will be stored.

#### options.viewType
Type: `String`

The type of view that will be generated (only `JS` is supported by now).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
