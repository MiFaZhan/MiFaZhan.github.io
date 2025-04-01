// source/js/custom.js (优化版)
document.addEventListener("DOMContentLoaded", () => {
  // 增强型移动端检测
  const isMobile = /(iPhone|iPad|iPod|Android|Windows Phone)/i.test(navigator.userAgent);
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  
  // 同时检测移动端和折叠屏设备
  if (isMobile || (isPortrait && window.innerWidth < 768)) {
    document.querySelectorAll('#banner_video_insert').forEach(el => el.remove());
    return;
  }

  // 初始化视频背景
  initializeVideoBackground().catch(handleVideoError);
});

async function initializeVideoBackground() {
  try {
    // 带超时机制的请求
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('/js/video_url.json', { 
      signal: controller.signal 
    });
    clearTimeout(timeoutId);

    const videoData = await response.json();
    if (!Array.isArray(videoData) || videoData.length === 0) {
      throw new Error('Invalid video data');
    }

    // 动态创建视频元素
    const video = createVideoElement(videoData);
    video.style.opacity = 0; // 初始透明避免闪烁
    
    // 插入到正确层级
    const container = document.createElement('div');
    container.id = 'banner_video_insert';
    container.style.cssText = `
      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    `;
    container.appendChild(video);
    document.body.insertBefore(container, document.body.firstChild);

    // 视频加载完成后的渐变显示
    video.oncanplaythrough = () => {
      video.style.opacity = 1;
      video.style.transition = 'opacity 1s ease';
    };

    // 绑定自适应逻辑
    setupVideoResponsive(video);

  } catch (error) {
    throw new Error(`Video init failed: ${error.message}`);
  }
}

function createVideoElement(urls) {
  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.style.cssText = `
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
  `;

  // 随机选择视频源
  const src = urls[Math.floor(Math.random() * urls.length)];
  video.innerHTML = `<source src="${src}" type="video/mp4">`;

  return video;
}

function setupVideoResponsive(video) {
  // 增强型自适应算法
  const resizeHandler = () => {
    const aspectRatio = window.innerHeight / window.innerWidth;
    const isUltrawide = aspectRatio < 0.5;
    const isSquare = aspectRatio > 0.9;

    if (isUltrawide) {
      video.style.width = 'auto';
      video.style.height = '100%';
    } else if (isSquare) {
      video.style.width = '100%';
      video.style.height = 'auto';
    } else {
      video.style.width = aspectRatio > 0.56 ? '100%' : 'auto';
      video.style.height = aspectRatio > 0.56 ? 'auto' : '100%';
    }
  };

  // 带节流的resize监听
  let isResizing = false;
  window.addEventListener('resize', () => {
    if (!isResizing) {
      isResizing = true;
      requestAnimationFrame(() => {
        resizeHandler();
        isResizing = false;
      });
    }
  });

  // 初始执行
  resizeHandler();
}

function handleVideoError(error) {
  console.error('Video Error:', error);
  document.querySelectorAll('#banner_video_insert').forEach(el => el.remove());
  
  // 显示备用内容
  const fallback = document.createElement('div');
  fallback.className = 'banner-fallback';
  fallback.innerHTML = `<img src="/img/fallback.jpg" alt="Background">`;
  document.body.prepend(fallback);
}