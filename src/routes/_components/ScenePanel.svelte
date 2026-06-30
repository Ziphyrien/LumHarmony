<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import { Circle, Sun, Zap } from 'lucide-svelte';
  import { SCENES } from '$lib/color';
  import { t, type Language } from '$lib/i18n';
  import type { SceneType } from '$lib/types';

  interface Props {
    selected: SceneType;
    language: Language;
  }

  const scenes = Object.values(SCENES);
  const sceneIcons = {
    light: Sun,
    normal: Circle,
    contrast: Zap,
  };

  let { selected = $bindable(), language }: Props = $props();
</script>

<aside class="bg-neutral-950">
  <div class="border-b border-neutral-800 px-4 py-3">
    <h2 class="text-xs font-medium uppercase tracking-wider text-neutral-400">{t('scene_title', language)}</h2>
  </div>
  <ToggleGroup.Root bind:value={selected} type="single" class="grid gap-2 p-4">
    {#each scenes as scene (scene.id)}
      {@const SceneIcon = sceneIcons[scene.id]}
      <ToggleGroup.Item
        value={scene.id}
        class="rounded-sm border border-neutral-800 p-3 text-left transition-all hover:border-neutral-700 hover:bg-neutral-900/50 data-[state=on]:border-neutral-700 data-[state=on]:bg-neutral-900 data-[state=on]:ring-1 data-[state=on]:ring-neutral-700"
      >
        <div class="flex items-start gap-3">
          <span class={`mt-0.5 ${selected === scene.id ? 'text-white' : 'text-neutral-500'}`}>
            <SceneIcon size={16} />
          </span>
          <span>
            <span class="block text-sm font-medium text-neutral-300">{t(scene.nameKey, language)}</span>
            <span class="mt-1 block text-xs leading-relaxed text-neutral-500">{t(scene.descKey, language)}</span>
          </span>
        </div>
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
</aside>
