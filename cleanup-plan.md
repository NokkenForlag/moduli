# Moduli Cleanup Plan

## 1. Types Package (@moduli/types)
- [ ] Define all core types
- [ ] Export everything properly from index.ts
- [ ] Remove circular dependencies

## 2. UI Package (@moduli/ui)
- [ ] Complete component inventory
- [ ] Fix all exports in index.ts
- [ ] Implement centralized theming

## 3. Content Package (@moduli/content)
- [ ] Create proper loaders for Markdown/YAML
- [ ] Define content interfaces
- [ ] Export loading functions

## 4. Apps/Web
- [ ] Fix all imports to use @moduli/* packages
- [ ] Remove all hardcoded content
- [ ] Use only exported components from packages

## Next Steps:
1. Run fix-types-complete.sh
2. Run fix-ui-exports.sh
3. Run fix-content-loaders.sh
4. Run fix-web-imports.sh
