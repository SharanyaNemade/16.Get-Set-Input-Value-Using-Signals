# Angular21Tutorial


# Angular 21: Working with Signals in Input Fields

Angular Signals provide a reactive way to manage input values without relying on traditional two-way binding with `[(ngModel)]`.

In Angular 21, you can use the `signal()` function to:

- Store an input field's value.
- Get the current input value.
- Update the input value programmatically.
- Reset the input field using a button.
- Maintain proper TypeScript types.
- React to changes in the input value.

Let's understand each concept with practical examples.

## 1. How to create a signal for an input field

First, import `signal` from `@angular/core`.

app.ts

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class AppComponent {

  name = signal<string>('');

}
```

Here:

- `signal()` creates a reactive value.
- `string` specifies the TypeScript type.
- `''` is the initial value.

app.html

HTMLWrap linesCopy codePreview

```html
<input
  type="text"
  [value]="name()"
  (input)="name.set($any($event.target).value)"
/>

<p>Name: {{ name() }}</p>
```

How it works:

- `[value]="name()"` displays the signal's current value.
- `(input)` listens for changes in the input field.
- `name.set()` updates the signal.
- `{{ name() }}` displays the latest value.

Important To read a signal, call it using parentheses: `name()`.

## 2. How to get input value using signals

You can access the current signal value by calling the signal as a function.

typescript

```typescript
name = signal<string>('');

getName() {
  console.log(this.name());
}
```

For example, if the user enters `John`, then:

typescript

```typescript
console.log(this.name());
```

Output:

text

```text
John
```

You can also use the signal value inside other methods.

typescript

```typescript
submit() {
  const inputValue = this.name();

  console.log('Input Value:', inputValue);
}
```

## 3. How to set input value using signals

Use the `.set()` method to update the signal value.

typescript

```typescript
name = signal<string>('');

updateName() {
  this.name.set('Angular Developer');
}
```

When you call `this.name.set()`, Angular updates the signal and refreshes the dependent template.

For example:

HTMLWrap linesCopy codePreview

```html
<input
  type="text"
  [value]="name()"
  (input)="name.set($any($event.target).value)"
/>

<button (click)="updateName()">
  Set Name
</button>

<p>{{ name() }}</p>
```

When you click Set Name, the input field displays `Angular Developer`.

You can also use `.update()` when the new value depends on the previous value.

typescript

```typescript
count = signal<number>(0);

increment() {
  this.count.update(value => value + 1);
}
```

## 4. How to reset input value with a button

To reset an input field, simply set the signal back to its initial value.

app.ts

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class AppComponent {

  name = signal<string>('');

  resetName() {
    this.name.set('');
  }

}
```

app.html

HTMLWrap linesCopy codePreview

```html
<h2>Angular Signals Example</h2>

<input
  type="text"
  [value]="name()"
  (input)="name.set($any($event.target).value)"
  placeholder="Enter your name"
/>

<button (click)="resetName()">
  Reset
</button>

<p>Entered Name: {{ name() }}</p>
```

Expected behavior:

1. User enters `John`.
2. The signal stores `John`.
3. The paragraph displays `John`.
4. User clicks Reset.
5. The signal becomes an empty string.
6. The input field and paragraph both become empty.

Key concept You don't need to manually clear the HTML input. Updating the signal automatically updates the input because it is bound using `[value]="name()"`.

## 5. Common mistakes developers make while using signals

Here are some mistakes to avoid when working with Angular Signals.

### Mistake 1: Forgetting parentheses when reading a signal

Incorrect:

typescript

```typescript
console.log(this.name);
```

Correct:

typescript

```typescript
console.log(this.name());
```

Why?

A signal is a getter function. Calling it returns its current value.

### Mistake 2: Assigning a value directly to a signal

Incorrect:

typescript

```typescript
this.name = 'John';
```

Correct:

typescript

```typescript
this.name.set('John');
```

Why?

