# marked-calendar [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/manufosela/marked-calendar)


Lit-Elementy web component configurable calendar to mark moods or other configurable options.

## Demo

[marked-calendar codepen demo](https://codepen.io/manufosela/pen/pBKKEP)

```
<h2>Basic marked-calendar Demo</h2>
<h3>Demo</h3>
<marked-calendar 
        year="2020"
        title="Imputacion de horas"
        savedata
        weekends 
        legend='[
          {"code": "#0F0", "label": "V",  "title": "Vacaciones"},
          {"code": "#FF0", "label": "LD", "title": "Libre Disposición"},
          {"code": "#F00", "label": "A",  "title": "Ausencia"},
          {"code": "#00F", "label": "T",  "title": "Teletrabajo"},
          {"code": "#F90", "label": "DE", "title": "Dia de Eventos"},
          {"code": "#F0F", "label": "AH", "title": "Autorizado por el Head"},
          {"code": "#0FF", "label": "CD", "title": "Dia de la Capacidad"} ]'
        holidays='[
          {"title": "Año nuevo", "date": "1/1"},
          {"title": "Dia de Reyes", "date": "6/1"},
          {"title": "Jueves Santo", "date": "9/4"},
          {"title": "Viernes Santo", "date": "10/4"},
          {"title": "Día del trabajador", "date": "1/5"},
          {"title": "Día de la comunidad de Madrid", "date":"2/5"}, 
          {"title": "San Isidro", "date":"15/5"}, 
          {"title": "Día de la Asunción de la Virgen", "date": "15/8"}, 
          {"title": "Día de todos los santos (pasado del domingo)", "date": "2/11"},
          {"title": "Día de la Almudena", "date":"9/11"}, 
          {"title": "Día de la constitución", "date": "6/12"},
          {"title": "Día de la Inmaculada Concepción", "date": "9/12"},
          {"title": "Festivo en Kairós", "date": "24/12"},
          {"title": "Navidad", "date": "25/12"},
          {"title": "Festivo en Kairós", "date": "31/12"},
          {"title": "Año Nuevo", "date": "1/1/2021"},
          {"title": "Día de Reyes", "date": "6/1/2021"} ]'
        >
></marked-calendar>

```
<!---
```
<custom-element-demo>
  <template>
    <link rel="import" href="marked-calendar.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<marked-calendar
  year="2020"
  title="Imputacion de horas"
  savedata
  weekends
  legend='[
    {"code": "#0F0", "label": "V",  "title": "Vacaciones"},
    {"code": "#FF0", "label": "LD", "title": "Libre Disposición"},
    {"code": "#F00", "label": "A",  "title": "Ausencia"},
    {"code": "#00F", "label": "T",  "title": "Teletrabajo"},
    {"code": "#F90", "label": "DE", "title": "Dia de Eventos"},
    {"code": "#F0F", "label": "AH", "title": "Autorizado por el Head"},
    {"code": "#0FF", "label": "CD", "title": "Dia de la Capacidad"} ]'
  holidays='[
    {"title": "Año nuevo", "date": "1/1"},
    {"title": "Dia de Reyes", "date": "6/1"},
    {"title": "Jueves Santo", "date": "9/4"},
    {"title": "Viernes Santo", "date": "10/4"},
    {"title": "Día del trabajador", "date": "1/5"},
    {"title": "Día de la comunidad de Madrid", "date":"2/5"}, 
    {"title": "San Isidro", "date":"15/5"}, 
    {"title": "Día de la Asunción de la Virgen", "date": "15/8"}, 
    {"title": "Día de todos los santos (pasado del domingo)", "date": "2/11"},
    {"title": "Día de la Almudena", "date":"9/11"}, 
    {"title": "Día de la constitución", "date": "6/12"},
    {"title": "Día de la Inmaculada Concepción", "date": "9/12"},
    {"title": "Festivo en Kairós", "date": "24/12"},
    {"title": "Navidad", "date": "25/12"},
    {"title": "Festivo en Kairós", "date": "31/12"},
    {"title": "Año Nuevo", "date": "1/1/2021"},
    {"title": "Día de Reyes", "date": "6/1/2021"} ]'
  ></marked-calendar>

```
## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ npm run start
```

## Running Tests

```
$ npm run test
```

## Build
```
$ npm run build
```

## Author

* **Mánu Fosela** - *Javascript Developer* - [manufosela](https://github.com/manufosela)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details

## Generated

**generator-lit-element-base** - *yeoman npm package* - by [@manufosela](https://github.com/manufosela/generator-litelement-webcomponent)