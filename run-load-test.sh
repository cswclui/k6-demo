docker-compose up -d myapp influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Load testing with Grafana dashboard"
echo "--------------------------------------------------------------------------------------"
docker-compose run --rm k6 run /scripts/test1.js
