// 在</body>前插入
<script>
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bgVideo');
  const sources = {
    ios: { type: 'video/mp4', src: '/videos/ios-fallback.mp4' },
    default: [
      { type: 'video/mp4', src: '/videos/main-h265.mp4' },
      { type: 'video/webm', src: '/videos/main-vp9.webm' }
    ]
  };

  // 清空现有视频源
  while(video.firstChild) video.removeChild(video.firstChild);

  // 动态插入新源
  if (/(iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
    const source = document.createElement('source');
    source.src = sources.ios.src;
    source.type = sources.ios.type;
    video.appendChild(source);
  } else {
    sources.default.forEach(format => {
      const source = document.createElement('source');
      source.src = format.src;
      source.type = format.type;
      video.appendChild(source);
    });
  }

  // 重新加载视频
  video.load();
  
  // 处理iOS自动播放限制
  video.play().catch(error => {
    console.log('自动播放被阻止，显示备用海报');
    video.poster = '/img/fallback-poster.jpg';
  });
});
</script>