var s = document.createElement('script');

s.src = chrome.extension.getURL('jc-script.js'); // job chan

(document.head||document.documentElement).appendChild(s);

s.onload = function() {
  s.parentNode.removeChild(s);
};