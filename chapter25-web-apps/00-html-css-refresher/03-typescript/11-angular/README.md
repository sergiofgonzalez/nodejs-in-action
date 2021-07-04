# TypeScript: Chapter 11 &mdash; Angular
> First steps into Angular development with TypeScript

## Contents

+ Setting up an *Angular* application
+ Angular modules and shared modules
+ Angular material
+ DOM events
+ Angular services
+ Dependency injection
+ Reactive forms
+ Unit testing

## Setting up *Angular*

Angular uses a CLI tool known as the *Angular CLI* to facilitate the creation of *Angular* applications and components.

You can create a new application doing:

```bash
npx --package=@angular/cli ng new angular-app
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss
       ]
CREATE angular-app/README.md (1056 bytes)
...
CREATE angular-app/src/app/app.component.ts (216 bytes)
✔ Packages installed successfully.
    Directory is already under version control. Skipping initialization of git.
```

Right after than you can do:

```bash
cd angular-app
npm start
```

and direct your browser to http://localhost:4200.

### Application structure

When running the `ng new <app>` command, the tool has created the complete application structure to build an *Angular* application.

In the project root directory `angular-app/` you will find, a `tsconfig.json` file, a `package.json` and an `angular.json`. The latter is used to specific *Angular* settings, such as the *CSS* system you will use, the build path directory, etc.

Additionally, the *Angular CLI* tool will set up a `src/` directory, and under this directory, an `app/`, and `assets/`, and an `environment` directory.

+ `app/` &mdash; Angular components and modules.
+ `assets/` &mdash; static content, such as images or fonts.

In the `app/` directory itself, you will find an `index.html` with the following content:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

The interesting part is the `<app-root></app-root>`. This tag tells *Angular* which component to render on the main page. If we then open `src/app/app.component.ts` we will see:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-app';
}
```

That file contains the definition of a class `AppComponent`, which is using the class decorator `@Component` to specify three properties for this class. The first property `selector` is the one that matches `<app-root></app-root>` element, which means this is the component that will be rendered in the main page. The property `templateUrl` which points to `app.component.html` is the file that contains all of the HTML that the component uses. Finally, the `styleUrls` property references the file that will be used for any *Sass style CSS* needed for the component.

In summary, these are the most interesting files:

```
angular-app/                      # angular application directory
├── src/                          # sources
│   ├── app/                      # application components directory
|   |   ├── app.component.html    # HTML for the app-root component
|   |   ├── app.component.scss    # Styling for the app-root component
|   |   ├── app.component.ts      # TypeScript class for the app-root component
|   |   ...
│   ├── assets/                   # Static resources directory
│   ├── environments/             # Environment management directory
│   └── index.html                # Angular app main page with <app-root> element
...
├── angular.json                  # Angular specific settings
├── package.json                  # Angular/project NPM dependencies
├── tsconfig.json                 # TypeScript compiler configuration for Angular app
...
```

| EXAMPLE: |
| :------- |
| See [01: Hello, *Angular*!](01-hello-angular-app) for a runnable example. |

### Angular modules

> An *Angular module* is a grouping of Angular components into a logical set.

Modules allows you to specify any dependencies that a set of components may have, which may include other modules, or service providers.

```bash
# cd into the angular app dir
cd angular-app

# run the command to add a header component
node_modules/.bin/ng generate component header
CREATE src/app/header/header.component.scss (0 bytes)
CREATE src/app/header/header.component.html (21 bytes)
CREATE src/app/header/header.component.spec.ts (626 bytes)
CREATE src/app/header/header.component.ts (276 bytes)
UPDATE src/app/app.module.ts (475 bytes)
```

The tool has created four files in the `src/app/header/` new directory, and has updated the file `app.module.ts`:

```typescript
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

This file is importing `BrowserModule` and `NgModule` from *Angular*, then importing `AppRoutingModule` from the local file `app-routing.module`, and finally, it is importing both the `AppComponent` and our newly created `HeaderComponent` classes.

Then, the class `AppModule` is defined, and has a decorator `@NgModule` configured with several properties:

