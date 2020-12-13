what is this repo:
this is a demo repo to show that a bug when using tsconfig-paths-webpack-plugin with webpack5.

The test file in packages/fullscreen couldn't be correctly resolved. If we check the output bundle js file we will see
```
/***/ "../packages/fullscreen/src/entry.ts":
/*!*******************************************!*
  !*** ../packages/fullscreen/src/entry.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
console.log('packages/fullscreen/src/entry.ts loaded');
__export(__webpack_require__(/*! ./test */ "./src/test.ts"));

```

noted that on the last line, the file path is `./src/test.ts`, which resolves to the file `application/src/test.ts`. While the correct resolve path should be like `../packages/fullscreen/src/test.ts` (in webpack 4).



how to start:
1. npm i
2. npm run build
3. serve application/build folder
