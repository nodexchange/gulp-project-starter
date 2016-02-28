$1CRI.Settings = function () {
  this.contractedImage = ADTECH.getContent('Collapsed Image', '320x50.gif');
  this.click = ADTECH.getContent('Clickthrough', 'http://www.adtech.com');
  this.enableVideo = ADTECH.getContent('Enable Video Player', true);
  this.expandedSettings = ADTECH.getContent('Expanded Settings', {'Image':'320x480.gif', 'Width':'320', 'Height':'480', 'Close Button Image': 'closeButton_100x100.png', 'Start Expanded': false});
  this.videoContent = ADTECH.getContent('Video Player', { 'X':'22', 'Y':'150', 'Width':'275', 'Height':'150', 'Preview Image':'270x180.gif', 'End Image':'270x180.gif', 'MP4 File':'sample-video.mp4', 'WEBM File':'sample-video.webm', 'Auto Play':'true', 'Volume':'0.7'});
};

// module.exports = $1CRI.Settings;
