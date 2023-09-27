// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Publicacion } = require('./sequelize'); // Importa el modelo de publicación

const app = express();
// Configuración para servir archivos estáticos
app.use(express.static('public/'));

const port = 4000;



// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de la carpeta de vistas (plantillas EJS)
app.set('views', './views');
app.set('view engine', 'ejs');

// Ruta para mostrar el formulario de creación de publicación
app.get('/crear-publicacion', (req, res) => {
  res.render('crearPublicacion');
});

// Ruta para procesar la creación de una nueva publicación
app.post('/crear-publicacion', async (req, res) => {
  try {
    // Obtén los datos del formulario
    const { titulo, contenido, imagenURL } = req.body;

    // Valida que se hayan proporcionado título y contenido
    if (!titulo || !contenido) {
      return res.status(400).send('El título y el contenido son obligatorios');
    }

    // Crea una nueva publicación en la base de datos
    const nuevaPublicacion = await Publicacion.create({
      titulo,
      contenido,
      imagenURL,
      fechaCreacion: new Date(),
    });

    // Redirige al usuario a la página principal
    res.redirect('/');
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para mostrar la página principal con las publicaciones
app.get('/', async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll();
    res.render('paginaPrincipal', { publicaciones });
  } catch (error) {
    console.error('Error al recuperar las publicaciones:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para mostrar el formulario de edición de una publicación
app.get('/editar-publicacion/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos la publicación por su ID
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrada');
    }

    // Renderizamos el formulario de edición
    res.render('editarPublicacion', { publicacion });
  } catch (error) {
    console.error('Error al cargar el formulario de edición:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para procesar la edición de una publicación
app.post('/editar-publicacion/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido, imagenURL } = req.body;

    if (!titulo || !contenido) {
      return res.status(400).send('El título y el contenido son obligatorios');
    }

    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrada');
    }

    // Actualizamos la publicación con los nuevos datos
    publicacion.titulo = titulo;
    publicacion.contenido = contenido;
    publicacion.imagenURL = imagenURL;

    // Guardamos los cambios
    await publicacion.save();

    // Redirigimos al usuario a la página principal
    res.redirect('/');
  } catch (error) {
    console.error('Error al editar la publicación:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para mostrar la confirmación de eliminación de una publicación
app.get('/eliminar-publicacion/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos la publicación por su ID
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrada');
    }

    // Renderizamos la vista de confirmación de eliminación
    res.render('eliminarPublicacion', { publicacion });
  } catch (error) {
    console.error('Error al cargar la confirmación de eliminación:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para procesar la eliminación de una publicación
app.post('/eliminar-publicacion/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos la publicación por su ID
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrada');
    }

    // Eliminamos la publicación
    await publicacion.destroy();

    // Redirigimos al usuario a la página principal
    res.redirect('/');
  } catch (error) {
    console.error('Error al eliminar la publicación:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:4000`);
});
