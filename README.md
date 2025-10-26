
# 🎬 CinePlus – Aplicación Web de Películas

## Datos del Estudiante
- **Nombre:** Anderson Vicente Ramos Iza  
- **Carrera:** Ingenieria en Software
- **Materia:** Aplicaciones Web  
- **Docente:** Ing. Jose Jaime  
- **Fecha:** 26/10/2025

---

## Objetivo del Proyecto
Desarrollar y extender una aplicación web de películas utilizando tecnologías modernas del frontend (**HTML, CSS, Bootstrap, jQuery, AJAX y JSON**), aplicando conocimientos sobre **estructura de datos, manipulación del DOM, validación de formularios y diseño responsivo**.

---

## Tecnologías Utilizadas
- **HTML5** → Estructura y contenido de las páginas.  
- **CSS3 / Bootstrap 5.3** → Estilos, diseño responsivo y tema visual personalizado.  
- **jQuery + AJAX** → Manipulación dinámica del DOM y carga de datos JSON.  
- **JSON** → Fuente de datos de películas y reseñas.  
- **LocalStorage** → Persistencia de la alerta de bienvenida.  

---

## Funcionalidades Implementadas

| Nº | Funcionalidad | Descripción |
|----|----------------|-------------|
| 1 | Carga dinámica de películas | Se obtienen los datos desde `peliculas.json` usando AJAX. |
| 2 | Estructura extendida de datos | Cada película incluye `id`, `titulo`, `generos[]`, `sinopsis`, `precios`, `estreno`, etc. |
| 3 | Vista de detalle | Muestra información completa de cada película y su estado (estreno o en cartelera). |
| 4 | Sección de reseñas | Carga reseñas desde `reseñas.json` y muestra calificaciones con estrellas. |
| 5 | Formulario de renta | Permite seleccionar varias películas, días y forma de pago; muestra resumen en modal. |
| 6 | Formulario de contacto | Validación personalizada: campos obligatorios y mensaje entre 20 y 50 caracteres. |
| 7 | Alerta de bienvenida | Muestra una sola vez gracias al uso de `localStorage`. |
| 8 | Simulación AJAX con retardo | Spinner de carga y retraso artificial de 5 segundos antes de mostrar películas. |
| 9 | Modal de tráiler | Cada tarjeta incluye botón **“Ver tráiler”** que abre el video en un modal. |
|10 | Animación visual | Se aplica efecto `fadeIn` al mostrar las películas en la galería. |
|11 | Navbar unificado | Menú de navegación visible en todas las páginas con la sección activa resaltada. |
|12 | Footer fijo y tema visual | Footer siempre visible al final, nueva tipografía y esquema de colores. |

---
```
CinePlus/
│
├── 📁 css/
│ └── style.css
│
├── 📁 js/
│ └── app.js
│
├── 📁 pages/
│ ├── detalle.html
│ ├── renta.html
│ └── contacto.html
│
├── 📁 data/
│ ├── peliculas.json
│ └── reseñas.json
│
├── 📁 img/
│ ├── [imágenes de las películas]
│ └── placeholder.jpg
│
├── index.html
└── README.md
```
---

## Instrucciones de Uso

1. Clonar o descargar este repositorio.  
2. Mantener la estructura de carpetas mostrada arriba.  
3. Abrir `index.html` en un navegador moderno (Chrome, Edge o Firefox).  
4. Navegar usando la barra superior:
   - **Inicio:** Ver películas disponibles y estrenos.  
   - **Renta:** Completar el formulario de alquiler y ver resumen en modal.  
   - **Contacto:** Enviar un mensaje con validación personalizada.  
5. En las tarjetas de películas:
   - Click en **Ver tráiler** → abre modal con el video.  
   - Click en **Ver más** → muestra detalle completo de la película.  

---

##  Créditos
Proyecto desarrollado por **Anderson Ramos Iza** como parte de la actividad **“Aplicación Web Dinámica de Películas”**.  
Los datos, imágenes y tráilers se utilizan únicamente con fines académicos.
