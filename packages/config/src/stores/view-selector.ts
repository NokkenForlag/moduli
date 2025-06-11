// apps/web/src/lib/view/view-selector.ts
export function selectView(user: User, concept: Concept): ViewConfig {
  const roleView = loadViewConfig(user.role);
  const featureOverrides = getFeatureOverrides(user.subscription);

  return mergeViewConfigs(baseView, roleView, featureOverrides);
}
