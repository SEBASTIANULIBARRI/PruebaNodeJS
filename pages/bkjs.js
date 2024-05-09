function getUrl(done){
    //voy a buscar info a la api fake api
    const results = fetch ('https://my-json-server.typicode.com/SEBASTIANULIBARRI/DiarioDigital/products')
    console.log(results)

    results.then(response => response.json())
    .then(data=>{
        done(data)
    });
}

getUrl(data=> {
    data.forEach(element => {
        console.log("ejemplo", element.title)
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let div = document.createElement("div");
        let a = document.createElement("a");
        let p = document.createElement("p");
        let figcaption = document.createElement("figcaption");
        let precio = document.createElement("figcaption");
        //pogo el titulo de la img
        figcaption.innerHTML = element.title;
        //pogo el precio de la img
        precio.innerHTML = "$" +  element.precio;
        //agrego la clase para poder formatear desde CSS
        img.classList.add("producto-img");
        //apunto a la imagen que esta localizada en la carpeta del proyecto pero guardada en la api
        img.src=  element.url_img;
        //agrego la clase para poder formatear desde CSS
        figure.classList.add("producto");
        figure.classList.add("p"+ element.id);
        //agrego el ID paara poder mostrar una descripcion unica del producto
        figure.id=  element.id;
        //agrego los hijos dentro de figura para crear la tarjeta
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(precio);
        //meto todo dentro de una etiqueta a para poder darle el salto a otra pagina (en este momento lo muestra dentro de la misma pagina pero la idea original era cambiar de pagina.)
        a.appendChild(figure);
        //lo agrego al DOM para verlo desde la pagina html
        document.getElementById("Container").appendChild(a);
        //creo un eventListener para todas las tarjetas que se agregaron en la linea anterior y poder mostrar una descripcion cuando sea necesario
        var productos = document.querySelectorAll(".container>a");
        productos.forEach((element)=>{
            element.addEventListener('click',mostrar1)
            element.addEventListener('doubleclick',mostrar)
        })

        console.log("PRODUCTOS ", productos)
        
        
    });
    }
);


function getUrlSpecific(done,id){
 
    const results = fetch ('https://my-json-server.typicode.com/SEBASTIANULIBARRI/DiarioDigital/products/'+id)

    results.then(response => response.json())
    .then(data=>{
        done(data)
    });
}






 document.getElementById("button-back").addEventListener('click',ocultarProductoEspecifico);
 function ocultarProductoEspecifico(event){
    document.querySelector(".container").classList.remove("oculto");
    document.querySelector(".muestra").classList.add("oculto");
    let hijos = document.querySelector(".muestra").children;
    console.log(hijos,hijos.length)
    while (hijos.length>1)
        hijos[1].remove();
    console.log(hijos,hijos.length)

    console.log("muestra", document.querySelector(".muestra").children);
 }
function mostrar1(event){
console.log("TOQUE UN A",this.children[0].id)
id = this.children[0].id;


getUrlSpecific(data=> { 
    let divMuestra  = document.querySelector(".muestra");

    console.log(data)
    let divContainer  = document.querySelector(".container");
    divContainer.classList.add("oculto");
    divMuestra.classList.remove("oculto");
 
    /*elementos para crear la tarjeta*/ 
        let img = document.createElement("img");
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let a = document.createElement("a");
        let titulo = document.createElement("p");
        let descripcion = document.createElement("p");
        let BotonBack = document.createElement("p");
        let stock = document.createElement("p");
        let precio = document.createElement("p");

        titulo.innerHTML = data.title;
        descripcion.innerHTML = data.descripcion;



        precio.innerHTML = "Precio: $" +  data.precio;
        img.classList.add("producto-img");
        img.src=  data.url_img;
        //agrego las clases para que se le aplique el formato especificado en css
        div.classList.add("producto");
        div.classList.add("p"+ data.id);
        div.id=  data.id;

        div.appendChild(img);
        div2.appendChild(titulo);
        div2.appendChild(descripcion);
        div2.appendChild(stock);
        div2.appendChild(precio);
        if (data.Stock > 0) {
            let btn_comprar = document.createElement("button");
            stock.innerHTML = "Stock: " + data.Stock;
            btn_comprar.innerHTML = "Comprar";
            btn_comprar.classList.add("Comprar");
            div2.appendChild(btn_comprar);
        }else {
            stock.innerHTML ="Sin Stock"
        }
        div.appendChild(div2);

        console.log(a);//esto es para ver que tiene el a, no seria necesario.
        divMuestra.appendChild(div);

        
        
    },id);
    }
//);

//}
function mostrar(event){
    console.log("FUNCION MOSTRAR");
    let elemento = event.srcElement.id;
    console.log("entre a la funcion",event.srcElement.id);
    document.querySelector('#'+elemento).classList.add("PRUEBA");
    

}