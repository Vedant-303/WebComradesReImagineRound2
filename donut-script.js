document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const donut_container = document.querySelector('.donut-container');
    const images = document.querySelectorAll('.image');
    const donut_floating = document.querySelector('.donut-floating-text')
    let isContainerHovered = false;
    let hasScrolledOnce = false;
    let touchStartY = 0;




    const getExpandMarginTopValue = () => {
        if (window.innerWidth <= 480) {
            return '30px'; 
        } else if (window.innerWidth <= 768) {
            return '45px'; 
        } else {
            return '60px';
        }
    };

    const getShrinkMarginTopValue = (index) => {
        if (window.innerWidth <= 480) {
            if (index > 1) {
                return '-25px';
            } else if (index > 0) {
                return '-15px';
            } 
        } else if (window.innerWidth <= 768) {
            if (index > 1) {
                return '-125px';
            } else if (index > 0) {
                return '-115px';
            } 
        } else {
            if (index > 1) {
                return '-125px';
            } else if (index > 0) {
                return '-115px';
            }
        }
        return '';
    };

    const getInitialMarginTopValues = (index) => {
        if (window.innerWidth <= 480) {
            return index > 1 ? { from: '50px', to: '-65px' } : { from: '50px', to: '-55px' };
        } else if (window.innerWidth <= 768) {
            return index > 1 ? { from: '75px', to: '-95px' } : { from: '75px', to: '-85px' }; 
        } else {
            return index > 1 ? { from: '100px', to: '-125px' } : { from: '100px', to: '-115px' };
        }
    };

    const expandImages = () => {
        const marginTopValue = getExpandMarginTopValue();
        images.forEach((image, index) => {
            if (index > 0) {
                gsap.to(image, { marginTop: marginTopValue });
                
                donut_floating.style.display = "block";
                setTimeout(() => {
                    donut_floating.classList.add('show');
                }, 500);
                
            }
        });
    };
    
    const shrinkImages = () => {
        images.forEach((image, index) => {
            const marginTopValue = getShrinkMarginTopValue(index);
            
            if (marginTopValue) {
                gsap.to(image, { marginTop: marginTopValue });
            } else {
                donut_floating.style.display = "none";
                setTimeout(() => {
                    donut_floating.classList.remove('show');
                }, 500);
            }
        });
    };

    const initialAnimation = () => {
        images.forEach((image, index) => {
            const { from, to } = getInitialMarginTopValues(index);
            if (index > 1) {
                gsap.fromTo(image, 
                    { marginTop: from },
                    { marginTop: to, duration: 2, ease: 'power2.out' }
                );
            }
            else if (index > 0) {
                gsap.fromTo(image, 
                    { marginTop: from },
                    { marginTop: to, duration: 2, ease: 'power2.out' }
                );
            }
        });
    };


    const handleScroll = (e) => {
        if (isContainerHovered) {
            e.preventDefault();

            if (!hasScrolledOnce) {
                if (e.deltaY > 0 || (e.changedTouches && e.changedTouches[0].clientY < touchStartY)) {
                    expandImages();
                } else {
                    shrinkImages();
                }
                hasScrolledOnce = true;
            } else {
                window.scrollBy(0, e.deltaY || (touchStartY - e.changedTouches[0].clientY));
                hasScrolledOnce = false; 
            }
        }
    };
    const handleTouchStart = (e) => {
        touchStartY = e.changedTouches[0].clientY;
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initialAnimation();
                donut_container.addEventListener('wheel', handleScroll);
                donut_container.addEventListener('touchmove', handleScroll);
                donut_container.addEventListener('touchstart', handleTouchStart);
            } else {
                donut_container.removeEventListener('wheel', handleScroll);
                donut_container.removeEventListener('touchmove', handleScroll);
                donut_container.removeEventListener('touchstart', handleTouchStart);
            }
        });
    }, { threshold: 0.1 });



    observer.observe(donut_container);

    donut_container.addEventListener('mouseenter', () => {
        isContainerHovered = true;
    });

    donut_container.addEventListener('mouseleave', () => {
        isContainerHovered = false;
        hasScrolledOnce = false; 
        shrinkImages(); 
    });

    
});
