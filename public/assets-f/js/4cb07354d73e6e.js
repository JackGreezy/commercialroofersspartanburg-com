
const swiperThumbs = new Swiper('.ph-swiper-thumbs', {
    spaceBetween: 24,
    slidesPerView: 7,
    freeMode: true,
    watchSlidesProgress: true,
  });
  
  const swiperMain = new Swiper('.ph-swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: swiperThumbs,
    },
  });