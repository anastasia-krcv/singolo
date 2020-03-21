window.onload = function() {

    // transition to blocks
    document.addEventListener('scroll', onScroll);
   
    // off/on phone screen 
    addPhoneScreenClickHandler();

    // portfolio tags navigation
    document.querySelector('.portfolio-navigation__list').addEventListener('click', addTagsHandler);

    // modal
    openModal();
    closeModal();
}


// Header menu

const onScroll = () => {
    let headerHeight = document.querySelector('header').offsetHeight;
    let currentPosition = window.scrollY + headerHeight;
    let sections = document.querySelectorAll('body > section');
    let links = document.querySelectorAll('.navigation a');

    let pageHeight = document.documentElement.scrollHeight;
    let scrollHeightToBottom = window.scrollY + document.documentElement.clientHeight;

    sections.forEach((item) => {     
        if(item.offsetTop <= currentPosition && (item.offsetTop + item.offsetHeight) > currentPosition) {
            links.forEach((a) => {
                a.classList.remove('active');
                if(scrollHeightToBottom === pageHeight) {
                    links[links.length - 1].classList.add('active');
                } 
                else if(item.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active');
                }
            })
        }     
    })
}


// Carousel

const items = document.querySelectorAll('.carousel__item');
let currentItem = 0;
let isEnabled = true;


function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}


const changeBgCurrentItem = (n) => {   
    let prevSlideClass = `bg_slide-${(n + items.length) % items.length}`;
    let newSlideClass = `bg_slide-${(n + 1 + items.length) % items.length}`;

    document.querySelector('#slider').classList.remove(prevSlideClass);
    document.querySelector('#slider').classList.add(newSlideClass);
}


function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}


function showItem(direction) {    
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active'); 
        isEnabled = true;
    })
}


function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');   
    changeBgCurrentItem(n);
}


function nextItem(n) {   
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
    changeBgCurrentItem(n);
}


document.querySelector('.arrow_left').addEventListener('click', function() {
    if(isEnabled) {
        previousItem(currentItem);
    }
})

document.querySelector('.arrow_right').addEventListener('click', function() {
    if(isEnabled) {
        nextItem(currentItem);
    }
})


// off/on phone screen

const addPhoneScreenClickHandler = () => {
    document.querySelector('.phone-vertical').addEventListener('click', (e) => {
        let disable = document.querySelector('.phone-vertical .screen');
        disable.classList.toggle('screen_disable'); 
        
    })

    document.querySelector('.phone-horizontal').addEventListener('click', (e) => {
        let disable = document.querySelector('.phone-horizontal .screen');
        disable.classList.toggle('screen_disable');  
    })
}


// Portfolio tags

const addTagsHandler = (e) => { 
    let clickedTag = e.target;
    if(!clickedTag.classList.contains('tag_active')) {
        if(clickedTag.tagName === 'SPAN') {
            removeSelectedTags();
            selectClickedTag(clickedTag);
    
            const arts = document.querySelectorAll('.art');
            const shuffleArts = shuffle(artsArr);
            
            arts.forEach((art, index) => {
                art.outerHTML = shuffleArts[index].outerHTML;
            })
        }
    }
    
}


const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {          
        tag.classList.remove('tag_active');
        tag.classList.add('tag_not-active');
    });
}


const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('tag_active');
    clickedTag.classList.remove('tag_not-active');
}


const artsArr = [...document.querySelectorAll('.art')];

const shuffle = (artsArr) => {
	let j, temp;
	for(let i = artsArr.length - 1; i > 0; i--){
		j = Math.floor(Math.random() * (i + 1));
		temp = artsArr[j];
		artsArr[j] = artsArr[i];
		artsArr[i] = temp;
	}
	return artsArr;
}


// Arts border

const arts = document.querySelector('.portfolio-block');

arts.addEventListener('click', (e) => {
    if(e.target.tagName === 'IMG') {
        let img = e.target;
        arts.querySelectorAll('.portfolio__img').forEach(img => {
            img.classList.remove('portfolio__img_active');
        });
        img.classList.add('portfolio__img_active');
    }
});



// Modal

const form = document.querySelector('#contact-form');

const openModal = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addModalSubjectText();
        addModalDescribeText();
        document.querySelector('#modal').classList.remove('modal_hidden');
        document.querySelector('#cover').classList.add('cover');
                    
    })     
}


const addModalSubjectText = () => {
    let modalSubject = document.querySelector('.subject');
    let userSubject = document.querySelector('.user-subject').value;

    userSubject.replace(/\s/g, '').length ?
        modalSubject.innerHTML = `Subject: ${userSubject}` 
        : modalSubject.innerHTML = 'No subject';
}


const addModalDescribeText = () => {
    let modalDescribe = document.querySelector('.describe');
    let userDescribe = document.querySelector('.user-describe').value;

    userDescribe.replace(/\s/g, '').length ? 
        modalDescribe.innerHTML = `Description: ${userDescribe}` 
        : modalDescribe.innerHTML = 'No description';
    
}

const closeModal = () => {
    let modal = document.querySelector('.modal__button'); 

    modal.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#modal').classList.add('modal_hidden');
        document.querySelector('#cover').classList.remove('cover');
        form.reset();          
    })  
}
