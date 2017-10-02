## Webpack frontend builder  
Webpack, Babel, Stylus, PostCSS

### Usage
```bash
npm install
```

#### Theme setup
Set you frontend path in 'PROJECT_PATH' (webpack.config.js), src & dest.
Example:
```javascript
     const PROJECT_PATH = 'youFrontendTheme',
         STYLES_SRC = '/css/stylus',
         STYLES_DEST = '/css/compiled',
         SCRIPTS_SRC = '/js/source',
         SCRIPTS_DEST = '/js/compiled';
```

#### Tasks
```bash
## build styles & scripts development mode
npm run dev
webpack

## build styles & scripts production mode
npm run build
```

#### Performance
For better performance recommended to use Node version 6+, to update you Node version please use native tools or Node Version Manager [refer here](https://github.com/creationix/nvm/).