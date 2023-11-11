//Definimos variables que luego utilizaremos
let total = 0;
const porcentaje = 40; //Porcentaje de ganacia sobre el precio de costo


// Segunda Pre-Entrega : Creamos el constructor para el objeto Cocktail
function Cocktail(name,ingredients,cristaleria,precio) {
    this.name = name;
    this.ingredients = ingredients;
    this.cristaleria = cristaleria;
    this.precio = precio;
}

function Ingredient(name,cantidad,precio) {
    this.name = name;
    this.cantidad = cantidad;
    this.precio = precio;
}

let btnAddIngrediente = document.getElementById("BtnCargarIngrediente");
btnAddIngrediente.onclick = () => {
    cargarIngrediente();
}

// Funcion para cargar ingrendientes
const cargarIngrediente = () => {

    //Recuperamos el array de ingredientes
    let listIngredientes = [];
    listIngredientes = localStorage.getItem("Ingredientes");
    
    if (listIngredientes != null) {
        listIngredientes =  JSON.parse(listIngredientes);
    } else {
        listIngredientes =  [];
    }

    // Recuperamos los datos desde el DOM
    let ingrediente = document.getElementById("nombreIngrediente").value; 
    let cantidad = document.getElementById("Cantidad").value;
    let precio = document.getElementById("Precio").value;


    const ingredient = new Ingredient(ingrediente,cantidad,precio);

    const ingredientfinal = {
        nombreIngrediente : ingredient.name, 
        cantidad: ingredient.cantidad, 
        precio: ingredient.precio
    }; 

    listIngredientes.push(ingredientfinal);

    // Cargamos el ingrediente en el LocalStorage
    localStorage.setItem('Ingredientes', JSON.stringify(listIngredientes));

    //Lo agregamos a traves del DOM a la tabla
    let tableIngreditentes = document.getElementById("tableIngredientes");

    tableIngreditentes.innerHTML +=  `<tr>
                                        <td>${ingredient.name}</td>
                                        <td>${ingredient.cantidad} Oz</td>
                                        <td>$ ${ingredient.precio}</td>
                                         </tr> `


    $('#ingredienteModal').modal('hide');

    document.getElementById("nombreIngrediente").value = "";
    document.getElementById("Cantidad").value = "";
    document.getElementById("Precio").value = "";

}; 

let btnAddCocktail = document.getElementById("btnCargarCocktail");
btnAddCocktail.onclick = () => {
    cargarCocktail();
}



//Cargamos un cocktail nuevo
const cargarCocktail = () => {

    const cocktail = new Cocktail();

    // Recuperamo el nombre del cocktail 
    const nombreCocktail = document.getElementById("nombreCocktail").value;
    cocktail.name = nombreCocktail;

    //Recuperamos lo ingredientes
    let listIngredientes = [];
    listIngredientes = localStorage.getItem("Ingredientes");
    listIngredientes =  JSON.parse(listIngredientes);

    cocktail.ingredients = listIngredientes;

    //Recuperamos la cristaleria indicada por el usuario
    const cristaleria = document.getElementById("Cristeleria").value;
    cocktail.cristaleria = cristaleria;

    //Reccorremos la lista de ingredientes para calcular el precio del cocktail
    for (var i = 0; i < listIngredientes.length; i ++) {
        total = total + Number(listIngredientes[i].precio);
    }
    
    total = total + (( porcentaje / 100)* total);
    cocktail.precio = total;

    // Guardamos el cocktail en el localStorage
    let listCocktails = [];
    listCocktails = localStorage.getItem("Cocktails");
    
    if (listCocktails != null ) {
        listCocktails =  JSON.parse(listCocktails);
    } else {
        listCocktails = [];
    }

    listCocktails.push(cocktail);

    localStorage.setItem('Cocktails', JSON.stringify(listCocktails));
    
    //Confirmamos al usuario que se cargo correctamente su cocktail y limpiamos los campos
    setTimeout(function(){
        mostrarResultado(cocktail);
        document.getElementById("nombreCocktail").value = "";
        document.getElementById("tableIngredientes").innerHTML = "";
        document.getElementById("Cristeleria").value = "";
        localStorage.removeItem("Ingredientes");
    }, 2000);

}


//Funcion para mostrar el resultado en pantalla al usuario
const mostrarResultado = (cocktail) => {
    
    //Antes de mostrar los ingredientes los ordenamos con el metodo sort (Función de Orden Superior)
    cocktail.ingredients.sort((primero, segundo) => {
        if (primero.name > segundo.name) {
            return 1;
        }
        if (primero.name < segundo.name) {
            return 0;
        }
    });

    let toastCocktails = document.getElementById("toastCorfimacionUaploadCocktail");

    toastCocktails.innerHTML = ` El Cocktail fue Cargado Correctamente.
                                  </br>
                                  El precio Final es de ${cocktail.precio}
                                  </br>
                                  Sus Ingrediente son:
                                  </br> `
    let listIngredientes = [];
    listIngredientes = cocktail.ingredients;

    let listadeIngredientes = '';
    //Recorremos la lista de ingredientes para mostrarlo al cliente
    for (var i = 0; i < listIngredientes.length; i ++) {
        toastCocktails.innerHTML +=  `<tr>
                                        <td>${listIngredientes[i].nombreIngrediente}</td>
                                        </br>
                                     </tr> `
        listadeIngredientes += listIngredientes[i].nombreIngrediente + " \n";
    }

    var str="El precio es de: \n" +
            "$" + cocktail.precio+'\n' +
            "Los ingredientes de " + cocktail.name+ " son: "+"\n"
            + " \n" + listadeIngredientes +'\n';
            
    Swal.fire({
        title: "El Cocktail fue Cargado Correctamente.",
        icon: "success",
        html: '<pre>' + str + '</pre>',
        customClass: {
            popup: 'format-pre'
        }
    });
}





