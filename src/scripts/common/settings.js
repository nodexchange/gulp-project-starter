$1CRI.Settings = function () {
  this.Clickthrough = ADTECH.getContent('Clickthrough', '{{contentProperties.Clickthrough}}');
  this.Image = ADTECH.getContent('Image', {{contentProperties.Image}});
  this.CloseButton = ADTECH.getContent('CloseButton', {{contentProperties.CloseButton}});
  this.VideoPlayer = ADTECH.getContent('VideoPlayer', {{contentProperties.VideoPlayer}});
};

// module.exports = $1CRI.Settings;
