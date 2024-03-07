import { faker } from "@faker-js/faker";
let n = 0;
async function gen_logs() {
  await new Promise((r) => setTimeout(r, 1000));
  const id = faker.string.uuid();
  const personName = faker.person.fullName();
  const timestamp = Date.now();
  console.log(JSON.stringify({ id, timestamp, personName }));
  n++;
  if (n < 100) {
    gen_logs();
  }
}
gen_logs();
