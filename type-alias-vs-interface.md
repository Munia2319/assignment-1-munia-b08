# Type vs Interface in TypeScript: Core Differences and When to Use Each

## 1. Introduction

In TypeScript, both `type` aliases and `interface` are used to define custom types and describe the shape of data. They help developers write reusable and type-safe code. Although they are similar in many ways, they have different capabilities and use cases. Understanding these differences helps us choose the right approach when designing applications.

## 2. Detailed Explanation

### 2.1 What Is a Type Alias?

A **type alias** is simply a name given to a type. When we need to use the same type more than once, instead of writing it repeatedly, we can give it a name and reuse it.

A type alias can represent almost any kind of type, including objects, primitives, unions, tuples, and function types.

**Example 1: Naming an object type using a type alias**

```tsx
type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

**Example 2: Naming a union type using a type alias**

```tsx
type ID = number | string;
```

### 2.2 What Is an Interface?

An **interface** is another way to define and name an object type. It describes the properties and methods that an object should have.

Interfaces are mainly used to define object structures and contracts.

**Example:**

```tsx
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

### 2.3 Core Differences Between Type and Interface

Type aliases and interfaces are very similar when defining object structures. However, they have some important differences.

#### 1. Declaration Merging

**Interface:** Multiple interfaces with the same name can be declared, and TypeScript automatically merges their properties. This is called declaration merging.

```tsx
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}
```

**Type:** A type alias cannot be declared multiple times with the same name because TypeScript does not support declaration merging for type aliases.

```tsx
type User = {
  name: string;
};

type User = {
  age: number;
};

// Error: Duplicate identifier 'User'.
```

#### 2. Extension

**Interface:** An interface can extend another interface using the `extends` keyword. It can also extend multiple interfaces at the same time.

```tsx
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear: Bear = {
  name: "Winnie",
  honey: true,
};
```

**Example: Extending multiple interfaces**

```tsx
interface Person {
  name: string;
}

interface Employee {
  salary: number;
}

interface Developer extends Person, Employee {
  skills: string[];
}
```

**Type:** A type alias cannot use the `extends` keyword to extend another type, but it can combine multiple types using the intersection (`&`) operator.

```tsx
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear: Bear = {
  name: "Winnie",
  honey: true,
};
```

#### 3. Types They Can Represent

**Interface:** An interface is designed to describe object structures. It cannot directly represent primitive types, union types, or tuple types.

```tsx
interface User {
  name: string;
  age: number;
}

// Not valid:
// interface ID extends string {}
```

**Type:** A type alias can represent different kinds of types, including objects, primitives, unions, and tuples.

```tsx
// Primitive
type UserName = string;

// Union
type ID = string | number;

// Tuple
type Coordinates = [number, number];
```

### 2.4 When Should You Choose Type Over Interface?

**General Rule:** Use `type` when you need TypeScript features that interfaces cannot directly support.

1. **Union Types (`|`):** Use `type` when a value can have multiple possible types because interfaces cannot directly represent union types.

```tsx
type Status = "success" | "error" | "loading";

type ID = string | number;
```

1. **Intersection Types (`&`):** Use `type` when you want to combine multiple types into one because type aliases support intersection types.

```tsx
type Person = {
  name: string;
};

type Employee = {
  salary: number;
};

type Developer = Person & Employee;
```

1. **Primitive Types:** Use `type` when you want to give a meaningful name to primitive types such as strings, numbers, and booleans because interfaces cannot directly represent primitive types.

```tsx
type UserID = number;

type Username = string;

type IsActive = boolean;
```

1. **Tuple Types:** Use `type` when you need a fixed-length array with specific types at specific positions because type aliases can directly represent tuple types.

```tsx
type Coordinates = [number, number];

type UserInfo = [string, number, boolean];
```

1. **Function Types:** Use `type` when you want to give a name to a function signature because it provides a convenient way to reuse function types.

```tsx
type Add = (a: number, b: number) => number;

const sum: Add = (a, b) => a + b;
```

1. **Advanced Type Combinations:** Use `type` when working with advanced features such as conditional types and mapped types because type aliases support more complex type expressions.

```tsx
type ApiResponse<T> = {
  data: T;
  success: boolean;
};

type Result<T> = ApiResponse<T> | { error: string };
```

### 2.5 When Should You Choose Interface Over Type?

1. **Object Structures:** Use `interface` to define the shape of an object because interfaces are designed to describe object properties and methods.

```tsx
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Alice",
  age: 25,
};
```

2. **Extending Other Interfaces (`extends`):** Use `interface` to inherit properties from another interface because it allows code reuse without rewriting existing properties.

```tsx
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  role: string;
}

const admin: Admin = {
  name: "Bob",
  age: 30,
  role: "Administrator",
};
```

3. **Declaration Merging:** Use `interface` when you want to declare multiple interfaces with the same name because TypeScript automatically merges them into one interface.

```tsx
interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = {
  name: "Alice",
  age: 30,
};
```

4. **Class Contracts (`implements`):** Use `interface` to define contracts for classes because it clearly describes the properties and methods a class must provide. However, object-shaped type aliases can also be implemented by classes.

```tsx
interface User {
  name: string;
  age: number;
}

class Person implements User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

5. **Compiler Performance:** Prefer `interface extends` over type intersections (`&`) when combining object structures because interfaces can be more efficient for the TypeScript compiler, especially in large projects.

### 2.6 Practical Comparison (Real-World Example)

Imagine we are building an e-commerce application where customers can place orders and make payments.

**1. Using Interface for Object Structures**

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

interface Order {
  orderId: number;
  totalPrice: number;
  customer: User;
}
```

**Why interface?** We use interfaces because `User` and `Order` describe object structures with specific properties.

**2. Using Type for Union Types**

```tsx
type PaymentStatus = "pending" | "completed" | "failed";

type PaymentMethod = "card" | "cash" | "paypal";
```

**Why type?** We use type aliases because we want to restrict a value to a specific set of possible options. Interfaces cannot directly define union types.

**3. Extending Interfaces**

```tsx
interface Payment {
  amount: number;
  date: string;
}

interface CardPayment extends Payment {
  cardNumber: string;
}
```

**Why interface?** We use `extends` to reuse existing properties and add new properties without rewriting the original structure.

**4. Combining Types Using Intersections**

```tsx
type UserDetails = {
  name: string;
};

type UserAddress = {
  city: string;
};

type Customer = UserDetails & UserAddress;
```

**Why type?** We use intersections to combine multiple types into one type.

**5. Using Both Together in a Real Application**

In a real-world application, we can use both `interface` and `type` together depending on what we need to represent.

```tsx
interface User {
  id: number;
  name: string;
}

type PaymentStatus = "pending" | "completed" | "failed";

interface Order {
  orderId: number;
  customer: User;
  status: PaymentStatus;
}
```

**Why this approach?** We use `interface` for object structures such as `User` and `Order`, and `type` for `PaymentStatus` because it represents a union of possible values.

## 3. Conclusion

The main difference between `interface` and `type` is that both can define object structures, but `type` supports additional features such as union types, tuples, primitive aliases, and more complex type combinations. On the other hand, `interface` supports declaration merging and provides a convenient way to extend object structures. Neither `interface` nor `type` is universally better than the other. Both are useful, and the choice often depends on personal preference and the project's requirements. So the thumb rule is to start with `interface` when defining object structures. Use `type` when you need features that `interface` does not support, such as union types or tuples. TypeScript will also tell you if a particular feature requires one kind of declaration over the other. In real-world development, both `type` and `interface` are useful. The goal is not to choose one over the other, but to use the right tool for the situation.
