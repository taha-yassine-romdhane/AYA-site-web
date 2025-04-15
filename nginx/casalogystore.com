server {
    listen 80;
    server_name casalogystore.com www.casalogystore.com;
    
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name casalogystore.com www.casalogystore.com;
    
    # SSL Configuration (already set up by Certbot)
    ssl_certificate /etc/letsencrypt/live/casalogystore.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/casalogystore.com/privkey.pem;
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    
    # Frontend proxy
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # API proxy
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Custom error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    
    # Branded colors used in the site:
    # Wood Bark: #302620
    # Cloudy: #B9AB99
    # Pine Cone: #775F4E
    # Heathered Grey: #948C7A
    # Caput Mortuum: #612A22
}
