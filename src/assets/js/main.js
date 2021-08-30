$(document).ready(function () {
  var myCarousel = document.querySelector('#myCarousel')
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 6000,
    wrap: false
  });

  $('.dropdown-toggle').dropdown();
});
