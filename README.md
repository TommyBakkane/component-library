# @tommybakkane/component-library

A React component library published to GitHub Packages.

## Setup

The package is hosted on GitHub Packages. Add a `.npmrc` file to your project root so npm resolves the `@tommybakkane` scope from GitHub:

```
@tommybakkane:registry=https://npm.pkg.github.com
```

You will also need a GitHub personal access token with `read:packages` scope set as `NODE_AUTH_TOKEN` in your environment.

### Install

```sh
npm install @tommybakkane/component-library
```

### Import styles

Import the stylesheet once at the root of your app:

```ts
import '@tommybakkane/component-library/style.css';
```

---

## Components

### Button

```tsx
import { Button } from '@tommybakkane/component-library';

<Button variant="primary" size="medium">Label</Button>
<Button variant="outline" loading>Saving…</Button>
<Button variant="danger" leftIcon={<TrashIcon />}>Delete</Button>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `primary` \| `secondary` \| `outline` \| `ghost` \| `danger` | `primary` |
| `size` | `small` \| `medium` \| `large` | `medium` |
| `loading` | `boolean` | `false` |
| `leftIcon` | `ReactNode` | — |
| `rightIcon` | `ReactNode` | — |

Extends all native `<button>` attributes.

---

### Badge

```tsx
import { Badge } from '@tommybakkane/component-library';

<Badge color="success">Active</Badge>
<Badge color="danger" size="small">Overdue</Badge>
```

| Prop | Type | Default |
|------|------|---------|
| `color` | `primary` \| `success` \| `warning` \| `danger` \| `info` | `primary` |
| `size` | `small` \| `medium` | `medium` |
| `leftIcon` | `ReactNode` | — |
| `rightIcon` | `ReactNode` | — |

---

### Divider

```tsx
import { Divider } from '@tommybakkane/component-library';

<Divider />
<Divider label="or" />
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |

---

### EmptyState

```tsx
import { EmptyState } from '@tommybakkane/component-library';

<EmptyState title="No results" description="Try adjusting your filters." />
```

| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `description` | `string` | — |

---

### Skeleton

```tsx
import {
  Skeleton,
  SkeletonLine,
  SkeletonAvatar,
  SkeletonText,
  SkeletonCard,
} from '@tommybakkane/component-library';

<SkeletonAvatar />
<SkeletonLine width="60%" />
<SkeletonText lines={4} />
<SkeletonCard />
```

| Export | Props |
|--------|-------|
| `Skeleton` | — |
| `SkeletonLine` | `width?: string` |
| `SkeletonAvatar` | — |
| `SkeletonText` | `lines?: number` (default `3`) |
| `SkeletonCard` | — |

---

### Spinner

```tsx
import { Spinner } from '@tommybakkane/component-library';

<Spinner />
```

---

### Flex

```tsx
import { Flex } from '@tommybakkane/component-library';

<Flex direction="row" align="center" justify="between" gap="md">
  <span>Left</span>
  <span>Right</span>
</Flex>
```

| Prop | Type | Default |
|------|------|---------|
| `direction` | `row` \| `column` | `row` |
| `align` | `start` \| `center` \| `end` \| `stretch` | `center` |
| `justify` | `start` \| `center` \| `end` \| `between` \| `around` | `start` |
| `gap` | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md` |
| `wrap` | `boolean` | `false` |
| `grow` | `boolean` | `false` |
| `self` | `start` \| `center` \| `end` \| `stretch` | — |

---

### Grid

```tsx
import { Grid } from '@tommybakkane/component-library';

<Grid cols={3} gap="md">
  <Card />
  <Card />
  <Card />
</Grid>
```

| Prop | Type | Default |
|------|------|---------|
| `cols` | `number` | — |
| `gap` | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `sm` |

---

## TypeScript

All prop interfaces are exported:

```ts
import type {
  ButtonProps,
  BadgeProps,
  DividerProps,
  EmptyStateProps,
  SkeletonLineProps,
  SkeletonTextProps,
  FlexProps,
  GridProps,
} from '@tommybakkane/component-library';
```

---

## Development

```sh
npm install
npm run storybook   # component development
npm run test        # run tests
npm run build       # build dist/
```

### Publishing

```sh
npm publish
```

The `prepublishOnly` script runs the build automatically before publishing.
