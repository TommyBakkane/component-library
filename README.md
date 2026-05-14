# @tommybakkane/component-library

A React component library published to GitHub Packages.

## Setup

The package is hosted on GitHub Packages. Add a `.npmrc` file to your project root so npm resolves the `@tommybakkane` scope correctly:

```
@tommybakkane:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Your token needs the `read:packages` scope. Generate one at GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic).

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

<Button variant="primary" size="medium">Save</Button>
<Button variant="outline" loading>Saving…</Button>
<Button variant="danger" leftIcon={<TrashIcon />}>Delete</Button>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'primary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `loading` | `boolean` | `false` |
| `leftIcon` | `ReactNode` | — |
| `rightIcon` | `ReactNode` | — |

Extends all native `<button>` attributes.

---

### Input

Compound component with context-wired label, hint, and error.

```tsx
import { Input } from '@tommybakkane/component-library';

<Input.Field error="Required">
  <Input.Label>Email</Input.Label>
  <Input type="email" placeholder="you@example.com" />
  <Input.Hint>We'll never share your email.</Input.Hint>
  <Input.Error />
</Input.Field>
```

`Input.Label` wires `htmlFor` automatically. `Input.Error` renders the error string from `Input.Field`. Extends all native `<input>` attributes.

---

### Select

Same compound pattern as Input.

```tsx
import { Select } from '@tommybakkane/component-library';

<Select.Field error="Required">
  <Select.Label>Country</Select.Label>
  <Select>
    <option value="no">Norway</option>
    <option value="se">Sweden</option>
  </Select>
  <Select.Error />
</Select.Field>
```

---

### Textarea

Same compound pattern as Input.

```tsx
import { Textarea } from '@tommybakkane/component-library';

<Textarea.Field>
  <Textarea.Label>Message</Textarea.Label>
  <Textarea rows={4} />
  <Textarea.Hint>Max 500 characters.</Textarea.Hint>
</Textarea.Field>
```

---

### NumberInput

Compound component with increment/decrement buttons.

```tsx
import { NumberInput } from '@tommybakkane/component-library';

<NumberInput.Field>
  <NumberInput.Label>Quantity</NumberInput.Label>
  <NumberInput min={1} max={99} step={1} />
  <NumberInput.Error />
</NumberInput.Field>
```

| Prop | Type | Default |
|------|------|---------|
| `min` | `number` | — |
| `max` | `number` | — |
| `step` | `number` | `1` |

---

### Slider

Compound component for range input.

```tsx
import { Slider } from '@tommybakkane/component-library';

<Slider.Field>
  <Slider.Label>Volume</Slider.Label>
  <Slider min={0} max={100} step={1} size="md" />
  <Slider.Hint>Drag to adjust.</Slider.Hint>
</Slider.Field>
```

| Prop | Type | Default |
|------|------|---------|
| `min` | `number` | `0` |
| `max` | `number` | `100` |
| `step` | `number` | `1` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `value` | `number` | — |
| `onChange` | `(value: number) => void` | — |

---

### Checkbox

```tsx
import { Checkbox } from '@tommybakkane/component-library';

<Checkbox size="md">Accept terms</Checkbox>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md'` | `'md'` |
| `error` | `string` | — |

Extends all native `<input type="checkbox">` attributes.

---

### Radio

```tsx
import { Radio } from '@tommybakkane/component-library';

<Radio.Group>
  <Radio value="a" name="choice">Option A</Radio>
  <Radio value="b" name="choice">Option B</Radio>
</Radio.Group>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md'` | `'md'` |
| `error` | `string` | — |

---

### Switch

```tsx
import { Switch } from '@tommybakkane/component-library';

<Switch size="md" checked={enabled} onChange={e => setEnabled(e.target.checked)}>
  Enable notifications
</Switch>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md'` | `'md'` |

---

### Badge

```tsx
import { Badge } from '@tommybakkane/component-library';

<Badge color="success">Active</Badge>
<Badge color="danger" size="small">Overdue</Badge>
```

| Prop | Type | Default |
|------|------|---------|
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| `size` | `'small' \| 'medium'` | `'medium'` |
| `leftIcon` | `ReactNode` | — |
| `rightIcon` | `ReactNode` | — |

---

### Tag

```tsx
import { Tag } from '@tommybakkane/component-library';

<Tag variant="success" onDismiss={() => removeTag(id)}>Design</Tag>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| `onDismiss` | `() => void` | — |

---

### Alert

```tsx
import { Alert } from '@tommybakkane/component-library';

<Alert variant="warning" title="Heads up" onDismiss={() => setVisible(false)}>
  Your session will expire in 5 minutes.
</Alert>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` |
| `title` | `string` | — |
| `onDismiss` | `() => void` | — |

---

### Avatar

```tsx
import { Avatar } from '@tommybakkane/component-library';

<Avatar src="/photo.jpg" alt="Jane Doe" size="md" />
<Avatar name="Jane Doe" size="md" />

