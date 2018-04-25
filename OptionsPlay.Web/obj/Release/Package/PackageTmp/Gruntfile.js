/*global module, require */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'less': {
            options: {
                compress: true,
                optimization:true
            },
            files: {
                expand: true,
                flatten: true,
                cwd: 'Content/custom/views',
                src: ['*.min.less'],
                dest: 'Content/custom/views',
                ext: '.css'
            }
        },

        'cssmin': {
            minify: {
                expand: true,        // 启用下面的选项
                cwd: 'Content/custom/views',    // 指定待压缩的文件路径
                src: ['*.css', '!*.min.css'],    // 匹配相对于cwd目录下的所有css文件(排除.min.css文件)
                dest: 'Content/custom/views',    // 生成的压缩文件存放的路径
                ext: '.min.css'        // 生成的文件都使用.min.css替换原有扩展名，生成文件存放于dest指定的目录中
            }
        },

        'concat': {
            dist: {
                src: ['Content/custom/views/**/*.less'],
                dest: 'Content/custom/views/custom.min.less'
            }
        },

        'requirejs': {
            compile: {
                options: {
                    appDir: './App',
                    baseUrl: './',
                    dir: './build',
                    mainConfigFile: './App/main.js',
                    paths: {
                        'jquery': 'empty:',
                        'knockout': 'empty:',
                        'durandal': 'empty:',
                        'text': 'empty:',
                        'plugins': 'empty:',
                        'transitions': 'empty:',
                        'pace': 'empty:',
                        'i18next': 'empty:',
                        'komapping': 'empty:',
                        'kendo-zh-CN': 'empty:',
                        'jquery-signalr': 'empty:',
                        'knockout-validation-clear': 'empty:',
                        'kendo-plugins': 'empty:',
                        'knockout-kendo': 'empty:',
                        'bootstrap': 'empty:',
                        'jquery-ui': 'empty:',
                        'jstat': 'empty:',
                        'highstock': 'empty:',
                        'bootstrap-datepicker': 'empty:',
                        'isotope': 'empty:',
                        'autoNumeric': 'empty:',
                        'perfectScrollbar': 'empty:',
                        'jquery-hotkeys': 'empty:'
                    },
                    modules: [
                        {
                            name: 'main',
                            include: [
                            'viewmodels/signIn',
                            'viewmodels/shell',
                            'viewmodels/index',
                            'viewmodels/bottom',
                            'viewmodels/trace',
                            'viewmodels/quotes',
                            'viewmodels/chains',
                            'viewmodels/optionList',
                            'viewmodels/portfolio',
                            'viewmodels/trade/orderEntry',
                            'viewmodels/trade/exercise',
                            'viewmodels/trade/intradayOrders',
                            'viewmodels/trade/portfolioList',
                            'viewmodels/trade/intradayTrades',
                            'viewmodels/trade/queryOption',
                            'viewmodels/trade/paramSet',
                            'viewmodels/trade/queryGrid',
                            'viewmodels/compositions/historicalInquiry']
                        }
                    ]
                }
            }
        },
        clean: {
            beforeBuild: ["./build", 'Content/custom/views/custom.min.css'],
            afterBuild: ["./build/dataServices", "./build/modules", './build/viewmodels', './build/build.txt', 'Content/custom/views/custom.min.less', 'Content/custom/views/custom.css'],
            options: {
                force:true
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');

    //grunt.registerTask('build', ['clean:beforeBuild', 'requirejs', 'concat', 'less', 'cssmin', 'clean:afterBuild']);
    grunt.registerTask('build', ['clean:beforeBuild', 'requirejs', 'concat', 'less', 'cssmin']);
};