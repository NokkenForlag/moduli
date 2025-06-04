export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Ny funksjonalitet
        "fix", // Bugfix
        "docs", // Kun dokumentasjonsendringer
        "style", // Formatering, manglende semikolon, etc
        "refactor", // Kodeendring som verken fikser bug eller legger til funksjonalitet
        "perf", // Ytelsesforbedringer
        "test", // Legge til manglende tester
        "build", // Endringer i build-system eller dependencies
        "ci", // Endringer i CI-konfigurasjon
        "chore", // Andre endringer som ikke påvirker src eller test
        "revert", // Reverter tidligere commit
        "content", // Nytt/endret innhold (Moduli-spesifikt)
        "graph", // Graf-relaterte endringer (Moduli-spesifikt)
        "ui", // UI/komponent endringer (Moduli-spesifikt)
      ],
    ],
    "scope-enum": [
      2,
      "always",
      [
        // Packages
        "content",
        "graph",
        "ui",
        "types",
        "config",
        "utils",

        // Apps
        "web",

        // Andre
        "deps",
        "workspace",
        "tools",
        "docs",
      ],
    ],
    "scope-empty": [2, "never"], // Scope er påkrevd
    "subject-case": [2, "always", "lower-case"], // Lowercase start
    "subject-empty": [2, "never"], // Subject er påkrevd
    "subject-full-stop": [2, "never", "."], // Ingen punktum på slutten
  },
};
