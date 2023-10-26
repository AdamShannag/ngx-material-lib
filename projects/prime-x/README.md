# @adam.shannag/prime-x

@adam.shannag/prime-x is a library of schematics designed to simplify the development of Angular applications with PrimeNG components and streamlined integration with Keycloak for Identity and Access Management (IAM).

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

To get started with @adam.shannag/prime-x, you need to install it in your Angular project:

```
ng add @adam.shannag/prime-x
```

## Usage

### Generating Components

You can generate various components using the schematics along with their shortcuts.

#### Table Component

This schematic generates a table component.

```
ng generate @adam.shannag/prime-x:table-component my-table
```

Shortcut:

```
ng generate @adam.shannag/prime-x:tc my-table
```

#### Loading Component

This schematic generates a loading component.

```
ng generate @adam.shannag/prime-x:loading-component my-loading
```

Shortcut:

```
ng generate @adam.shannag/prime-x:lc my-loading
```

#### Keycloak Initialization

This schematic initializes Keycloak and adds a Keycloak guard for the current application.

```
ng generate @adam.shannag/prime-x:keycloak
```

Shortcut:

```
ng generate @adam.shannag/prime-x:kc
```

#### Layout Module

This schematic generates a Layout module with all its related components.

```
ng generate @adam.shannag/prime-x:layout my-layout
```

Shortcut:

```
ng generate @adam.shannag/prime-x:l my-layout
```

#### CRUD Page Component

This schematic generates a CRUD page component with all its related components.

```
ng generate @adam.shannag/prime-x:crud-page my-crud-page
```

Shortcut:

```
ng generate @adam.shannag/prime-x:cp my-crud-page
```

#### Error Component

This schematic generates an error component.

```
ng generate @adam.shannag/prime-x:error-component my-error
```

Shortcut:

```
ng generate @adam.shannag/prime-x:ec my-error
```

## License

@adam.shannag/prime-x is licensed under the [MIT License](LICENSE.md).

## Source Code

The source code for @adam.shannag/prime-x can be found on [GitHub](https://github.com/AdamShannag/ngx-material-lib/tree/master/projects/prime-x).
