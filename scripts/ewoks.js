import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 100 virtual users (VUs) in 10s
      { duration: "1s", target: 100},

      // Stay at rest on 100 VUs for 10s
      { duration: "1s", target: 100 },

      // Ramp-down to 0 VUs for 10s
      { duration: "1s", target: 0 }
  ]
};

export default function () {
  const response1 = http.get('http://myapp:5000/',
  {tags: {name: 'testHP'}});
  check(response1, {
    'verify homepage text': (r) =>
      r.body.includes('Python is fun'),
  });

  //const response2 = http.get("http://myapp:5000/db");
  //check(response2, { "status is 200": (r) => r.status === 200 });
  sleep(.300);
};
