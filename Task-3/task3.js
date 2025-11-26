const images = document.querySelectorAll('.carousel img');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const carousel = document.querySelector('.carousel');

let currentIndex = 0;
let interval = null;

function showImage(index) {
  images.forEach(img => img.classList.remove('active'));
  images[index].classList.add('active');
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

function startSlideshow() {
  interval = setInterval(nextImage, 3000);
}

function stopSlideshow() {
  clearInterval(interval);
}

nextBtn.addEventListener('click', () => {
  nextImage();
  stopSlideshow();
  startSlideshow();
});

prevBtn.addEventListener('click', () => {
  prevImage();
  stopSlideshow();
  startSlideshow();
});

carousel.addEventListener('mouseenter', stopSlideshow);
carousel.addEventListener('mouseleave', startSlideshow);

startSlideshow();