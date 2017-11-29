module.exports = {
  misssParam: (identifier, field) => {
    // throw new Error(`${identifier} Missing parameter!`);
    console.error(`${identifier} Missing parameter ${field}!`);
  }
};
