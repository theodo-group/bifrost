# Exporting from a typescript file

TLDR:

1. no default exports
2. no index files
3. no paths aliases
4. rely on vscode auto imports
5. (optional) Import order: library services `<br>` project services `<br>` all components

## 1. No default exports

Default exports mean devs can rename imports without reference to the export.

```javascript
// default export renaming
import Comp from './aComponent';
import Component from './aComponent';

// named export renaming
import { Comp } from './aComponent';
import { Comp as Component } from './aComponent';
```

-   When you have **named exports**, a global search for the `Comp` will ALWAYS tell you 100% of the files that import the component.

-   Named exports also play nicer with auto imports

## 2. Index files

Barrel export index.ts files allows for nicer imports:

```tsx
// avoiding:
import { MyComponent } from 'MyComponent/MyComponent.tsx';
// with index.ts exporting MyComponent:
import { MyComponent } from 'MyComponent';
```

## 4. Rely on vscode auto imports

This makes moving code around when refactoring easier. vscode will ask you if you want to update the imports, and you just have to click yes!

If the above points have been followed, all imports should be updatable in this way.
