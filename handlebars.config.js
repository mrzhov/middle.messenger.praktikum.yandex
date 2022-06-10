const baseUrl = 'src/';
const baseConfig = {
   layouts: 'layouts',
   partials: 'partials',
   data: 'data',
}

const config = Object.fromEntries(Object.entries(baseConfig).map(f => ([f[0], baseUrl + f[1]])));
module.exports = config;
