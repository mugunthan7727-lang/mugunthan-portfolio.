// Native image dialog keeps CAD details available without leaving the project.
const imageDialog = document.querySelector('.image-dialog');
if (imageDialog && typeof imageDialog.showModal === 'function') {
  document.querySelectorAll('.media-zoom').forEach(button => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      const image = imageDialog.querySelector('img');
      image.src = button.dataset.image;
      image.alt = source.alt;
      imageDialog.querySelector('figcaption').textContent = source.alt;
      imageDialog.showModal();
    });
  });
  imageDialog.querySelector('.dialog-close').addEventListener('click', () => imageDialog.close());
  imageDialog.addEventListener('click', event => {
    if (event.target === imageDialog) imageDialog.close();
  });
}

// Reveal small content blocks; keep long project sections visible and readable.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.05});
  document.querySelectorAll('.project-media > figure, .skill-grid > div').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
