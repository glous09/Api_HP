const API_URL = 'https://hp-api.onrender.com/api/characters';
const DEFAULT_IMAGE = 'assets/img/default-image.png';

const listaContenedor = document.getElementById('lista-personajes');
const inputBusqueda = document.getElementById('busqueda');
const selectCasa = document.getElementById('filtro-casa');

let allCharacters = [];

function getValidImageUrl(url) {
    if (typeof url !== 'string') return DEFAULT_IMAGE;
    const trimmed = url.trim();
    return trimmed ? trimmed : DEFAULT_IMAGE;
}

async function getCharacters() {
    try {
        const response = await fetch(API_URL);
        allCharacters = await response.json();
        renderCharacters(allCharacters);
    } catch (error) {
        console.error('Error al cargar los personajes:', error);
        listaContenedor.innerHTML = `<p class="text-danger text-center">Hubo un error al cargar los personajes.</p>`;
    }
}

function renderCharacters(characters) {
    listaContenedor.innerHTML = ''; 

    if (characters.length === 0) {
        listaContenedor.innerHTML = `<div class="col-12 text-center my-5"><h3>No se encontraron personajes que coincidan.</h3></div>`;
        return;
    }

    characters.forEach(character => {
        const { name, house, species, image, actor } = character;
        
        const characterImage = getValidImageUrl(image);
        const houseClass = house ? house.toLowerCase() : 'unknown';

        const cardHtml = `
            <div class="col">
                <div class="card h-100 character-card ${houseClass}">
                    <img src="${characterImage}" class="card-img-top character-img" alt="${name}" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}';">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">
                            <strong>Casa:</strong> ${house || 'N/A'}<br>
                            <strong>Especie:</strong> ${species || 'Desconocida'}<br>
                            <strong>Actor:</strong> ${actor || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        listaContenedor.insertAdjacentHTML('beforeend', cardHtml);
    });
}

function filterCharacters() {
    const texto = inputBusqueda.value.toLowerCase();
    const casaSeleccionada = selectCasa.value;

    const filtered = allCharacters.filter(character => {
        const matchesText = 
            character.name.toLowerCase().includes(texto) ||
            (character.species && character.species.toLowerCase().includes(texto)) ||
            (character.actor && character.actor.toLowerCase().includes(texto));
        
        const matchesHouse = casaSeleccionada === "" || character.house === casaSeleccionada;

        return matchesText && matchesHouse;
    });

    renderCharacters(filtered);
}

inputBusqueda.addEventListener('input', filterCharacters);
selectCasa.addEventListener('change', filterCharacters);

getCharacters();
