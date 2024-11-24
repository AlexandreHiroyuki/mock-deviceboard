# MockDevboard

**"Watch your devices with intelligence"**

Connect with devices and plot data, possibly creating mock devices and data. This project was created as part of the bem-te-vi challenge.

## Installation

### Docker Postgres

> https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/

```sh
docker compose up -d
```


### Frontend

```sh
cd frontend
yarn
yarn dev
```

### Backend
  
```sh
cd backend
yarn
yarn dev
```

Configure `.env` file in the backend folder following the `.env.example` file.

Tip: generate JWT_SECRET using:

```sh
openssl rand -base64 172 | tr -d '\ n'
```

Migration:

```sh
yarn drizzle-kit push
```

## Integrate your device using our API

