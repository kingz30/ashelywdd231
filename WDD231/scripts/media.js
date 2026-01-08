// Image error handling - provides fallback for images that fail to load
document.querySelectorAll('img[data-fallback]').forEach((img) => {
  const fallback = img.getAttribute('data-fallback');
  if (!fallback) return;
  img.addEventListener('error', () => {
    img.src = fallback;
  }, { once: true });
});
