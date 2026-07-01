# My Portfolio

Proyecto Next.js para un portafolio personal con perfil de ingeniero de sistemas, secciones de proyectos, experiencia, educación, habilidades y contacto.

Incluye un portal de administración local para agregar datos usando JSON como base inicial.

## Como usarlo

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Inicia Next.js en modo desarrollo:

   ```bash
   npm run dev
   ```

3. Abre la vista pública en `http://localhost:3000`.
4. Abre el administrador en `http://localhost:3000/admin`.

Credenciales demo:

- Usuario: `admin`
- Contraseña: `admin123`

## Datos

Los datos iniciales están en `data/profile.json`.

Como el proyecto no tiene backend todavía, los cambios hechos desde el panel se guardan en `localStorage` del navegador. Desde la pestaña JSON puedes exportar o importar el archivo para conservar tus cambios.

## Vistas

- `/`: portafolio público.
- `/admin`: portal privado local para agregar, quitar, importar y exportar datos.

## Despliegue en Vercel

Configuración esperada:

- Framework Preset: `Next.js`
- Root Directory: `./`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: dejar vacío
- Node.js: `20.9.0` o superior

Si Vercel muestra `Not Found`, revisa que el proyecto importado apunte a la raíz donde están `package.json` y la carpeta `app`, y que hayas subido al repositorio todos los archivos del proyecto.
