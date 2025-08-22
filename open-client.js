import open from "open";

// Vite defaults to port 5173 unless changed in client/vite.config.js
const CLIENT_URL = "http://localhost:5173";

setTimeout(() => {
  open(CLIENT_URL);
}, 3000); // wait 3 seconds so Vite starts first
