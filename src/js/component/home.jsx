import React, {useState, useEffect} from "react"; // importo react y el hook useState

// create your first component


const Home = () => { // Declaro los estados "pendientes" y "info" usando el hook useState. El primero almacena el valor de un input de texto y el segundo es un array donde se guardan las tareas pendientes.

    const [pendientes, setPendientes] = useState("")

    const [info, setInfo] = useState([]); 

    const deletePendientes = (indexItem) => { // Creo la función deletePendientes que elimina una tarea pendiente específica del array info usando la función setInfo para actualizar el estado.
        setInfo((prevState) => prevState.filter((listItems, index) => index !== indexItem));
    };
    function agregarPendientes(e) { // Creo una función agregarPendientes que agrega una nueva tarea pendiente al array info usando la función concat y se vacía el valor de pendientes para el siguiente ingreso.
        e.preventDefault()
        setInfo(info.concat({label: pendientes, done: false}))
        setPendientes("")
    }

    function crearUsuario() { // Creo una función crearUsuario que hace una llamada a un API para crear un usuario utilizando el método fetch y el método POST.
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/gmm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([])

        }).then((response) => response.json()).then((data) => console.log(data));
    }
    console.log(crearUsuario())

    function obtenerInfo() { // Creo una función obtenerInfo que hace una llamada a un API para obtener la información del usuario y se guarda en el estado info usando el método GET y la función setInfo.
        fetch('https://assets.breatheco.de/apis/fake/todos/user/gmm', {method: 'GET'}).then((response) => response.json()).then((data) => setInfo(data));
    }


    function actualizarInfo() { // Creo una función actualizarInfo que hace una llamada a un API para actualizar la información del usuario usando el método PUT.
        fetch('https://assets.breatheco.de/apis/fake/todos/user/gmm', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)

        }).then((response) => response.json()).then((data) => console.log(data));
    }
    console.log(actualizarInfo())

    function eliminarInfo() { // Creo una función eliminarInfo que hace una llamada a un API para eliminar la información del usuario usando el método DELETE. En caso de éxito, se vacía el estado info.
        fetch('https://assets.breatheco.de/apis/fake/todos/user/gmm', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => {
            console.log(data.result)
            if (data.result === "ok") {
                setInfo([])
            }
        });
    }

    useEffect(() => {//Se ejecuta una sola vez cuando el componente se monta en el DOM, esto sucede por  la segunda propiedad que es un array vacío [].Dentro de la función useEffect se ejecutan dos funciones:
        
        crearUsuario(); //"crearUsuario" hace una petición HTTP POST y envía un JSON vacío con una cabecera de 'Content-Type' como 'application/json' a una URL específica.
        obtenerInfo() //"obtenerInfo" hace una petición HTTP GET a una URL específica y luego usa setInfo para actualizar el estado con la información obtenida.
    }, [])


    useEffect(() => { //Se ejecuta cada vez que cambia el estado info, eso sucede por a la segunda propiedad [info].
        actualizarInfo() //"actualizarInfo" hace una petición HTTP PUT a una URL específica, envía un JSON con la información del estado
    }, [info])
    console.log(info)
   


    return (
        <> 
            <div className="card container d-flex bg-success mt-5 md-w75 pb-5"> {/* La etiqueta <div> contiene la clase "card" y "container" para establecer el estilo y la disposición de la lista de pendientes. */}

                <h2 className="titulo m-auto p-2">LISTA DE PENDIENTES</h2>
                <div className="card-body">
                    <input type="text" className="input m-1 w-75"
                        value={pendientes}
                        id="exampleInput"
                        aria-describedby="inputHelp"
                        // onChange actualiza el estado de la lista de pendientes.
                        onChange={ 
                            (e) => {
                                setPendientes(e.target.value)
                            }
                        }
                        placeholder="Añadir pendiente"/>
                    <button type="submit" className="btn btn-secondary btn-sm"
                        onClick={agregarPendientes}>Añadir</button> 
						<button type="submit" className="btn btn-danger btn-sm"
                        onClick={eliminarInfo}>Eliminar pendientes</button>
                </div>
                <div className="to-do-list d-flex bg-warning ">
                    <ul>{
                        info.map((item, index) => (
                            <li key={index}>
                                {
                                item.label
                            }
                                {/* La función deletePendientes elimina un pendiente específico de la lista. */}
                                <button className="btn"
                                    onClick={
                                        () => deletePendientes(index)
                                }> 
                                    <i className="fas fa-trash-alt"/>
                                </button>
                            </li>
                        ))
                    }</ul>
                </div>
            </div>
        </>
    );
};
export default Home;
