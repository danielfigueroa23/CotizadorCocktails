const lista = document.querySelector('#containerBebidas');

// Aplicacion y uso de fetch con un mock json local en el proyecto.
fetch('../mocks/bebidas.json')
    .then( (res) => res.json())
    .then( (data) => {
        data.forEach((bebida) => {

            const divCol = document.createElement('div')
            divCol.className = 'col-4'

            const div = document.createElement('div')
            div.className = 'card'
            div.innerHTML = `
                <img src="${bebida.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${bebida.nombre}</h5>
                    <p class="card-text">${bebida.categoria}</p>
                    <p class="card-text">${bebida.capacidad}</p>
                    <div style="background-color:black; color:white;border-radius:30px;">$ ${bebida.precio}</div>
                </div>
            `

            divCol.appendChild(div)
            lista.append(divCol)
        })
    })
