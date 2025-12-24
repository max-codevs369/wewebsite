const text = "Kami XII RPL";
  const typedText = document.getElementById("typed-text");
  let index = 0;
  let isDeleting = false;
  let delay = 150; 

  function type() {
    if (!isDeleting) {
      typedText.innerHTML = text.substring(0, index + 1);
      index++;
      if (index === text.length) {
        isDeleting = true;
        delay = 1000; 
      } else {
        delay = 150;
      }
    } else {
      typedText.innerHTML = text.substring(0, index - 1);
      index--;
      if (index === 0) {
        isDeleting = false;
        delay = 500; 
      } else {
        delay = 75; 
      }
    }
    setTimeout(type, delay);
  }

  window.addEventListener("DOMContentLoaded", type);