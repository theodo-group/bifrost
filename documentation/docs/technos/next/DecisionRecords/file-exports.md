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

## 2. No Index files

-   Index files interfer with auto imports as you can now import the same component from two different files

## 3. No path aliases

e.g.

```javascript
// tsconfg.json
...
    "paths": {
      "components/*": ["components/*"],
      "__fixtures__/*": ["__fixtures__/*"],
      "__mocks__/*": ["__mocks__/*"],
      "redux/*": ["redux/*"],
      "routes": ["routes"],
      "services/*": ["services/*"],
      "stylesheet": ["stylesheet"],
      "translations/*": ["translations/*"]
    }
...

// jest.config.ts
...
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^__fixtures__/(.*)$': '<rootDir>/src/__fixtures__/$1',
    '^__mocks__/(.*)$': '<rootDir>/src/__mocks__/$1',
    '^redux/(.*)$': '<rootDir>/src/redux/$1',
    '^auth/(.*)$': '<rootDir>/src/auth/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^translations/(.*)$': '<rootDir>/src/translations/$1',
    '^stylesheet$': '<rootDir>/src/stylesheet.ts',
  },
...
```

-   Adding `paths` often means that you have to maintain the list of `paths` in every place that independently compiles your code. If you add storybook, you'll have to maintain it there too! It's not worth the effort IMO.

## 4. Rely on vscode auto imports

This makes moving code aroudn when refactoring TOO EASY. Vscode will politely ask you if you want to update the imports, and you just have to click yes!

If the above points have been followed, all imports should be updatable in this way.

The. Dream.

## 5. (optional) Import order: library services `<br>` project services `<br>` all components

e.g.

```javascript
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Field, Form, Formik, FormikErrors } from 'formik';

import { getSpacing } from 'stylesheet';
import { getLoginError } from 'auth/redux/selectors';
import { loginUser } from 'auth/redux/actions';

import Button from 'components/Button';
import InputRow from 'components/InputRow';
```

I think it's nicer to to read :)
