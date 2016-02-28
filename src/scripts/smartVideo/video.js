var $1CRI = $1CRI || {};
$1CRI.smartPlayer = $1CRI.smartPlayer || {};

$1CRI.smartPlayer.core = function(settings, container) {
  'use strict';
  this.container = container;
  this.playerSettings = settings;
};

$1CRI.smartPlayer.core.protype = {
  setupVideo: function() {
    var self = this;
    this.vidPrevImg = this.playerSettings['Preview Image'];
    this.vidEndImg = this.playerSettings['End Image'];
    this.vid = document.createElement('div');
    ADTECH.registerVideoPlayer(self.vid, 'Video');
    this.container.appendChild(self.vid);
  	var smartPlayer = ADTECH.modules.smartPlayerPlayer.createPlayer({
      container: self.vid,
      width: self.playerSettings.Width,
      height: self.playerSettings.Height,
      poster: self.vidPrevImg,
  		autoplay: false,
      src: {
        mp4: self.playerSettings['MP4 File'],
        webm: self.playerSettings['WEBM File']
      }
    });
    self.vid.style.position = 'absolute';
    self.vid.style.left = self.playerSettings.X + 'px';
    self.vid.style.top = self.playerSettings.Y + 'px';
    if (this.playerSettings['Auto Play'] === true || this.playerSettings['Auto Play'] === 'true') {
     smartPlayer.play({auto: true});
    } else {
     smartPlayer.pause();
  	}
  }
};
