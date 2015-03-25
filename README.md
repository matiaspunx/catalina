# [Catalina]

Boilerplate para empezar cualquier tipo de Web App. 
Gestionado con Gulp para manejar tareas, Bower para administrar librerias y Sass.

## Empezando

Primero que nada instalamos las dependencias:

```bash
$ npm install
```

```bash
$ bower install
```

Con `npm install` vamos a instalar Gulp y sus dependencias. Y con `bower install` vamos a instalar las librerias para usar en nuestra app (ej: jQuery)

## Como usarlo?

### Tareas

```bash
$ gulp serve
```

El comando `gulp serve` inicia un server con Connect y carga el sitio en nuestro navegador por defecto. Automáticamente vigila las modificaciones que hagamos en los archivos y recarga el sitio con Livereload cuando encuentra cambios.


```bash
$ gulp
```

El comando `gulp` hace un deploy de nuestro proyecto a una carpeta `dist`.


## <a name="team-members"></a>Miembros del equipo
* Matias Punx - <matias.punx@gmail.com> - <http://www.twitter.com/antirockstars>


# Libraries 

<https://github.com/VodkaBears/Remodal>