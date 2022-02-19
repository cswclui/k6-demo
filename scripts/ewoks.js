import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 200 virtual users (VUs) in 20s
      { duration: "20s", target: 200},

      // Stay at rest on 200 VUs for 20s
      { duration: "20s", target: 200 },

      // Ramp-down to 0 VUs for 10s
      { duration: "10s", target: 0 }
  ]
};

export default function () {
  //const response = http.get("https://swapi.dev/api/people", {headers: {Accepts: "application/json"}});
  //const response = http.get("https://blazedemo.com");
  const response = http.get("http://myapp:5000");
  //const response = http.get("http://myapp:5000/about");
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(.300);
};
