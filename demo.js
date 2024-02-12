const timestamp = 1707587034388;
const expirationDate = new Date(timestamp);

const currentTimestamp = Date.now();

if (currentTimestamp >expirationDate ) {
  console.log("The token has expired.");
} else {
  console.log("The token is still valid.");
}

console.log(expirationDate);