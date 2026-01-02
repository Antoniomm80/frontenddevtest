### Arquitectura del proyecto

El proyecto sigue la arquitectura ports and adapters o arquitectura hexagonal donde tenemos

- Vertical Slicing: Para aislar los distintos módulos que componen la aplicación por concepto de negocio y no por responsabilidad técnica.
- Dentro de cada slice:
    - Domain: Contiene la definición de las clases que forman parte del dominio del módulo así como los distintos ports que expone el mismo.
    - Infrastructure: Las implementaciones de los ports definidos en el dominio.
        - UI: Contiene las vistas React del proyecto y los hooks que conectan las vistas con los casos de uso.
    - Application: Los distintos casos de uso disponibles para la UI. Se encargan de orquestar los distintos ports definidos en el dominio.

## Scripts del proyecto

Estos son los scripts disponibles en el proyecto

- **yarn dev:** Para lanzar el proyecto en modo desarrollo
- **yarn build:** Para compilar el proyecto
- **yarn test:** Para ejecutar los tests
- **yarn lint:** Para ejecutar el linter

## Marco tecnológico

- Vite
- React
- ESScript 6
- Yarn
- Vitest