# COR-Project API

## Rutas

principal = `http://localhost:3007/workast-api/v1`

1. (POST) `${mainRoute}/word-counter`. Parametros requeridos:

- `f`: filas
- `c`: columnas
- `lettersArray`: Array de strings. La cantidad de elementos en el array debe ser igual a `f`. A su vez, cada elemento debe ser una cadena de caracteres cuya longitud debe ser igual a `c`

### Como Probarlo

1. `nvm use 12` - Es necesario correr desde la version 12 en adelante debido al uso de `worker_threads`. [Documentation](https://nodejs.org/api/worker_threads.html)
1. `npm i`
1. (POST) `${mainRoute}/word-counter`. Incluir minimamente los parametros requeridos.

---

### Como Correr los Tests

1. `npm i` ( si no se hizo previamente )
2. `npm run test`
