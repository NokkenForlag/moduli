.
├── +page.server.ts
├── apps
│   └── web-foundation
│       ├── package.json
│       ├── postcss.config.js
│       ├── src
│       │   ├── app.css
│       │   ├── app.html
│       │   ├── lib
│       │   │   ├── components
│       │   │   │   ├── ConceptCard.svelte
│       │   │   │   ├── GradientBackground.svelte
│       │   │   │   ├── GraphVisualization.svelte
│       │   │   │   └── SidebarNav.svelte
│       │   │   └── server
│       │   └── routes
│       │       ├── +layout.server.ts
│       │       ├── +layout.svelte
│       │       ├── +page.svelte
│       │       ├── api
│       │       │   └── debug
│       │       │       └── +server.ts
│       │       ├── demo
│       │       │   └── +page.svelte
│       │       ├── samling
│       │       │   └── [id]
│       │       │       └── +page.svelte
│       │       └── utforskning
│       │           └── graf
│       │               ├── +page.server.ts
│       │               └── +page.svelte
│       ├── static
│       ├── svelte.config.js
│       ├── tailwind.config.js
│       ├── tsconfig.json
│       └── vite.config.js
├── disable
│   └── _
│       ├── applypatch-msg
│       ├── commit-msg
│       ├── h
│       ├── husky.sh
│       ├── post-applypatch
│       ├── post-checkout
│       ├── post-commit
│       ├── post-merge
│       ├── post-rewrite
│       ├── pre-applypatch
│       ├── pre-auto-gc
│       ├── pre-commit
│       ├── pre-merge-commit
│       ├── pre-push
│       ├── pre-rebase
│       └── prepare-commit-msg
├── docs
│   ├── api
│   │   └── README.md
│   ├── checkpoints
│   │   └── project-status-2025-01.md
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
├── legacy
│   └── 2025-01-graph-refactor
│       ├── apps
│       │   └── web
│       │       ├── package.json
│       │       ├── src
│       │       │   ├── app.css
│       │       │   ├── app.html
│       │       │   ├── lib
│       │       │   │   ├── components
│       │       │   │   │   ├── RiveBackground 2.svelte
│       │       │   │   │   └── RiveBackground.svelte
│       │       │   │   └── stores
│       │       │   │       └── navigation.ts
│       │       │   └── routes
│       │       │       ├── +layout.svelte
│       │       │       ├── +page.svelte
│       │       │       ├── api
│       │       │       │   ├── graph
│       │       │       │   │   └── README.md
│       │       │       │   ├── paths
│       │       │       │   │   └── README.md
│       │       │       │   ├── README.md
│       │       │       │   └── relations
│       │       │       │       └── README.md
│       │       │       ├── dev
│       │       │       │   └── README.md
│       │       │       ├── konsept
│       │       │       │   ├── [id]
│       │       │       │   │   ├── +page.svelte
│       │       │       │   │   ├── +page.ts
│       │       │       │   │   └── README.md
│       │       │       │   └── README.md
│       │       │       ├── laeringssti
│       │       │       │   └── README.md
│       │       │       ├── oppslagsverk
│       │       │       │   └── +page.svelte
│       │       │       ├── r1
│       │       │       │   ├── +page.server.ts
│       │       │       │   ├── +page.svelte
│       │       │       │   └── konsept
│       │       │       │       └── [id]
│       │       │       │           ├── +page.server.ts
│       │       │       │           └── +page.svelte
│       │       │       ├── README.md
│       │       │       ├── samling
│       │       │       │   ├── [collection]
│       │       │       │   │   └── README.md
│       │       │       │   └── README.md
│       │       │       ├── test-graf
│       │       │       │   └── +page.svelte
│       │       │       ├── ui-demo
│       │       │       │   └── +page.svelte
│       │       │       └── utforskning
│       │       │           ├── +page.svelte
│       │       │           ├── anbefalt
│       │       │           │   └── README.md
│       │       │           ├── graf
│       │       │           │   └── README.md
│       │       │           └── sok
│       │       │               └── README.md
│       │       ├── static
│       │       │   ├── assets
│       │       │   │   └── rive
│       │       │   │       └── graph
│       │       │   ├── favicon.png
│       │       │   └── README.md
│       │       ├── svelte.config.js
│       │       ├── tree.md
│       │       ├── tsconfig.json
│       │       ├── vite.config.js
│       │       └── vite.config.js.timestamp-1749593653772-059317b228a9c.mjs
│       ├── commitlint.config.js.disabled
│       ├── eslint.config.js.disabled
│       ├── lint-staged.config.js.disabled
│       ├── packages
│       │   ├── config
│       │   │   ├── package 2.json
│       │   │   ├── package.json
│       │   │   ├── src
│       │   │   │   ├── features
│       │   │   │   ├── index 2.ts
│       │   │   │   ├── index.ts
│       │   │   │   ├── navigation
│       │   │   │   ├── stores
│       │   │   │   │   └── view-selector.ts
│       │   │   │   └── views
│       │   │   │       ├── student.ts
│       │   │   │       └── teacher-view.yaml
│       │   │   ├── tsconfig 2.json
│       │   │   └── tsconfig.json
│       │   ├── content
│       │   │   ├── add-concept.sh
│       │   │   ├── create-minimal-r1.sh
│       │   │   ├── package.json
│       │   │   ├── README.md
│       │   │   ├── relations
│       │   │   ├── scripts
│       │   │   │   ├── build-graph.ts
│       │   │   │   ├── generate-paths.ts
│       │   │   │   ├── migrate-to-graph.ts
│       │   │   │   ├── README.md
│       │   │   │   └── validate-relations.ts
│       │   │   ├── src
│       │   │   │   ├── assets
│       │   │   │   │   └── README.md
│       │   │   │   ├── collections
│       │   │   │   │   ├── derivasjon-grunnlag.yaml
│       │   │   │   │   ├── grenser-og-kontinuitet.yaml
│       │   │   │   │   ├── r1-derivasjon-grunnlag.yaml
│       │   │   │   │   ├── r1-grenser-kontinuitet.yaml
│       │   │   │   │   └── r1-matematikk.yaml
│       │   │   │   ├── concepts
│       │   │   │   │   ├── funksjoner-kontinuerlig.md
│       │   │   │   │   ├── r1-derivasjon-definisjon.md
│       │   │   │   │   ├── r1-differenskvotient.md
│       │   │   │   │   └── r1-grenseverdi-funksjon.md
│       │   │   │   ├── index 2.ts
│       │   │   │   ├── index.ts
│       │   │   │   ├── indices
│       │   │   │   │   └── README.md
│       │   │   │   ├── learning-paths
│       │   │   │   │   └── r1-standard.yaml
│       │   │   │   ├── loaders
│       │   │   │   │   ├── index 2.ts
│       │   │   │   │   ├── index.ts
│       │   │   │   │   ├── loader.ts
│       │   │   │   │   └── README.md
│       │   │   │   ├── relations
│       │   │   │   │   └── README.md
│       │   │   │   ├── schemas
│       │   │   │   │   └── concept.schema.json
│       │   │   │   └── validator
│       │   │   │       └── content-validator.ts
│       │   │   ├── tsconfig 2.json
│       │   │   └── tsconfig.json
│       │   ├── graph
│       │   │   ├── package.json.bak
│       │   │   ├── src
│       │   │   │   ├── algorithms
│       │   │   │   │   ├── centrality.ts
│       │   │   │   │   ├── cycle-detection.ts
│       │   │   │   │   ├── dijkstra.ts
│       │   │   │   │   ├── README.md
│       │   │   │   │   └── topological-sort.ts
│       │   │   │   ├── analysis
│       │   │   │   │   └── README.md
│       │   │   │   ├── core
│       │   │   │   │   ├── __tests__
│       │   │   │   │   │   ├── pathfinding.test.ts
│       │   │   │   │   │   └── testData.ts
│       │   │   │   │   ├── GraphBuilder.ts
│       │   │   │   │   └── index.ts
│       │   │   │   ├── index.ts
│       │   │   │   ├── layout
│       │   │   │   │   ├── index.ts
│       │   │   │   │   ├── LayoutCache.ts
│       │   │   │   │   └── LayoutManager.ts
│       │   │   │   ├── README.md
│       │   │   │   ├── render
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── RiveNodePool.ts
│       │   │   │   └── traversal
│       │   │   │       └── README.md
│       │   │   ├── tsconfig 2.tsbuildinfo
│       │   │   ├── tsconfig.json
│       │   │   ├── tsconfig.tsbuildinfo
│       │   │   └── wasm
│       │   │       └── README.md
│       │   ├── types
│       │   │   ├── examples
│       │   │   │   └── usage.ts
│       │   │   ├── package.json
│       │   │   ├── README.md
│       │   │   ├── src
│       │   │   │   ├── content.ts
│       │   │   │   ├── graph.ts
│       │   │   │   ├── index.ts
│       │   │   │   ├── README.md
│       │   │   │   ├── theme 2.ts
│       │   │   │   ├── theme.ts
│       │   │   │   ├── ui 2.ts
│       │   │   │   ├── ui.ts
│       │   │   │   ├── user.ts
│       │   │   │   └── utils.ts
│       │   │   ├── tsconfig 2.tsbuildinfo
│       │   │   ├── tsconfig 3.tsbuildinfo
│       │   │   ├── tsconfig.json
│       │   │   └── tsconfig.tsbuildinfo
│       │   ├── ui
│       │   │   ├── package.json
│       │   │   ├── src
│       │   │   │   ├── components
│       │   │   │   │   ├── content
│       │   │   │   │   │   ├── ConceptCard.svelte
│       │   │   │   │   │   ├── MarkdownContent.svelte
│       │   │   │   │   │   └── PageHeader.svelte
│       │   │   │   │   ├── feedback
│       │   │   │   │   │   ├── Loading.svelte
│       │   │   │   │   │   └── Toast.svelte
│       │   │   │   │   ├── form
│       │   │   │   │   │   ├── Button.svelte
│       │   │   │   │   │   └── Input.svelte
│       │   │   │   │   ├── graph
│       │   │   │   │   │   └── HybridGraph.svelte
│       │   │   │   │   ├── layout
│       │   │   │   │   │   └── MainLayout.svelte
│       │   │   │   │   ├── navigation
│       │   │   │   │   │   ├── Breadcrumbs.svelte
│       │   │   │   │   │   ├── SideNav.svelte
│       │   │   │   │   │   └── TopNav.svelte
│       │   │   │   │   └── theme
│       │   │   │   │       ├── ThemeToggle.svelte
│       │   │   │   │       └── util.ts
│       │   │   │   ├── components 2
│       │   │   │   ├── index.ts
│       │   │   │   ├── lib
│       │   │   │   │   ├── animations.ts
│       │   │   │   │   ├── cn.ts
│       │   │   │   │   └── responsive.ts
│       │   │   │   ├── lib 2
│       │   │   │   ├── stores
│       │   │   │   │   └── theme.ts
│       │   │   │   ├── styles
│       │   │   │   │   ├── base.css
│       │   │   │   │   ├── glass.css
│       │   │   │   │   └── index.css
│       │   │   │   ├── theme
│       │   │   │   │   ├── context.ts
│       │   │   │   │   ├── index.ts
│       │   │   │   │   ├── styles.ts
│       │   │   │   │   ├── ThemeProvider.svelte
│       │   │   │   │   ├── themes.ts
│       │   │   │   │   └── tokens.ts
│       │   │   │   └── theme 2
│       │   │   ├── svelte.config 2.js
│       │   │   ├── svelte.config.js
│       │   │   ├── tsconfig.json
│       │   │   ├── vite.config 2.js
│       │   │   └── vite.config.js
│       │   └── utils
│       │       ├── package.json
│       │       ├── src
│       │       │   ├── format
│       │       │   │   └── index.ts
│       │       │   ├── index.ts
│       │       │   ├── math
│       │       │   │   └── index.ts
│       │       │   └── validation
│       │       │       └── index.ts
│       │       ├── src 2
│       │       ├── tsconfig 2.json
│       │       ├── tsconfig 2.tsbuildinfo
│       │       ├── tsconfig.json
│       │       └── tsconfig.tsbuildinfo
│       ├── pnpm-workspace.yaml
│       ├── tailwind.config.js
│       └── tsconfig.base.json
├── package.json
├── package.json.bak
├── packages
│   ├── content
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   ├── konsepter
│   │   │   │   ├── c1-kalkulus.md
│   │   │   │   ├── r1-areal-volum.md
│   │   │   │   ├── r1-derivasjon.md
│   │   │   │   ├── r1-funksjoner.md
│   │   │   │   ├── r1-grenseverdi.md
│   │   │   │   ├── r1-implisitt-derivasjon.md
│   │   │   │   ├── r1-integrasjon.md
│   │   │   │   ├── r1-kjerneregelen.md
│   │   │   │   ├── r1-kontinuitet.md
│   │   │   │   ├── r1-optimering.md
│   │   │   │   ├── t1-grenseverdi-oppgaver.md
│   │   │   │   └── t1-optimeringsproblemer.md
│   │   │   ├── loaders
│   │   │   │   └── markdown.ts
│   │   │   ├── paths.ts
│   │   │   └── types.ts
│   │   └── tsconfig.json
│   └── core
│       ├── package.json
│       ├── src
│       │   ├── graph.ts
│       │   ├── index.ts
│       │   ├── server.ts
│       │   └── theme.ts
│       └── tsconfig.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── test-concepts.js
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
└── tsconfig.json

129 directories, 265 files
