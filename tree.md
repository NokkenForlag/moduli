.
├── apps
│   └── web
│       ├── package.json
│       ├── src
│       │   ├── app.css
│       │   ├── app.html
│       │   ├── lib
│       │   │   ├── components
│       │   │   │   └── RiveBackground.svelte
│       │   │   └── stores
│       │   │       └── navigation.ts
│       │   └── routes
│       │       ├── +layout.svelte
│       │       ├── +page.svelte
│       │       ├── api
│       │       │   ├── graph
│       │       │   │   └── README.md
│       │       │   ├── paths
│       │       │   │   └── README.md
│       │       │   ├── README.md
│       │       │   └── relations
│       │       │       └── README.md
│       │       ├── dev
│       │       │   └── README.md
│       │       ├── konsept
│       │       │   ├── [id]
│       │       │   │   ├── +page.svelte
│       │       │   │   ├── +page.ts
│       │       │   │   └── README.md
│       │       │   └── README.md
│       │       ├── laeringssti
│       │       │   └── README.md
│       │       ├── oppslagsverk
│       │       │   └── +page.svelte
│       │       ├── r1
│       │       │   ├── +page.server.ts
│       │       │   ├── +page.svelte
│       │       │   └── konsept
│       │       │       └── [id]
│       │       │           ├── +page.server.ts
│       │       │           └── +page.svelte
│       │       ├── README.md
│       │       ├── samling
│       │       │   ├── [collection]
│       │       │   │   └── README.md
│       │       │   └── README.md
│       │       ├── test-graf
│       │       │   └── +page.svelte
│       │       ├── ui-demo
│       │       │   └── +page.svelte
│       │       └── utforskning
│       │           ├── +page.svelte
│       │           ├── anbefalt
│       │           │   └── README.md
│       │           ├── graf
│       │           │   └── README.md
│       │           └── sok
│       │               └── README.md
│       ├── static
│       │   ├── assets
│       │   │   └── rive
│       │   │       └── graph
│       │   ├── favicon.png
│       │   └── README.md
│       ├── svelte.config.js
│       ├── tsconfig.json
│       ├── vite.config.js
│       └── vite.config.js.timestamp-1749593653772-059317b228a9c.mjs
├── cleanup-plan.md
├── commitlint.config.js
├── docs
│   ├── api
│   │   └── README.md
│   ├── architecture
│   ├── checkpoints
│   ├── decisions
│   ├── framework
│   │   ├── guides
│   │   │   ├── advanced-guide.md
│   │   │   ├── author-guide.md
│   │   │   ├── content-structure.md
│   │   │   ├── faq.md
│   │   │   ├── quick-start.md
│   │   │   └── reviewer-guide.md
│   │   ├── README.md
│   │   ├── reference
│   │   │   ├── ai-integration.md
│   │   │   ├── graph-integration.md
│   │   │   ├── objektbibliotek.yaml
│   │   │   ├── semantic-search.md
│   │   │   ├── tokens.yaml
│   │   │   └── validation.md
│   │   ├── STRUCTURE.md
│   │   ├── templates
│   │   │   ├── konsept-full.yaml
│   │   │   ├── konsept-minimal.yaml
│   │   │   ├── konsept-standard.yaml
│   │   │   └── oppgavebank.yaml
│   │   └── versions
│   │       └── v4.1
│   │           └── checkpoint.md
│   └── guides
│       └── README.md
├── eslint.config.js
├── lint-staged.config.js
├── moduli-systematic-cleanup.sh
├── package.json
├── package.json.bak
├── packages
│   ├── config
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── features
│   │   │   ├── index.ts
│   │   │   ├── navigation
│   │   │   ├── stores
│   │   │   │   └── view-selector.ts
│   │   │   └── views
│   │   │       ├── student.ts
│   │   │       └── teacher-view.yaml
│   │   └── tsconfig.json
│   ├── content
│   │   ├── add-concept.sh
│   │   ├── create-minimal-r1.sh
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── relations
│   │   ├── scripts
│   │   │   ├── build-graph.ts
│   │   │   ├── generate-paths.ts
│   │   │   ├── migrate-to-graph.ts
│   │   │   ├── README.md
│   │   │   └── validate-relations.ts
│   │   ├── src
│   │   │   ├── assets
│   │   │   │   └── README.md
│   │   │   ├── collections
│   │   │   │   ├── derivasjon-grunnlag.yaml
│   │   │   │   ├── grenser-og-kontinuitet.yaml
│   │   │   │   ├── r1-derivasjon-grunnlag.yaml
│   │   │   │   ├── r1-grenser-kontinuitet.yaml
│   │   │   │   └── r1-matematikk.yaml
│   │   │   ├── concepts
│   │   │   │   ├── funksjoner-kontinuerlig.md
│   │   │   │   ├── r1-derivasjon-definisjon.md
│   │   │   │   ├── r1-differenskvotient.md
│   │   │   │   └── r1-grenseverdi-funksjon.md
│   │   │   ├── index.ts
│   │   │   ├── indices
│   │   │   │   └── README.md
│   │   │   ├── learning-paths
│   │   │   │   └── r1-standard.yaml
│   │   │   ├── loaders
│   │   │   │   ├── index.ts
│   │   │   │   ├── loader.ts
│   │   │   │   └── README.md
│   │   │   ├── relations
│   │   │   │   └── README.md
│   │   │   ├── schemas
│   │   │   │   └── concept.schema.json
│   │   │   └── validator
│   │   │       └── content-validator.ts
│   │   └── tsconfig.json
│   ├── graph
│   │   ├── package.json.bak
│   │   ├── src
│   │   │   ├── algorithms
│   │   │   │   ├── centrality.ts
│   │   │   │   ├── cycle-detection.ts
│   │   │   │   ├── dijkstra.ts
│   │   │   │   ├── README.md
│   │   │   │   └── topological-sort.ts
│   │   │   ├── analysis
│   │   │   │   └── README.md
│   │   │   ├── core
│   │   │   │   ├── __tests__
│   │   │   │   │   ├── pathfinding.test.ts
│   │   │   │   │   └── testData.ts
│   │   │   │   ├── GraphBuilder.ts
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── layout
│   │   │   │   ├── index.ts
│   │   │   │   ├── LayoutCache.ts
│   │   │   │   └── LayoutManager.ts
│   │   │   ├── README.md
│   │   │   ├── render
│   │   │   │   ├── index.ts
│   │   │   │   └── RiveNodePool.ts
│   │   │   └── traversal
│   │   │       └── README.md
│   │   ├── tsconfig.json
│   │   ├── tsconfig.tsbuildinfo
│   │   └── wasm
│   │       └── README.md
│   ├── types
│   │   ├── examples
│   │   │   └── usage.ts
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── src
│   │   │   ├── content.ts
│   │   │   ├── graph.ts
│   │   │   ├── index.ts
│   │   │   ├── README.md
│   │   │   ├── theme.ts
│   │   │   ├── user.ts
│   │   │   └── utils.ts
│   │   ├── tsconfig 2.tsbuildinfo
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   ├── ui
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── components
│   │   │   │   ├── content
│   │   │   │   │   ├── ConceptCard.svelte
│   │   │   │   │   ├── MarkdownContent.svelte
│   │   │   │   │   └── PageHeader.svelte
│   │   │   │   ├── feedback
│   │   │   │   │   ├── Loading.svelte
│   │   │   │   │   └── Toast.svelte
│   │   │   │   ├── form
│   │   │   │   │   ├── Button.svelte
│   │   │   │   │   └── Input.svelte
│   │   │   │   ├── graph
│   │   │   │   │   └── HybridGraph.svelte
│   │   │   │   ├── layout
│   │   │   │   │   └── MainLayout.svelte
│   │   │   │   ├── navigation
│   │   │   │   │   ├── Breadcrumbs.svelte
│   │   │   │   │   ├── SideNav.svelte
│   │   │   │   │   └── TopNav.svelte
│   │   │   │   ├── theme
│   │   │   │   │   ├── provider.ts
│   │   │   │   │   ├── ThemeToggle.svelte
│   │   │   │   │   └── util.ts
│   │   │   │   └── ui
│   │   │   ├── index.ts
│   │   │   ├── stores
│   │   │   │   └── theme.ts
│   │   │   ├── styles
│   │   │   │   ├── base.css
│   │   │   │   ├── index.css
│   │   │   │   └── utilities.css
│   │   │   └── theme
│   │   │       ├── classes.ts
│   │   │       ├── context.ts
│   │   │       ├── index.ts
│   │   │       ├── provider.ts
│   │   │       ├── theme.ts
│   │   │       ├── ThemeProvider.svelte
│   │   │       └── tokens.ts
│   │   ├── svelte.config.js
│   │   ├── tsconfig.json
│   │   └── vite.config.js
│   └── utils
│       ├── package.json
│       ├── src
│       │   ├── format
│       │   │   └── index.ts
│       │   ├── index.ts
│       │   ├── math
│       │   │   └── index.ts
│       │   └── validation
│       │       └── index.ts
│       ├── tsconfig.json
│       └── tsconfig.tsbuildinfo
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tools
│   ├── ai-context
│   │   └── generate.js
│   ├── content-validator
│   │   └── README.md
│   ├── graph-tools
│   │   └── README.md
│   ├── migration
│   │   └── README.md
│   └── README.md
├── tree.md
└── tsconfig.base.json

101 directories, 182 files
