document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.video-background');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      video.load();
    }
  });
  observer.observe(video);
});