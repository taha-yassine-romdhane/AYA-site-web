# Deployment Guide for Aya E-commerce

This guide will help you deploy the Aya E-commerce application on your VPS using Docker. The application is split into two parts:

1. **Frontend**: A Next.js application that handles the user interface
2. **Backend API**: An Express.js server that handles data operations

## Prerequisites

- A VPS with Docker and Docker Compose installed
- Git installed on your VPS
- Basic knowledge of Docker, Docker Compose, and Linux commands

## Environment Variables

Create a `.env` file in the root directory of your project with the following variables:

```
# Database Configuration
DATABASE_URL=postgresql://postgres:your_secure_password@db:5432/aya_ecommerce?schema=public
POSTGRES_PASSWORD=your_secure_password

# pgAdmin Configuration (Optional)
PGADMIN_EMAIL=your_email@example.com
PGADMIN_PASSWORD=your_secure_password

# Next.js Configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_random_secret_key

# Other Configuration
NODE_ENV=production
```

Make sure to replace the placeholder values with your actual secure values.

## Deployment Steps

1. Clone your repository to your VPS:

```bash
git clone https://your-repository-url.git
cd aya-ecommerce
```

2. Create the `.env` file with your environment variables as described above.

3. Build and start the Docker containers:

```bash
docker-compose up -d
```

4. Run database migrations:

```bash
docker-compose exec app npx prisma migrate deploy
```

5. Seed the database (if needed):

```bash
docker-compose exec app npx prisma db seed
```

6. Your application should now be running at `http://your-vps-ip:3000`

## Using a Reverse Proxy (Recommended)

For production use, it's recommended to set up a reverse proxy like Nginx to handle SSL termination and route traffic to your application.

### Example Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name your-domain.com www.your-domain.com;
    
    ssl_certificate /path/to/your/fullchain.pem;
    ssl_certificate_key /path/to/your/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Maintenance

### Viewing Logs

```bash
docker-compose logs -f app
```

### Updating the Application

```bash
git pull
docker-compose down
docker-compose up -d --build
```

### Backing Up the Database

```bash
docker-compose exec db pg_dump -U postgres aya_ecommerce > backup.sql
```

## Troubleshooting

- If the application doesn't start, check the logs:
  ```bash
  docker-compose logs app
  ```

- If the database connection fails, ensure your DATABASE_URL is correct and the database container is running:
  ```bash
  docker-compose ps
  ```

- To check if the database is properly initialized:
  ```bash
  docker-compose exec db psql -U postgres -d aya_ecommerce -c "\dt"
  ```

## Accessing pgAdmin

If you've included pgAdmin in your deployment, you can access it at `http://your-vps-ip:5050` and log in with the email and password you set in your `.env` file.

To connect to your database in pgAdmin:
1. Add a new server
2. Name: Aya E-commerce
3. Connection tab:
   - Host: db
   - Port: 5432
   - Username: postgres
   - Password: (your POSTGRES_PASSWORD from .env)
