cd ../front && npm run build
cd ../backend
docker build . --tag ndc-spring:latest
docker compose up -d
