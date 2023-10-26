//Definimos variables que luego utilizaremos
let total = 0;
const porcentaje = 0.40;


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

//Definimos el array que se va a usar para los ingredientes
const listIngredientes = [];
localStorage.setItem('Ingredientes',  JSON.stringify(listIngredientes));

//Definimos el array que se va a contener los cocktails
const listCoktails = [];
localStorage.setItem('Cocktails', JSON.stringify(listCoktails));



let btnAddIngrediente = document.getElementById("BtnCargarIngrediente");
btnAddIngrediente.onclick = () => {
    cargarIngrediente();
}

// Funcion para cargar ingrendientes
const cargarIngrediente = () => {

    //Recuperamos el array de ingredientes
    let listIngredientes = [];
    listIngredientes = localStorage.getItem("Ingredientes");
    listIngredientes =  JSON.parse(listIngredientes);

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
        total = total + listIngredientes[i].precio;
    }
    
    total = (total * porcentaje / 100);
    cocktail.precio = total;

    // Guardamos el cocktail en el localStorage
    let listCocktails = [];
    listCocktails = localStorage.getItem("Cocktails");
    listCocktails =  JSON.parse(listCocktails);

    listCocktails.push(cocktail);

    localStorage.setItem('Cocktails', JSON.stringify(listCocktails));
    
    //Confirmamos al usuario que se cargo correctamente su cocktail y limpiamos los campos
    setTimeout(function(){
        $('#liveToast').toast('show');
        document.getElementById("nombreCocktail").value = "";
        document.getElementById("tableIngredientes").innerHTML = "";
        document.getElementById("Cristeleria").value = "";
    }, 2000);

}


//Funcion para mostrar el resultado en pantalla al usuario
const mostrarResultado = (cocktail) => {
    alert("El precio final de " + cocktail.name + " es de " + cocktail.precio);
    
    //Antes de mostrar los ingredientes los ordenamos con el metodo sort (Función de Orden Superior)
    cocktail.ingredients.sort((primero, segundo) => {
        if (primero.name > segundo.name) {
            return 1;
        }
        if (primero.name < segundo.name) {
            return 0;
        }
    });
    
    console.table(cocktail.ingredients);
}





