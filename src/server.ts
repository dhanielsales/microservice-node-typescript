import '@shared/config/enviroment';
import 'express-async-errors';

import express from 'express';

import { Api } from '@api/index';

// Criando instancia da Aplicação
const app = express();

// Aplicando instancia com JSON
app.use(express.json());

// Cria instancia da API
const apiInstance = new Api();
const api = apiInstance.init();

// Adiciona todas as todas ao App
app.use(api);

// function print(path: any, layer: any) {
//   if (layer.route) {
//     layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
//   } else if (layer.name === 'router' && layer.handle.stack) {
//     layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
//   } else if (layer.method) {
//     console.log(
//       '%s /%s',
//       layer.method.toUpperCase(),
//       path.concat(split(layer.regexp)).filter(Boolean).join('/'),
//     );
//   }
// }

// function split(thing: any) {
//   if (typeof thing === 'string') {
//     return thing.split('/');
//   } else if (thing.fast_slash) {
//     return '';
//   } else {
//     var match = thing
//       .toString()
//       .replace('\\/?', '')
//       .replace('(?=\\/|$)', '$')
//       .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
//     return match
//       ? match[1].replace(/\\(.)/g, '$1').split('/')
//       : '<complex:' + thing.toString() + '>';
//   }
// }

app.listen(3333, () => {
  // app._router.stack.forEach(print.bind(null, []));

  console.log('Server listening on port 3333.');
});
