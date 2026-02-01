var aktuell = 0;
var indikatoren = [];
var pages = [];
var timestampold = new Date();

document.addEventListener('DOMContentLoaded', () => {
    init();
    
    const fontsNoticeButton = document.getElementById('fontsNoticeButton');
    if (fontsNoticeButton) {
        fontsNoticeButton.addEventListener('click', () => {
            document.getElementById('fontsNotice').style.display = 'none';
        });
    }

    setInterval(automatic, 5000);
});

async function init() {
    await Promise.all([
        fetchSponsors(),
        loadTabContent(),
        loadSlideshow()
    ]);

    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.animationRight', { origin: 'right', distance: '50px', duration: 500 });
        ScrollReveal().reveal('.animationLeft', { origin: 'left', distance: '50px', duration: 500 });
        ScrollReveal().reveal('.animationBottom', { origin: 'bottom', distance: '50px', duration: 500 });
    }
}

async function fetchSponsors() {
    const container = document.getElementById('containerSponsors');
    if (!container) return;

    try {
        const response = await fetch('content/sponsors.json');
        const sponsors = await response.json();

        let cardsHtml = sponsors.map(s => {
            let descriptionHtml = s.description ? `<p class="card-description">${s.description}</p>` : "";
            let ctaHtml = s.cta ? `<p class="card-description" style="margin-top: 15px; font-style: italic;">${s.cta}</p>` : "";

            return `
                <div class="card card--sponsor animationRight">
                    <div class="card-head">
                        <img src="${s.logo}" alt="${s.name}" class="card-logo" />
                        <h3 class="card-headline">${s.name}</h3>
                    </div>
                    ${descriptionHtml}
                    ${ctaHtml}
                    <a href="${s.url}" class="card-button" target="_blank">Learn more</a>
                </div>`;
        }).join('');

        container.innerHTML = cardsHtml + container.innerHTML;

    } catch (error) {
        console.error("Fehler beim Laden der Sponsoren:", error);
    }
}

async function loadTabContent() {
    try {
        const [rewardsRes, eventsRes, membersRes] = await Promise.all([
            fetch('content/rewards.json'),
            fetch('content/events.json'),
            fetch('content/members.json')
        ]);

        const rewards = await rewardsRes.json();
        const events = await eventsRes.json();
        const members = await membersRes.json();

        const rewardsList = document.querySelector('#rewards ul');
        if (rewardsList) {
            rewardsList.innerHTML = rewards.map(item => `
                <li><span>${item.title}</span><br />${item.desc}</li>
            `).join('');
        }

        const eventsList = document.querySelector('#events ul');
        if (eventsList) {
            eventsList.innerHTML = events.map(event => {
                const liAttr = event.status === "live" ? 'id="liveLi"' : '';
                const spanAttr = event.status === "live" ? 'id="liveSpan"' : '';
                return `<li ${liAttr}><span ${spanAttr}>${event.date}</span><br />${event.name}</li>`;
            }).join('');
        }

        const membersList = document.querySelector('#members ul');
        if (membersList) {
            membersList.innerHTML = members.map(m => `
                <li><span>${m.role}</span><br />${m.name}</li>
            `).join('');
        }
    } catch (error) {
        console.error("Fehler beim Laden der Tab-Inhalte:", error);
    }
}

async function loadSlideshow() {
    const slideshowContainer = document.querySelector('.slideshowelement');
    if (!slideshowContainer) return;

    try {
        const response = await fetch('content/slideshow.json');
        const images = await response.json();

        const imagesHtml = images.map((img, index) => `
            <div class="slideshowpage ${index === 0 ? 'aktiv' : ''}">
                <img src="${img.src}" alt="${img.alt}" />
            </div>
        `).join('');

        const pointsHtml = images.map((_, index) => `
            <li class="point ${index === 0 ? 'aktiv' : ''}" onclick="jump(${index})">&#8226;</li>
        `).join('');

        slideshowContainer.innerHTML = `
            ${imagesHtml}
            <a class="arrow arrow-left" onclick="switchPage(-1)"><span>&#10094;</span></a>
            <a class="arrow arrow-right" onclick="switchPage(1)"><span>&#10095;</span></a>
            <ol class="points-list">${pointsHtml}</ol>
        `;

        pages = document.getElementsByClassName("slideshowpage");
        indikatoren = document.getElementsByClassName("point");
        aktuell = 0;

    } catch (error) {
        console.error("Slideshow konnte nicht geladen werden:", error);
    }
}

function switchPage(anzahl) {
    if (pages.length === 0) return;
    var neu = aktuell + anzahl;
    if (neu < 0) neu = pages.length - 1;
    if (neu > pages.length - 1) neu = 0;
    jump(neu);
}

function jump(neu) {
    if (!pages || pages.length === 0) return;
    
    indikatoren[aktuell].classList.remove("aktiv");
    pages[aktuell].classList.remove("aktiv");

    indikatoren[neu].classList.add("aktiv");
    pages[neu].classList.add("aktiv");

    aktuell = neu;
    timestampold = new Date();
}

function automatic() {
    if (pages.length === 0) return;
    const diff = new Date() - timestampold;
    if (diff >= 15000) {
        switchPage(1);
    }
}

function opentab(tabname) {
    var tablinks = document.getElementsByClassName('tab-link');
    var tabcontents = document.getElementsByClassName('tab-content');

    for (let tablink of tablinks) tablink.classList.remove('active-link');
    for (let tabcontent of tabcontents) tabcontent.classList.remove('active-tab');

    event.currentTarget.classList.add('active-link');
    document.getElementById(tabname).classList.add('active-tab');
}