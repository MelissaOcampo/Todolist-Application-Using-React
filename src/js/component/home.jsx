import React, {useState,useEffect} from "react";//importo react y el hook useState
//create your first component
const Home = () => {

	//declaro los estados//
	const[pendientes,setPendientes]=useState("")//1. creamos un estado del input pendientes
        //[espacio donde guardo los valores,funcion que actualiza los valores]
	//creo funcion para ejecutar la actualizacion del valor inicial
	const [info, setInfo] = useState([]); // 2. creamos un estado de lo que se guarda en el array
	function handlePendientes (e) {
		//console.log(e.target.value)//para poder ver el valor del target en el que esta posicionado
		setPendientes(e.target.value) 
	}
	function enviarPendientes (e){
		e.preventDefault()// detenemos el comportamiento predeterminado para procesar nuestro codigo
		setInfo(info.concat({label: pendientes, done: false}))
		setPendientes("")
	} 
	// eliminar item en array
	const deleteItem = (indexItem) => {
		setInfo(info.filter((infoItem, index) => {
		  return index != indexItem;
		}))
	  }


	//   const deleteItem = (indexItem) => {
	// 	setInfo((prevState) =>
	// 	  prevState.filter((Items, index) => index !== indexItem)
	// 	);
	//   };

	  //el array
// 	  const listItems = info.map((item, index) =>
//   <li>{item} <button onClick={() => remove(index)}>
//   </button>X</li>
//   );
	function crearUsuario() {
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/gmm`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify([]) 
			  
		})
		.then((response) => response.json())
 		.then((data) => console.log(data));
	}
	console.log(crearUsuario())

	function obtenerData() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/gmm',{
			method: 'GET',
		})
		.then((response) => response.json())
 		.then((data) => setInfo (data));
	}


	function actualizarInfo() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/gmm',{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(info) 
			  
		})
		.then((response) => response.json())
 		.then((data) => console.log(data));
	}
	console.log(actualizarInfo())

	function eliminarInfo() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/gmm',{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			  },
		})
		.then((response) => response.json())
 		.then((data) => {console.log(data.result)
			if (data.result==="okey"){
				setInfo ([])
				}}
			); 
	}

	useEffect(()=>{
		crearUsuario();
		obtenerData()
	},[])



	useEffect (()=>{
		actualizarInfo()
		},[info])
		console.log(info)





	return (
		<>
		<form className="container" onClick={enviarPendientes}>
  <div className="mb-2">
    <label htmlFor="exampleInputEmail1" className="form-label">todos</label>
	 {/*2. definimos el evento ochange en el input */}
	 <input type="text" className="form-control" onChange={handlePendientes} value={pendientes}/>
  </div>
  <button type="add" onClick={enviarPendientes} className="btn btn-dark">add</button>
  <div id="contenedorData" className="text-light">
  {
                        info.map((item, index) => (
                            <div  className="row d-flex m-2"  style={{borderRadius:"20px",backgroundColor: "rgb(255, 99, 71)"}} key= {index}> 

                                <div className="col-6">
                                    <h5 className="m-2">{item.label} </h5>
                                </div>
								<div className="col-6 text-end" onClick={() => deleteItem(indexItem)}>
                                    <i className="fas fa-trash-alt align-items-end m-2 pt-1"></i>
                                </div>
                            </div>
                        ))
                    } </div>
		</form>
<div>
</div>
		</>
	);
};
export default Home;