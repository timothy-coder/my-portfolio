# My Portfolio

Proyecto Next.js para un portafolio personal con perfil de ingeniero de sistemas, secciones de proyectos, experiencia, educacion, habilidades y contacto.

Incluye un portal de administracion local para agregar datos usando JSON como base inicial.

## Como usarlo

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Inicia Next.js en modo desarrollo:

   ```bash
   npm run dev
   ```

3. Abre la vista publica en `http://localhost:3000`.
4. Abre el administrador en `http://localhost:3000/admin`.

Credenciales demo:

- Usuario: `admin`
- Contrasena: `admin123`

## Datos

Los datos iniciales estan en `data/profile.json`.

Como el proyecto no tiene backend todavia, los cambios hechos desde el panel se guardan en `localStorage` del navegador. Desde la pestana JSON puedes exportar o importar el archivo para conservar tus cambios.

## Vistas

- `/`: portafolio publico.
- `/admin`: portal privado local para agregar, quitar, importar y exportar datos.
