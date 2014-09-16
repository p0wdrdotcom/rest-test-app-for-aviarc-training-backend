
module.exports = (grunt) ->


    appPath = ['src/**/*.js']
    allPath = appPath

    # Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON('package.json'),
        jshint:
            src: allPath

        apidoc:
            myapp:
                src: 'src/',
                dest: 'build/docs/'

        clean:
            build:
                'build'

        # Monitor file changes and restart server
        nodemon:
            dev:
                script: 'src/server.js',
                options:
                    watchedExtensions: ['js']

    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-nodemon'
    grunt.loadNpmTasks 'grunt-apidoc'

    # Default task(s).
    grunt.registerTask 'default', ['clean', 'jshint', 'apidoc']
    grunt.registerTask 'test', ['jshint']

    grunt.registerTask 'start', ['nodemon']
