<script lang="ts">
  import { calcAPCA } from 'apca-w3';
  import { Button } from 'bits-ui';
  import { ArrowRight, Check, Copy } from 'lucide-svelte';
  import { formatColor, getApcaRating } from '$lib/color';
  import { t, type Language } from '$lib/i18n';
  import type { ColorData, ColorFormat, SceneConfig } from '$lib/types';

  interface Props {
    source: ColorData;
    adjusted: ColorData;
    scene: SceneConfig;
    format: ColorFormat;
    language: Language;
    isPrimary: boolean;
    onPrimaryChange: (id: string) => void;
    onCopyText: (text: string) => void;
  }

  let {
    source,
    adjusted,
    scene,
    format,
    language,
    isPrimary,
    onPrimaryChange,
    onCopyText,
  }: Props = $props();
  let copied = $state<'source' | 'adjusted' | null>(null);

  function copy(kind: 'source' | 'adjusted', text: string) {
    onCopyText(text);
    copied = kind;
    setTimeout(() => (copied = null), 1500);
  }

  let sourceText = $derived(formatColor(source, format));
  let adjustedText = $derived(formatColor(adjusted, format));
  let referenceHex = $derived(scene.apcaTarget?.reference === 'black' ? '#000000' : '#ffffff');
  let score = $derived(calcAPCA(adjusted.hex, referenceHex) as number);
  let statusClass = $derived.by(() => {
    const target = scene.apcaTarget;
    const mag = Math.abs(score);

    if (!target) return 'text-emerald-500';
    if (mag < target.min) return 'text-red-500';
    if (mag < target.optimal) return 'text-yellow-500';
    return 'text-emerald-500';
  });
</script>

<div
  class={`grid grid-cols-[30px_minmax(180px,1fr)_40px_minmax(220px,1.2fr)_120px_130px] items-center gap-4 border-b border-neutral-800 px-4 py-2 text-sm transition-colors hover:bg-neutral-900/50 ${isPrimary ? 'bg-neutral-900/30' : ''}`}
>
  <Button.Root
    class="flex h-8 items-center justify-center"
    aria-label={t('set_primary', language)}
    onclick={() => onPrimaryChange(source.id)}
  >
    <span
      class={`h-1.5 w-1.5 rounded-full ${isPrimary ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-neutral-700'}`}
    ></span>
  </Button.Root>

  <Button.Root class="flex items-center gap-3 text-left" onclick={() => copy('source', sourceText)}>
    <span class="h-8 w-8 rounded-sm border border-white/10 shadow-sm" style:background-color={source.hex}></span>
    <span class="font-mono text-neutral-400">{sourceText}</span>
    {#if copied === 'source'}
      <Check size={12} class="text-emerald-500" />
    {/if}
  </Button.Root>

  <div class="flex justify-center text-neutral-600">
    <ArrowRight size={14} />
  </div>

  <Button.Root class="flex items-center gap-3 text-left" onclick={() => copy('adjusted', adjustedText)}>
    <span class="group/preview relative h-8 w-8 rounded-sm border border-white/10 shadow-sm" style:background-color={adjusted.hex}>
      <span class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover/preview:opacity-100">
        <Copy size={12} class="text-white" />
      </span>
    </span>
    <span class="font-mono font-medium text-neutral-200">{adjustedText}</span>
    {#if format === 'oklch'}
      <span class="rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
        {adjusted.hex}
      </span>
    {/if}
    {#if copied === 'adjusted'}
      <Check size={12} class="text-emerald-500" />
    {/if}
  </Button.Root>

  <div class="font-mono text-neutral-300">
    Lc {score.toFixed(1)}
    {#if scene.apcaTarget}
      <div class="mt-0.5 text-[10px] text-neutral-500">
        {t('label_target', language)}: {scene.apcaTarget.min}-{scene.apcaTarget.max}
      </div>
    {/if}
  </div>

  <div class={`flex items-center gap-2 text-xs font-medium ${statusClass}`}>
    <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
    {getApcaRating(score)}
  </div>
</div>
