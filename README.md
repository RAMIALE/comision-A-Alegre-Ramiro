# Proyecto de Foro Multitemático

Este es un proyecto de un foro multitemático desarrollado en Node.js. Permite a los usuarios crear, editar, eliminar y ver publicaciones en el foro. Las publicaciones tienen campos para título, contenido y una URL de imagen opcional.

## Requisitos

Asegúrate de tener instalados los siguientes componentes antes de ejecutar la aplicación:

- Node.js (v18.17.1 o superior)
- MySQL Server

## Configuración

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/RAMIALE/C21646Aalegreramiro - copia.git

# Navega al directorio del proyecto:
   
   cd https://github.com/RAMIALE/C21646Aalegreramiro - copia.git


## Instala las dependencias del proyecto:
   npm install

## Configura la base de datos MySQL:
   
 DB_HOST=localhost
 DB_USER=ramiale
 DB_PASSWORD=Taina2825
 DB_DATABASE=mysql

## Ejecuta las migraciones para crear la tabla de publicaciones:

    npx sequelize-cli db:migrate

## Inicia la aplicación:
   
   npm start
## Uso:



- Accede a [http://localhost:4000](http://localhost:4000) en tu navegador para utilizar la aplicación de foro.
- Puedes crear nuevas publicaciones, editar las existentes, eliminarlas y ver todas las publicaciones disponibles.

## Tecnologías Utilizadas

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- EJS (motor de plantillas)

## Autor

- [Ramiro Alegre](https://github.com/RAMIALE)