You must use `.set()` to replace a signal's value.

### Mistake 3: Using `.set()` incorrectly

Incorrect:

typescript

```typescript
this.name('John');
```

Correct:

typescript

```typescript
this.name.set('John');
```

Why?

Calling a signal without arguments reads its value. Use `.set()` to change it.

### Mistake 4: Forgetting to update the signal when the input changes

Incorrect:

HTMLWrap linesCopy codePreview

```html
<input type="text" [value]="name()" />
```

Correct:

HTMLWrap linesCopy codePreview

```html
<input
  type="text"
  [value]="name()"
  (input)="name.set($any($event.target).value)"
/>
```

Why?

The `[value]` binding displays the signal value, but it does not automatically update the signal when the user types.

### Mistake 5: Using `.set()` instead of `.update()` for dependent changes

For example, incrementing a counter.

Incorrect or unnecessarily verbose:

typescript

```typescript
this.count.set(this.count() + 1);
```

Better:

typescript

```typescript
this.count.update(value => value + 1);
```

Why?

`.update()` receives the previous value and calculates the next value.

### Mistake 6: Modifying objects inside signals directly

Incorrect:

typescript

```typescript
user = signal({ name: 'John', age: 25 });

this.user().name = 'David';
```

Correct:

typescript

```typescript
this.user.update(user => ({
  ...user,
  name: 'David'
}));
```

Why?

Signals track updates when their values are set or updated. Mutating an object directly does not notify signal consumers.

## 6. Proper typing of signals in Angular

Angular Signals support TypeScript generics.

The syntax is:

typescript

```typescript
signal<Type>(initialValue);
```

Here are common examples.

### String signal

typescript

```typescript
name = signal<string>('');
```

Used for input fields containing text.

### Number signal

typescript

```typescript
age = signal<number>(25);
```

Used for numbers, counters and calculations.

### Boolean signal

typescript

```typescript
isLoggedIn = signal<boolean>(false);
```

Used for true/false values.

### Array signal

typescript

```typescript
users = signal<string[]>([]);
```

Used for storing arrays of strings.

Updating an array:

typescript

```typescript
this.users.update(users => [
  ...users,
  'John'
]);
```

### Object signal

typescript

```typescript
user = signal<{
  name: string;
  age: number;
}>({
  name: 'John',
  age: 25
});
```

Updating an object:

typescript

```typescript
this.user.set({
  name: 'David',
  age: 30
});
```

### Signal with null values

Sometimes an input or variable may initially have no value.

typescript

```typescript
selectedUser = signal<string | null>(null);
```

Later:

typescript

```typescript
this.selectedUser.set('John');
```

The `| null` means the signal can contain either a string or `null`.

### Recommended typing practices

| Requirement | Recommended type |
| --- | --- |
| Text input | `signal<string>('')` |
| Number input | `signal<number>(0)` |
| Checkbox | `signal<boolean>(false)` |
| Array | `signal<string[]>([])` |
| Object | `signal<User>(initialUser)` |
| Optional value | `signal<string \\| null>(null)` |

You can also let TypeScript infer the type:

typescript

```typescript
name = signal('');
age = signal(25);
isActive = signal(false);
```

TypeScript automatically infers `string`, `number`, and `boolean`, respectively.

Best practice: Use explicit generic types when working with complex objects, union types, or when you want to make your code easier to understand.

## 7. Complete Angular 21 example

Here is a complete example combining everything we've discussed.

app.ts

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class AppComponent {

  // Create signal
  name = signal<string>('');

  // Get input value
  getName() {
    console.log(this.name());
  }

  // Set input value
  setName() {
    this.name.set('Angular Developer');
  }

  // Reset input value
  resetName() {
    this.name.set('');
  }

}
```

app.html

HTMLWrap linesCopy codePreview

```html
<h2>Angular 21 Signals</h2>

<input
  type="text"
  [value]="name()"
  (input)="name.set($any($event.target).value)"
  placeholder="Enter your name"
