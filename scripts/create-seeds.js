const fs = require('fs');
const path = require('path');
const readline = require('readline');

const passAccount = (fileName, network) => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface(fs.createReadStream(fileName));
    let lastLine = '';
    const account = { network };
    rl.on('line', (line) => {
      if (line.length > 0) {
        const match = line.match(/(\w+)\s*:\s*([\w\d]+)/);
        if (match) {
          account[match[1]] = match[2];
        } else {
          lastLine = line;
        }
      }
    });

    rl.on('error', reject);

    rl.on('close', () => {
      account.mnemonic = lastLine;
      resolve(account);
    });
  });
};

(async () => {
  const network = process.argv[2];
  const acc = await passAccount(
    path.resolve(__dirname, `${network}.txt`),
    network
  );
  fs.writeFileSync(
    path.resolve(__dirname, `${network}.json`),
    JSON.stringify(acc, null, 2)
  );
})();
