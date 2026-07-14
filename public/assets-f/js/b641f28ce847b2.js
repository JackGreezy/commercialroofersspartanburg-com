const largeFullWidthCTASwiper = new Swiper('.large-full-width-cta-swiper', {
  // autoplay: {
  //   delay: 5000,
  // },
  loop: true,
  pagination: {
    clickable: true,
    el: '.lfwc-swiper-pagination',
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  observer: true,
  observeParents: true,
});