(function () {
  var expandedSettings = adtechAdConfig.contentProperties['Expanded Settings'];
	console.log(adtechAdConfig);
  var mainContainer = adtechAdConfig.assetContainers.main;
  mainContainer.contentWidth = expandedSettings['Width'];
	mainContainer.x = (window.innerWidth - 320) / 2;
	mainContainer.y = (window.innerHeight - 480) / 2;
  mainContainer.contentHeight = expandedSettings['Height'];
})();


/**
 * Boilerplate code required to hook into the ADTECH rich media library.
 *
 * For API documentation, please contact canvas-help@adtech.com
 */
(function(adConfig) {
  var requiresBreakout = false;
  for (var id in adConfig.assetContainers) {
    if (adConfig.assetContainers.hasOwnProperty(id)) {
      var container = adConfig.assetContainers[id];
      if (container.type != 'inlineDiv' || container.isExpandable) {
        requiresBreakout = true;
        break;
      }
    }
  }

  var displayWindowTarget = (adConfig.overrides && adConfig.overrides.displayWindowTarget) ?
      adConfig.overrides.displayWindowTarget : top;
  var targetWindow = (requiresBreakout && (self != top) &&
      ((typeof inDapIF != 'undefined' && inDapIF) || (typeof inFIF != 'undefined' && inFIF) ||
      (typeof adtechIframeHashArray != 'undefined')) &&
      ((typeof adtechCanvasAdPreview == 'undefined' || !adtechCanvasAdPreview))) ?
          displayWindowTarget : self;

  targetWindow.com = targetWindow.com || {};
  targetWindow.com.adtech = targetWindow.com.adtech || {};

  targetWindow.com.adtech.AdtechCustomAd$AD_ID$ = function() {
    // Custom code class constructor.
  };

  targetWindow.com.adtech.AdtechCustomAd$AD_ID$.prototype = {

     init: function(advert) {
       if (!advert.richView) {
         // The backup client can not render the rich version of the advert.
         return;
       }
			
       var advertInstance = advert;
       // A few useful things to help you get started. Please delete as necessary!
       this.utils = targetWindow.com.adtech.Utils_$VERSION$;
       this.globalEventBus = targetWindow.adtechAdManager_$VERSION$.globalEventBus;
       this.richMediaEvent = targetWindow.com.adtech.RichMediaEvent_$VERSION$;
			 
			 this.mainContainer = advertInstance.getAssetContainer('main');
       this.mainContent = advertInstance.getContent();
			 this.advert = advertInstance;
			 
       if (typeof mraid != 'undefined') {
         mraid.addEventListener('stateChange', function(){
           advertInstance.eventBus.dispatchEvent('stateChange');
         });
       }
			 
      this.globalEventBus.addEventListener(this.richMediaEvent.PAGE_RESIZE, this.utils.createClosure(this,this.adResize));
			 this.globalEventBus.addEventListener(this.richMediaEvent.PAGE_SCROLL, this.utils.createClosure(this,this.adResize));
      this.globalEventBus.addEventListener(this.richMediaEvent.ORIENTATION_CHANGE, this.utils.createClosure(this,this.adResize));
			if (this.globalEventBus.pageLoaded) {
        this.pageLoadHandler();
      } else {
        this.globalEventBus.addEventListener(this.richMediaEvent.PAGE_LOAD,
          this.utils.createClosure(this, this.pageLoadHandler));
      }
			 
     },

    createEventRecord: function(){
      ADTECH.event('stateChange');
    },
		
		adResize: function() {

      var browserWidth = this.utils.getViewportDims().w;
			var browserHeight = this.utils.getViewportDims().h;
      var adContentWidth = 320;
			var adContentHeight = 480;

			var leftValue = (browserWidth-adContentWidth) / 2;
			var topValue = (browserHeight-adContentHeight) / 2;
			
			this.mainContainer.x = 0;
			this.mainContainer.y = 0;
		

      this.mainContainer.div.style.top = (this.mainContainer.floatOffsetTop + topValue) + 'px';
			this.mainContainer.div.style.left = leftValue + 'px';
			
      
      
    },
		pageLoadHandler: function() {
			/*
			(function () {
				var expandedSettings = adConfig.contentProperties['Expanded Settings'];
				var mainContainer = adConfig.assetContainers.main;
				console.log(mainContainer);
				mainContainer.contentWidth = expandedSettings['Width'];
				mainContainer.x = (targetWindow.innerWidth - 320) / 2;
				mainContainer.y = (targetWindow.innerHeight - 480) / 2;
				
				mainContainer.contentHeight = expandedSettings['Height'];
			})();
			*/
			this.adResize();
		}

   };

   targetWindow.adtechCallbackInstances = targetWindow.adtechCallbackInstances || [];
   var instanceIndex = targetWindow.adtechCallbackInstances.length;
   targetWindow.adtechCallbackInstances[instanceIndex] =
       new targetWindow.com.adtech.AdtechCustomAd$AD_ID$();

   targetWindow.adtechAdCallback = targetWindow.adtechAdCallback || {};
   targetWindow.adtechAdCallback[adConfig.adServerVars.uid] =
       targetWindow.adtechCallbackInstances[instanceIndex];
})(adtechAdConfig);
