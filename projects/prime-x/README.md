# ngprime-x

ngprime-x is a library of schematics designed to simplify the development of Angular applications with PrimeNG components and streamlined integration with Keycloak for Identity and Access Management (IAM).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Schematics](#schematics)
  - [Table Component](#table-component)
  - [Loading Component](#loading-component)
  - [Keycloak Initialization](#keycloak-initialization)
  - [Layout Module](#layout-module)
  - [CRUD Page Component](#crud-page-component)
  - [Error Component](#error-component)
- [Contributing](#contributing)
- [License](#license)
- [Source Code](#source-code)

## Installation

To get started with ngprime-x, you need to install it in your Angular project:

```
ng add ngprime-x
```

## Usage

### Generating Components

You can generate various components using the schematics along with their shortcuts.

#### Table Component

This schematic generates a table component.

```
ng generate ngprime-x:table-component my-table
```

Shortcut:

```
ng generate ngprime-x:tc my-table
```

#### Loading Component

This schematic generates a loading component.

```
ng generate ngprime-x:loading-component my-loading
```

Shortcut:

```
ng generate ngprime-x:lc my-loading
```

#### Keycloak Initialization

This schematic initializes Keycloak and adds a Keycloak guard for the current application.

```
ng generate ngprime-x:keycloak
```

Shortcut:

```
ng generate ngprime-x:kc
```

#### Layout Module

This schematic generates a Layout module with all its related components.

```
ng generate ngprime-x:layout my-layout
```

Shortcut:

```
ng generate ngprime-x:l my-layout
```

#### CRUD Page Component

This schematic generates a CRUD page component with all its related components.

```
ng generate ngprime-x:crud-page my-crud-page
```

Shortcut:

```
ng generate ngprime-x:cp my-crud-page
```

#### Error Component

This schematic generates an error component.

```
ng generate ngprime-x:error-component my-error
```

Shortcut:

```
ng generate ngprime-x:ec my-error
```

## License

ngprime-x is licensed under the [MIT License](LICENSE.md).

## Source Code

The source code for ngprime-x can be found on [GitHub](https://github.com/AdamShannag/ngx-material-lib/tree/master/projects/prime-x).
