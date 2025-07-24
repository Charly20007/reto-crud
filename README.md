# CRUD de Secciones para Franquicias Perú

Este proyecto es una aplicación **frontend** desarrollada en **React + Vite + TypeScript** con un diseño moderno y responsivo usando **Tailwind CSS**.  
Permite gestionar secciones (categorías de productos) para distintas marcas de franquicias como KFC, Starbucks, etc. Incluye autenticación JWT, integración real con APIs REST protegidas y experiencia de usuario moderna.

---

## 🚀 ¿Cómo ejecutar este proyecto?

**Sigue estos pasos para levantar el CRUD en tu máquina local:**

1. **Clona el repositorio y entra en la carpeta del proyecto**

   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo

2. **Instala dependencias**

  npm install

3. **Crea un archivo .env en la raíz toma como base el .env.example del proyecto, y coloca tu token JWT**

VITE_API_TOKEN=TU_TOKEN_JWT_AQUI

4. **Inicia el servidor de desarrollo**

npm run dev


## 🌍 Solución de CORS (Proxy Vite)

Para evitar problemas de CORS durante el desarrollo, el proyecto utiliza el **proxy de Vite**.
En `vite.config.ts`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://apiqa.franquiciasperu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
})