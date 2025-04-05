// 在自定义JS文件中添加
document.fonts.load('1em YourFont').then(() => {
    document.documentElement.classList.add('fonts-loaded');
});

// 对应CSS
