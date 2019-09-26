import React, { Component } from 'react';
import M from 'materialize-css';
import { agregarElemento, obtenerElementos, actualizarElemento, eliminarElemento } from './todo.code';
import Loader from './loader';
import './App.css';



class App extends Component {

  state = {
    toDoList: [],
    todoText: "",
    mostrarLoader: true
  }

  componentWillMount = async () => {
    let toDoList = await obtenerElementos();
    this.setState({ toDoList, mostrarLoader: false });
  }

  componentDidMount = async () => {
    this.iniciaModal();
  }

  iniciaModal = () => {
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  cerrarModal = () => {
    let instance = M.Modal.getInstance(document.getElementById("modal1"));
    instance.close();
  }

  cambiarEstadoElemento = async (index) => {
    let { toDoList } = this.state;
    let toDo = toDoList[index];

    if (toDo) {

      if (toDo.terminado) {
        toDo.terminado = false;
      } else {
        toDo.terminado = true;
      }

      let actualizaElemento = await actualizarElemento(toDo);
      if (actualizaElemento) {
        toDoList[index] = toDo;
        this.setState({ toDoList });
      }

    }
  }

  eliminarElemento = async (index) => {
    let { toDoList } = this.state;
    let toDo = toDoList[index];

    if (toDo) {

      if (toDo.terminado) {
        toDo.terminado = false;
      } else {
        toDo.terminado = true;
      }

      let elementoEliminado = await eliminarElemento(toDo);
      if (elementoEliminado) {
        toDoList.splice(index, 1);
        this.setState({ toDoList });
      }

    }
  }

  agregaElemento = async (event) => {
    event.preventDefault();
    let { todoText, toDoList } = this.state;
    if (todoText.trim() !== "") {
      let data = {
        texto: todoText,
        terminado: false,
      };

      data.id = await agregarElemento(data);

      if (data.id) {
        toDoList.push(data)
        this.setState({ toDoList, todoText: "" }, this.cerrarModal);
      }

    } else {
      M.toast({ html: 'Recuerda agregar que quieres hacer.', classes: 'red darken-3' });
    }
  }

  changeValue = (event) => {
    let { value, id } = event.target;
    this.setState({ [id]: value });
  }

  render() {

    let { toDoList, todoText, mostrarLoader } = this.state;

    return (
      <div className="container App">
        <div className="row contenedor valign-wrapper">
          <div className="col s12 center-align">
            {
              toDoList.length ?
                <ul className="collection with-header">
                  <li className="collection-header"><h4>Cosas por Hacer</h4></li>
                  {
                    toDoList.map((value, index) => {
                      return (
                        <li className="collection-item">
                          <div>{value.texto}
                            <div className="secondary-content"
                              onClick={this.eliminarElemento.bind(this, index)}>
                              <i className="material-icons red-text text-darken-3">delete_forever</i>
                            </div>
                            <div className="secondary-content"
                              onClick={this.cambiarEstadoElemento.bind(this, index)}>
                              <i className="material-icons">{value.terminado ? "done_all" : "done"}</i>
                            </div>

                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
                :
                <h4>No tienes algo por hacer aún.</h4>
            }
            {
              mostrarLoader ? <Loader /> : <button data-target="modal1" className="btn modal-trigger">Agregar Nuevo Elemento.</button>
            }

          </div>
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Agregar Elemento</h4>
            <form onSubmit={this.agregaElemento} className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Trabajar, comer, dormir, etc..." id="todoText" type="text"
                    onChange={this.changeValue}
                    value={todoText} />
                  <label htmlFor="todoText">¿Qué necesitas hacer?</label>
                </div>
                <div className="col s12 right-align">
                  <button className="waves-effect waves-light btn"><i className="material-icons right">add</i>Agregar</button>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
