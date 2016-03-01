var $1CRI = $1CRI || {};
$1CRI.smartVideo = $1CRI.smartVideo || {};

$1CRI.closeButton = function(settings) {
  this.settings = settings;
  var button = this.setupButton();
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
