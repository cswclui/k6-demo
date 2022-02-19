import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 200 virtual users (VUs) in 20s
      { duration: "10s", target: 200},

      // Stay at rest on 200 VUs for 20s
      { duration: "10s", target: 200 },

      // Ramp-down to 0 VUs for 10s
      { duration: "10s", target: 0 }
  ]
};

export default function () {
  //const response = http.get("https://swapi.dev/api/people", {headers: {Accepts: "application/json"}});
  //const response = http.get("https://blazedemo.com");
  http.get("http://myapp:5000/");
  const response1 = http.get('http://test.k6.io/');
  check(response1, {
    'verify homepage text': (r) =>
      r.body.includes('Collection of simple web-pages suitable for load testing'),
  });

  const response2 = http.get("http://myapp:5000/db");
  check(response2, { "status is 200": (r) => r.status === 200 });
  sleep(.300);
};
