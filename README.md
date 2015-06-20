# jsMatrix
<div style="text-align: right">[![Build Status](https://travis-ci.org/halojedi20/jsMatrix.svg?branch=master)](https://travis-ci.org/halojedi20/jsMatrix)</div>
Small, lightweight Javascript matrix library

This is mainly used for WebGL matrix transformations but will be abstracted out to do matrix math on n-sized matricies

Create a new Matrix4 identity matrix: `$M.M4(null);`

The library currently allows you to:
  - Translate via `.Translate(x, y, z)`
  - Rotate with degrees via `.dRotate(degrees)` or with radians, `.rRotate(radians)`
  - Scale via `.Scale(value)`

You can chain these functions like so to easily create ModelView Matricies:
  ```js
  $M.M4(null)
    .dRotate(90)
    .Scale(0.5)
    .getMatrix();
```

To Do:
  - Further refactor for speed and object reusability
  - Ability to create Matrix transfomations for n-sized matricies
