const { join, relative } = require('path');
const { promisify } = require('util');

const main = async(ctx, content, callback) => {
    const resolvep = promisify(ctx.resolve);

    const searchRegex = /(browser|chrome)\.(extension|runtime)\.getURL\(['"]([^'"]+)['"]\)/gi;
    let result;
    while ((result = searchRegex.exec(content))) {
        let file = result[3];
        if (!file.startsWith('.')) {
            file = relative(ctx.context, join(ctx.rootContext, file));
        }
        // const index = result.index;
        // const response = await resolvep(ctx.context, file);
        // console.log(response);
        ctx.addDependency(file);
    }
    callback(null, content);
};

module.exports = function(content) {
    const callback = this.async();
    main(this, content, callback);
};
