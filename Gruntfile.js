
//  site: glg.it

module.exports = function (grunt) {
  
  // caminhos do processo de montagem:
  var p = {
    dist:'www/',
    distIdiomas:'www/idiomas',
    
    src:'src/',
    srcIdiomas:'src/idiomas/',
    srcFontes:'src/fontes/',
    
    srcCssC:'src/css/critico/',
    srcCssN:'src/css/normal/',
    srcCssP:'src/css/framework/',
    
    srcJsC:'src/js/critico/',
    srcJsN:'src/js/normal/',
    srcJsP:'src/js/framework/',
    
    htmlPaginas:'src/paginas/',
    htmlLightbox:'src/paginas/lightbox/',
    htmlIndex:'src/index.html',
    
    serv:'C:/wamp/www-RuiSite1/',
    temp:'temp/',
    test:'test/',
    docs:'docs/',
    priv:'privado/',
    privLibs:'vendor/'
  };
  
  grunt.registerTask('cleanDist',[
    'clean:temp','clean:dist'
  ]);
  grunt.registerTask('dist',[
    'concat:lessCritico','concat:lessNormal','concat:lessFramework',
    'concat:jsCritico','concat:jsNormal','concat:jsFramework',
    'less',
    'concat:cssCritico','concat:cssNormal','concat:cssFramework',
    'postcss',
    'cssmin','uglify',
    'copy:arquivos','copy:imagens','copy:fontes','copy:idiomas',
    'replace:temp','replace:dist'
  ]);
  grunt.registerTask('copyServ',[
    
  ]);
  grunt.registerTask('fullDist',[
    'cleanDist',
    'dist'
  ]);
  
  
  grunt.registerTask('default',[
    'cleanDist','dist'
  ]);
  
  //===================  Processo de montagem  ============================
  
  var lf = grunt.util.linefeed;
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-postcss');
  
  grunt.initConfig({
    
    // ---------------  limpeza
    clean:{
      options:{
        force: true
      },
      temp:{
        src: [ p.temp + '**/*' ]
      },
      dist:{
        src: [ p.dist + '**/*' ]
      },
      servidor:{
        src: [ p.serv + '*/**', '!'+p.serv + p.privLibs+'**' ],
        //filter: 'isFile'
      },
      servidor_libs:{
        src: [ p.serv + '**/*' ]
      }
    },
    // ----------------  juntando os arquivos]
    concat:{
      lessCritico:{
        src:[ 
          p.srcCssC+ 'index.less', 
          p.srcCssC+ 'libs/**.less', 
          p.srcCssC+ '**/*.less' 
        ],
        dest: p.temp+'lessCritico.less'
      },
      lessFramework:{
        src:[ 
          p.srcCssP+ 'estilos.less', 
          p.srcCssP+ 'libs/**.less', 
          p.srcCssP+ '**/*.less' 
        ],
        dest: p.temp+'lessFramework.less'
      },
      lessNormal:{
        src:[ 
          p.srcCssN+ 'libs/**.less', 
          p.srcCssN+ 'estilos.less', 
          p.srcCssN+ '**/*.less' 
        ],
        dest: p.temp+'lessNormal.less'
      },
      jsCritico:{
        src:[ 
          p.srcJsC+ 'libs/*.js',
          p.srcJsC+ 'index.js',
          p.srcJsC+ '**/*.js'
        ],
        dest: p.temp+'jsCritico.js'
      },
      jsNormal:{
        src:[ 
          p.srcJsN+ 'libs/velocity-min.js',
          p.srcJsN+ 'libs/velocity*.js',
          p.srcJsN+ 'libs/ScrollMagic.min.js',
          p.srcJsN+ 'libs/zepto-1.2.0.min.js',
          p.srcJsP+ 'libs/zepto*.js',
          p.srcJsP+ 'libs/vue.min.js',
          p.srcJsP+ 'libs/vue*.js',
          p.srcJsN+ 'libs/*.js',
          p.srcJsN+ 'index.js',
          p.srcJsN+ '**/*.js' 
        ],
        dest: p.temp+'jsNormal.js'
      },
      jsFramework:{
        src:[ 
          p.srcJsP+ 'libs/zepto-1.2.0.min.js',
          p.srcJsP+ 'libs/zepto*.js',
          p.srcJsP+ 'libs/vue.min.js',
          p.srcJsP+ 'libs/vue*.js',
          p.srcJsP+ 'rotas.js',
          p.srcJsP+ 'index.js',
          p.srcJsP+ '**/*.js' 
        ],
        dest: p.temp+'jsFramework.js'
      },
      
        //---  Juntar CSS depois da complação do LESS
      cssCritico:{
        src:[
          p.srcCssC+'**/*.css',
          p.temp+'lessCritico.css'
        ],
        dest: p.temp+'cssCritico.css'
      },
      cssNormal:{
        src:[
          p.srcCssN+'**/*.css',
          p.temp+'lessNormal.css'
        ],
        dest: p.temp+'cssNormal.css'
      },
      cssFramework:{
        src:[
          p.srcCssP+'**/*.css',
          p.temp+'lessFramework.css'
        ],
        dest: p.temp+'cssFramework.css'
      }
    },
    //-------------  interpretando LESS
    less:{
      cssCritico:{
        files:[{
          src:[ p.temp+'lessCritico.less' ],
          dest: p.temp+'lessCritico.css'  
        }]
      },
      cssNormal:{
        files:[{
          src:[ p.temp+'lessNormal.less' ],
          dest: p.temp+'lessNormal.css'
        }]
      },
      cssFramework:{
        files:[{
          src:[ p.temp+'lessFramework.less' ],
          dest: p.temp+'lessFramework.css'
        }]
      }
    },
    //-------------  post css
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      dist: {
        src: [
          p.temp+'cssCritico.css',
          p.temp+'cssNormal.css',
          p.temp+'cssFramework.css'
        ]
      }
    },
    //-------------  minimizando os arquivos
    cssmin:{
      options:{
        shorthandCompacting: true,
        roundingPrecision: -1
      },
      cssCritico:{
        files:[{
          src: p.temp+'cssCritico.css' ,
          dest: p.temp+'cssCritico.min.css'
        }]
      },
      cssNormal:{
        files:[{
          src: p.temp+'cssNormal.css' ,
          dest: p.temp+'cssNormal.min.css'
        }]
      },
      cssFramework:{
        files:[{
          src: p.temp+'cssFramework.css' ,
          dest: p.temp+'cssFramework.min.css'
        }]
      }
    },
    uglify:{
      jsCritico:{
        files:[{
          src: p.temp+'jsCritico.js' ,
          dest: p.temp+'jsCritico.min.js'
        }]
      },
      jsNormal:{
        files:[{
          src: p.temp+'jsNormal.js' ,
          dest: p.temp+'jsNormal.min.js'
        }]
      },
      jsFramework:{
        files:[{
          src: p.temp+'jsFramework.js' ,
          dest: p.temp+'jsFramework.min.js'
        }]
      }
    },
    htmlmin:{
      html:{
        options:{
          removeComments: true,
          collapseWhitespace: true,
          processScripts: ['text/ng-template']
          //,maxLineLength: 140
        },
        files:[{
          src: p.temp+'htmlPaginas.html' ,
          dest: p.temp+'htmlPaginas.min.html'
        },{
          src: p.temp+'htmlLightbox.html' ,
          dest: p.temp+'htmlLightbox.min.html'
        },{
          src: p.temp+'htmlPaginasModal.html' ,
          dest: p.temp+'htmlPaginasModal.min.html'
        }]
      }
    },
    
    //-------------  copiando os arquivos finais
    copy:{
      idiomas:{
        files:[{
          expand: true,
          cwd: p.srcIdiomas ,
          src: [ '**/*' ],
          dest: p.dist
        }]
      },
      arquivos:{
        files:[{
          expand: true,
          cwd: p.temp ,
          src: [ 
            'jsNormal.js', 
            'jsNormal.min.js', 
            'cssNormal.css',
            'cssNormal.min.css',
            'cssFramework.css',
            'cssFramework.min.css'
          ],
          dest: p.dist
        }]
      },
      fontes:{
        files:[{
          expand: true,
          cwd: p.srcFontes ,
          src: [ '**' ],
          dest: p.dist+'fontes/'
        }]
      },
      imagens:{
        files:[{
          expand: true,
          cwd: p.src ,
          src:[ 'img/**' ],
          dest: p.dist
        }]
      },
      
      servidor:{
        files:[{
          expand: true,
          cwd: p.dist ,
          src:[ '**/*', '.htaccess' ],
          dest: p.serv
        }]
      }
    },
    
    //-------------  replace 
    replace:{
      temp:{
        options:{
          patterns:[{
            match: /##[\d\w\.,_\/\\-]*/g,
            replacement: function(key, idxChar, fileContent, fileName, destName){
              var name = key.replace(/^#+/,'');
              //console.log( key, ' ==>> ', p.htmlPaginas + name );
              return grunt.file.read( p.htmlPaginas + name );
            }
          },{
            match: 'jsCritico',
            replacement: function(){
              return grunt.file.read( p.temp + 'jsCritico.min.js' );
            }
          },{
            match: 'cssCritico',
            replacement: function(){
              return grunt.file.read( p.temp + 'cssCritico.min.css' );
            }
          }]
        },
        files:[{
          expand:true,
          flatten:true,
          src: [ p.src+ '*.html', p.priv+ '*.html' ],
          dest: p.temp 
        }]
      },
      dist:{
        options:{
          patterns:[{
            match: /\$\$svg\(([^\)]*)\)/g,
            replacement: function(key, idxChar, fileContent, fileName, destName){
              var params = /\((.*)\)$/g.exec(key)[1];
              return ''+
                '<object data="'+ params +'" type="image/svg+xml" >'+
                  '<embed src="'+ params +'" type="image/svg+xml" />'+
                '</object>';
            }
          },{
            match: /\$#svg\(([^\)]*)\)/g,
            replacement: function(key, idxChar, fileContent, fileName, destName){
              var params = /\((.*)\)$/g.exec(key)[1];
              var file = p.src + params ;
              if( !grunt.file.exists(file) ) file += '.svg';
              var svgContent = grunt.file.read( file );
              svgContent = svgContent.replace( /<\?xml.*\?>/g, '' );
              return svgContent;
            }
          }]
        },
        files:[{
          expand:true,
          flatten:true,
          src: [ p.temp+ '*.html' ],
          dest: p.dist 
        }]
      }
    }
  });
  
};
