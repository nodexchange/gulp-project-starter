'use strict';
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
$1CRI.Settings = function () {
  this.contractedImage = ADTECH.getContent('Collapsed Image', '320x50.gif');
  this.click = ADTECH.getContent('Clickthrough', 'http://www.adtech.com');
  this.enableVideo = ADTECH.getContent('Enable Video Player', true);
  this.expandedSettings = ADTECH.getContent('Expanded Settings', {'Image':'320x480.gif', 'Width':'320', 'Height':'480', 'Close Button Image': 'closeButton_100x100.png', 'Start Expanded': false});
  this.videoContent = ADTECH.getContent('Video Player', { 'X':'22', 'Y':'150', 'Width':'275', 'Height':'150', 'Preview Image':'270x180.gif', 'End Image':'270x180.gif', 'MP4 File':'sample-video.mp4', 'WEBM File':'sample-video.webm', 'Auto Play':'true', 'Volume':'0.7'});
};

// module.exports = $1CRI.Settings;
;
var $1CRI = $1CRI || {};

$1CRI.imageContainer = function() {
  var expW = expandedSettings.Width;
  var expH = expandedSettings.Height;
  if (contractImg) {
    setVisible(contractImg, false);
  }
  if (!expandImg) {
    expandImg = createImg(expandedSettings.Image, expW, expH);
    expandImg.onclick = clickHandler;
  } else {
    setVisible(expandImg, true);
    setVisible(contractBtn, true);
  }
};
$1CRI.imageContainer.protype = {
  setVisible: function(elem, show) {
    if (show === true) {
      elem.style.display = '';
    } else {
      elem.style.display = 'none';
    }
  },
  createImg: function(fileSrc, w, h, handler, container) {
    var img = document.createElement('img');
    img.src = fileSrc;
    // Forced for retina display
    img.width = w;
    img.height = h;
    container.appendChild(img);
    return img;
  }
};
;
var $1CRI = $1CRI || {};
$1CRI.smartVideo = $1CRI.smartVideo || {};

$1CRI.closeButton = function() {

};

$1CRI.closeButton.protype = {
  setupVideo: function() {
    if (!contractBtn) {
      contractBtn = document.createElement('img');
      contractBtn.src = expandedSettings['Close Button Image'];
      contractBtn.style.position = 'absolute';
      contractBtn.style.right = '4px';
      contractBtn.style.top = '4px';
      contractBtn.onclick = onStateChangeHandler;
      container.appendChild(contractBtn);
    }
  },
  clickHandler: function() {
    ADTECH.close();
  }
};
;
var $1CRI = $1CRI || {};
$1CRI.smartVideo = $1CRI.smartVideo || {};

$1CRI.smartVideo.core = function() {

};

$1CRI.smartVideo.core.protype = {
  setupVideo: function() {
    vidPrevImg = videoContent['Preview Image'];
    vidEndImg = videoContent['End Image'];
    vid = document.createElement('div');
    ADTECH.registerVideoPlayer(vid, 'Video');
    container.appendChild(vid);
  	var smartPlayer = ADTECH.modules.SmartVideoPlayer.createPlayer({
      container: vid,
      width: videoContent.Width,
      height: videoContent.Height,
      poster: vidPrevImg,
  		autoplay: false,
      src: {
        mp4: videoContent['MP4 File'],
        webm: videoContent['WEBM File']
      }
    });
    vid.style.position = 'absolute';
    vid.style.left = videoContent.X + 'px';
    vid.style.top = videoContent.Y + 'px';
    if (videoContent['Auto Play'] === true || videoContent['Auto Play'] === 'true') {
     smartPlayer.play({auto: true});
    } else {
     smartPlayer.pause();
  	}
  }
};
;

/* Core */
var $1CRI = $1CRI || {};
$1CRI.core = function() {
  this.addSmartListeners();
  this.initialize();
};

$1CRI.core.prototype = {
  init: function() {
    var self = this;
    self.container = document.createElement('div');
    self.container.style.position = 'relative';
    document.body.appendChild(self.container);
    var bgImage = $1CRI.imageContainer(self.settings, self.container);
    if (enableVideo === true) {
      var smartPlayer = $1CRI.smartPlayer.core(self.settings, self.container);
    }
    var closeBtn = $1CRI.closeBtn(self.container);
  },
  clickHandler: function() {
    ADTECH.dynamicClick('Clickthrough', click);
  }
};
ADTECH.ready(['SmartVideoPlayer/1.1.1/SmartVideoPlayer'], function() {
  'use strict'
  console.log('HERE');
	this.RI();
});
console.log('H<<>>');
;

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
