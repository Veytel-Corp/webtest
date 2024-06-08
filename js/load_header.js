(function loadHeaderStyles(filePath = './css/header.css') {
    const headEl = document.querySelector('head');
    let headElInnerHTML = headEl.innerHTML;
    headElInnerHTML += `<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet"> <link rel="stylesheet" href="./css/header.css" />`;
    headEl.innerHTML = headElInnerHTML;
})();

(function loadHeader(filePath = './html/header.html') {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Something went wrong when attempting to get the header content. Check file path. ${response.statusText}`);
            }
            return response.text()
        })
        .then(data => {
            document.querySelector('header').innerHTML = data;
            const navElement = document.querySelector('.main-menu');
            observer.observe(navElement);
        })
        
        .catch(error => {
            console.error(`Something went wrong when fetching the header content: `, error);
        })
})();

window.addEventListener('scroll', ()=> {
    if (window.scrollY === 0) {
        const scrollingNavEl = document.querySelector('.scrolling-nav');
            const introNavEl = document.querySelector('.intro-nav');
            const mainMenuEl = document.querySelector('.main-menu');
            setTimeout(()=>{
                introNavEl.classList.remove('hidden');
                mainMenuEl.classList.remove('hidden');
            }, 10)
            scrollingNavEl.classList.remove("revealed-scrolling-nav");
    }
})


const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            const scrollingNavEl = document.querySelector('.scrolling-nav');
            const introNavEl = document.querySelector('.intro-nav');
            const mainMenuEl = document.querySelector('.main-menu');
            setTimeout(()=>{
                introNavEl.classList.add('hidden');
                mainMenuEl.classList.add('hidden');
            }, 10)
            scrollingNavEl.classList.add("revealed-scrolling-nav");
            console.log('off the screen');
        }
    });
};
const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: '0px',
    threshold: .7
});