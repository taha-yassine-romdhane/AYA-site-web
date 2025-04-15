#!/bin/bash

# Check the logs for the frontend container to see why it's restarting
docker logs aya-ecommerce-frontend

# If the container is restarting, we need to fix the Next.js build
# Let's update the docker-compose.yml to make sure it's configured correctly
