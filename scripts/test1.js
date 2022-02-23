import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 50 virtual users (VUs) in 10s
      { duration: "10s", target: 50},

      // Stay at rest on 50 VUs for 15s
      { duration: "15s", target: 50 },

      // Ramp-down to 0 VUs for 5s
      { duration: "10s", target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<100'] //90 percentile should be below 100ms
  },
};

export default function () {
  const response1 = http.get('http://myapp:5000/',  {tags: {name: '/'}});
  check(response1, {
    'verify homepage text': (r) => r.body.includes('Python is fun'),
    "status is 200": (r) => r.status === 200 
  });  
  sleep(0.2)
};