<Avatar.Group max={3} size="sm">
  <Avatar name="Alice" />
  <Avatar name="Bob" />
  <Avatar name="Carol" />
  <Avatar name="Dave" />
</Avatar.Group>
```

| Prop | Type | Default |
|------|------|---------|
| `src` | `string` | — |
| `alt` | `string` | — |
| `name` | `string` | — |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |

`Avatar.Group` props: `max?: number`, `size?`. The `size` set on `Group` automatically propagates to all child `Avatar`s — no need to set it on each one individually. An explicit `size` on an individual `Avatar` overrides the group value.

---

### Card

```tsx
import { Card } from '@tommybakkane/component-library';

<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content goes here.</Card.Body>
  <Card.Footer>Footer actions</Card.Footer>
</Card>
```

---

### Modal

```tsx
import { Modal } from '@tommybakkane/component-library';

<Modal open={open} onClose={() => setOpen(false)} size="md">
  <Modal.Header>Confirm</Modal.Header>
  <Modal.Body>Are you sure?</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger">Delete</Button>
  </Modal.Footer>
</Modal>
```

| Prop | Type | Default |
|------|------|---------|
| `open` | `boolean` | required |
| `onClose` | `() => void` | required |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

---

### Drawer

```tsx
import { Drawer } from '@tommybakkane/component-library';

<Drawer open={open} onClose={() => setOpen(false)} side="right" size="md">
  <Drawer.Header>Settings</Drawer.Header>
  <Drawer.Body>Content</Drawer.Body>
  <Drawer.Footer>Footer</Drawer.Footer>
</Drawer>
```

| Prop | Type | Default |
|------|------|---------|
| `open` | `boolean` | required |
| `onClose` | `() => void` | required |
| `side` | `'left' \| 'right'` | `'right'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

---

### Tabs

```tsx
import { Tabs } from '@tommybakkane/component-library';

<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">Overview content</Tabs.Panel>
  <Tabs.Panel value="details">Details content</Tabs.Panel>
</Tabs>
```

| Prop | Type | Default |
|------|------|---------|
| `defaultValue` | `string` | — |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |

---

### Accordion

```tsx
import { Accordion } from '@tommybakkane/component-library';

<Accordion defaultValue="item-1">
  <Accordion.Item value="item-1" title="Section 1">
    Content for section 1.
  </Accordion.Item>
  <Accordion.Item value="item-2" title="Section 2">
    Content for section 2.
  </Accordion.Item>
</Accordion>
```

| Prop | Type | Default |
|------|------|---------|
| `defaultValue` | `string` | — |
| `value` | `string \| null` | — |
| `onChange` | `(value: string \| null) => void` | — |

---

### Dropdown

```tsx
import { Dropdown } from '@tommybakkane/component-library';

<Dropdown>
  <Dropdown.Trigger>
    <Button>Options</Button>
  </Dropdown.Trigger>
  <Dropdown.Menu>
    <Dropdown.Item icon={<EditIcon />}>Edit</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item variant="danger">Delete</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
```

`Dropdown.Item` extends all native `<button>` attributes.

---

### Tooltip

```tsx
import { Tooltip } from '@tommybakkane/component-library';

<Tooltip content="Copy to clipboard" placement="top">
  <button>Copy</button>
</Tooltip>
```

| Prop | Type | Default |
|------|------|---------|
| `content` | `ReactNode` | required |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |

The trigger child must accept HTML attributes — `aria-describedby` is injected automatically so screen readers announce the tooltip content when the trigger is focused.

---

### Popover

```tsx
import { Popover } from '@tommybakkane/component-library';

const anchorRef = useRef<HTMLButtonElement>(null);
const [open, setOpen] = useState(false);

<button ref={anchorRef} onClick={() => setOpen(true)}>Open</button>
<Popover open={open} onClose={() => setOpen(false)} anchorRef={anchorRef} placement="bottom-start">
  Popover content
</Popover>
```

| Prop | Type | Default |
|------|------|---------|
| `open` | `boolean` | required |
| `onClose` | `() => void` | required |
| `anchorRef` | `RefObject<HTMLElement>` | required |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | `'bottom-start'` |
| `aria-label` | `string` | — |

---

### Toast

Wrap your app in `ToastProvider` and call `useToast()` anywhere inside it.

```tsx
import { ToastProvider, useToast } from '@tommybakkane/component-library';

// In your app root:
<ToastProvider>
  <App />
</ToastProvider>

// Anywhere inside:
const { success, error, warning, info } = useToast();

success('Changes saved.');
error('Something went wrong.');
```

---

### Progress

```tsx
import { Progress } from '@tommybakkane/component-library';

<Progress value={60} max={100} size="md" label="Upload progress" />
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `number` | required |
| `max` | `number` | `100` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `label` | `string` | — |

---

### Pagination

```tsx
import { Pagination } from '@tommybakkane/component-library';

