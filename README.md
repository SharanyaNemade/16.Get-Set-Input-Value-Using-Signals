# Angular21Tutorial



# Angular 21: Counter App Using Signals

Let's build a simple Counter Application using Angular 21 Signals.

This example covers all the important concepts:

1. Why Angular Signals are useful compared to normal properties.
2. Creating a writable Signal for counter state.
3. Understanding `.update()` vs `.set()`.
4. Implementing increment, decrement, and reset functionality.
5. Preventing negative counter values.
6. Binding Signals to the Angular template.
7. Writing clean and simple counter logic.

The main focus is Angular logic and Signals, not CSS.

## 1. Why Angular recommends Signals over normal properties

In traditional Angular development, we commonly use normal properties:

typescript

```typescript
count: number = 0;
```

To increment:

typescript

```typescript
this.count++;
```

This works, but Signals provide a reactive way to manage state.

With Signals:

typescript

```typescript
count = signal<number>(0);
```

To increment:

typescript

```typescript
this.count.update(value => value + 1);
```

### Difference between normal properties and Signals

| Normal property | Signal |
| --- | --- |
| `count = 0` | `count = signal(0)` |
| `count++` | `count.update(v => v + 1)` |
| Read using `count` | Read using `count()` |
| Not inherently reactive | Reactive state management |
| Angular change detection handles updates | Angular tracks Signal dependencies |

Why use Signals?

- Fine-grained reactive tracking.
- Easier state management.
- Automatic template updates when tracked Signal values change.
- Less need for manual change detection in many scenarios.
- Useful for modern Angular applications.

## 2. Creating a writable Signal for counter state

First, import `signal` from `@angular/core`.

app.ts

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  count = signal<number>(0);

}
```

Explanation:

typescript

```typescript
count = signal<number>(0);
```

- `count` is the Signal variable.
- `signal()` creates a writable Signal.
- `number` defines its TypeScript type.
- `0` is the initial counter value.

To read the current value:

typescript

```typescript
this.count()
```

To change the value, use `.set()` or `.update()`.

## 3. Using `.update()` vs `.set()` in Signals

Angular Signals provide two important methods to update values.

### A. `.set()` method

Use `.set()` when you want to assign a completely new value.

Example:

typescript

```typescript
count = signal<number>(0);

setCounter() {
  this.count.set(10);
}
```

Here, the counter value becomes `10`, regardless of its previous value.

### B. `.update()` method

Use `.update()` when the new value depends on the previous value.

Example:

typescript

```typescript
count = signal<number>(0);

increment() {
  this.count.update(value => value + 1);
}
```

Here:

- `value` represents the previous counter value.
- `value + 1` calculates the new value.
- `.update()` stores the new value in the Signal.

### Difference between `.set()` and `.update()`

| `.set()` | `.update()` |
| --- | --- |
| Assigns a new value | Calculates a new value |
| Does not require previous value | Receives previous value |
| `count.set(10)` | `count.update(v => v + 1)` |
| Useful for reset | Useful for increment/decrement |

Interview tip: If an interviewer asks how to increment a Signal, `.update()` is generally the cleaner choice.

## 4. Increment, decrement, and reset logic

Now let's implement the three counter operations.

app.ts

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  count = signal<number>(0);

  // Increment counter
  increment() {
    this.count.update(value => value + 1);
  }

  // Decrement counter
  decrement() {
    this.count.update(value => value - 1);
  }

  // Reset counter
  reset() {
    this.count.set(0);
  }

}
```

Let's understand the logic.

Increment:

typescript

```typescript
this.count.update(value => value + 1);
```

If the current value is `5`, the new value becomes `6`.

Decrement:

typescript

```typescript
this.count.update(value => value - 1);
```

If the current value is `5`, the new value becomes `4`.

Reset:

typescript

```typescript
this.count.set(0);
```

Regardless of the current value, the counter becomes `0`.

## 5. Preventing negative counter values

Suppose the counter value is `0`.

If the user clicks the decrement button, we don't want the counter to become `-1`.

There are two ways to handle this.

### Method 1: Conditional logic inside `.update()`

typescript

```typescript
decrement() {
  this.count.update(value =>
    value > 0 ? value - 1 : 0
  );
}
```

Explanation:

- If the value is greater than `0`, decrement it.
- Otherwise, keep the value at `0`.

This ensures the counter never becomes negative, even if the method is called programmatically.

