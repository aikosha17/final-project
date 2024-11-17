let currentIndex = 0;

function updateCarousel() {
  const carousel = document.getElementById("carousel");
  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;

  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  }

  const offset = -currentIndex * 100; // Сдвигаем карусель
  carousel.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  currentIndex++;
  updateCarousel();
}

function prevSlide() {
  currentIndex--;
  updateCarousel();
}
