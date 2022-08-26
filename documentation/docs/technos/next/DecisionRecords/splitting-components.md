# Splitting Components

TLDR:

**Aim to improve the dev experience.**

1. separation of concerns - **each component does 1 functional thing**
2. may-need-to-be-split indicators
    1. 100+ lines
    2. 10+ imports

---

## Aim: improve dev experience by

-   making it easier to find the relevant code for your feature
-   reducing lines of code you need to understand when adding/editing a feature

## 1. Separation Of Concerns (SOC)

This [article](https://dottedsquirrel.com/react/rethinking-soc-with-react/) gives an intro to SOC far better than I can. The crux of SOC is splitting your codebase so that **each file does 1 thing**.

When it comes to React Components, we can change this statement slightly: **each _component_ does 1 _functional_ thing**.

Let's look at the `Header.tsx` component and its children.

```typescript
// Header.tsx
import { Logo } from './Logo';
import { AuthButtons } from './AuthButtons';

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${getSpacing(13)};
    padding: 0 ${getSpacing(4)};
`;

export const Header: FunctionComponent = () => {
    return (
        <HeaderContainer>
            <Logo />
            <AuthButtons />
        </HeaderContainer>
    );
};

// Logo.tsx
const logoHeight = getSpacing(11);
const logoWidth = getSpacing(23);

export const Logo: FunctionComponent = () => {
    return (
        <Link href={routes.HOME}>
            <a style={{ height: logoHeight }}>
                <Image
                    alt="Forge logo"
                    src="/logo.png"
                    height={logoHeight}
                    width={logoWidth}
                />
            </a>
        </Link>
    );
};

// AuthButtons
export const AuthButtons: FunctionComponent = () => {
    const dispatch = useDispatch();
    const logout = useCallback(
        () => dispatch(logoutUser.request()),
        [dispatch],
    );
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

    return isUserLoggedIn ? (
        <Button onClick={logout}>
            <FormattedMessage id="header.logout" />
        </Button>
    ) : (
        <Link href={routes.LOGIN}>
            <a>
                <Button>
                    <FormattedMessage id="header.login" />
                </Button>
            </a>
        </Link>
    );
};
```

-   The `Header.tsx` component defines the header layout
-   The `Logo.tsx` component defines the logo image
-   The `AuthButtons.tsx` component defines the login/logout buttons

Each component does 1 functional thing. This means that when our developer comes to edit/add a feature they will have less code to read and understand.

e.g. If developer is asked to add a signup button, the only need to understand the code in the `AuthButtons.tsx` component - they don't care what's happening with the logo, so why should they have to read the code for it?

Let's look at when it would look like if there was no splitting:

```typescript
// Header.tsx
const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${getSpacing(13)};
    padding: 0 ${getSpacing(4)};
`;

export const Header: FunctionComponent = () => {
    const dispatch = useDispatch();
    const logout = useCallback(
        () => dispatch(logoutUser.request()),
        [dispatch],
    );
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

    return (
        <HeaderContainer>
            <Link href={routes.HOME}>
                <a style={{ height: logoHeight }}>
                    <Image
                        alt="Forge logo"
                        src="/logo.png"
                        height={logoHeight}
                        width={logoWidth}
                    />
                </a>
            </Link>
            {isUserLoggedIn ? (
                <Button onClick={logout}>
                    <FormattedMessage id="header.logout" />
                </Button>
            ) : (
                <Link href={routes.LOGIN}>
                    <a>
                        <Button>
                            <FormattedMessage id="header.login" />
                        </Button>
                    </a>
                </Link>
            )}
        </HeaderContainer>
    );
};
```

Honestly, it's not THAT bad... it's not great, but it's not THAT bad.

However, the Logo feature is _aware_\* of 4 variables (`dispatch`, `logout`, `isUserLoggedIn`, `HeaderContainer`) defined in the same file that do not effect the feature. If a developer is asked to change some logic with the Logo, they _should_ read and understand the extra 4 variables because they are in the same scope and the _might_ affect it.

> \* I used to describe this as "having too much context", but since [Context](https://reactjs.org/docs/context.html) in React, this is a bit confusing

This problem will get worse and worse as you start to add more features, and build bigger components.

> It is worth noting that OVER-splitting is definitely a thing. Remember the aim is to improve the developer experience, and the ideal developer experience is different for different teams. Find out what works for you and your team :)

## 2. Indicators that something might need spliting

1. Features in the file are _aware_ of variables that do not affect the feature
1. 100+ lines in a file
1. 10+ import lines
1. I can't completely describe the purpose of the component in 1 sentence - "The `Header.tsx` component defines the header" doesn't count!
