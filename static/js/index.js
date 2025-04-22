$(document).ready(function () {
  $(".navbar-burger").click(function () {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

  const carousels = bulmaCarousel.attach('.carousel', {
			slidesToScroll: 1,
			slidesToShow: 1,
			infinite: true,
			autoplay: false,
    loop: true,
  });

  carousels.forEach((carousel) => {
    carousel.on('before:show', () => {
      console.log('Before show event triggered - preparing to reset GIFs');
      resetAllGifsInCarousel(carousel);
    });
    
    const paginationItems = carousel.element.querySelectorAll('.slider-pagination-item');
    paginationItems.forEach(item => {
      item.addEventListener('click', () => {
        console.log('Pagination item clicked - resetting GIFs');
        resetAllGifsInCarousel(carousel);
      });
    });
  });
  
  setTimeout(() => {
    console.log('Initial reset of GIFs on page load');
    carousels.forEach(carousel => resetAllGifsInCarousel(carousel));
  }, 100);
});

function resetAllGifsInCarousel(carousel) {
  const slides = carousel.element.querySelectorAll('.item');
  
  slides.forEach(slide => {
    const gifs = slide.querySelectorAll('img.resettable-gif');
    console.log(`Found ${gifs.length} GIFs to reset in slide`);
    
    gifs.forEach(gif => {
      const originalSrc = gif.src;
      const newGif = new Image();
      newGif.className = gif.className;
      newGif.style.cssText = gif.style.cssText;
      
      newGif.onload = () => {
        gif.parentNode.replaceChild(newGif, gif);
        console.log('GIF reset completed:', newGif.src);
      };
      
      newGif.src = originalSrc.split('?')[0] + '?t=' + new Date().getTime();
    });
  });
}