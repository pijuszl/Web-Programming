function tree() {
  let n = 30;
  let k = 2;

  let t = n % 2 === 0 ? 1 : 2;

  for (let i = n / 2; i > 0; i--) {
    console.log(" ".repeat(i) + "*".repeat(t));
    t += 2;
  }

  t = n % 2 === 0 ? (n - 1) / 2 : n / 2;
  let w = n % 2 === 0 ? 3 : 2;
  for (let i = 0; i < k; i++) {
    console.log(" ".repeat(t) + "*".repeat(w) + " ".repeat(i));
  }
}

tree();
