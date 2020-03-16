window.onload = function() {
    addMenuItemClickHandler();
    addPhoneScreenClickHandler();
}


// Header menu

const addMenuItemClickHandler = () => {
    document.querySelector('.navigation__list').addEventListener('click', (e) => {
        if(e.target.classList.contains('navigation__link')) {
            let clickedMenuItem = e.target;
            removeSelectedMenuItem();
            selectClickedMenuItem(clickedMenuItem);
        }
    });
}

const removeSelectedMenuItem = () => {
    let items = document.querySelectorAll('.navigation__list .navigation__link');
    items.forEach(item => {
        item.classList.remove('active');
    })
}

const selectClickedMenuItem = (clickedMenuItem) => {
    clickedMenuItem.classList.add('active');
}


// Slider phone

let addPhoneScreenClickHandler = () => {
    document.querySelector('.phone-vertical').addEventListener('click', (e) => {
        if(e.target.classList.contains('screen')) {   
            let disable = document.querySelector('.phone-vertical .screen');
            disable.classList.toggle('screen_disable');  
            
            // let able = e.target;
            // let isDisable = able.classList.contains('screen_disable');
            // let hidePhoneScreen = document.querySelector('.phone-vertical .screen');
            
            // hidePhoneScreen.addEventListener("click", function() {
            //     if (isDisable) {
            //         able.classList.remove('screen_disable')
            //         isDisable = false;
            //     } else {
            //         able.classList.add('screen_disable')
            //         isDisable = true;
            //     }
            // }); 
        }
    })

    document.querySelector('.phone-horizontal').addEventListener('click', (e) => {
        if(e.target.classList.contains('screen')) {
            let disable = document.querySelector('.phone-horizontal .screen');
            disable.classList.toggle('screen_disable');  
        }
    })
}


// Portfolio tags


