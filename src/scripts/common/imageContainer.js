$1CRI.imageContainer = function(dimensions, settings) {
  this.utils = $1CRI.utils;
  var defaultWidth = settings['Default Width'];
  var defaultHeight = settings['Default Height'];
  var scaleToFit = settings['Scale to Fit'];

  if(settings['Use Image'] == 'true' || settings['Use Image'] == true){
    this.image = this.createImg(settings.Source, defaultWidth, defaultHeight);
  } else { console.log('[Juti] settings juti ELSE !!!!!', settings, 'dimensions !!!!', dimensions); 
    this.image = this.createBgColor(settings.Color, defaultWidth, defaultHeight);
  }
  //this.image = this.createImg(settings.Source, defaultWidth, defaultHeight);
  if (scaleToFit) { console.log('dimensions', dimensions.w, dimensions.h); 
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
  isClickable: function() {
    return this.settings.Clickable;
  },
  getImage: function() {console.log('this.image', this.image);
    return this.image; 
  },
  createImg: function(fileSrc, width, height) { console.log('width', width, 'height', height); 
    var img = document.createElement('img');
    img.src = fileSrc;
    // Forced for retina display
    img.width = width;
    img.height = height;
    return img;
  },
  //create a background container with color
  createBgColor: function(color, width, height) {
    var bgColor = document.createElement('div');
    bgColor.style.backgroundColor = color;
  
    bgColor.style.width = width+'px';
    bgColor.style.height = height+'px'; 

    return bgColor; 
  },
  updateSize: function(dimensions) { console.log('[juti] dimensions!!!!! ', dimensions); //juti
    this.utils.resizeImagePerRatio(this.image, dimensions.w, dimensions.h);
  }
};
