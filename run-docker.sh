#! /bin/sh

echo "Building Docker image..."
docker build --no-cache -t frontend-test .

if [ $? -ne 0 ]; then
    echo "Docker build failed. Exiting."
    exit 1
fi
echo "Starting container on port 3000..."
docker run -p 3000:3000 frontend-test
