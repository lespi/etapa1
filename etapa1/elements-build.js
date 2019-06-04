const concat = require('concat');

(async function build() {
  const files = [
    './dist/etapa1/runtime.js',
    './dist/etapa1/polyfills.js',
    './dist/etapa1/scripts.js',
    './dist/etapa1/main.js'
  ];
  await concat(files, './dist/etapa1/bundle.js');
})();
