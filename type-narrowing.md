# Type Narrowing

In TypeScript, type narrowing means reducing the type of a variable from a broader type to a more specific type. It is most commonly done by conditional statements or using type guards. It helps the TypeScript compiler understand the type more precisely and make the codebase efficiently type-safe to prevent unwanted errors.

## 1. Why Do We Need Type Narrowing?

Imagine we have a function called `processInput`.

```tsx
function processInput(value: string | number): string | number {
  return (value.trim()).toLowerCase();
}
```

Now, if you try to run the code, it will give an error:

⚠️ **Error (TS2339)**

Property `trim` does not exist on type `number`.

This is because the input of this function, which is `value`, can be either a string or a number. And the number type doesn't have any property named `toLowerCase()`, as it is only applicable to string values.

That is why we need to narrow down the type from string and number to one specific type to run the code without errors.

Now, if you narrow the type like this:

```tsx
function processInput(value: string | number): string | number {
  if (typeof value === "string") {
    return (value.trim()).toLowerCase();
  } else {
    return value * 10;
  }
}
```

Voilà! No errors.

## 2. Ways to Perform Type Narrowing in TypeScript

Here are some ways narrowing can occur in TypeScript:

### 2.1. Using Type Guards

#### A. `typeof` Type Guard

`typeof` can provide very basic information about the type of values at runtime. It can return a certain set of strings:

- `"string"`
- `"number"`
- `"bigint"`
- `"boolean"`
- `"symbol"`
- `"undefined"`
- `"object"`
- `"function"`

We have already seen an example of `typeof` above. Another example using `typeof`:

```tsx
function processValue(value: string | number): void {
  if (typeof value === "string") {
    return value.length;
  } else {
    return value.toFixed(2);
  }
}

processValue("Hello");
// 5

processValue(25);
// 25.00
```

#### B. `instanceof` Type Guard

In TypeScript, we can use `instanceof` to know if an instance belongs to a particular type.

More specifically, in TypeScript, `x instanceof Foo` checks whether the *prototype chain* of `x` contains `Foo.prototype`.

Let's understand with an example:

```tsx
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());

    //(parameter) x: Date
  } else {
    console.log(x.toUpperCase());

    //(parameter) x: string
  }
}
```

In the above function, we can see that `x` can be a `Date` or a string type.

Inside the `if` condition statement, `instanceof` is being used to check if `x` is an instance of the `Date` object. Thus, it is narrowing the type from `Date` and string type to `Date` or string type.

#### C. The `in` Operator

In TypeScript, the `in` operator determines if an object or its prototype chain has a property with a specific name.

For example:

```tsx
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}
```

Here, using the `in` operator, we are checking if the `swim` property exists in the type `Fish`.

**Another example: How the `in` operator behaves with optional properties**

```tsx
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;

    //(parameter) animal: Fish | Human
  } else {
    animal;

    //(parameter) animal: Bird | Human
  }
}
```

Optional properties will exist on both sides for narrowing.

In the above example, a human could both swim and fly (with the right equipment) and thus should show up on both sides of the `in` check.

## 3. Other Type Narrowing Techniques

Besides these three mechanisms, we also have some others to narrow down the type.

### 3.1. Equality Narrowing

TypeScript narrows a variable's type by comparing two values using equality operators like `===` or `!==`.

```tsx
const compare = (x: number | string, y: number | boolean) => {
  if (x === y) {
    console.log("it is a number");
  }
};
```

Here, we are checking if the types of `x` and `y` are the same through equality narrowing.

### 3.2. Truthiness Narrowing

TypeScript narrows a variable's type by checking whether it is truthy or falsy using conditions like `if (user)`.

```tsx
type User = {
  name: string;
  address?: {
    street: string;
  };
} | null;

const loggedInUser: User = {
  name: "Mir",
  address: {
    street: "ABC",
  },
};

const showAddress = (user: User) => {
  if (user && user.address) {
    console.log(user.address.street);

    return;
  }

  throw new Error("User not found");
};
```

### 3.3. Discriminated Unions

TypeScript uses a common property with different literal values to identify and narrow down which object type is being used.

```tsx
//* Discriminated union

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

const getArea = (shape: Circle | Square) => {
  if (shape.kind === "circle") {
    console.log(shape.radius);
  } else {
    console.log(shape.sideLength);
  }
};
```

## 4. Conclusion

Narrowing is an important feature that allows us to infer the correct type from a broader type, which enables the compiler to understand the specific types of variables in different branches of your code. We can achieve type narrowing using different techniques, such as typeof, instanceof, the in operator, equality checks, truthiness checks, and discriminated unions.. It helps catch potential runtime errors during development and improves the overall reliability of your TypeScript code.