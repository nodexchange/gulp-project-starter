/* =====================================================
   _hidden.js
======================================================== */

//(function($){ // jQuery no conflict

//'use strict';

/* - - - - - - - - - - - - - - - - - - - - - - - - - - -
   Section
- - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

//console.log('_hidden.js loaded');

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

//})(jQuery); // jQuery no conflict

'use strict';
// JSLint
/*global
ADTECH, $1CRI, $include
*/
/**
 * Mobile Responsive Interstitial
 * AOL Platforms 02/2016
 * http://one.aol.com/
 * version 0.1
 *
 * @author: Marcin Wojtala
 */
var com = com || {};
com.aol = com.aol || {};
com.aol.one = com.aol.one || {};
com.aol.one.ri = com.aol.one.ri || {};
var $1CRI = com.aol.one.ri;
;
$1CRI.utils = {
  aspectRatio: 1,
  getCurrentAspectRatio: function() {
    return $1CRI.utils.aspectRatio;
  },
  resizeImagePerRatio: function(element, maxWidth, maxHeight) {
    var ratio = 0; // Used for aspect ratio
    var width = element.width; // Current image width
    var height = element.height; // Current image height
    var resizeType = '';
    console.log('>>> width '+width +' height > ' + height +' maxWidth > '+ maxWidth + ' maxHeight > '+ maxHeight)
    var dims = $1CRI.utils.calculateAspectRatioFit(width, height, maxWidth, maxHeight);
    element.width = dims.width;
    element.height = dims.height;
    $1CRI.utils.aspectRatioH = dims.height / height;
    $1CRI.utils.aspectRatioW = dims.width / width;
    console.log($1CRI.utils.aspectRatioH + ' > '+$1CRI.utils.aspectRatioW);
  },
  /**
 * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth Source area width
 * @param {Number} srcHeight Source area height
 * @param {Number} maxWidth Fittable area maximum available width
 * @param {Number} maxHeight Fittable area maximum available height
 * @return {Object} { width, heigth }
 */
 calculateAspectRatioFit: function(srcWidth, srcHeight, maxWidth, maxHeight) {
     var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
     return { width: srcWidth*ratio, height: srcHeight*ratio };
  }
};
;
$1CRI.Settings = function () {
  this.Clickthrough = ADTECH.getContent('Clickthrough', 'https://ad.doubleclick.net/ddm/clk/300049047;127005073;');
  this.Image = ADTECH.getContent('Image', {"Source":"images/mobileinterstitial_test.png","Clickable":"true","Scale to Fit":"true","Default Width":"1242","Default Height":"2552","Use Image":"true","Color":"#fff"});
  this.CloseButton = ADTECH.getContent('CloseButton', {"Width":36,"Height":36,"Close Button Image":"images/fancybox_sprite.svg"});
  this.VideoPlayer = ADTECH.getContent('VideoPlayer', {"Enabled":"true","Clickable":"true","Clickthrough":"https://ad.doubleclick.net/ddm/clk/300049047;127005073;","Volume":"0.2","MP4 File":"images/Kadjar_10_OPO_070116.mp4","Preview Image":"","End Image":"","Auto Play":true,"Layout":"Fluid||Fixed","Height":698,"Width":1242,"X":0,"Y":36,"WEBM File":""});
};

// module.exports = $1CRI.Settings;
;
$1CRI.imageContainer = function(dimensions, settings) {
  this.utils = $1CRI.utils;
  var defaultWidth = settings['Default Width'];
  var defaultHeight = settings['Default Height'];
  var scaleToFit = settings['Scale to Fit'];
  this.image = this.createImg(settings.Source, defaultWidth, defaultHeight);
  if(settings['Use Image'] == 'true' || settings['Use Image'] == true){
    //this.image.style.opacity = 1;
  } else {
    this.image.src = '';
    this.image.style.backgroundColor = settings['Color'];
  }
  //this.image = this.createImg(settings.Source, defaultWidth, defaultHeight);
  if (scaleToFit) { console.log('dimensions', dimensions.w, dimensions.h);
    this.utils.resizeImagePerRatio(this.image, dimensions.w, dimensions.h, dimensions.unit);
  }
  if (settings.Clickable === true || settings.Clickable === 'true') {
    this.image.style.cursor = 'pointer';
  }
  this.image.className = 'imageContainer';
  return this;
};
$1CRI.imageContainer.prototype = {
  setVisible: function(show) {
    if (show === true) {
      this.image.style.display = '';
    } else {
      this.image.style.display = 'none';
    }
  },
  isClickable: function() {
    return this.settings.Clickable;
  },
  getImage: function() {
    return this.image;
  },
  createImg: function(fileSrc, width, height) {
    var img = document.createElement('img');
    img.src = fileSrc;
    // Forced for retina display
    img.width = width;
    img.height = height;
    return img;
  },
  updateSize: function(dimensions) {
    this.utils.resizeImagePerRatio(this.image, dimensions.w, dimensions.h, dimensions.unit);
  }
};
;
$1CRI.closeButton = function(settings) {
  this.settings = settings;
  this.setupButton();
  return this;
};

