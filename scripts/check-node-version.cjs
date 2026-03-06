const major = Number(process.versions.node.split('.')[0]);

if (major !== 20) {
  console.error(
    `[kappa404-site] Node non supportata: ${process.versions.node}. Usa Node 20.x per build coerenti (locale, CI, Vercel).`,
  );
  process.exit(1);
}

console.log(`[kappa404-site] Node ${process.versions.node} OK (target: 20.x)`);
