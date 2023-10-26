
const cargarCocktails = () => {
     
    let listCocktails = [];
    listCocktails = localStorage.getItem("Cocktails");
    listCocktails =  JSON.parse(listCocktails);

    let tableCocktails = document.getElementById("tableCocktails");


    //Recuperarmos la lista de cocktails para cargarlos en la tabla
    for (var i = 0; i < listCocktails.length; i ++) {
        tableCocktails.innerHTML +=  `<tr>
                                            <td>${listCocktails[i].name}</td>
                                            <td>${JSON.stringify(listCocktails[i].ingredients)}</td>
                                            <td>${listCocktails[i].cristaleria}</td>
                                            <td>$ ${listCocktails[i].precio}</td>
                                          </tr> `
    }

}

cargarCocktails();
