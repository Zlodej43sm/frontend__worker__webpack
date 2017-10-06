## Webpack frontend builder  
Webpack, Babel, Stylus, PostCSS

### Usage
```bash
npm install
```

#### Theme setup
Set you frontend path project & destination (webpack.config.js).
Example:
```javascript
const PROJECT_PATH = path.resolve(__dirname, 'example'),
DEST = '/compiled';
```

#### Tasks
```bash
## build, map, watch styles & scripts development mode
npm run dev
##or
webpack

## build, uglify styles & scripts production mode
npm run build
```

#### Performance
For better performance recommended to use Node version 6+, to update you Node version please use native tools or Node Version Manager [refer here](https://github.com/creationix/nvm/).