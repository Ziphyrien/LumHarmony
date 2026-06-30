<script lang="ts">
  import { browser } from '$app/environment';
  import { adjustColorsToScene, createColorData, extractColors, SCENES } from '$lib/color';
  import ColorTable from './_components/ColorTable.svelte';
  import InputPanel from './_components/InputPanel.svelte';
  import ScenePanel from './_components/ScenePanel.svelte';
  import StatusBar from './_components/StatusBar.svelte';
  import { downloadJson, toCssVars, toExportRows } from './downloads';
  import { t, type Language } from '$lib/i18n';
  import type { ColorFormat, SceneType } from '$lib/types';

  const LANGUAGE_COOKIE = 'lumharmony_language';
  const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

  function isLanguage(value: string | undefined): value is Language {
    return value === 'en' || value === 'zh';
  }

  function readLanguageCookie(): Language {
    if (!browser) return 'zh';

    const value = document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${LANGUAGE_COOKIE}=`))
      ?.slice(LANGUAGE_COOKIE.length + 1);

    return isLanguage(value) ? value : 'zh';
  }

  let inputString = $state('');
  let selectedScene = $state<SceneType>('light');
  let format = $state<ColorFormat>('oklch');
  let language = $state<Language>(readLanguageCookie());
  let manualPrimaryId = $state<string | null>(null);
  let copiedCss = $state(false);

  let sourceColors = $derived(
    extractColors(inputString).map((hex, index) => createColorData(hex, `color-${index}`)),
  );
  let primaryColorId = $derived.by(() => {
    if (manualPrimaryId && sourceColors.some((color) => color.id === manualPrimaryId)) {
      return manualPrimaryId;
    }

    return sourceColors[0]?.id ?? null;
  });
  let adjustedColors = $derived(adjustColorsToScene(sourceColors, selectedScene, primaryColorId));
  let selectedSceneConfig = $derived(SCENES[selectedScene]);

  $effect(() => {
    if (!browser) return;

    document.cookie = `${LANGUAGE_COOKIE}=${language}; Path=/; Max-Age=${LANGUAGE_COOKIE_MAX_AGE}; SameSite=Lax`;
    document.documentElement.lang = language;
  });

  function setPrimaryColor(id: string) {
    manualPrimaryId = id;
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
  }

  async function copyCss() {
    await copyText(toCssVars(adjustedColors, format));
    copiedCss = true;
    setTimeout(() => (copiedCss = false), 1500);
  }

  function exportJson() {
    downloadJson('lumharmony-colors.json', toExportRows(adjustedColors, sourceColors));
  }
</script>

<svelte:head>
  <title>LumHarmony</title>
</svelte:head>

<div class="flex h-screen w-full flex-col divide-y divide-neutral-800 overflow-hidden">
  <section class="grid flex-none grid-cols-1 border-b border-neutral-800 lg:grid-cols-[1fr_380px]">
    <InputPanel bind:value={inputString} {language} />
    <ScenePanel bind:selected={selectedScene} {language} />
  </section>

  <ColorTable
    {sourceColors}
    {adjustedColors}
    scene={selectedSceneConfig}
    bind:format
    {language}
    {primaryColorId}
    onPrimaryChange={setPrimaryColor}
    onCopyText={copyText}
  />

  <StatusBar
    parsedCount={sourceColors.length}
    sceneName={t(selectedSceneConfig.nameKey, language)}
    bind:language
    {copiedCss}
    onExportJson={exportJson}
    onCopyCss={copyCss}
  />
</div>
