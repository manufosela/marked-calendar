# marked-calendar [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/manufosela/marked-calendar)


Lit-Elementy web component configurable calendar to mark moods or other configurable options.

## Demo

[marked-calendar codepen demo](https://codepen.io/manufosela/pen/pBKKEP)

```
<h2>Basic marked-calendar Demo</h2>
<h3>Demo</h3>
<marked-calendar year="2019" title="Imputacion de horas" savedata weekends options=[["#0F0","V"],["#FF0","LD"],["#F00","A"],["#00F","T"],["#F90","E"]]></marked-calendar>

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
<marked-calendar year="2019" title="Imputacion de horas" savedata weekends options=[["#0F0","V"],["#FF0","LD"],["#F00","A"],["#00F","T"],["#F90","E"]]></marked-calendar>

```
## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

## Build
```
$ npm run build
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.

## Author

* **Mánu Fosela** - *Javascript Composer* - [manufosela](https://github.com/manufosela)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details

## Generated

**generator-lit-element-base** - *yeoman npm package* - by [@manufosela](https://github.com/manufosela/generator-litelement-webcomponent)