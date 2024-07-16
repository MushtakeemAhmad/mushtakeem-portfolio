//Togle navbar----------------------------------------------------------
function menuFun(x) {
    x.classList.toggle('change');
}

const menuContainer = document.querySelector(".menu-container");
const navMenu = document.querySelector(".navmenu");

menuContainer.addEventListener("click", mobileMenu);

function mobileMenu() {
    menuContainer.classList.toggle("active");
    navMenu.classList.toggle("active");
}


const navLink = document.querySelectorAll(".nav-link");
navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    menuContainer.classList.remove("change");
    navMenu.classList.remove("change");
    menuContainer.classList.remove("active");
    navMenu.classList.remove("active");
}

//Bottom to top Elements-----------------------------------------
const sr = ScrollReveal({
    reset: true,
    distance: '100px',
    duration: 2000,
    delay: 50
});

const revealElements = [
    '.home-h1',
    '.home-section-h2',
    '.home-image',
    '.home-text',
    '.home-button',
    '.resume',
    '.about-h1',
    '.about-text',
    '.project-h1',
    '.expertise-h1', //add new
    '.box-container',
    '.contact-h1',
    'form',
    '.footer-text',
    '.footer-icon'
];

// Reveal the elements
revealElements.forEach(element => {
    sr.reveal(element, { origin: 'bottom' });
});

// active navbar link for click or scroll-------------------------------
// let sections = document.getElementsByClassName('section');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
// let navLink is already find on above
window.onscroll= ()=>{
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height){
            navLink.forEach(link =>{
                link.classList.remove('active');
                document.querySelector('ul li a[href*=' + id + ']').classList.add('active');
            });
        }
    });

};

//Contact Form-------------------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyAHsIXyNk1o0fqNvosCwxJ38AYzmoFQfu0",
    authDomain: "portfolio-4bb4f.firebaseapp.com",
    databaseURL: "https://portfolio-4bb4f-default-rtdb.firebaseio.com",
    projectId: "portfolio-4bb4f",
    storageBucket: "portfolio-4bb4f.appspot.com",
    messagingSenderId: "736908680752",
    appId: "1:736908680752:web:ae50713d5ac6bc7b71d7f5"
};

//initialze firebase
firebase.initializeApp(firebaseConfig);

//Reference your database
const db = firebase.database().ref('contactForm');
//Get form element
document.getElementById('contactForm').addEventListener('submit', submitForm);

// when cliked on submit
function submitForm(e) {
    e.preventDefault();


    // function for get value using id
    const getVal = (id) => {
        return document.getElementById(id).value;
    }

    // get value using function
    var name = getVal('name');
    var email = getVal('email');
    var mobile = getVal('mobile');
    var subject = getVal('subject');
    var message = getVal('message');


    //Mobile Number Validation
    document.getElementById('number').style.color = 'cyan';
    if ((name) == '' || (email) == '' || (mobile) == '' || (subject) == '' || (message) == '') {
        document.getElementById('number').innerHTML = "Please fill all fields*"
    } else {
        var num = mobile;
        var mobVarification = false;
        if (isNaN(num)) {
            document.getElementById("number").innerHTML = "Please Enter Only number*";
        } else {
            if (num.length != 10) {
                document.getElementById("number").innerHTML = "Please Enter Only 10 Digits in Mobile Number Field*";
            } else {
                if (num.includes('.')) {
                    document.getElementById("number").innerHTML = 'Please enter correct Mobile Number!';
                }
                else {
                    if (num.startsWith('6') || num.startsWith('7') || num.startsWith('8') || num.startsWith('9')) {
                        // document.getElementById('number').style.color = 'green'
                        // document.getElementById('number').innerHTML= num ;
                        mobVarification = true;
                        document.getElementById('number').innerHTML = '';
                    } else {
                        document.getElementById('number').innerHTML = '*Mobile Number Must be start with 6, 7, 8, 9';
                    }

                }

            }
        }

        if (mobVarification) {
            const saveMessageData = (name, email, mobile, subject, message) => {
                var newContactForm = db.push();

                newContactForm.set({
                    name: name,
                    email: email,
                    mobile: mobile,
                    subject: subject,
                    message: message
                });
            };

            saveMessageData(name, email, mobile, subject, message);

            document.querySelector('#alert').style.display = 'block';

            setTimeout(() => {
                document.querySelector('#alert').style.display = 'none';
            }, 5000);

            document.getElementById('contactForm').reset();
        }
    }
}