$1CRI.closeButton.prototype = {
  setupButton: function() {
      this.closeButtonContainer = document.createElement('div');
      this.closeButtonContainer.className = 'closeButton';
      this.closeButtonContainer.style.left = '320px';
      this.closeButtonContainer.style.top = '4px';
      this.closeButtonContainer.style.position = 'absolute';
      this.closeButtonContainer.style.overflow = 'hidden';
      this.closeButtonContainer.style.width = this.settings.Width+'px';
      this.closeButtonContainer.style.height = this.settings.Height+'px';

      var closeImage = document.createElement('img');
      closeImage.src = this.settings['Close Button Image'];
      this.closeButtonContainer.onclick = this.clickHandler;
      this.closeButtonContainer.appendChild(closeImage);
      return this.closeButtonContainer;
  },
  getButton: function() {
    return this.closeButtonContainer;
  },
  updatePosition: function(left, top) {
    var leftValue = left - this.settings.Width;
    this.closeButtonContainer.style.left = leftValue + 'px';
    this.closeButtonContainer.style.top = top + 'px';
  },
  clickHandler: function() {
    ADTECH.close();
  }
};
;
$1CRI.smartVideo = $1CRI.smartVideo || {};

$1CRI.smartVideo.core = function(settings, container) {
  this.utils = $1CRI.utils;
  this.videoContainer = document.createElement('div');
  this.videoContainer.id = 'VideoContainer' + (Math.random() * 1000);
  this.videoContainer.className = 'videoContainer';
  container.appendChild(this.videoContainer);
  this.settings = settings;
  this.originalWidth = this.settings.Width;
  this.originalHeight = this.settings.Height;
  this.currentAspectRatioW = 1;
  this.currentAspectRatioH = 1;
  try {
    this.setupVideo();
  } catch (e) {
    console.log('[SMART PLAYER ERROR]' +e);
  }
  var self = this;
  if(settings.Clickable == true || settings.Clickable == 'true') {
    this.videoContainer.addEventListener('click', function(event) {
      if(event.target.className.indexOf('vjs-tech') > -1) {
        if(self.smartPlayer.player.hasStarted_ == true) {
          ADTECH.dynamicClick('Video Clickthrough', self.settings['Clickthrough']);
        }
      }
      console.log(self.smartPlayer.player.hasStarted_);
    });
  }

  return this;
};