<Pagination page={currentPage} totalPages={10} onChange={setCurrentPage} siblings={1} />
```

| Prop | Type | Default |
|------|------|---------|
| `page` | `number` | required |
| `totalPages` | `number` | required |
| `onChange` | `(page: number) => void` | required |
| `siblings` | `number` | `1` |

---

### Breadcrumb

```tsx
import { Breadcrumb } from '@tommybakkane/component-library';

<Breadcrumb>
  <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
  <Breadcrumb.Item><a href="/projects">Projects</a></Breadcrumb.Item>
  <Breadcrumb.Item current>Component Library</Breadcrumb.Item>
</Breadcrumb>
```

---

### Table

```tsx
import { Table } from '@tommybakkane/component-library';

<Table>
  <Table.Head>
    <Table.Row>
      <Table.Th>Name</Table.Th>
      <Table.Th>Status</Table.Th>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Td>Alice</Table.Td>
      <Table.Td><Badge color="success">Active</Badge></Table.Td>
    </Table.Row>
  </Table.Body>
</Table>
```

---

### Divider

```tsx
import { Divider } from '@tommybakkane/component-library';

<Divider />
<Divider label="or" />
```

---

### EmptyState

```tsx
import { EmptyState } from '@tommybakkane/component-library';

<EmptyState title="No results" description="Try adjusting your filters." />
```

---

### Skeleton

```tsx
import { Skeleton } from '@tommybakkane/component-library';

<Skeleton.Avatar />
<Skeleton.Line width="60%" />
<Skeleton.Text lines={4} />
<Skeleton.Card />
```

---

### Spinner

```tsx
import { Spinner } from '@tommybakkane/component-library';

<Spinner />
```

---

## Layout

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
| `direction` | `'row' \| 'column'` | `'row'` |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'center'` |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'start'` |
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `wrap` | `boolean` | `false` |
| `grow` | `boolean` | `false` |

---

### Grid

```tsx
import { Grid } from '@tommybakkane/component-library';

// Fixed columns
<Grid cols={3} gap="md">
  <Card />
  <Card />
  <Card />
</Grid>

// Responsive auto-fill
<Grid minColWidth="200px" gap="md">
  <Card />
  <Card />
  <Card />
</Grid>
```

| Prop | Type | Default |
|------|------|---------|
| `cols` | `number` | — |
| `minColWidth` | `string` | — |
| `gap` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |

Use either `cols` (fixed column count) or `minColWidth` (responsive `auto-fill`), not both.

---

### Link

```tsx
import { Link } from '@tommybakkane/component-library';

<Link href="/about">About</Link>
<Link href="/about" variant="muted">Muted link</Link>
<Link href="/danger-zone" variant="danger">Delete account</Link>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'default' \| 'muted' \| 'danger'` | `'default'` |

Extends all native `<a>` attributes, including `ref`.

---

## Theming

### Dark mode

The library automatically adapts to the user's OS/browser preference via `@media (prefers-color-scheme: dark)`. No configuration required — import the stylesheet and dark mode works out of the box.

### ThemeProvider

Override any design token for a subtree of your app. All fields are optional — only supply what you want to change.

```tsx
import { ThemeProvider, type Theme } from '@tommybakkane/component-library';

const myTheme: Theme = {
  color: {
    primary: '#7c3aed',
    primarySoft: '#ede9fe',
    onPrimary: '#ffffff',
  },
  radius: {
    sm: '3px',
    md: '4px',
    lg: '6px',
  },
  fontFamilyBase: '"DM Sans", sans-serif',
};

<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

Multiple `ThemeProvider`s can be nested — each one only affects its own subtree, making it easy to brand separate sections of a page differently.

**`Theme` shape:**

| Key | Overrides |
|-----|-----------|
| `color` | All `--color-*` tokens (primary, background, surface, semantic, text, border) |
| `radius` | All `--radius-*` tokens (xs → full) |
| `spacing` | All `--spacing-*` tokens (xs → xl) |
| `fontSize` | All `--font-size-*` tokens (xs → xl) |
| `size` | All `--size-*` tokens (component heights, xs → xl) |
| `shadow` | All `--shadow-*` tokens (xs, sm, md) |
| `fontFamilyBase` | `--font-family-base` |

All sub-interfaces (`ThemeColors`, `ThemeRadius`, `ThemeSpacing`, etc.) are exported individually for typed partial overrides.

---

## TypeScript

All prop interfaces are exported and can be imported directly:

```ts
import type {
  ButtonProps,
  InputProps,
  FieldProps,
  ModalProps,
  DrawerProps,
  DropdownItemProps,
  Theme,
  ThemeColors,
  ThemeProviderProps,
  // ... etc
} from '@tommybakkane/component-library';
```

---

## Development

```sh
npm install
npm run storybook   # component explorer on :6006
npm run test        # run tests
npm run build       # build dist/
```

### Publishing

```sh
npm version patch   # bump version
npm publish         # builds automatically before publishing
```