+ `declarations`: an array of all the HTML components that this module uses. Essentially, it will register the `<app-root>` and `<app-header>` elements defined in `app.component.ts` and `header.component.ts` respectively.

+ `imports`: an array with all the modules this module uses.

+ `providers`: an array with all the service providers this module uses.

+ `bootstrap`: identifies the class to create and render into the DOM.


Let's see what happens now when you modify the contents of `src/app/app.component.html` and include:

```html
<app-header></app-header>
```

and then run `npm start` and direct your browser to http://localhost:4200.

![Hello, modules](images/hello-modules.png)


Angular has performed the following sequence of actions:
1. Load and scan the `index.html` to see what component to load
2. Load the `AppComponent` class, associated to the `<app-root>` element.
3. Load the `app.component.html`, which includes the `<app-header>` element.
4. Load the `HeaderComponent` class, associated to the `<app-header>` element.
5. Load and render the `header.component.html`, which contains `<p>header works!</p>`.


| EXAMPLE: |
| :------- |
| See [02: Hello, *Angular Modules*!](02-hello-angular-modules) for a runnable example. |

### Angular  Material

The Angular team at Google maintains a set of user interface components for use within Angular named *Angular Material*. The set includes buttons, header bars, icons, dropdowns...

*Angular Material* can be added to an Angular project doing:

```bash
cd angular-app
node_modules/.bin/ng add @angular/material # or use provided symlink ./ng
ℹ Using package manager: npm
✔ Found compatible package version: @angular/material@12.1.1.
✔ Package information loaded.

The package @angular/material@12.1.1 will be installed and executed.
Would you like to proceed? Yes
✔ Package successfully installed.
? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview: https://material.
angular.io?theme=indigo-pink ]
? Set up global Angular Material typography styles? Yes
? Set up browser animations for Angular Material? Yes
UPDATE package.json (1137 bytes)
✔ Packages installed successfully.
UPDATE src/app/app.module.ts (584 bytes)
UPDATE angular.json (3401 bytes)
UPDATE src/index.html (578 bytes)
UPDATE src/styles.scss (181 bytes)
```

Right after that, you can start using *Angular material* components. Let's modify your header element to make use of those:

```html
<!-- src/app/header/header.component.html -->
<mat-toolbar color="primary">
  <span>Switch sales</span>
  <span class="example-spacer"></span>
</mat-toolbar>
```

Then, you have to add the module supporting the toolbar to your application:

```typescript
// src/app/app.module.ts

import { NgModule } from '@angular/core';
...

// Add Material Toolbar module
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule  // import in our application
  ],
...
export class AppModule { }
```

If you then run: `npm start` you will se how the toolbar was added:

![Hello, Angular Material Toolbar!](images/hello-angular-material.png)

*Angular Material* features an excellent documentation. For example, you can see all the details about the toolbar we have added at https://material.angular.io/components/toolbar/overview. The site will give you information about how to include component in the HTML, and also about the name of the module that needs to be imported (in the API tab).

| EXAMPLE: |
| :------- |
| See [03: Hello, *Angular Material*!](03-hello-angular-material) for a runnable example. |

### A shared module

## An *Angular* application

### *Angular* DOM events

### *Angular EventEmitter*

### *Angular Services*

### *Angular* dependency injection

### Child components

## *Angular* forms

### Reactive forms

### Reactive form templates

### Reading form values

### Angular unit testing

### Unit testing forms

### Reacting to domain events

## You know you've mastered this chapter when...


## Exercises, code examples, and mini-projects

### [01: Hello, *Angular*!](01-hello-angular-app)
Illustrates the result of creating new *Angular* application with *Angular CLI*.

### [02: Hello, *Angular Modules*!](02-hello-angular-modules)
Illustrates how to add a component to an existing Angular application using the *Angular CLI*.

### [03: Hello, *Angular Material*!](03-hello-angular-material)
Illustrates how to add a toolbar component from *Angular Material* to an existing Angular application using the *Angular CLI*.

## ToDo

