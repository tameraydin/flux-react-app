'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var FluxReactGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.log(yosay(
      'Thanks for using Flux-React generator! Your project will be ready in seconds...'
    ));
  },

  writing: {
    projectfiles: function () {
      this.dest.mkdir('src/img');
      this.dest.mkdir('src/css');
      this.copy('css/_common.scss', 'src/css/_common.scss');
      this.copy('css/main.scss', 'src/css/main.scss');
      this.dest.mkdir('src/js/actions');
      this.dest.mkdir('src/js/components/header');
      this.dest.mkdir('src/js/components/subPage');
      this.dest.mkdir('src/js/components/welcome');
      this.dest.mkdir('src/js/constants');
      this.dest.mkdir('src/js/dispatchers');
      this.dest.mkdir('src/js/mixins');
      this.dest.mkdir('src/js/stores');
      this.copy('js/actions/app-actions.js', 'src/js/actions/app-actions.js');
      this.copy('js/components/app-template.js', 'src/js/components/app-template.js');
      this.copy('js/components/app.js', 'src/js/components/app.js');
      this.copy('js/components/header/header.js', 'src/js/components/header/header.js');
      this.copy('js/components/subPage/subPage.js', 'src/js/components/subPage/subPage.js');
      this.copy('js/components/welcome/content.js', 'src/js/components/welcome/content.js');
      this.copy('js/components/welcome/logger.js', 'src/js/components/welcome/logger.js');
      this.copy('js/constants/app-constants.js', 'src/js/constants/app-constants.js');
      this.copy('js/dispatchers/app-dispatcher.js', 'src/js/dispatchers/app-dispatcher.js');
      this.copy('js/mixins/myCustomMixin.js', 'src/js/mixins/myCustomMixin.js');
      this.copy('js/stores/app-store.js', 'src/js/stores/app-store.js');
      this.copy('js/main.js', 'src/js/main.js');
      this.copy('index.html', 'src/index.html');
      this.copy('_package.json', 'package.json');
      this.copy('gulpfile.js', 'gulpfile.js');
    }
  },

  end: function () {
    this.log(yosay(
      'Almost done! Need help? Check out ' + chalk.red('http://github.com/tameraydin/generator-flux-react-app')
    ));

    this.installDependencies({
      bower: false,
      npm: true
    });
  }
});

module.exports = FluxReactGenerator;