<script lang="ts">
  import { Button } from 'bits-ui';
  import { Check, Copy, Download, Globe } from 'lucide-svelte';
  import { t, type Language } from '$lib/i18n';

  interface Props {
    parsedCount: number;
    sceneName: string;
    language: Language;
    copiedCss: boolean;
    onExportJson: () => void;
    onCopyCss: () => void;
  }

  let { parsedCount, sceneName, language = $bindable(), copiedCss, onExportJson, onCopyCss }: Props = $props();

  let languageToggleLabel = $derived(language === 'en' ? '中文' : 'EN');

  function toggleLanguage() {
    language = language === 'en' ? 'zh' : 'en';
  }
</script>

<footer class="flex h-10 flex-none items-center justify-between border-t border-neutral-800 bg-neutral-950 px-4 text-xs text-neutral-500">
  <div class="flex items-center gap-4 font-mono">
    <span>{parsedCount} {t('status_colors_parsed', language)}</span>
    <span class="h-3 w-px bg-neutral-800"></span>
    <span>{t('scene_title', language)}: {sceneName}</span>
  </div>

  <div class="flex items-center gap-2">
    <Button.Root
      class="flex items-center gap-1.5 rounded-sm px-3 py-1 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200"
      onclick={onExportJson}
    >
      <Download size={12} />
      <span>JSON</span>
    </Button.Root>
    <Button.Root
      class="flex items-center gap-1.5 rounded-sm px-3 py-1 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200"
      onclick={onCopyCss}
    >
      {#if copiedCss}
        <Check size={12} class="text-emerald-500" />
      {:else}
        <Copy size={12} />
      {/if}
      <span class={copiedCss ? 'text-emerald-500' : ''}>{copiedCss ? t('status_copied', language) : 'CSS'}</span>
    </Button.Root>
    <span class="mx-2 h-3 w-px bg-neutral-800"></span>
    <Button.Root
      class="flex items-center gap-1.5 rounded-sm px-3 py-1 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200"
      onclick={toggleLanguage}
    >
      <Globe size={12} />
      <span>{languageToggleLabel}</span>
    </Button.Root>
  </div>
</footer>
