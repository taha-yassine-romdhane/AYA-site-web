FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Nginx stage
FROM nginx:alpine

# Copy custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy static files from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Create custom error pages with brand colors
RUN echo '<!DOCTYPE html><html><head><meta charset="utf-8"><title>404 - Page Not Found</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:linear-gradient(to right,#302620,#775F4E,#612A22);color:#B9AB99;text-align:center}div{background:#B9AB99;color:#302620;padding:2rem;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.2);max-width:500px}h1{margin-top:0;color:#612A22}a{color:#775F4E;text-decoration:none;font-weight:bold}a:hover{text-decoration:underline}</style></head><body><div><h1>404 - Page Not Found</h1><p>We\'re sorry, but the page you\'re looking for doesn\'t exist yet. Our website is still in development mode.</p><p><a href="/">Return to Home</a></p></div></body></html>' > /usr/share/nginx/html/404.html

RUN echo '<!DOCTYPE html><html><head><meta charset="utf-8"><title>500 - Server Error</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:linear-gradient(to right,#302620,#775F4E,#612A22);color:#B9AB99;text-align:center}div{background:#B9AB99;color:#302620;padding:2rem;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.2);max-width:500px}h1{margin-top:0;color:#612A22}a{color:#775F4E;text-decoration:none;font-weight:bold}a:hover{text-decoration:underline}</style></head><body><div><h1>500 - Server Error</h1><p>We\'re experiencing some technical difficulties. Please try again later.</p><p><a href="/">Return to Home</a></p></div></body></html>' > /usr/share/nginx/html/50x.html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
