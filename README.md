# NukerDuit!

### Technologies
Frontend
- React Vite Typescipt : Library Framework
- Zustand : State Management
- Tailwind CSS : CSS framework for styling
- React Query : Management Query API

Backend
- Laravel 10 : Framework PHP

## First time setup

### Installation

Clone the repo

```bash
git clone https://github.com/reiulen/nukerduit-kitabisa.git
```

#### Frontend

Change directory

```bash
cd nukerduit-app
```

Create env file

```bash
cp .env.example .env
```

Install and setup

```bash
make app_install 
```

#### Backend

Change directory

```bash
cd nukerduit-service
```

Create env file

```bash
cp .env.example .env
```

Install and setup

```bash
make service_install 
```

### Run the applications with docker

Build applications
```bash
make build 
```

Start applications
```bash
make start 
```

Stop applications
```bash
make stop 
```

Restart applications
```bash
make stop 
```


### Example User
```bash
username: admin
password: 123456
```
