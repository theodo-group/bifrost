---
sidebar_position: 6
---

# 💃Error Handling

## Error Boundary: 🧚‍ Avoid unexpected blank pages on your app

You can use the component `ErrorBoundary` to display a fallback component when a Javascript error is caught in a children of the ErrorBoundary.

_[Reference documentation by React](https://reactjs.org/docs/error-boundaries.html)_

### ✅ What to do if you want to use it on your project

The ErrorBoundary is wrapped by default around the main `App` and renders the `AppCrashFallback` for generic errors.

-   Edit the `AppCrashFallback` to fit your design guidelines.
-   Send error to your monitoring system using the `componentDidCatch` from the `ErrorBoundary`.

### 💡 Where to use

You can define fallbacks at lower levels for custom error handling.

Ex: You display a graph rendered by a certain lib. If this lib does not work on some browsers you can display a fallback instead. Wrapp the graph in an `ErrorBoundary` and choose the fallback to use instead by passing a `FallbackComponent` prop.
