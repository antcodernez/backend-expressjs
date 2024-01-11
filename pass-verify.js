const bcrypt = require("bcrypt");

async function hashPassword() {
  const myPassword = "SoyElMasVergas2001";
  const hash = "$2b$10$H46a4Fm6idzEhSUSb3bB1OuyVPWUp2K6dYQctT.6.s6eRDIMPzbaS";

  const isMatch = await bcrypt.compare(myPassword, hash);

  console.log(isMatch);
}

hashPassword();

