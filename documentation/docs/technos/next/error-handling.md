---
sidebar_position: 5
---

# 💃Error Handling

## Error Boundary: 🧚‍ Avoid unexpected blank pages on your app

You can use the component [`ErrorBoundary`](../../../../examples/bifrost-starter/apps/frontend/components/ErrorBoundary/ErrorBoundary.tsx) to display a fallback component when a Javascript error is caught in a children of the ErrorBoundary.

_[Reference documentation by React](https://reactjs.org/docs/error-boundaries.html)_

### ✅ What to do if you want to use it on your project

An example of ErrorBoundary usage in client component can be found on the profile page [`Profile`](../../../../examples/bifrost-starter/apps/frontend/components/pages/Profile/Profile.tsx) and renders the [`CrashFallback`](../../../../examples/bifrost-starter/apps/frontend/components/CrashFallback/CrashFallback.tsx) for generic errors.

- Edit the [`CrashFallback`](../../../../examples/bifrost-starter/apps/frontend/components/CrashFallback/CrashFallback.tsx) to fit your design guidelines.
- Send error to your monitoring system using the `componentDidCatch` from the [`ErrorBoundary`](../../../../examples/bifrost-starter/apps/frontend/components/ErrorBoundary/ErrorBoundary.tsx).

### 💡 Where to use

You can define fallbacks at lower levels for custom error handling.

Ex: You display a graph rendered by a certain lib. If this lib does not work on some browsers you can display a fallback instead. Wrap the graph in an [`ErrorBoundary`](../../../../examples/bifrost-starter/apps/frontend/components/ErrorBoundary/ErrorBoundary.tsx) and choose the fallback to use instead by passing a `FallbackComponent` prop.
