module.exports = function (grunt) {

    grunt.initConfig({
        env: {
            test:{
                NODE_ENV: 'test'
            }
        },
        pkg: grunt.file.readJSON('package.json'),

        mochaTest: {
            'server-side': {
                options: {
                    reporter: 'json',
                    clearRequireCache: true,
                    colors: true,
                    quite: true,
                    captureFile: 'mochatest.json'
                },
                src: ['tests/*.js']
            },
            'server-side-spec': {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true,
                    colors: true,
                    quite: true
                },
                src: ['tests/server/*.js']
            },
            'client-side-spec': {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true,
                    colors: true,
                    quite: true,
                },
                src: ['tests/client/report.spec.js']
            },
            'saucelab-fvt': {
                options: {
                    reporter: 'json',
                    clearRequireCache: true,
                    colors: true,
                    quite: false,
                    timeout: 60000,
                    captureFile: 'saucelabfvt.json'
                },
                src: ['tests/saucelab/*.js']
            },
            'fvt': {
                options: {
                    reporter: 'json',
                    clearRequireCache: true,
                    colors: true,
                    quite: false,
                    timeout: 60000,
                    captureFile: 'mochafvt.json'
                },
                src: ['tests/fvt/*.js']
            }
        },

        clean: {
            options: {
                force: true,
                expand: true
            },
            coverage: ['tests/coverage'],
            apidocs: ['apidoc']
        },

        copy: {
            resourcesForInstrumented: {
                nonull: true,
                files: [
                    {
                        expand: true,
                        dest: 'tests/coverage/instrumented',
                        src: ['routes/*.js', 'models/*.js', 'services/*.js']
                    }
                ]
            }
        },

        instrument: {
            files: ['routes/*.js', 'models/*.js', 'services/*.js'],
            options: {
                lazy: false,
                basePath: 'tests/coverage/instrumented/'
            }
        },

        storeCoverage: {
            options: {
                dir: 'tests/coverage/reports'
            }
        },

        makeReport: {
            src: 'tests/coverage/reports/*.json',
            options: {
                //type: 'html',
                type: 'json-summary',
                dir: 'tests/coverage/reports',
                file: 'coverage-summary.json'
                //print: 'detail'
            }
        },

        sass: {
            options: {
                outputStyle: 'expanded'
            },
            dist: {
                files: {
                    'static/built/css/default.css': 'static/sass/default.scss'
                }
            }
        },

        watch: {
            sass: {
                files: ['static/sass/*.scss'],
                tasks: ['sass:dist']
            },
        },

        availabletasks: {
            tasks: {
                options: {
                    filter: 'include',
                    tasks: ['dev-setup'],
                    groups: {
                        'Dev build tasks': ['dev-setup']
                    },
                    descriptions: {
                        'dev-setup': 'Install necessary npm modules and project code into the ./dist directory. (Only needed once per branch unless you are changing runtime node or bower component dependencies.',
                    }
                }
            }
        },

        jshint: {
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
            },
            server: {
                files: {
                    src: ['routes/**/*.js', 'app.js']
                }
            }
        },

        simplemocha: {
            sauce: {
                options: {
                    timeout: 60000,
                    reporter: 'spec'
                },
                src: ['tests/sauce/**/*-specs.js']
            }
        },

        karma: {
            options: {
                // point all tasks to karma config file
                configFile: 'tests/client/config/karma.conf.js'
            },
            unit: {
                // run tests once instead of continuously
                singleRun: true
            }
        },

    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-available-tasks');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-istanbul');

    grunt.registerTask('default', ['availabletasks']);
    grunt.registerTask('dev-lint', ['jshint:browser', 'jshint:server']);
    grunt.registerTask('dev-setup', []);
    grunt.registerTask('fvt-test', ['mochaTest:fvt']);
    grunt.registerTask('dev-test', ['env','clean:coverage', 'copy:resourcesForInstrumented', 'instrument', 'mochaTest:server-side-spec']);
    grunt.registerTask('dev-test-cov', ['env','clean:coverage', 'copy:resourcesForInstrumented', 'instrument', 'mochaTest:server-side', 'storeCoverage', 'makeReport']);
    grunt.registerTask('dev-uitest', ['mochaTest:fvt']);

};