

const titles = document.querySelectorAll('.titles li');
const firstSection = document.querySelector('section:nth-child(1)');
const circle = document.querySelector('.main_circle');
const title = document.querySelector('.titles');

for (let title of titles) {
    title.addEventListener('click', (e) => {
        if (e.target.textContent == 'SKILL') {
            window.scrollTo({
                top: firstSection.offsetHeight,
                behavior: 'smooth'
            });
        } else if (e.target.textContent == 'PROJECT') {
            window.scrollTo({
                top: firstSection.offsetHeight * 2,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: firstSection.offsetHeight * 3,
                behavior: 'smooth'
            });
        }
    });


    title.addEventListener('mouseover', () => {
        circle.classList.add('active');
    })
    title.addEventListener('mouseout', () => {
        circle.classList.remove('active');

    })
};

document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})



// second section move animation
window.addEventListener('scroll', () => {
    if (window.scrollY >= 1) {
        title.classList.add('secondStart');
        circle.setAttribute('style', `top: 190%;`);
        // document.querySelector('.titles > li:nth-child(1)').setAttribute('style', `font-size: 24px; color: rgb(237, 255, 73)`)
    } else {
        title.classList.remove('secondStart');
        circle.setAttribute('style', `top: 50%; opacity: 1`);
    }

});