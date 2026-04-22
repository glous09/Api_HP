fetch('data.json')
    .then(response => response.json()) // Convierte la respuesta a objeto JS
    .then(data => {

        const listaContenedor = document.getElementById('lista-nombres');
        data.forEach(personaje => {

            const nombre = personaje.name;
            const alias = personaje.alternate_names[0]; 
            const li = document.createElement('li');
            li.textContent = nombre;
            // li.textContent = alias;

            listaContenedor.appendChild(li);
        });

    })
    .catch(error => console.error('Error cargando el JSON:', error));