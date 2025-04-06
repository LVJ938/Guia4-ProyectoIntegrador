const express = require("express");
const cors = require("cors");
const { sequelize, models } = require('./config/sequelize');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hola desde el servidor!"
    });
});

// Clientes
// Crear un cliente
app.post("/api/clientes", async (req, res) => {
    try {
        const { nombre, correo, telefono, direccion } = req.body;
        const nuevoCliente = await models.Cliente.create({
            nombre,
            correo,
            telefono,
            direccion
        });
        res.status(201).json(nuevoCliente); // Retorna el cliente creado
    } catch (error) {
        res.status(500).json({ error: "Error al crear el cliente", details: error.message });
    }
});

// Obtener todos los clientes
app.get("/api/clientes", async (req, res) => {
    try {
        const clientes = await models.Cliente.getAllClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los clientes", details: error.message });
    }
});

// Obtener un cliente por ID
app.get("/api/clientes/:id", async (req, res) => {
    try {
        const cliente = await models.Cliente.getClienteById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el cliente", details: error.message });
    }
});

// Actualizar un cliente
app.put("/api/clientes/:id", async (req, res) => {
    try {
        const cliente = await models.Cliente.getClienteById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const { nombre, correo, telefono, direccion } = req.body;
        await cliente.update({ nombre, correo, telefono, direccion });

        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el cliente", details: error.message });
    }
});

// Eliminar un cliente
app.delete("/api/api/clientes/:id", async (req, res) => {
    try {
        const cliente = await models.Cliente.getClienteById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        await cliente.destroy();
        res.status(200).json({ message: "Cliente eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el cliente", details: error.message });
    }
});

// Producto
app.post('/api/producto', async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;
        const nuevoPedido = await models.Producto.create({ nombreProducto, descripcionProducto, precioProducto });

        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

app.get('/api/producto', async (req, res) => {
    try {
        const productos = await models.Producto.getAllProductos();
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/api/producto/:id', async (req, res) => {
    try {
        const producto = await models.Producto.getProductoById();
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.delete('/api/producto/:id', async (req, res) => {
    try {
        const producto = await models.Producto.getProductoById(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await producto.destroy();
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

// Pedido
app.post('/api/pedido', async (req, res) => {
    try {
        const { id_cliente } = req.body;
        const nuevoPedido = await models.Pedido.create({
            id_cliente: id_cliente,
            fecha_pedido: Date.now(),
            estado_envio: "PREPARANDO",
        });
        res.status(201).json(nuevoPedido); // Retorna el cliente creado
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
});

app.get('/api/pedido', async (req, res) => {
    try {
        const pedidos = await models.Pedido.getAllPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
});

app.get('/api/pedido/:id', async (req, res) => {
    try {
        const pedido = await models.Pedido.getPedidoById(req.params.id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el pedido' });
    }
});

app.delete('/api/pedido/:id', async (req, res) => {
    try {
        const pedido = await models.Pedido.getPedidoById(req.params.id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        await pedido.destroy();
        res.status(200).json({ message: "Pedido eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
});

// Detalle Pedido
app.post('/api/detallepedido', async (req, res) => {
    try {
        const { cantidad, subtotal, id_pedido, id_producto } = req.body;
        const detallePedido = await models.DetallePedido.create({ cantidad, subtotal, id_pedido, id_producto });
        res.status(201).json(detallePedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el detalle de pedido' });
    }
});

app.get('/api/detallepedido/:id', async (req, res) => {
    try {
        const detallePedido = await models.DetallePedido.getAllDetallesPedidoByPedido(req.params.id);
        if (!detallePedido) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }
        res.status(200).json(detallePedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle de pedido' });
    }
});

app.delete('/api/detallepedido/:id', async (req, res) => {
    try {
        const detallePedido = await models.DetallePedido.getDetallePedidoById(req.params.id);
        if (!detallePedido) {
            return res.status(404).json({ message: "DetallePedido no encontrado" });
        }

        await detallePedido.destroy();
        res.status(200).json({ message: "DetallePedido eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el detalle de pedido' });
    }
});

// Conectar a la base de datos y escuchar en el puerto
sequelize.sync({ force: false }) // Cambia a `force: true` si deseas que Sequelize reemplace las tablas al iniciar la app
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error al conectar a la base de datos:", err);
    });