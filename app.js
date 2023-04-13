import { guardar, obtener, eliminarSerie, obtenerSerie, editarSerie } from "./firebaseConfig.js"

const formulario = document.getElementById('form')
let id=''
let editado = false

document.getElementById('form').addEventListener('submit',(e) =>{
    e.preventDefault()

    const elementos=formulario.elements
    const nombre = document.getElementById('nombre').value
    const capitulos = document.getElementById('capitulos').value
    const vistos = document.getElementById('vistos').value
    const descripcion = document.getElementById('descripcion').value
    const productor = document.getElementById('productor').value

    for(let i=0; i<elementos.length; i++){
        if(elementos[i].type == 'text' && elementos[i].value == ''){
            alert('Debe completar todos los campos')
            return false;
        }
    }

    if(!editado){
        guardar(nombre,capitulos,vistos,descripcion,productor)
    } else{
        
    
    Swal.fire({
        title: 'Editar serie',
        text: "Seguro de editar la serie",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Editar'
      }).then((result) => {
        if (result.isConfirmed) {
            editarSerie(id,{
                nombre:nombre,
                capitulos:capitulos,
                vistos:vistos,
                descripcion:descripcion,
                productor:productor
            })
            limpiar()
          Swal.fire(
            'Editado!',
            'Editado correctamente',
            'success'
          )
        }
      })
    }
   
})

window.addEventListener('DOMContentLoaded', async () => {
    obtener((querySnapshot) => {
        let tabla =''
        querySnapshot.forEach((doc) => {
            const serie = doc.data()
            tabla += `
            <tr>
                <td>${serie.nombre}</td>
                <td>${serie.capitulos}</td>
                <td>${serie.vistos}</td>
                <td>${serie.descripcion}</td>
                <td>${serie.productor}</td>
                <td>
                    <button class="btn btn-danger eliminar" id="${doc.id}"><i id="${doc.id}"class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i></button>
                    <button class="btn btn-primary editar" id="${doc.id}"><i id="${doc.id}" class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i></button>
                </td>
            </tr>
            `
        })
        document.getElementById('tbody').innerHTML = tabla
        limpiar()

        document.querySelectorAll('.eliminar').forEach((botonEliminar => {
            botonEliminar.addEventListener('click',(e)=>{
                Swal.fire({
                    title: 'Eliminar serie',
                    text: "Seguro de eliminar la serie",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'red',
                    cancelButtonColor: 'blue',
                    confirmButtonText: 'Eliminar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        eliminarSerie(e.target.id)
                      Swal.fire(
                        'Eliminado!',
                        'Eliminado correctamente',
                        'success'
                      )
                    }
                  })
            })
        }))

        document.querySelectorAll('.editar').forEach((botonEditar => {
            botonEditar.addEventListener('click', async (e)=>{
                const documento = await obtenerSerie(e.target.id)
                const serie = documento.data()
                

                document.getElementById('nombre').value = serie.nombre
                document.getElementById('capitulos').value = serie.capitulos
                document.getElementById('vistos').value = serie.vistos
                document.getElementById('descripcion').value = serie.descripcion
                document.getElementById('productor').value = serie.productor

                editado = true
                id = documento.id
            })
        }))

        
    })
    
})

document.getElementById('limpiar').addEventListener('click',(e)=>{
    e.preventDefault()
    limpiar()
})

function limpiar(){
    document.getElementById('form').reset()
    editado = false
    id=''
}
