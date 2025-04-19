document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.video-background');
  const videoContainer = document.querySelector('.video-container');
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // 添加加载完成监听
      video.addEventListener('loadeddata', () => {
        videoContainer.classList.add('video-loaded');
      }, { once: true });
      
      video.load();
      video.play().catch(() => {}); // 处理自动播放被阻止的情况
    }
  });
  
  observer.observe(video);
});