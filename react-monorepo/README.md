# HEALTHY-WEB

## Design

[Design Template](https://www.libib.com/)

## Topic name

Management Library System Web App

## Team size

- 3 developer 
-- Trần Lê Khánh Duyên
-- Nguyễn Thị Mộng Thành
-- Huỳnh Thị Minh Hiền

## Technical

- Nx (v16.5.1)
- React (v18.2)
- React router DOM (v18.2)
- React-hook-form (v7.45.1)
- React-fast-compare (v3.2.2)
- Vite (v4.3.9)
- Vitest (v0.32)
- Zustand (v4.3.9)
- Tanstack Query (v4.29.25)
- Tanstack Table (v8.9.3)
- Chakra UI (v2.7.1)
- Json-server (v0.17.3)
- TypeScript (v5.1.3)

## Features

- Build an admin dashboard page to manage the list of books, members, and hire requests
- Admin can add/edit/remove the books
- Admin can add/edit/complete the hire requests
- Each member can hire up to five books and send up to five book hire requests
- Each book can only be rented for a maximum of 10 days from the date of rental start
- Highlight the hire book requests that are overdue
- Admins can complete hire book requests from the user. When the hire request is marked as completed, the hired book quantity for the user will be +1
- The delete action requires confirmation
- Validate each form controls

## Project structure
```bash
  react-monorepo/
  ├──...
  ├──apps/                    # Contains the application projects
  │  ├───admin                
  │  └───member               
  ├──libs/                    # Contains the library projects
  │  ├───hooks                # Contains the custom hooks
  │  ├───services             # Store all the API services
  │  ├───stores               # All the state stores
  │  ├───themes               # Contains override themes for third-party UI lib
  │  ├───types                # Contains types and interfaces 
  │  ├───ui                   # Collection of related presentational components
  │  └───utils                # Collection of constants and function commonly used
  ├──...
  ├──nx.json                  # Configures the Nx CLI
  ├──package.json
  ├──pnpm-lock.yaml
  ├──tsconfig.base.json       # Sets up the global TypeScript settings and creates aliases
  └──README.md
```
## Install and Run

Open Windows PowerShell or cmd or [Windows Terminal](https://www.microsoft.com/en-gb/p/windows-terminal/9n0dx20hk701?rtc=1&activetab=pivot:overviewtab)

**_Step 1:_** Clone develop branch

```bash
git clone --single-branch --branch develop git@github.com:mthanh2209/healthy-web.git
```

**_Step 2:_** Move to _react-monorepo_ folder

```bash
cd react-monorepo
```

**_Step 3:_** Install project

```bash
pnpm install
```

**_Step 4:_** Run json-server

```bash
pnpm run server
```

**_Step 5:_** Run project in dev mode

```bash
pnpm start
```

**_Note:_**
_All the request make in these pages are fake, the real DB is persist_

_If want to run locally using **.env.example** file create **.env** file then put them in the **root** folder of each applications_
