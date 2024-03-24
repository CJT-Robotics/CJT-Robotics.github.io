ScrollReveal({
	reset: true,
	distance: '50px',
	duration: 2000,
	delay: 200,
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