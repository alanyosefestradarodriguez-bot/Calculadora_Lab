# Laboratorio Matemático

Frontend en React + TypeScript para practicar matemáticas de la licenciatura en Informática. Se construyó a partir de `Bosquejo.docx` y las versiones recibidas del esquema de base de datos; la versión más reciente revisada es `SQLQuery1.sql` del 24 de septiembre de 2026.

La interfaz usa únicamente **Varela Round**. La fuente se distribuye dentro del frontend mediante `@fontsource/varela-round`, incluidos formularios, reportes, diagramas y etiquetas de las gráficas.

## Ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` para ver la interfaz de **inicio de sesión**. Pulsa **Iniciar sesión** para entrar directamente al laboratorio, incluso con los campos vacíos y sin backend. El formulario es una interfaz preparada para el equipo de backend; actualmente no valida ni envía credenciales. Las calculadoras realizan los cálculos en el navegador y el historial se guarda localmente (máximo 50 cálculos).

Para verificar:

```bash
npm test
npm run build
```

## Arquitectura MVC

```text
src/
  model/       Tipos, reglas y cálculos matemáticos, historial local y cliente HTTP
  view/        Páginas, formularios, tablas, gráficas ECharts y estilos React
    components/
    modules/
    pages/
  controller/  Hooks que coordinan sesión, formularios, cálculos y asistente
  main.tsx     Entrada y enrutador
```

Las vistas recogen los datos y presentan resultados. Los controladores validan el flujo, llaman al modelo y administran estados de error y carga. Los modelos matemáticos no dependen de React y tienen pruebas unitarias.

## Herramientas incluidas

| Módulo | Herramientas que funcionan en modo demostración |
| --- | --- |
| Lógica matemática | Tabla de verdad, simplificación por minterminos, mapa de Karnaugh, circuito SVG simplificado y galería interactiva de compuertas AND, OR, NOT, NAND, NOR, XOR y XNOR (hasta 4 variables) |
| Matemáticas financieras | Interés simple/compuesto, valor actual, descuento comercial/racional/en serie, tasas equivalentes y amortización con cambios de tasa, abonos recurrentes o extraordinarios por periodo; curvas adicionales y superficies 3D de sensibilidad a plazo y tasa |
| Matemáticas computacionales | Bisección, Newton–Raphson, interpolación de Lagrange/Newton, Euler, Euler mejorado, Runge–Kutta 4 y gráficas 3D de funciones de dos variables; campo 3D de pendientes para EDO cuando el dominio lo permite |
| Probabilidad y estadística | Medidas descriptivas, tabla de frecuencias absolutas, relativas y acumuladas, binomial, Poisson y normal acumulada |

Cada resultado muestra pasos, tablas cuando corresponda, gráficas 2D/3D y exportación CSV de las tablas. Las curvas, barras y áreas usan **Apache ECharts 6** con renderizado SVG; las superficies interactivas usan **ECharts-GL 2** (WebGL). El circuito y mapa lógico conservan su representación SVG como diagramas. Ambas versiones están fijadas en `package.json` y las bibliotecas de gráficas se cargan cuando aparece un resultado.

Para generar un informe completo, pulsa **Imprimir / PDF** en el resultado y elige **Guardar como PDF** en el cuadro de impresión del navegador. El informe incluye resultado, procedimiento, tablas, gráficas y circuito o mapa lógico cuando existan. Las superficies 3D se capturan desde el ángulo visible como imagen para la impresión.

Las gráficas 3D se usan para funciones con dos variables independientes. Una función de una sola variable conserva su gráfica 2D; una EDO también puede mostrar la superficie de su campo de pendientes junto a la curva de solución. El parser de funciones admite `x`, `y`, números, `+ - * / ^`, paréntesis, `sin`, `cos`, `tan`, `exp`, `ln`, `log`, `sqrt` y `abs`.

La interfaz incorpora el escudo de la UNAM y una página de **Derechos de autor** disponible desde el acceso y el menú. El equipo ya verificó el permiso de uso de la identidad institucional.

## Integración pendiente con el backend

El backend está previsto en **Python con Django**; su implementación y contrato HTTP aún no forman parte de este repositorio de frontend.

El script SQL no define endpoints HTTP ni estructura para los procedimientos detallados. El cliente HTTP en `src/model/api.ts` espera, **como contrato provisional**:

```text
POST {VITE_API_BASE_URL}/auth/login
  entrada:  { "correo": "...", "contrasena": "..." }
  salida:   { "token": "...", "usuario": { "nombre": "...", "correo": "..." } }

POST {VITE_API_BASE_URL}/asistente/preguntas
  entrada:  { "pregunta": "...", "moduloRelacionado": "..." }
  salida:   { "respuesta": "..." }
```

El formulario de acceso siempre está visible e incluye correo, contraseña, mostrar/ocultar contraseña y aviso de bloqueo de mayúsculas. Conserva estados opcionales de carga y error para la integración futura. En esta entrega de frontend, **Iniciar sesión** abre una sesión local de demostración sin exigir campos, validar su formato ni llamar a la API. Los valores del formulario no se usan para conceder acceso.

Para la integración futura, copia `.env.example` a `.env.local`, define `VITE_API_BASE_URL` con la URL del backend y reinicia Vite. Configurar esa variable conecta el cliente HTTP y el asistente, pero no cambia el acceso directo del formulario. El equipo de backend deberá reemplazar el acceso local de `src/controller/useSessionController.ts`, conectar el formulario con el cliente de autenticación y aplicar las validaciones correspondientes. El cliente HTTP provisional está en `src/model/api.ts`; el contrato y CORS deben adaptarse al backend definitivo. La sesión actual permanece en memoria y termina al recargar o cerrar sesión. El frontend no guarda contraseñas ni tokens en el almacenamiento del navegador.

Estos endpoints son una propuesta de integración. El frontend no consulta SQL directamente. La gestión de cuentas y la recuperación de contraseñas quedan a cargo del equipo de backend; la pantalla indica al usuario que contacte al administrador para recibir ayuda con el acceso.

Funciones del bosquejo que aún requieren diseño o servicios adicionales: doble división sintética, factores cuadráticos, explicaciones IA y evaluaciones. La versión nueva del SQL y su diagrama ya no incluyen tablas de exámenes. La pantalla de evaluaciones informa que esta función queda pendiente de una definición de alcance y API.

Consulta [el impacto del SQL actualizado](docs/INTEGRACION_SQL_2026-09-24.md) para ver los cambios de cada tabla y los acuerdos necesarios con el equipo de backend. El frontend no consulta SQL Server: los cálculos locales siguen siendo una demostración hasta recibir el contrato HTTP definitivo.

## Decisiones de cálculo

- Tasas de finanzas: porcentaje **anual**; el número de periodos indica capitalizaciones o pagos por año.
- Descriptiva: varianza y desviación **poblacionales**; curtosis reportada como exceso de curtosis.
- Distribución normal: `P(X ≤ x)` mediante aproximación numérica de la función error.
- La aplicación de demostración calcula en el navegador y no persiste en SQL.

Consulta [el análisis previo](../ANALISIS_FRONTEND.md) para ver las diferencias entre las fuentes entregadas.
