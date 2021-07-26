const fs = window.require('fs');

async function parse(path) {
  return await fs.readFile(path, 'utf-8', (err, data) => {
    if (err) return;
    content = data;
  });
  return content;
};

export { parse };