const a = {
  debug: "a",
};

const b = {
  debug: "b",
};

a.value = b;
b.value = a;

console.log(JSON.stringify(a));
