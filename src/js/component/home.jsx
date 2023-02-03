import React, {useState, useEffect} from "react";
// importo react y el hook useState
// create your first component
const Home = () => { // declaro los estados//
    const [pendientes, setPendientes] = useState("")
    // 1. creamos un estado del input pendientes
    // [espacio donde guardo los valores,funcion que actualiza los valores]
    // creo funcion para ejecutar la actualizacion del valor inicial
    const [info, setInfo] = useState([]); // 2. creamos un estado de lo que se guarda en el array

    const deletePendientes = (indexItem) => {
        setInfo((prevState) => prevState.filter((listItems, index) => index !== indexItem));
    };
    function agregarPendientes(e) {
        e.preventDefault()
        setInfo(info.concat({label: pendientes, done: false}))
        setPendientes("")
    }


    function crearUsuario() {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/gmm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([])

        }).then((response) => response.json()).then((data) => console.log(data));
    }
    console.log(crearUsuario())

    function obtenerInfo() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/gmm', {method: 'GET'}).then((response) => response.json()).then((data) => setInfo(data));
    }


    function actualizarInfo() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/gmm', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)

        }).then((response) => response.json()).then((data) => console.log(data));
    }
    console.log(actualizarInfo())

    function eliminarInfo() {
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

    useEffect(() => {
        crearUsuario();
        obtenerInfo()
    }, [])


    useEffect(() => {
        actualizarInfo()
    }, [info])
    console.log(info)


    return (
        <>
            <div className="card container d-flex bg-success mt-5 md-w75 pb-5">
                <h2 className="titulo m-auto p-2">LISTA DE PENDIENTES</h2>
                <div className="card-body">
                    <input type="text" className="input m-1 w-75"
                        value={pendientes}
                        id="exampleInput"
                        aria-describedby="inputHelp"
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
