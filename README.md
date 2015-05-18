# Flux-React Boilerplate

This is a [Flux](http://facebook.github.io/flux/) application boilerplate that I created when I was playing around with [this](http://github.com/eggheadio/egghead-react-flux-example) nice example app and experimenting on [Gulp](http://gulpjs.com/) & [React.js](http://facebook.github.io/react/). Basically it profits from [Browserify](http://browserify.org/) & [SASS](http://sass-lang.com/) and also allows to write ES6 via [Babel](http://babeljs.io).

## Getting Started
Install [Yeoman](http://yeoman.io/) and Flux-React generator:

```bash
npm install -g yo
npm install -g generator-flux-react-app
```

Initialize the generator:

```bash
# if possible: nvm use 0.10
yo flux-react-app
```

## Usage
1. Run Build: ``gulp build`` (``dist`` for production, ``watch`` for continuous development)
2. Install [httpster](http://httpster.net/): ``npm install --g httpster``
3. Navigate to **/build** and run: ``npm httpster``
4. [http://localhost:3333/](http://localhost:3333/)

## Live Examples
- [kolor.io](https://github.com/tameraydin/kolor.io)

## License

MIT [http://tameraydin.mit-license.org/](http://tameraydin.mit-license.org/)

## TODO
- [ ] Include testing framework ([Jest](https://facebook.github.io/jest/))
- [x] ~~Add [JSCS](https://github.com/jscs-dev/gulp-jscs/) Gulp task~~
- [ ] Add Gulp task for [Image Optimization](https://github.com/sindresorhus/gulp-imagemin)
- [ ] Add Gulp task for [CSS sprite automation](https://github.com/gobwas/gulp-sprite-generator)
