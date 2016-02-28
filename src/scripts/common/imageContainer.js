var $1CRI = $1CRI || {};

$1CRI.imageContainer = function() {
  var expW = expandedSettings.Width;
  var expH = expandedSettings.Height;
  if (contractImg) {
    setVisible(contractImg, false);
  }
  if (!expandImg) {
    expandImg = createImg(expandedSettings.Image, expW, expH);
    expandImg.onclick = clickHandler;
  } else {
    setVisible(expandImg, true);
    setVisible(contractBtn, true);
  }
};
$1CRI.imageContainer.protype = {
  setVisible: function(elem, show) {
    if (show === true) {
      elem.style.display = '';
    } else {
      elem.style.display = 'none';
    }
  },
  createImg: function(fileSrc, w, h, handler, container) {
    var img = document.createElement('img');
    img.src = fileSrc;
    // Forced for retina display
    img.width = w;
    img.height = h;
    container.appendChild(img);
    return img;
  }
};
