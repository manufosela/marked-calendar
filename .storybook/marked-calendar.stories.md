```js script
import '../marked-calendar.js';
 
export default {
  title: 'Marked-Calendar/Docs (markdown)',
  parameters: { component: 'marked-calendar' } },
};
```
 
# Demo Web Component Marked-Calendar
 
A component meant to display small information with additional data on the back.
// [...] use markdown to format your text
// the following demo is inline
 
```js story
export const Simple = () => html` <marked-calendar>Hello World</marked-calendar> `;
```
 
## Variations
 
Show demo with a frame and a "show code" button.
 
```js preview-story
export const Simple = () => html` <marked-calendar>Hello World</marked-calendar> `;
```
 
## API
 
The api table will show the data of "marked-calendar" in your `custom-elements.json`.
 
<sb-props of="marked-calendar"></sb-props>