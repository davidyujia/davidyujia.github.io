
(function () {
    var stylesheets = [
        'https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap',
        'https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap',
        baseUrl + '/assets/css/main.css',
        baseUrl + '/assets/css/highlight.css'
    ];
    var cb = function () {
        var headTag = document.getElementsByTagName('head')[0];
        for (var i = 0; i < stylesheets.length; i++) {
            var linkTag = document.createElement('link');
            linkTag.rel = 'stylesheet';
            linkTag.href = stylesheets[i];
            headTag.parentNode.insertBefore(linkTag, headTag);
        }
    };
    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
        webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) raf(cb);
    else window.addEventListener('load', cb);
});