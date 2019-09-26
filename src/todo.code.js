import firebase from 'firebase';
import M from 'materialize-css';


export async function agregarElemento(data) { //CREATE
    try{
        let elementoAgregado = await firebase.firestore().collection('todo').add(data);
        console.log(elementoAgregado.id);
        M.toast({ html: 'Elemento Agregado.', classes: 'green darken-3' });
        return elementoAgregado.id;
    }catch(error){
        console.log(error);
        M.toast({ html: 'Ocurrio un error al agregar el elemento.', classes: 'red darken-3' });
        return false;
    }
}

export async function obtenerElementos(){ //READ
    try{
        let elementos = await firebase.firestore().collection('todo').get();
        let docs = elementos.docs;
        if(docs.length){
            let todoList = [];

            for(var elemento of docs){
                let data = elemento.data();
                data.id = elemento.id;
                todoList.push(data);
            }

            return todoList;

        }else{
            return [];
        }
    }catch(error){
        M.toast({ html: 'Ocurrio un error al obtener los elementos.', classes: 'red darken-3' });
        return [];
    }

}

export async function actualizarElemento(toDo){ //UPDATE
    try{
        let id = toDo.id;
        //Se elimina la propiedad id
        let data ={
            texto: toDo.texto,
            terminado: toDo.terminado,
          }
        await firebase.firestore().collection('todo').doc(id).update(data)
        M.toast({ html: 'Elemento Actualizado.', classes: 'green darken-3' });
        return true 
    }catch(error){
        console.log(error);
        M.toast({ html: 'Ocurrio un error al actualizar el elemento.', classes: 'red darken-3' });
        return false;
    }
}

export async function eliminarElemento(toDo){ //DELETE
    try{
        await firebase.firestore().collection('todo').doc(toDo.id).delete()
        M.toast({ html: 'Elemento Eliminado.', classes: 'green darken-3' });
        return true 
    }catch(error){
        console.log(error);
        M.toast({ html: 'Ocurrio un error al eliminar el elemento.', classes: 'red darken-3' });
        return false;
    }
}