/>

<br /><br />

<button (click)="getName()">
  Get Value
</button>

<button (click)="setName()">
  Set Value
</button>

<button (click)="resetName()">
  Reset Value
</button>

<h3>Input Value: {{ name() }}</h3>
```

## 8. Best practices for Angular 21 developers

A few additional recommendations:

1. Avoid `$any()` where possible. Use a properly typed event handler instead.
   typescript
   ```typescript
   onNameInput(event: Event) {
     const target = event.target;
   
     if (target instanceof HTMLInputElement) {
       this.name.set(target.value);
     }
   }
   ```
   Template:
   HTMLWrap linesCopy codePreview
   ```html
   <input
     [value]="name()"
     (input)="onNameInput($event)"
   />
   ```
2. Use `computed()` for derived values.
   typescript
   ```typescript
   import { signal, computed } from '@angular/core';
   
   firstName = signal('John');
   lastName = signal('David');
   
   fullName = computed(() =>
     this.firstName() + ' ' + this.lastName()
   );
   ```
3. Don't confuse `signal()` and `input()`.
   - `signal()` creates a writable signal that your component owns.
   - `input()` creates a signal-based component input that receives a value from its parent. It is read-only inside the receiving component.
   Example:
   typescript
   ```typescript
   import { Component, input } from '@angular/core';
   
   @Component({
     selector: 'app-user',
     template: `<p>{{ name() }}</p>`
   })
   export class UserComponent {
     name = input<string>('');
   }
   ```
4. Use `.set()` to replace values and `.update()` to calculate new values.
5. Avoid directly mutating objects and arrays stored in signals. Prefer immutable updates.

## 9. Quick revision: Angular Signals methods

| Method | Purpose | Example |
| --- | --- | --- |
| `signal()` | Create signal | `name = signal('')` |
| `()` | Read value | `name()` |
| `.set()` | Replace value | `name.set('John')` |
| `.update()` | Update using previous value | `count.update(v => v + 1)` |
| `computed()` | Derive reactive value | `fullName = computed(...)` |
| `input()` | Create component input signal | `name = input('')` |

## 10. Official Angular documentation

For further learning:

- [Angular Signals Guide](<https://angular.dev/guide/signals?utm_source=chatgpt.com>)
- [signal() API Reference](<https://angular.dev/api/core/signal?utm_source=chatgpt.com>)
- [computed() API Reference](<https://angular.dev/api/core/computed?utm_source=chatgpt.com>)
- [input() API Reference](<https://angular.dev/api/core/input?utm_source=chatgpt.com>)

My recommendation: First become comfortable with `signal()`, `.set()`, `.update()`, and reading signals using `()`. Then move on to `computed()`, `effect()`, and signal-based component inputs. These are important concepts for becoming proficient with modern Angular development.



In Angular interviews, especially for Angular 17–21, interviewers can ask questions about Signals in different ways: basic concepts, practical coding, output-based questions, debugging, and real-world scenarios.

Here are commonly asked interview questions based on the input-field Signals topic.

# Angular Signals Interview Questions (Angular 21)

## 1. Basic interview questions

1. What are Signals in Angular?
2. Why were Signals introduced in Angular?
3. How do you create a Signal?
4. What is the difference between `signal()` and a normal variable?
5. How do you get the value of a Signal?
6. How do you update a Signal?
7. What is the difference between `.set()` and `.update()`?
8. Can a Signal store strings, numbers, arrays, and objects?
9. What is a writable Signal?
10. What is the difference between `signal()` and `computed()`?

## 2. Practical coding interview questions

These are particularly important because interviewers often ask you to write code.

Question 1: Create a Signal for an input field.

Expected answer:

typescript

```typescript
name = signal<string>('');
```

Question 2: How do you get the input value using Signals?

typescript

```typescript
console.log(this.name());
```

Question 3: How do you set an input value programmatically?

typescript

```typescript
this.name.set('Angular Developer');
```

Question 4: How do you reset an input field using a button?

typescript

```typescript
resetName() {
  this.name.set('');
}
```

Question 5: How do you bind an input field with a Signal?

HTMLWrap linesCopy codePreview

```html
<input
  [value]="name()"
  (input)="name.set($any($event.target).value)"
