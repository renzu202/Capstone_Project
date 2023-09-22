

  // Function to handle the intersection observer callback
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }

  // Create an Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.8,
  });

  // Add the fade-in class and observe each element
  const rows = document.querySelectorAll('.fade-in');
  rows.forEach((row) => {
    row.classList.add('fade-in');
    observer.observe(row);
  });



 // Function to scroll the window to the top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // You can change this to 'auto' for instant scrolling
    });
  }

  // Attach the scrollToTop function to the window's load event
  window.addEventListener('load', scrollToTop);