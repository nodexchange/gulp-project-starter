'use strict';
// JSLint
/*global
ADTECH, $1CRI, $include
*/
$include('./src/scripts/common/header.js');
$include('./src/scripts/common/utils.js');
$include('./src/scripts/common/settings.js');
$include('./src/scripts/common/imageContainer.js');
$include('./src/scripts/common/closeButton.js');
$include('./src/scripts/smartPlayer/core.js');

/* Core */
$1CRI.core = function() {
  this.settings = new $1CRI.Settings();
  this.screenDimensions = {};
  this.addCoreEventListeners();
  this.requestViewportDimensions();
};

$1CRI.core.prototype = {
  init: function() {
    var self = this;
    self.container = document.createElement('div');
    self.container.style.position = 'relative';
    self.container.id = 'container';
    document.body.appendChild(self.container);
    var dims = self.getScreenSize();
    self.backgroundImage = new $1CRI.imageContainer(dims, self.settings.Image);
    self.backgroundImage.getImage().addEventListener('click', function() {
      self.clickHandler();
    });
    self.container.appendChild(self.backgroundImage.getImage());
    if (self.settings.VideoPlayer.Enabled === true || self.settings.VideoPlayer.Enabled === 'true') {
      self.smartPlayer = new $1CRI.smartVideo.core(self.settings.VideoPlayer, self.container);
    }
    var closeButton = new $1CRI.closeButton(self.container, self.settings.CloseButton);
    self.container.appendChild(closeButton);
  },
  requestViewportDimensions: function() {
    ADTECH.event('viewport', {type:'request'});
  },
  addCoreEventListeners: function() {
    var self = this;
    ADTECH.addEventListener('viewport', function(event) {
      if (event.meta.type === 'response') {
        self.screenDimensions = event.meta.dims;
        self.init();
      } else if (event.meta.type === 'update'){
        self.screenDimensions = event.meta.dims;
        self.backgroundImage.updateSize(self.screenDimensions);
        self.smartPlayer.updateSize();

      }
    });
  },
  getScreenSize: function() {
    return this.screenDimensions;
  },
  clickHandler: function() {
    ADTECH.dynamicClick('Clickthrough', this.settings.Clickthrough);
  }
};
$include('./src/scripts/common/ready.js');
