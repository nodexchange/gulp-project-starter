$1CRI.utils = {
  aspectRatio: 1,
  getCurrentAspectRatio: function() {
    return $1CRI.utils.aspectRatio;
  },
  resizeImagePerRatio: function(element, maxWidth, maxHeight) {
    var ratio = 0; // Used for aspect ratio
    var width = element.width; // Current image width
    var height = element.height; // Current image height
    if(element.nodeName == 'DIV') {
      width = element.offsetWidth; 
      height = element.offsetHeight;
    }

    var resizeType = 'portrait';
    if (maxWidth<maxHeight) {
      resizeType = 'landscape';
      console.log('[j] landscape'); 
    }
    if (resizeType === 'landscape') {
      // Check if the current width is larger than the max
      /*if (width < maxWidth) {
        ratio = maxWidth / width; // get ratio for scaling image
        $1CRI.utils.aspectRatio = ratio;
        element.width = maxWidth; // Set new width
        element.height = height * ratio; // Scale height based on ratio
        height = height * ratio; // Reset height to match scaled image
        width = width * ratio; // Reset width to match scaled image
      }*/
    } else { 
      console.log('[juti] update resize' + element.nodeName); 
      ratio = maxHeight / height; // get ratio for scaling image
      $1CRI.utils.aspectRatio = ratio;
      if(element.nodeName == 'DIV') {
        var newWidth = (width * ratio);
        console.log('[j]', newWidth);
        element.style.height = maxHeight + 'px';
        element.style.width = newWidth + 'px';
      } else {
        element.height = maxHeight; // Set new height
        element.width = width * ratio; // Scale width based on ratio
      }

      width = width * ratio; // Reset width to match scaled image
      height = height * ratio; // Reset height to match scaled image
    }
  }
};
