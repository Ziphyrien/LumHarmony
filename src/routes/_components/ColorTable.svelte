<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import { t, type Language } from '$lib/i18n';
  import type { ColorData, ColorFormat, SceneConfig } from '$lib/types';
  import ColorRow from './ColorRow.svelte';

  interface Props {
    sourceColors: ColorData[];
    adjustedColors: ColorData[];
    scene: SceneConfig;
    format: ColorFormat;
    language: Language;
    primaryColorId: string | null;
    onPrimaryChange: (id: string) => void;
    onCopyText: (text: string) => void;
  }

  let {
    sourceColors,
    adjustedColors,
    scene,
    format = $bindable(),
    language,
    primaryColorId,
    onPrimaryChange,
    onCopyText,
  }: Props = $props();
</script>

<main class="flex min-h-0 flex-1 flex-col overflow-hidden">
  {#if sourceColors.length === 0}
    <div class="flex flex-1 items-center justify-center text-neutral-600">
      <div class="text-center">
        <p class="text-sm">{t('warn_no_colors', language)}</p>
        <p class="mt-1 text-xs text-neutral-700">{t('warn_paste_hint', language)}</p>
      </div>
    </div>
  {:else}
    <div
      class="grid grid-cols-[30px_minmax(180px,1fr)_40px_minmax(220px,1.2fr)_120px_130px] items-center gap-4 border-b border-neutral-800 bg-neutral-950 px-4 py-2 text-xs font-medium uppercase tracking-wider text-neutral-500"
    >
      <div></div>
      <div>{t('col_source', language)}</div>
      <div></div>
      <div class="flex items-center gap-2">
        <span>{t('col_adjusted', language)}</span>
        <ToggleGroup.Root bind:value={format} type="single" class="flex rounded border border-neutral-800 bg-neutral-900 p-0.5 font-mono">
          <ToggleGroup.Item
            value="oklch"
            class="rounded-sm px-1.5 py-0.5 text-[10px] text-neutral-600 data-[state=on]:bg-neutral-700 data-[state=on]:text-white"
          >
            OKLCH
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="hex"
            class="rounded-sm px-1.5 py-0.5 text-[10px] text-neutral-600 data-[state=on]:bg-neutral-700 data-[state=on]:text-white"
          >
            HEX
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      <div>{t('col_apca', language)}</div>
      <div>{t('col_rating', language)}</div>
    </div>

    <div class="min-h-0 flex-1 overflow-auto">
      {#each sourceColors as source, index (source.id)}
        {@const adjusted = adjustedColors[index]}
        {#if adjusted}
          <ColorRow
            {source}
            {adjusted}
            {scene}
            {format}
            {language}
            isPrimary={source.id === primaryColorId}
            {onPrimaryChange}
            {onCopyText}
          />
        {/if}
      {/each}
    </div>
  {/if}
</main>
