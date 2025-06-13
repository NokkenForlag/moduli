<script lang="ts">
  import type { PageData } from './$types';
  
  interface Props {
    data: PageData;
  }
  
  let { data }: Props = $props();
</script>

<div class="p-8">
  <h1 class="text-2xl mb-4">Content Test</h1>
  <pre class="bg-gray-800 p-4 rounded text-xs overflow-auto">
{JSON.stringify(data, null, 2)}
  </pre>
</div>
