(function() {
  const VIDEO_LOAD_TIMEOUT = 5000;
  
  function initVideoBackground() {
    const video = document.querySelector('.video-background');
    if (!video) return;

    let isLoaded = false;

    const showVideo = () => {
      if (isLoaded) return;
      video.classList.add('loaded');
      isLoaded = true;
    };

    const handleError = () => {
      video.parentNode.classList.add('video-error');
    };

    // 状态检测
    if (video.readyState >= 3) {
      showVideo();
    } else {
      video.addEventListener('loadeddata', showVideo);
      video.addEventListener('canplaythrough', showVideo);
    }

    video.addEventListener('error', handleError);

    // 超时处理
    setTimeout(() => {
      if (!isLoaded) {
        showVideo();
        handleError();
      }
    }, VIDEO_LOAD_TIMEOUT);
  }

  if (document.readyState === 'complete') {
    initVideoBackground();
  } else {
    window.addEventListener('load', initVideoBackground);
  }
})();