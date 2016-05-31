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
