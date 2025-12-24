const logoText = document.getElementById('logo-text');
const heroSection = document.getElementById('home'); 
const kamiSection = document.getElementById('kami'); 

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if(scrollY >= kamiSection.offsetTop - 70){ 
        logoText.classList.remove('text-white');
        logoText.classList.add('text-gray-900'); 
        } else {
        logoText.classList.remove('text-gray-900');
        logoText.classList.add('text-white');
        }
});