try {

} catch (e) {
  console.log('eR  : '+e);
}
'use strict';
@@include('./src/scripts/common/header.js');
@@include('./src/scripts/common/settings.js');
@@include('./src/scripts/common/imageContainer.js');
@@include('./src/scripts/common/closeButton.js');
@@include('./src/scripts/smartPlayer/core.js');

/* Core */
var $1CRI = $1CRI || {};
$1CRI.core = function() {
  this.addSmartListeners();
  this.initialize();
};

$1CRI.core.prototype = {
  init: function() {
    var self = this;
    self.container = document.createElement('div');
    self.container.style.position = 'relative';
    document.body.appendChild(self.container);
    var bgImage = $1CRI.imageContainer(self.settings, self.container);
    if (enableVideo === true) {
      var smartPlayer = $1CRI.smartPlayer.core(self.settings, self.container);
    }
    var closeBtn = $1CRI.closeBtn(self.container);
  },
  clickHandler: function() {
    ADTECH.dynamicClick('Clickthrough', click);
  }
};
@@include('./src/scripts/common/ready.js');
