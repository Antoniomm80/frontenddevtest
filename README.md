# ITX Demo

La aplicación muestra, al cargar, una lista de productos con un pequeño buscador por marca y modelo.
Al pulsar sobre cada uno de los elementos del listado se navega al detalle del mismo, donde se puede elegir el color y almacenamiento y, una vez hecha
la selección de opciones, agregar al carrito.

## Arquitectura del proyecto

El proyecto se ha implementado siguiendo la arquitectura ports and adapters o arquitectura hexagonal donde tenemos

- Vertical Slicing: Para aislar los distintos módulos que componen la aplicación por concepto de negocio y no por responsabilidad técnica.
- Dentro de cada slice se definen los siguientes directorios agrupando las distintas responsabilidades:
    - Domain: Contiene la definición de las clases que forman parte del dominio del módulo así como los distintos ports que expone el mismo.
    - Infrastructure: Las implementaciones de los ports definidos en el dominio.
        - UI: Contiene las vistas React del proyecto y los hooks que conectan las vistas con los casos de uso.
    - Application: Los distintos casos de uso disponibles para la UI. Se encargan de orquestar los distintos ports definidos en el dominio.

- Se ha identificado dos vertical slices, la entidad _Product_ y la entidad _Cart_.

### Product

En este slice tenemos una entidad llamada Product que representa un producto completo

- Junto a esta entidad se han definido un port del dominio:
    - **ProductService**: Define las operaciones para obtener el listado de productos y el detalle de un producto.

- Este módulo expone dos casos de uso para ser utilizados por la UI:
    - **FindProducts**: Obtiene un listado de productos filtrados por marca y modelo.
    - **ProductDetail**: Obtiene el detalle de un producto.

### Cart

En en slice cart tenemos una entidad llamada CartItem que representa un producto en el carrito; esto es, su id, y el código de color y almacenamiento
seleccionado por el usuario

- Junto a esta entidad se ha definido dos ports del dominio:
    - **CartService**: Este port define añadir el producto al carrito
    - **StorageService**: Este port define operaciones para obtener y almacenar el número de elementos del carrito.

- Este módulo expone dos casos de uso para ser utilizados por la UI:
    - **AddToCart**: Añade un producto al carrito y guarda el total de elementos del carrito en el almacenamiento.
    - **GetCartCount**: Obtiene el número de elementos del carrito.

## Detalles de implementación

A continuación se describen los detalles de implementación más relevantes.

### Product

- Se ha realizado una implementación de ProductService basada en la función fetch de JS para acceder a la API remota de gestión de productos
- Sobre esta implementación base se ha implementado un patrón decorator que añade una caché por tiempo de expiración en el almacenamiento local.
- Es esta implementación con caché la que se instancia al arrancar la aplicación

### Cart

- Se ha realizado una implementación de CartService basada en la función fetch de JS para acceder a la API remota de gestión de productos
- La implementación del StorageService utiliza el localStorage de JS

### Integración React con casos de uso

- Para conectar react con los casos de uso se han implementado custom hooks que se encargan de exponer los casos de uso a los componentes de la UI y
  mantener el estado dejando los componentes de UI lo más puros posible

### Inicialización y wiring de los casos de uso

- En el archivo app.jsx se realiza la inicialización de los servicios, los casos de uso y la inyencción de dependencias.
- Para no tener que arrastrar los casos de uso como propiedades de los componentes se añaden a un contexto react
- Los hooks leeran este contexto para acceder a los casos de uso

## Contextos de React

Además del contexto de los casos de uso existen dos contextos adicionales para almacenar el estado compartido entre elementos React que no son parte
del mismo árbol de componentes:

- **BreadcrumbsContext**: Contexto para almacenar las migas de pan
- **CartContext**: Contexto para almacenar el número de elementos del carrito. Inicializado con el valor persistido

## Testing

Distinguimos tres tipos de testing en el proyecto:

- **Tests de integración (infraestructura)**: Con la ayuda de las capacidades de mocking de Vitest, mockeamos la función fetch y localstorage para que
  nuestros tests no tengan dependencias externas y verificamos que la implementación de los ports de dominio hace lo que esperamos de ellos
- **Tests unitarios (dominio/applicación)**: Mockeando las dependencias de los casos de uso, verificamos que los casos de uso colaboran con los
  servicios
  de dominio tal y como esperamos.
- **Tests de aceptación (end to end)** : Mediante el uso de Playwright, y la aplicación corriendo en modo desarrollo, verificamos que la aplicación
  funciona como esperamos.

## Scripts del proyecto

Estos son los scripts disponibles en el proyecto

- `yarn dev` Para lanzar el proyecto en modo desarrollo
- `yarn build` Para generar la build de producción del proyecto
- `yarn test` Para ejecutar los tests
- `yarn lint` Para ejecutar el linter
- `yarn test:e2e`: Para ejecutar los tests de aceptación
- `yarn playwright show-report`: Para levantar un servidor web que muestre los resultados de la ejecución de playwright

## Ejecución del proyecto

Se puede levantar el servidor de dos formas diferentes:

### Modo standalone

La aplicación requiere Node 18 y Yarn 1.22 para su correcta ejecución. Si el host dispone de ambas tools basta con instalar las dependencias con
`yarn install` y, a continuación, para ejecutar el proyecto se debe ejecutar el comando `yarn dev`.

### Modo Docker

Si se desea evitar instalar Node 18 y Yarn 1.22 en el host, y se dispone de Docker, se puede ejecutar el proyecto mediante Docker. Para ello, basta
con ejecutar el script `run-docker.sh` que se encuentra en la raíz del proyecto:

Este script se encarga de construir la imagen Docker y lanzarla.

La imagen, es una build multistep que se encarga de pasar los test de vite, fallando la construcción de la
imagen si algún test falla. No se incluye como paso extra la ejecución de los tests de playwright para no alargar innecesariamente el tiempo de
construcción de la imagen ya que debe bajarse las distintas imágenes de los navegadores.

```shell
./run-docker.sh
```

Cuando se corre el script anterior, el servidor se lanza en el puerto 3000 ya que se trata de la build de producción.

### Nota importante sobre los tests de aceptación

Debido a que los tests de aceptación dependen de la disponibilidad del servidor ITX demo, es conveniente que se encuentre arrancado para evitar
timeouts y la ejecución falle

## Marco tecnológico

El proyecto se ha implementado utilizando las siguientes tecnologías:

- Vite
- Node 18
- Yarn 1.22
- React
- ESScript 6
- Tailwind CSS
- Tanstack Query
- Yarn
- Vitest
- Playwright

El entorno de desarrollo utilizado ha sido:

- IntelliJ IDEA Ultimate
- Node Version Manager
- Ghostty
- OrbStack


