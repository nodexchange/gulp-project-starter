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
      self.videoContainer.firstChild.style.width = self.settings.Width + 'px';
      self.videoContainer.firstChild.style.height = self.settings.Height + 'px';
    }
  }
};
