//Definimos variables que luego utilizaremos
let total = 0;
const porcentaje = 0.40;


// Solicitamos al usuario el nombre del cocktail 
const nombreCocktail = prompt("Como se llama el Cocktail?")


// Funcion para cargar ingrendientes
const cargarIngrediente = () => {
    // Solicitamos un ingrediente
    let ingrediente= prompt("Ingrese un ingrediente de " + nombreCocktail);
    let precio = parseFloat(prompt("Ingrese el precio de " + ingrediente));
    total = total + precio;


    //Preguntamos si quiere cargar mas ingredientes
    let continuar = prompt("Desea cargar mas ingredientes?").toUpperCase();


    while (continuar == 'SI') {
        ingrediente= prompt("Ingrese un ingrediente de " + nombreCocktail);
        precio = parseFloat(prompt("Ingrese el precio de " + ingrediente));
        total = total + precio;

        continuar = prompt("Desea cargar mas ingredientes?").toUpperCase();
    }

    if (continuar == 'NO') {
        total = (total * 40 / 100);
        mostrarResultado(nombreCocktail, total);
    }

}; 


//Funcion para mostrar el resultado en pantalla al usuario
const mostrarResultado = (nombreCocktail, total) => {
    alert("El precio final de " + nombreCocktail + " es de " + total);
} 


// Llamos a la funcion para cargar los ingredientes.
cargarIngrediente();





