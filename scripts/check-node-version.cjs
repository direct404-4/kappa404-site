const major = Number(process.versions.node.split('.')[0]);

if (major < 22) {
  console.error(
    `[kappa404-site] Node non supportata: ${process.versions.node}. Usa Node 22.x o superiore per build coerenti (locale, CI, Cloudflare Workers).`,
  );
  process.exit(1);
}

console.log(`[kappa404-site] Node ${process.versions.node} OK (target minimo: 22.x)`);
