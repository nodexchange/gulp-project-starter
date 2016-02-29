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
