var $1CRI = $1CRI || {};
$1CRI.smartVideo = $1CRI.smartVideo || {};

$1CRI.smartVideo.core = function() {

};

$1CRI.smartVideo.core.protype = {
  setupVideo: function() {
    vidPrevImg = videoContent['Preview Image'];
    vidEndImg = videoContent['End Image'];
    vid = document.createElement('div');
    ADTECH.registerVideoPlayer(vid, 'Video');
    container.appendChild(vid);
  	var smartPlayer = ADTECH.modules.SmartVideoPlayer.createPlayer({
      container: vid,
      width: videoContent.Width,
      height: videoContent.Height,
      poster: vidPrevImg,
  		autoplay: false,
      src: {
        mp4: videoContent['MP4 File'],
        webm: videoContent['WEBM File']
      }
    });
    vid.style.position = 'absolute';
    vid.style.left = videoContent.X + 'px';
    vid.style.top = videoContent.Y + 'px';
    if (videoContent['Auto Play'] === true || videoContent['Auto Play'] === 'true') {
     smartPlayer.play({auto: true});
    } else {
     smartPlayer.pause();
  	}
  }
};
