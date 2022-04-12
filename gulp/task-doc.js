/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
module.exports= function({app, $gulp_folder, gulp, error, $g, $o}){
    /* jshint -W061 */const gulp_place= $g.place({ variable_eval: (str)=> eval(str) });/* jshint +W061 */
    const folder= "src/";
    return function(done){
        gulp.src([folder+"*.d.ts", folder+"*/*.d.ts", '!'+folder+'*.sub.d.ts', '!'+folder+'*/*.sub.d.ts'])
            .pipe(gulp_place({ folder, string_wrapper: '"' }))
            .pipe(gulp.dest(app.bin_folder))
            .on('end', typedoc.bind(null, done));
    };
    function typedoc(done, code){
        if(code) return done(code);

        return gulp.src([ "bin/$time-bundle.d.ts" ])
            .pipe($g.typedoc({
                out: "docs",
                readme: "none",
                name: app.name,
                version: true,
                plugin: [ "typedoc-plugin-markdown" ],
                categorizeByGroup: true,
                defaultCategory: "Private",
                categoryOrder: [ "Public", "Private", "*" ],
                disableSources: true
            }))
            .on("end", done);
    }
};
