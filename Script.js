let faq = document.querySelectorAll('.faq');

// console.log(faq);

faq.forEach((item) => {
    let answer = item.querySelector('.answer');
    let plusIcon = item.querySelector('.plus-icon');
    let minusIcon = item.querySelector('.minus-icon');
    item.addEventListener('click', () => {
        if (answer.classList.contains('active')) {
            answer.classList.remove('active');
            plusIcon.style.display = 'block';
            minusIcon.style.display = 'none';
        } else {
            answer.classList.add('active');
            plusIcon.style.display = 'none';
            minusIcon.style.display = 'block';

        }
    })
})

// To the top code

window.addEventListener("scroll", (event) => {
    let scrollBtn = document.querySelector('.to-the-top');
    let scroll = this.scrollY;
    if (scroll > 400) {
        scrollBtn.classList.add('active');
    } else {
        scrollBtn.classList.remove('active');
    }
});

// Mobile navbar code

let mobileNavBtn = document.querySelector('.mobile-nav-btn');
let mobileNavBack = document.querySelector('.close-icon');

mobileNavBtn.addEventListener('click', () => {
    let mobileNavBar = document.querySelector('.mobile-navbar');
    mobileNavBar.classList.add('active');
})

mobileNavBack.addEventListener('click', () => {
    let mobileNavBar = document.querySelector('.mobile-navbar');
    mobileNavBar.classList.remove('active');
})


let apiURL = 'https://spoo.me/'
let shortUrlText;

function shortUrl() {

    let shortUrlText = '';
    let linkValue = document.querySelector('#urlInput').value;

    if (linkValue) {

        fetch(apiURL, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'url=' + encodeURIComponent(linkValue)
        }).then((response, ) => {
            // console.log(response);
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.text();
        }).then((data) => {
            shortUrlText = JSON.parse(data).short_url;
            showShortUrl(shortUrlText);
        }).catch((error) => {
            // console.log(error);
            showInvalidUrlErrorMsg();
        })
    } else {

        showEmptyLinkMsg();
    }

}

function showShortUrl(shorturl) {

    let paragraph = document.createElement('p');
    paragraph.classList.add('shortLinkPara')
    paragraph.innerHTML = `<strong>Here's your short link:</strong> ${shorturl}`;
    document.querySelector('.shortUrlContainer').appendChild(paragraph);

}

function showEmptyLinkMsg() {

    let span = document.createElement('span');
    span.style.color = 'red';
    span.innerHTML = 'Please enter your link!';
    document.querySelector('.errorMsg').appendChild(span);
    setTimeout(() => {
        span.style.display = 'none';
    }, 3000);
}

function showInvalidUrlErrorMsg() {
    let span = document.createElement('span');
    span.style.color = 'red';
    span.innerHTML = 'Please enter a valid URL';
    document.querySelector('.errorMsg').appendChild(span);
    setTimeout(() => {
        span.style.display = 'none';
    }, 3000);
}