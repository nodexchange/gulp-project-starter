$1CRI.utils = {
  aspectRatio: 1,
  getCurrentAspectRatio: function() {
    return $1CRI.utils.aspectRatio;
  },
  resizeImagePerRatio: function(element, maxWidth, maxHeight) {
    var ratio = 0; // Used for aspect ratio
    var width = element.width; // Current image width
    var height = element.height; // Current image height
    var resizeType = '';
    console.log('>>> width '+width +' height > ' + height +' maxWidth > '+ maxWidth + ' maxHeight > '+ maxHeight)
    var dims = $1CRI.utils.calculateAspectRatioFit(width, height, maxWidth, maxHeight);
    element.width = dims.width;
    element.height = dims.height;
    $1CRI.utils.aspectRatioH = dims.height / height;
    $1CRI.utils.aspectRatioW = dims.width / width;
    console.log($1CRI.utils.aspectRatioH + ' > '+$1CRI.utils.aspectRatioW);
  },
  /**
 * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth Source area width
 * @param {Number} srcHeight Source area height
 * @param {Number} maxWidth Fittable area maximum available width
 * @param {Number} maxHeight Fittable area maximum available height
 * @return {Object} { width, heigth }
 */
 calculateAspectRatioFit: function(srcWidth, srcHeight, maxWidth, maxHeight) {
     var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
     return { width: srcWidth*ratio, height: srcHeight*ratio };
  }
};
