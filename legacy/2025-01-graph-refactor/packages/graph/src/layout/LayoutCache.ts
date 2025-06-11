export class LayoutCache {
  private cache: Map<string, { x: number; y: number }> = new Map();

  get(nodeId: string): { x: number; y: number } | undefined {
    return this.cache.get(nodeId);
  }

  set(nodeId: string, position: { x: number; y: number }): void {
    this.cache.set(nodeId, position);
  }

  has(nodeId: string): boolean {
    return this.cache.has(nodeId);
  }

  clear(): void {
    this.cache.clear();
  }

  getCacheKey(nodeIds: string[]): string {
    return nodeIds.sort().join('-');
  }
}
