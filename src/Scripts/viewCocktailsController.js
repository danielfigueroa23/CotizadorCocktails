
const cargarCocktails = () => {
     
    let listCocktails = [];
    listCocktails = localStorage.getItem("Cocktails");
    listCocktails =  JSON.parse(listCocktails);

    let tableCocktails = document.getElementById("tableCocktails");


    //Recuperarmos la lista de cocktails para cargarlos en la tabla
    for (var i = 0; i < listCocktails.length; i ++) {
        
        let listIngredients = [];
        listIngredients = listCocktails[i].ingredients;
        
        let ingredients = [];
        for (var e = 0; e < listIngredients.length; e ++) {
            ingredients.push(listIngredients[e].nombreIngrediente);
        }

        tableCocktails.innerHTML +=  `<tr>
                                            <td>${listCocktails[i].name}</td>
                                            <td>${ingredients}</td>
                                            <td>${listCocktails[i].cristaleria}</td>
                                            <td>$ ${listCocktails[i].precio}</td>
                                          </tr> `
    }

}

//Llamamos a la función para que se carguen los cocktails en la tabla desde el 
// localStorage
cargarCocktails();
