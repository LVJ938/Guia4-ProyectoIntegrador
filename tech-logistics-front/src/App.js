import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
//import Pedido from './modelos/Pedido';

function App() {
	const [nombre, setNombre] = useState('');
	const [correo, setCorreo] = useState('');
	const [telefono, setTelefono] = useState('');
	const [direccion, setDireccion] = useState('');
	const [errorProducto, setErrorProducto] = useState(null);
	const [successMessageProducto, setSuccessMessageProducto] = useState(null);

	const [nombreProducto, setNombreProducto] = useState('');
	const [descripcionProducto, setDescripcionProducto] = useState('');
	const [precioProducto, setPrecioProducto] = useState('');

	const [productos, setProductos] = useState([]);

	const [clientes, setClientes] = useState([]);
	const [data, setData] = React.useState(null);
	const [pedidos, setPedidos] = React.useState([]);
	const [idCliente, setIdCliente] = useState('');
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	React.useEffect(() => {
		fetch("http://localhost:3001/api/hello")
			.then((res) => {
				console.log("[API][hello][1]: ");
				console.log(res);

				// Verifica si la respuesta es válida
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}

				return res.json();
			}).then((data) => {
				console.log("[API][hello][2]: ");
				console.log(data);

				// Verifica si 'data' tiene 'message'
				if (data && data.message) {
					setData(data.message);
				} else {
					console.error('Respuesta inesperada:', data);
					setData("No se encontró el mensaje.");
				}
			}).catch((err) => {
				console.log("Error: " + err);

				setData("Error al cargar datos");
			});
	}, []);

	React.useEffect(() => {
		const fetchProductos = async () => {
			try {
				const response = await fetch('http://localhost:3001/api/producto'); // URL de la API de productos
				if (!response.ok) {
					throw new Error('No se pudieron obtener los productos');
				}
				const data = await response.json();
				setProductos(data); // Guardar los productos obtenidos en el estado
			} catch (err) {
				setError(err.message); // Manejar errores
			} finally {
				setLoading(false); 
			}
		};

		fetchProductos();
	}, []);

	React.useEffect(() => {
		const fetchClientes = async () => {
			try {
				const response = await fetch('http://localhost:3001/api/clientes'); // URL de la API de clientes
				if (!response.ok) {
					throw new Error('No se pudieron obtener los clientes');
				}
				const data = await response.json();
				setClientes(data); // Guardar los clientes obtenidos en el estado
			} catch (err) {
				setError(err.message); // Manejar errores
			} finally {
				setLoading(false); // Desactivar el estado de carga
			}
		};

		fetchClientes();
	}, []); // Solo se ejecuta una vez cuando el componente se monta

	React.useEffect(() => {
		fetch("http://localhost:3001/api/pedido")
			.then((res) => {
				console.log("[API][Pedidos][1]: ");
				console.log(data);

				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}

				return res.json();
			}).then((data) => {
				console.log("[API][Pedidos][2]: ");
				console.log(data);

				setPedidos(data);
			}).catch((err) => {
				console.log("Error: " + err);

				setData("Error al cargar los pedidos");
			});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevenir el comportamiento por defecto (recarga de página)
		setLoading(true); // Activamos el estado de carga

		const newPedido = {
			id_cliente: idCliente,
		};

		try {
			const response = await fetch('http://localhost:3001/api/pedido', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newPedido), // Convertimos el objeto a JSON
			});

			if (!response.ok) {
				throw new Error('Error al crear el pedido');
			}

			const data = await response.json(); // Si la respuesta es exitosa, parseamos el JSON
			setSuccessMessage('Pedido creado con éxito!'); // Mostramos el mensaje de éxito
			// Limpiamos los campos del formulario
			setIdCliente('');
		} catch (err) {
			setError(err.message); // Si ocurre un error, lo guardamos en el estado
		} finally {
			setLoading(false); // Desactivamos el estado de carga
		}
	};

	const handleSubmitCliente = async (e) => {
		e.preventDefault(); // Evita que la página se recargue

		// Validación simple
		if (!nombre || !correo || !telefono || !direccion) {
			setError('Por favor, complete todos los campos.');
			return;
		}

		const newCliente = {
			nombre,
			correo,
			telefono,
			direccion,
		};

		try {
			// Enviar el nuevo cliente a la API (ajusta la URL a la de tu backend)
			const response = await fetch('http://localhost:3001/api/clientes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCliente),
			});

			if (!response.ok) {
				throw new Error('No se pudo crear el cliente.');
			}

			// Limpiar los campos del formulario si la creación es exitosa
			setNombre('');
			setCorreo('');
			setTelefono('');
			setDireccion('');
			setError('');
			setSuccessMessage('Cliente creado con éxito!');
		} catch (err) {
			setError(err.message);
		}
	};

	const handleSubmitProducto = async (e) => {
		e.preventDefault(); // Evita que la página se recargue

		// Validación simple
		if (!nombreProducto || !descripcionProducto || !precioProducto) {
			setErrorProducto('Por favor, complete todos los campos.');
			return;
		}

		const newProducto = {
			nombreProducto,
			descripcionProducto,
			precioProducto,
		};

		try {
			// Enviar el nuevo producto a la API (ajusta la URL a la de tu backend)
			const response = await fetch('http://localhost:3001/api/producto', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newProducto),
			});

			if (!response.ok) {
				throw new Error('No se pudo agregar el producto.');
			}

			// Limpiar los campos del formulario si la creación es exitosa
			setNombreProducto('');
			setDescripcionProducto('');
			setPrecioProducto('');
			setErrorProducto('');
			setSuccessMessageProducto('Producto agregado con éxito!');
		} catch (err) {
			setErrorProducto(err.message);
		}
	};

	return (
		<div className="App">
			<header className="App-header" >
				<h1>Tech Logistics</h1>
			</header>

			<div className="lista-clientes">
				<h2>Lista de Clientes</h2>
				{clientes.length > 0 ? (
					<ul>
						{clientes.map((cliente) => (
							<li key={cliente.id_Cliente}>
								<strong>ID:</strong> {cliente.id_Cliente} <br />
								<strong>Nombre:</strong> {cliente.nombre} <br />
								<strong>Correo:</strong> {cliente.correo} <br />
								<strong>Teléfono:</strong> {cliente.telefono} <br />
								<strong>Dirección:</strong> {cliente.direccion} <br />
							</li>
						))}
					</ul>
				) : (
					<p>No hay clientes disponibles.</p>
				)}
			</div>

			<div className="crear-cliente">
				<h2>Crear Nuevo Cliente</h2>
				{error && <p className="error-message">{error}</p>}
				{successMessage && <p className="success-message">{successMessage}</p>}
				<form onSubmit={handleSubmitCliente}>
					<div className="form-group">
						<label htmlFor="nombre">Nombre:</label>
						<input
							type="text"
							id="nombre"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="correo">Correo:</label>
						<input
							type="email"
							id="correo"
							value={correo}
							onChange={(e) => setCorreo(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="telefono">Teléfono:</label>
						<input
							type="text"
							id="telefono"
							value={telefono}
							onChange={(e) => setTelefono(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="direccion">Dirección:</label>
						<input
							type="text"
							id="direccion"
							value={direccion}
							onChange={(e) => setDireccion(e.target.value)}
							required
						/>
					</div>
					<button type="submit">Crear Cliente</button>
				</form>
			</div>

			<div className="lista-productos">
				<h2>Lista de Productos</h2>
				{productos.length > 0 ? (
					<ul>
						{productos.map((producto) => (
							<li key={producto.id_producto}>
								<strong>ID:</strong> {producto.id_producto} <br />
								<strong>Nombre:</strong> {producto.nombre} <br />
								<strong>Descripción:</strong> {producto.descripcion} <br />
								<strong>Precio:</strong> ${producto.precio} <br />
							</li>
						))}
					</ul>
				) : (
					<p>No hay productos disponibles.</p>
				)}
			</div>

			<div className="agregar-producto">
				<h2>Agregar Nuevo Producto</h2>
				{errorProducto && <p className="error-message">{errorProducto}</p>}
				{successMessageProducto && <p className="success-message">{successMessageProducto}</p>}
				<form onSubmit={handleSubmitProducto}>
					<div className="form-group">
						<label htmlFor="nombre">Nombre:</label>
						<input
							type="text"
							id="nombreProducto"
							value={nombreProducto}
							onChange={(e) => setNombreProducto(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="descripcion">Descripción:</label>
						<input
							type="text"
							id="descripcion"
							value={descripcionProducto}
							onChange={(e) => setDescripcionProducto(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="precioProducto">Precio:</label>
						<input
							type="number"
							id="precio"
							value={precioProducto}
							onChange={(e) => setPrecioProducto(e.target.value)}
							required
						/>
					</div>
					<button type="submit">Agregar Producto</button>
				</form>
			</div>

			<div className="lista-pedidos">
				<h2>Lista de Pedidos</h2>
				<ul>
					{pedidos.map((pedido) => (
						<li key={pedido.id_pedido}>
							<strong>Pedido ID: </strong>{pedido.id_pedido}<br />
							<strong>Estado de Envío: </strong>{pedido.id_estado_envio}<br />
							<strong>Fecha: </strong>{new Date(pedido.fecha_pedido).toLocaleString()}<br />
							<strong>Cliente: </strong>{pedido.id_cliente}<br />
						</li>
					))}
				</ul>
			</div>

			<div className="formulario-pedido">
				<h2>Crear Nuevo Pedido</h2>

				{successMessage && <p className="success-message">{successMessage}</p>}
				{error && <p className="error-message">{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="idCliente">ID Cliente:</label>
						<input
							type="number"
							id="idCliente"
							value={idCliente}
							onChange={(e) => setIdCliente(e.target.value)}
							required
						/>
					</div>

					<button type="submit" disabled={loading}>
						{loading ? 'Creando Pedido...' : 'Crear Pedido'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default App;
