# HEALTHY-WEB 

## SUBJECT: Phân tích thiết kế hướng đối tượng

## Team size

- 3 developer - 20CNTT3
  - Trần Lê Khánh Duyên
  - Nguyễn Thị Mộng Thành
  - Huỳnh Thị Minh Hiền

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

- Build an admin dashboard page to manage the list of doctors, members, and book requests
- Admin can add/edit/remove the doctors
- Admin can add/edit/complete the book requests
- Each member can book up to five doctors and send up to five doctor book requests
- Each doctor can only be rented for a maximum of 10 days from the date of rental start
- Highlight the book doctor requests that are overdue
- Admins can complete book doctor requests from the user. When the book request is marked as completed, the booked doctor quantity for the user will be +1
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

## Install and Run Application

Open Windows PowerShell or cmd or [Windows Terminal](https://www.microsoft.com/en-gb/p/windows-terminal/9n0dx20hk701?rtc=1&activetab=pivot:overviewtab)

**Step 1:** Clone develop branch

```bash
git clone --single-branch --branch develop git@github.com:mthanh2209/healthy-web.git
```

**Step 2:** Move to react-monorepo folder

```bash
cd react-monorepo
```

**Step 3:** Install pnpm

```bash
npm install -g pnpm
```

**Step 4:** Install project

```bash
pnpm install
```

**Step 5:** Run project in dev mode

```bash
pnpm start
```

## Run Server

**Step 1:** Create a new terminal, then move to react-monorepo folder

```bash
cd react-monorepo
```

**Step 2:** Run json-server

```bash
pnpm run server
```
