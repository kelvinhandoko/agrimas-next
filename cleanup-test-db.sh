#!/bin/bash

# Script to clean up Docker containers for test database
echo "Cleaning up test database containers..."
docker-compose down -v

echo "Cleanup complete!"