document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.video-background');
  
  // 视频加载完成时添加渐显类
  video.addEventListener('loadeddata', function() {
    video.classList.add('video-loaded');
  });

  // 可选：处理加载失败
  video.addEventListener('error', function() {
    console.log('视频加载失败');
  });
});