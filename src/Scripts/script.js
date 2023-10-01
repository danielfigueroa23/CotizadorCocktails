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


//Cargamos un cocktail nuevo
const cargarCocktail = () => {

    const cocktail = new Cocktail();

    // Solicitamos al usuario el nombre del cocktail 
    const nombreCocktail = prompt("Como se llama el Cocktail?")
    cocktail.name = nombreCocktail;

    //invocamos la funcion para cargar los ingredientes
    const ingredientes = cargarIngrediente(nombreCocktail);
    cocktail.ingredients = ingredientes;

    // Solicitamos al usuario la cristaleria utilizada
    const cristaleria = prompt("Que cristaleria se utiliza?");
    cocktail.cristaleria = cristaleria;

    //Reccorremos la lista de ingredientes para calcular el precio del cocktail
    for (var i = 0; i < ingredientes.length; i ++) {
        total = total + ingredientes[i].precio;
    }
    
    total = (total * porcentaje / 100);
    cocktail.precio = total;

    //Mostramos el resultado final al usuario
    mostrarResultado(cocktail);

}



// Funcion para cargar ingrendientes
const cargarIngrediente = (nombreCocktail) => {

    //Array de ingredientes de un cocktail
    const ingredientes = [];

    // Solicitamos un ingrediente
    let ingrediente= prompt("Ingrese un ingrediente de " + nombreCocktail);
    let cantidad = parseFloat(prompt("Ingrese la cantidad de " + ingrediente + "que lleva" + nombreCocktail + " (en onzas)"));
    let precio = parseFloat(prompt("Ingrese el precio de " + ingrediente));

    const ingredient = new Ingredient(ingrediente,cantidad,precio);


    //agregamos el ingrediente al array
    ingredientes.push(ingredient);

    //Preguntamos si quiere cargar mas ingredientes
    let continuar = prompt("Desea cargar mas ingredientes?").toUpperCase();


    while (continuar == 'SI') {
        ingrediente= prompt("Ingrese un ingrediente de " + nombreCocktail);
        cantidad = parseFloat(prompt("Ingrese la cantidad de " + ingrediente + "que lleva" + nombreCocktail + " (en onzas)"));
        precio = parseFloat(prompt("Ingrese el precio de " + ingrediente));
        
        const ingredient = new Ingredient(ingrediente,cantidad,precio);
        
        //agregamos el ingrediente al array
        ingredientes.push(ingredient);

        continuar = prompt("Desea cargar mas ingredientes?").toUpperCase();
    }

    if (continuar == 'NO') {
        return ingredientes;
    }

}; 


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


// Llamamos a la funcion para cargar un cocktail.
cargarCocktail();