/>
```

Question 6: How do you increment a counter using Signals?

typescript

```typescript
count = signal<number>(0);

increment() {
  this.count.update(value => value + 1);
}
```

Question 7: How do you store an object in a Signal?

typescript

```typescript
user = signal<User>({
  name: 'John',
  age: 25
});

interface User {
  name: string;
  age: number;
}
```

## 3. Output-based interview questions

Interviewers may give you code and ask what the output will be.

Question 1: What will be the output?

typescript

```typescript
name = signal<string>('Angular');

console.log(this.name());
```

Answertext

```text
Angular
```

Question 2: What will be the output?

typescript

```typescript
count = signal<number>(10);

this.count.set(20);

console.log(this.count());
```

Answertext

```text
20
```

Question 3: What will be the output?

typescript

```typescript
count = signal<number>(5);

this.count.update(value => value + 5);

console.log(this.count());
```

Answertext

```text
10
```

Question 4: What is wrong with this code?

typescript

```typescript
name = signal<string>('');

this.name = 'John';
```

AnswerYou cannot assign a string directly to a Signal.

Correct:

typescript

```typescript
this.name.set('John');
```

## 4. Scenario-based interview questions

These questions test whether you can use Signals in real applications.

| Interview question | Concept tested |
| --- | --- |
| How do you clear an input field after submitting a form? | `set()` |
| How do you update a counter without reading its value separately? | `update()` |
| How do you calculate the total price reactively? | `computed()` |
| How do you share data between parent and child components? | `input()` and `output()` |
| How do you prevent direct modification of a Signal? | `asReadonly()` |
| How do you react to changes in a Signal? | `effect()` |
| How do you update an object stored in a Signal? | Immutable updates |
| How do you handle an initially empty Signal? | Union types |

## 5. Tricky Angular Signals interview questions

These are useful for experienced Angular developers.

Q1. What is the difference between `signal()` and `computed()`?

- `signal()` creates a writable reactive value.
- `computed()` creates a read-only derived reactive value.

Q2. Can we modify a Signal directly?

No. Use `.set()` or `.update()`.

Q3. Does changing a Signal update the UI automatically?

Yes. Angular tracks Signal dependencies and updates the relevant template when the value changes.

Q4. What is `asReadonly()`?

It exposes a read-only view of a writable Signal.

typescript

```typescript
count = signal(10);

readonlyCount = this.count.asReadonly();
```

Q5. What is the difference between `input()` and `signal()`?

- `signal()` creates a writable Signal.
- `input()` creates a read-only Signal-based input for receiving data from a parent component.

Q6. What happens if you directly mutate an object inside a Signal?

typescript

```typescript
user = signal({ name: 'John' });

this.user().name = 'David';
```

This does not notify Signal consumers of the mutation. Prefer:

typescript

```typescript
this.user.update(user => ({
  ...user,
  name: 'David'
}));
```


## 6. What I recommend preparing for Angular 21 interviews

Study these topics in this order:

1. Signals: `signal()`, `.set()`, `.update()`.
2. `computed()` and `effect()`.
3. `input()` and `output()`.
4. Signal-based form handling.
5. Parent-child communication using Signals.
6. RxJS Observables vs Signals.
7. Change detection and `OnPush`.
8. Linked Signals (`linkedSignal()`).
9. Resource APIs and async reactive data.
10. Real-world coding problems using Signals.

Interview tip: Don't just memorize definitions. Practice writing small components, explaining why you used `.set()` instead of `.update()`, and describing how Angular reacts when a Signal changes. That is what makes your answers stronger in technical interviews.
