$(document).ready(function () {
  var myCarousel = document.querySelector('#myCarousel')
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 6000,
    wrap: false
  });

  $('.dropdown-toggle').dropdown();

  $('[data-toggle="tooltip"]').tooltip();

  var numbers = $('#box');
  for (let i = 0; i < 100; i++) {
    $(numbers).append(i);
  }
  var num = numbers.css('display', 'none');
  var index = 0;

  function nextNum() {
    num[index].css('display', 'none');
    index = (index + 1) % num.length;
    num[index].css('display', 'initial');
  }

  function prevNum() {
    num[index].css('display', 'none');
    index = (index - 1 + num.length) % num.length;
    num[index].css('display', 'initial');
  }

});