$1CRI.smartVideo.core.prototype = {
  getVideoContainer: function() {
    return this.videoContainer;
  },
  setupVideo: function() {
    var self = this;
    ADTECH.registerVideoPlayer(self.videoContainer, 'Video');
    if (self.settings.Layout === 'Fluid' || self.settings.Layout === 'Fluid||Fixed') {
      self.settings.Width = self.originalWidth * self.utils.aspectRatioW;
      self.settings.Height = self.originalHeight * self.utils.aspectRatioH;
      self.currentAspectRatioW = self.utils.aspectRatioW;
      self.currentAspectRatioH = self.utils.aspectRatioH;
    }
  	self.smartPlayer = ADTECH.modules.SmartVideoPlayer.createPlayer({
      container: self.videoContainer,
      width: self.settings.Width,
      height: self.settings.Height,
      poster: self.settings['Preview Image'],
  		autoplay: self.settings['Auto Play'],
      src: {
        mp4: self.settings['MP4 File'],
        webm: self.settings['WEBM File']
      }
    });
    self.videoContainer.style.position = 'absolute';
    if (self.settings.Layout === 'Fluid' || self.settings.Layout === 'Fluid||Fixed') {
      self.videoContainer.style.left = self.settings.X + '%';
      self.videoContainer.style.top = self.settings.Y + '%';
    } else {
      self.videoContainer.style.left = self.settings.X + 'px';
      self.videoContainer.style.top = self.settings.Y + 'px';
    }
    if (self.settings['Auto Play'] === true || self.settings['Auto Play'] === 'true') {
     self.smartPlayer.play({auto: true});
    } else {
     self.smartPlayer.pause();
  	}
  },
  updateSize: function() {
    var self = this;
    if (self.utils.aspectRatioW !== self.currentAspectRatioW || self.utils.aspectRatioH !== self.currentAspectRatioH) {
      self.currentAspectRatioW = self.utils.aspectRatioW;
      self.currentAspectRatioH = self.utils.aspectRatioH;
      self.settings.Width = Math.round(self.settings.Width * (self.utils.aspectRatioW*1));
      self.settings.Height = Math.round(self.settings.Height * (self.utils.aspectRatioH*1));
      self.videoContainer.firstChild.style.width = self.settings.Width + 'px';
      self.videoContainer.firstChild.style.height = self.settings.Height + 'px';
    }
  }
};
;

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
    //var units = (self.settings.width.indexOf('%') != -1) ? '%' : 'px';
    //var uW = self.settings.width.split('p')[0].split('%')[0];
    //var uH = self.settings.height.split('p')[0].split('%')[0];
    var units = '%';
    self.unitDimensions = {w:100, h:100, u:units};

    document.body.appendChild(self.container);
    var dims = self.getScreenSize();
    if(self.settings.Image['Use Image'] == 'true' || self.settings.Image['Use Image'] == true){
      self.backgroundImage = new $1CRI.imageContainer(dims, self.settings.Image);
    } else {
      self.backgroundImage = new $1CRI.imageContainer(dims, self.settings.Image);
    }
    self.backgroundImage.getImage().addEventListener('click', function() {
      self.clickHandler();
    });
    self.container.appendChild(self.backgroundImage.getImage());
    if (self.settings.VideoPlayer.Enabled === true || self.settings.VideoPlayer.Enabled === 'true') {
      self.smartPlayer = new $1CRI.smartVideo.core(self.settings.VideoPlayer, self.container);
    }
    self.closeButton = new $1CRI.closeButton(self.settings.CloseButton);
    self.container.appendChild(self.closeButton.getButton());
    self.closeButton.updatePosition(self.backgroundImage.getImage().width, 3);

    var containerInfo = self.container.getBoundingClientRect();
    var positionInfo = self.backgroundImage.getImage().getBoundingClientRect();
    //alert(containerInfo.width + ' : ' + positionInfo.width);
    self.container.style.left = ((containerInfo.width - positionInfo.width) / 2) + 'px';
    self.container.style.top = 0;

    self.repositionContainer();
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
        self.backgroundImage.updateSize(self.getScreenSize());
        self.smartPlayer.updateSize(self.getScreenSize());
        self.closeButton.updatePosition(self.backgroundImage.getImage().width, 3);
        self.repositionContainer();
      }
    });
  },
  getScreenSize: function() {
    this.screenDimensions.unit = this.unitDimensions;
    return this.screenDimensions;
  },
  clickHandler: function() {
    ADTECH.dynamicClick('Clickthrough', this.settings.Clickthrough);
  },
  repositionContainer: function() {
    var self = this;
    var positionInfo = self.backgroundImage.getImage().getBoundingClientRect();
    self.container.style.left = ((self.screenDimensions.w - positionInfo.width) / 2) + 'px';
    self.container.style.top = ((self.screenDimensions.h - positionInfo.height) / 2) + 'px';
  }
};
ADTECH.ready(['SmartVideoPlayer/1.1.1/SmartVideoPlayer'], function() {
  'use strict';
	new $1CRI.core();
});

/*
ADTECH.addEventListener('hello', function() {
  console.log('HELLOOOOO');
});
*/
;
