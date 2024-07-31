ScrollReveal({
	reset: true,
	distance: '50px',
	duration: 1000,
	delay: 100,
});

ScrollReveal().reveal('.animationLeft', { origin: 'left' });
ScrollReveal().reveal('.animationRight', { origin: 'right' });
ScrollReveal().reveal('.animationTop', { origin: 'top' });
ScrollReveal().reveal('.animationBottom', { origin: 'bottom' });

var tablinks = document.getElementsByClassName('tab-link');
var tabcontents = document.getElementsByClassName('tab-content');

function opentab(tabname) {
	for (tablink of tablinks) {
		tablink.classList.remove('active-link');
	}

	for (tabcontent of tabcontents) {
		tabcontent.classList.remove('active-tab');
	}

	event.currentTarget.classList.add('active-link');
	document.getElementById(tabname).classList.add('active-tab');
}


const indikatoren = document.getElementsByClassName("point");
const pages = document.getElementsByClassName("slideshowpage");
var aktuell = 0;
var timestampold = new Date();

indikatoren[0].classList.add("aktiv");
pages[0].classList.add("aktiv");

function switchPage(anzahl){
    var neu = aktuell + anzahl;

    if(neu < 0){
        neu = pages.length -1;
    }

    if(neu > pages.length - 1){
        neu = 0;
    }

    jump(neu)
}

function jump(neu){
    indikatoren[aktuell].classList.remove("aktiv");
    pages[aktuell].classList.remove("aktiv");

    indikatoren[neu].classList.add("aktiv");
    pages[neu].classList.add("aktiv");

    aktuell = neu;
    timestampold = new Date();
}

function automatic(){
    const diff = new Date() - timestampold;

    if(diff >= 15000){
        switchPage(1);
    }
}

setInterval(automatic, 15000);
