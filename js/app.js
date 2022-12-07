// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const buscador = document.querySelector('#buscador')
const celdas = document.querySelectorAll('h4')
let articulosCarrito = [];

//buscador 
// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);


     // NUEVO: Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []  ;
          // console.log(articulosCarrito);
          carritoHTML();
     });
}


// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          Categoria: curso.querySelector('h5').textContent,

          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    let cantidad = parseInt(curso.cantidad);
                    cantidad++
                    curso.cantidad =  cantidad;
                    return curso;
               } else {
                    return curso;
               }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const curso = e.target.parentElement.parentElement;
          const cursoId = curso.querySelector('a').getAttribute('data-id');
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);


          carritoHTML();
     }
}

//APRENDER MAP FILTER REVIEWS
// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const {imagen, titulo, precio, cantidad,  Categoria} = curso;
          const row = document.createElement('tr');
          row.insertAdjacentHTML ('beforeend',`
          <td><img src="${imagen}" width=100px/></td>
          <td>${titulo}</td>
          
          <td>${precio}</td>
          <td>${cantidad}</td>
          <td>${Categoria}</td>
          <td>
          
          <a href="#" class="borrar-curso" data-id="${curso.id}"/>X</td>

          
          `);
          //agraga el html del carrito
          contenedorCarrito.appendChild(row);
     });

     // inetegro local:
     sincronizarStorage();

}


// Agrego Local Storage: 
function sincronizarStorage() {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}


// const buscador = document.querySelector('#buscador')



// //Búsqueda
// buscador.addEventListener('keyup', (e)=>{
//      let texto = e.target.value
//      //console.log(texto)
//      let er = new RegExp(texto, "i")
//      for(let i=0; i<celdas.length; i++) {
//          let valor = celdas[i]
//          //console.log(valor)
//          if(er.test(valor.innerText)){
//              valor.classList.remove("ocultar")
//          }else{
//              console.log(valor)
//              valor.classList.add("ocultar")
//          }
//      }
// //  })
// document.querySelector('#buscador')
// addEventListener('input', filterList)

// function filterList(){
//      const searchInput = document.querySelector('#buscador')
//      const filter = searchInput.value.toLowerCase()
//      const listItems = document.querySelectorAll('.filtro')

//      listItems.forEach((item)=>{
//           let text = item.textContent
//           if(text.toLowerCase().includes(filter.toLowerCase())){
//                item.style.display = '';
//           }
//           else{
//                item.style.display = 'none'
//           }
//      })
// }




document.addEventListener("keyup", e=>{

     if (e.target.matches("#buscador")){
               console.log(e.target.value);
               document.querySelectorAll('.filtro').forEach(el=>{
     el.textContent.toLowerCase()
     .includes(e.target.value)?el.classList.remove('ocultar'):el.classList.add('ocultar')
 })   
     //     document.querySelectorAll("h4").forEach(fruta => {
   
     //         fruta.textContent.toLowerCase() .includes(e.target.value.toLowerCase())
     //           ?fruta.classList.remove("ocultar")
     //           :fruta.classList.add("ocultar")

               
     //     })
   
     }
   
   
   })
   
//VENTANA
