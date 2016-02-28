var $1CRI = $1CRI || {};
$1CRI.smartVideo = $1CRI.smartVideo || {};

$1CRI.closeButton = function() {

};

$1CRI.closeButton.protype = {
  setupVideo: function() {
    if (!contractBtn) {
      contractBtn = document.createElement('img');
      contractBtn.src = expandedSettings['Close Button Image'];
      contractBtn.style.position = 'absolute';
      contractBtn.style.right = '4px';
      contractBtn.style.top = '4px';
      contractBtn.onclick = onStateChangeHandler;
      container.appendChild(contractBtn);
    }
  },
  clickHandler: function() {
    ADTECH.close();
  }
};
