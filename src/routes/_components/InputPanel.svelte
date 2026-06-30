<script lang="ts">
  import { t, type Language } from '$lib/i18n';

  interface Props {
    value: string;
    language: Language;
  }

  let { value = $bindable(), language }: Props = $props();
</script>

<div class="flex min-h-72 flex-col border-b border-neutral-800 lg:border-b-0 lg:border-r">
  <div class="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-3">
    <h1 class="text-xs font-medium uppercase tracking-wider text-neutral-400">{t('input_title', language)}</h1>
    <span class="text-xs text-neutral-600">{t('input_desc', language)}</span>
  </div>
  <textarea
    bind:value
    placeholder={t('input_placeholder', language)}
    class="min-h-52 flex-1 resize-none bg-neutral-950 p-4 font-mono text-sm text-neutral-300 outline-none transition-colors placeholder:text-neutral-700 focus:bg-neutral-900/30"
    spellcheck="false"
  ></textarea>
</div>
