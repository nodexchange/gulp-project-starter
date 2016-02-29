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
    var width = element.width // Current image width
    var height = element.height // Current image height

    var resizeType = 'portrait';
    if (maxWidth<maxHeight) {
      resizeType = 'landscape';
    }
    if (resizeType == 'landscape') {
      // Check if the current width is larger than the max
      if (width < maxWidth) {
        ratio = maxWidth / width; // get ratio for scaling image
        $1CRI.utils.aspectRatio = ratio;
        element.width = maxWidth; // Set new width
        element.height = height * ratio; // Scale height based on ratio
        height = height * ratio; // Reset height to match scaled image
        width = width * ratio; // Reset width to match scaled image
      }
    } else {
      // Check if current height is larger than max
      if (height < maxHeight) {
        ratio = maxHeight / height; // get ratio for scaling image
        $1CRI.utils.aspectRatio = ratio;
        element.height = maxHeight; // Set new height
        element.width = width * ratio; // Scale width based on ratio
        width = width * ratio; // Reset width to match scaled image
        height = height * ratio; // Reset height to match scaled image
      }
    }
  }
}
;
$1CRI.Settings = function () {
  this.Clickthrough = ADTECH.getContent('Clickthrough', 'https://ad.doubleclick.net/ddm/clk/300049047;127005073;');
  this.Image = ADTECH.getContent('Image', {"Source":"images/320x480.jpg","Clickable":"true","Scale to Fit":"true","Default Width":"320","Default Height":"480"});
  this.CloseButton = ADTECH.getContent('CloseButton', {"top":-18,"right":-18,"Close Button Image":"closeButton_100x100.png"});
  this.VideoPlayer = ADTECH.getContent('VideoPlayer', {"Enabled":"true","Clickable":"true","Clickthrough":"https://ad.doubleclick.net/ddm/clk/300049047;127005073;","Volume":"0.2","MP4 File":"images/Kadjar_10_OPO_070116.mp4","Preview Image":"","End Image":"","Auto Play":true,"Layout":"Fluid||Fixed","Height":170,"Width":320,"X":0,"Y":40,"WEBM File":""});
};

// module.exports = $1CRI.Settings;
;
$1CRI.imageContainer = function(dimensions, settings) {
  this.utils = $1CRI.utils;
  var clickable = settings.Clickable;
  var defaultWidth = settings['Default Width'];
  var defaultHeight = settings['Default Height'];
  var scaleToFit = settings['Scale to Fit'];
  this.image = this.createImg(settings.Source, defaultWidth, defaultHeight);
  if (scaleToFit) {
    this.utils.resizeImagePerRatio(this.image, dimensions.w, dimensions.h);
  }
  if (settings.Clickable === true || settings.Clickable === 'true') {
    this.image.style.cursor = 'pointer';
  }
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
    this.utils.resizeImagePerRatio(this.image, dimensions.w, dimensions.h);
  }
};
;
var $1CRI = $1CRI || {};
$1CRI.smartVideo = $1CRI.smartVideo || {};

$1CRI.closeButton = function(settings) {
  this.settings = settings;
  var button = this.setupButton();
  return button;
};

$1CRI.closeButton.prototype = {
  setupButton: function() {
      var contractBtn = document.createElement('img');
      contractBtn.className = 'closeButton';
      contractBtn.src = this.settings['Close Button Image'];
      contractBtn.style.position = 'absolute';
      contractBtn.style.right = '4px';
      contractBtn.style.top = '4px';
      contractBtn.onclick = function() {

      };
      return contractBtn;
  },
  clickHandler: function() {
    ADTECH.close();
  }
};
;
var $1CRI = $1CRI || {};
$1CRI.smartVideo = $1CRI.smartVideo || {};

$1CRI.smartVideo.core = function(settings, container) {
  this.utils = $1CRI.utils;
  this.videoContainer = document.createElement('div');
  this.videoContainer.id = 'VideoContainer' + (Math.random() * 1000);
  container.appendChild(this.videoContainer);
  this.settings = settings;
  this.originalWidth = this.settings.Width;
  this.originalHeight = this.settings.Height;
  this.currentAspectRatio = 1;
  try {
    this.setupVideo();
  } catch (e) {
    console.log('[SMART PLAYER ERROR]' +e);
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
      self.settings.Width = self.originalWidth * self.utils.aspectRatio;
      self.settings.Height = self.originalHeight * self.utils.aspectRatio;
      self.currentAspectRatio = self.utils.aspectRatio;
    }
  	var smartPlayer = ADTECH.modules.SmartVideoPlayer.createPlayer({
      container: self.videoContainer,
      width: self.settings.Width,
      height: self.settings.Height,
      poster: self.settings['Preview Image'],
  		autoplay: false,
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
     smartPlayer.play({auto: true});
    } else {
     smartPlayer.pause();
  	}
  },
  updateSize: function() {
    var self = this;
    if (self.utils.aspectRatio != self.currentAspectRatio) {
      self.currentAspectRatio = self.utils.aspectRatio;
      self.settings.Width = self.settings.Width * (self.utils.aspectRatio*0.9986);
      self.settings.Height = self.settings.Height * (self.utils.aspectRatio*0.9986);
      console.log(self.videoContainer.firstChild);
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
ADTECH.ready(['SmartVideoPlayer/1.1.1/SmartVideoPlayer'], function() {
  'use strict'
	new $1CRI.core();
});

/*
ADTECH.addEventListener('hello', function() {
  console.log('HELLOOOOO');
});
*/
;