### Method 2: Disable the decrement button

In your HTML:

HTMLWrap linesCopy codePreview

```html
<button
  (click)="decrement()"
  [disabled]="count() === 0"
>
  Decrement
</button>
```

Explanation:

typescript

```typescript
[disabled]="count() === 0"
```

When the counter reaches `0`, the decrement button becomes disabled.

Best practice Use both methods together. The TypeScript condition protects your business logic, while the disabled button improves the user experience.

## 6. Basic template binding with Signals

Now let's connect our TypeScript logic to the HTML template.

app.html

HTMLWrap linesCopy codePreview

```html
<div class="counter-container">

  <h2>Angular 21 Counter App</h2>

  <h1>{{ count() }}</h1>

  <button (click)="increment()">
    Increment
  </button>

  <button
    (click)="decrement()"
    [disabled]="count() === 0"
  >
    Decrement
  </button>

  <button (click)="reset()">
    Reset
  </button>

</div>
```

### Important template concepts

| Syntax | Purpose |
| --- | --- |
| `{{ count() }}` | Displays the current Signal value |
| `(click)="increment()"` | Calls increment method |
| `(click)="decrement()"` | Calls decrement method |
| `(click)="reset()"` | Calls reset method |
| `[disabled]="count() === 0"` | Disables decrement at zero |

Remember: Always use parentheses when reading a Signal.

Correct:

HTMLWrap linesCopy codePreview

```html
{{ count() }}
```

Incorrect:

HTMLWrap linesCopy codePreview

```html
{{ count }}
```

## 7. Complete Angular 21 Counter App

Here is the final TypeScript and HTML code together.

Live counter preview

Interactive

Current count

# 0

Increment  Decrement  Reset

Counter is at its minimum value.

This is an interactive preview of the Angular counter logic, not a running Angular application.

app.ts

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  // Writable Signal
  count = signal<number>(0);

  // Increment
  increment() {
    this.count.update(value => value + 1);
  }

  // Decrement (prevent negative values)
  decrement() {
    this.count.update(value =>
      value > 0 ? value - 1 : 0
    );
  }

  // Reset
  reset() {
    this.count.set(0);
  }

}
```

app.html

HTMLWrap linesCopy codePreview

```html
<div class="counter-container">

  <h2>Angular 21 Counter App</h2>

  <h1>{{ count() }}</h1>

  <button (click)="increment()">
    Increment
  </button>

  <button
    (click)="decrement()"
    [disabled]="count() === 0"
  >
    Decrement
  </button>

  <button (click)="reset()">
    Reset
  </button>

</div>
```

You can add your CSS separately in `app.css`.

## 8. Common mistakes developers make

| Mistake | Correct approach |
| --- | --- |
| `count++` | `count.update(v => v + 1)` |
| `count = 10` | `count.set(10)` |
| `{{ count }}` | `{{ count() }}` |
| `count.update(v => v - 1)` without checking | Prevent negative values |
| Forgetting to import `signal` | Import from `@angular/core` |

## 9. Angular interview questions based on this counter app

These are good questions to prepare:

1. Why use Signals instead of normal properties?
2. What is a writable Signal?
3. What is the difference between `.set()` and `.update()`?
4. Why do we use `count()` in the HTML template?
5. How do Signals update the UI?
6. How can you prevent a counter from becoming negative?
7. Can we use `computed()` to determine whether a counter is zero?
8. What happens if we directly modify a Signal value?
9. What is the difference between Signals and RxJS Observables?
10. How do Signals work with Angular's `OnPush` change detection?

### Bonus: Can we use `computed()` for counter validation?

Yes\! For example:

typescript

```typescript
import { signal, computed } from '@angular/core';

count = signal<number>(0);

isZero = computed(() => this.count() === 0);
```

Then in HTML:

HTMLWrap linesCopy codePreview

```html
<button
  (click)="decrement()"
  [disabled]="isZero()"
>
  Decrement
</button>
```

Here, `isZero` automatically recalculates whenever `count` changes.

## 10. Important takeaways

- `signal()` creates writable reactive state.
- `count()` reads the current value.
- `.set()` replaces the value.
- `.update()` calculates a new value from the previous value.
- `computed()` derives values from other Signals.
- Angular tracks Signal dependencies and updates the relevant UI when those values change.

My recommendation: Master this counter application first. It is one of the simplest practical exercises for understanding Angular Signals and is also a common beginner-level interview coding task.
