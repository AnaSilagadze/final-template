let appState = {
    flowers: [],
    savedSeeds: JSON.parse(localStorage.getItem('savedSeeds')) || []
};

function createSessionCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const incrementSessionSeeds = createSessionCounter();

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    if (document.getElementById('flowers-grid')) {
        loadMainPage();
    }
    if (document.getElementById('saved-grid')) {
        renderSavedPage();
    }
    if (document.getElementById('contact-form')) {
        handleContactForm();
    }
}

async function loadMainPage() {
    const grid = document.getElementById('flowers-grid');
    const spinner = document.getElementById('loading-spinner');
    const errorBox = document.getElementById('error-message');

    try {
        const data = await fetchFlowersData();
        appState.flowers = data;
        
        spinner.classList.add('hidden');

        appState.flowers.forEach(flower => {
            const card = document.createElement('div');
            card.className = 'flower-card';

            const img = document.createElement('img');
            img.className = 'flower-card__img';
            img.src = flower.default_image.regular_url;
            img.alt = `Flower ${flower.common_name}`; 

            const content = document.createElement('div');
            content.className = 'flower-card__content';

            const title = document.createElement('h3');
            title.textContent = flower.common_name;

            const cycle = document.createElement('p');
            cycle.textContent = `Cycle: ${flower.cycle}`;

            const button = document.createElement('button');
            button.className = 'flower-card__btn';
            button.textContent = 'Save Seed to Cart';
            button.addEventListener('click', () => {
                saveSeedToStorage(flower);
                const currentSessionTotal = incrementSessionSeeds();
                alert(`Successfully saved! You have added ${currentSessionTotal} seeds in this session.`);
            });

            content.appendChild(title);
            content.appendChild(cycle);
            content.appendChild(button);
            card.appendChild(img);
            card.appendChild(content);
            grid.appendChild(card);
        });

    } catch (error) {
        spinner.classList.add('hidden');
        errorBox.textContent = `Error: ${error.message}. Please try again later.`;
        errorBox.classList.remove('hidden');
    }
}



function saveSeedToStorage(flower) {
    if (!appState.savedSeeds.some(item => item.id === flower.id)) {
        appState.savedSeeds.push(flower);
        localStorage.setItem('savedSeeds', JSON.stringify(appState.savedSeeds));
    }
}

function renderSavedPage() {
    const grid = document.getElementById('saved-grid');
    const counterBadge = document.getElementById('saved-seeds-count');
    
    grid.innerHTML = '';
    counterBadge.textContent = `Added in total: ${appState.savedSeeds.length}`;

    if (appState.savedSeeds.length === 0) {
        grid.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    appState.savedSeeds.forEach(flower => {
        const card = document.createElement('div');
        card.className = 'flower-card';
        card.innerHTML = `
            <img class="flower-card__img" src="${flower.default_image.regular_url}" alt="${flower.common_name}">
            <div class="flower-card__content">
                <h3>${flower.common_name}</h3>
                <button class="flower-card__btn remove-btn">Delete</button>
            </div>
        `;

        card.querySelector('.remove-btn').addEventListener('click', () => {
            appState.savedSeeds = appState.savedSeeds.filter(item => item.id !== flower.id);
            localStorage.setItem('savedSeeds', JSON.stringify(appState.savedSeeds));
            renderSavedPage(); 
        });

        grid.appendChild(card);
    });
}

function handleContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const usernameInput = document.getElementById('username');
    const selectEl = document.getElementById('flower-select');

    usernameInput.addEventListener('input', () => {
        if (usernameInput.value.length < 3) {
            usernameInput.style.borderColor = 'red';
        } else {
            usernameInput.style.borderColor = 'green';
        }
    });

    selectEl.addEventListener('change', (e) => {
        console.log(`User selected: ${e.target.value}`);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        if (!form.checkValidity()) {
            feedback.textContent = "Please fill out all fields correctly!";
            feedback.className = "feedback-box error";
            return;
        }

        feedback.textContent = `Thank you, ${usernameInput.value}! Your message has been sent successfully.`;
        feedback.className = "feedback-box success";
        form.reset(); 
        usernameInput.style.borderColor = '#ccc';
    });
}

