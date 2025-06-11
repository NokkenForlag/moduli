<!-- apps/web/src/lib/components/graph/HybridGraph.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { GraphBuilder } from "@moduli/graph/core";
  import { LayoutManager } from "@moduli/graph/layout";
  import { RiveNodePool } from "@moduli/graph/render";
  import { goto } from "$app/navigation";
  import type { ConceptNode } from "@moduli/types";

  export let concepts: ConceptNode[];
  export let centerNodeId: string | null = null;
  export let layoutType: "force" | "circular" | "hierarchical" = "force";
  export let width: number = 800;
  export let height: number = 600;

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let graphBuilder: GraphBuilder;
  let layoutManager: LayoutManager;
  let nodePool: RiveNodePool;

  let graph: any;
  let positions: Map<string, { x: number; y: number }>;
  let nodeElements: Map<string, HTMLDivElement> = new Map();

  onMount(async () => {
    // Initialize
    ctx = canvas.getContext("2d")!;
    graphBuilder = new GraphBuilder();
    nodePool = new RiveNodePool();

    // Build graph
    graph = await graphBuilder.buildFromConcepts(concepts);
    layoutManager = new LayoutManager(graph);

    // Calculate layout
    positions = await layoutManager.calculateLayout(layoutType, {
      width,
      height,
      padding: 50,
    });

    // Render
    await renderGraph();

    // Setup interactions
    setupInteractions();
  });

  onDestroy(() => {
    // Cleanup
    nodeElements.forEach((element, nodeId) => {
      nodePool.releaseNode(nodeId);
    });
  });

  async function renderGraph() {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw edges first
    drawEdges();

    // Create node elements
    for (const [nodeId, position] of positions) {
      await createNodeElement(nodeId, position);
    }
  }

  function drawEdges() {
    graph.forEachEdge(
      (edge: string, attrs: any, source: string, target: string) => {
        const sourcePos = positions.get(source);
        const targetPos = positions.get(target);

        if (sourcePos && targetPos) {
          ctx.beginPath();
          ctx.moveTo(sourcePos.x, sourcePos.y);

          // Simple bezier curve
          const cp1x = sourcePos.x + (targetPos.x - sourcePos.x) * 0.25;
          const cp1y = sourcePos.y;
          const cp2x = sourcePos.x + (targetPos.x - sourcePos.x) * 0.75;
          const cp2y = targetPos.y;

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, targetPos.x, targetPos.y);

          // Style based on edge type
          if (attrs.type === "prerequisite") {
            ctx.strokeStyle = "#e74c3c";
            ctx.setLineDash([5, 5]);
          } else if (attrs.type === "enables") {
            ctx.strokeStyle = "#27ae60";
            ctx.setLineDash([]);
          } else {
            ctx.strokeStyle = "#95a5a6";
            ctx.setLineDash([2, 2]);
          }

          ctx.lineWidth = 2;
          ctx.stroke();

          // Arrow head
          drawArrowHead(sourcePos, targetPos);
        }
      },
    );
  }

  function drawArrowHead(from: any, to: any) {
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const headLength = 10;

    ctx.save();
    ctx.translate(to.x, to.y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(-headLength, -headLength / 2);
    ctx.lineTo(0, 0);
    ctx.lineTo(-headLength, headLength / 2);
    ctx.stroke();

    ctx.restore();
  }

  async function createNodeElement(
    nodeId: string,
    position: { x: number; y: number },
  ) {
    const nodeData = graph.getNodeAttributes(nodeId);
    const riveNode = await nodePool.getNode(nodeId);

    // Create wrapper div
    const element = document.createElement("div");
    element.className = "graph-node";
    element.style.position = "absolute";
    element.style.left = `${position.x - 75}px`;
    element.style.top = `${position.y - 75}px`;
    element.style.width = "150px";
    element.style.height = "150px";
    element.style.cursor = "pointer";

    // Add Rive canvas
    element.appendChild(riveNode.canvas);

    // Add title
    const title = document.createElement("div");
    title.className = "node-title";
    title.textContent = nodeData.title;
    element.appendChild(title);

    // Add to DOM
    container.appendChild(element);
    nodeElements.set(nodeId, element);

    // Set initial state
    nodePool.updateNodeData(nodeId, nodeData, $themeStore);
  }

  function setupInteractions() {
    nodeElements.forEach((element, nodeId) => {
      element.addEventListener("mouseenter", () => {
        nodePool.updateInteractionState(nodeId, { isHovered: true });
      });

      element.addEventListener("mouseleave", () => {
        nodePool.updateNodeState(nodeId, { isHovered: false });
      });

      element.addEventListener("click", () => {
        handleNodeClick(nodeId);
      });
    });
  }

  function handleNodeClick(nodeId: string) {
    goto(`/konsept/${nodeId}`);
  }
</script>

<div class="graph-container" bind:this={container}>
  <canvas bind:this={canvas} {width} {height} class="edge-canvas" />
  <!-- Node elements are added dynamically -->
</div>

<style>
  .graph-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--color-surface-subtle);
    border-radius: var(--radius-lg);
  }

  .edge-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  :global(.graph-node) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  :global(.node-title) {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: var(--color-text-primary);
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
