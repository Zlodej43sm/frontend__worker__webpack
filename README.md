## Webpack frontend builder  
Webpack, Babel, Stylus, PostCSS

### Usage
```bash
npm install
```

#### Theme setup
Set you frontend path source & destination (webpack.config.js).
Example:
```javascript
const STYLES_SRC = path.join(__dirname, 'YOUR_STYLES_SOURCE'),
    STYLES_DEST = path.join(__dirname,'YOUR_STYLES_COMPILED'),
    SCRIPTS_SRC = path.join(__dirname,'YOUR_SCRIPTS_SOURCE'),
    SCRIPTS_DEST = path.join(__dirname,'YOUR_SCRIPTS_COMPILED');
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