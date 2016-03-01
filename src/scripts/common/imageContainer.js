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
