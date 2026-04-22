const API_URL = 'https://hp-api.onrender.com/api/characters';

const listaContenedor = document.getElementById('lista-personajes');
// cambié el json local al consumo directo de la url
async function getCharacters() {
    try {
        const response = await fetch(API_URL);
        const characters = await response.json();
        renderCharacters(characters);
    } catch (error) {
        console.error('Error al cargar los personajes:', error);
        listaContenedor.innerHTML = `<p class="text-danger">Hubo un error al cargar los personajes.</p>`;
    }
}

function renderCharacters(characters) {
    listaContenedor.innerHTML = ''; 

    characters.forEach(character => {
        const { name, house, species, image, actor, alternate_names } = character;
        

        const characterImage = image || DEFAULT_IMAGE;
        const houseClass = house ? house.toLowerCase() : 'unknown';
       
        // Usando template string en vez del dome que estaba utilizando
        const cardHtml = `
            <div class="col">
                <div class="card h-100 character-card ${houseClass}">
                    <img src="${characterImage}" class="card-img-top character-img" alt="${name}">
                    <div class="card-body">
                        <h5 class="card-title text-primary">${name}</h5>
                        <p class="card-text">
                            <strong>Casa:</strong> ${house || 'N/A'}<br>
                            <strong>Especie:</strong> ${species || 'Desconocida'}<br>
                            <strong>Actor:</strong> ${actor || 'N/A'}
                        </p>
                    </div>
                    <div class="card-footer bg-transparent border-0">
                        <small class="text-muted">ID: ${character.id.substring(0, 8)}</small>
                    </div>
                </div>
            </div>
        `;
        
        listaContenedor.insertAdjacentHTML('beforeend', cardHtml);
    });
}

// Iniciar la carga de personajes
getCharacters();