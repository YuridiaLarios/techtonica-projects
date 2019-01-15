var iframe = document.getElementById("pizza-video");
var videoWidth = iframe.width;
var videoHeight = iframe.height;
var screenSize = window.innerWidth;

console.log(videoWidth);
console.log(videoHeight);
console.log(screenSize);


if (screenSize <= 1800) {
  iframe.width = 640;
  iframe.height = 360;
}