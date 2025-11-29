import { useState, useMemo } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { InputSection } from './components/controls/InputSection';
import { ColorTable } from './components/data/ColorTable';
import { StatusBar } from './components/layout/StatusBar';
import { extractHexCodes, createColorData, adjustColorsToScene, SCENES } from './lib/color-utils';
import type { SceneType } from './lib/types';
import { t, type Language } from './lib/i18n';

function App() {
  const [inputString, setInputString] = useState<string>('');
  const [selectedScene, setSelectedScene] = useState<SceneType>('light');
  const [language, setLanguage] = useState<Language>('zh');
  const [manualPrimaryId, setManualPrimaryId] = useState<string | null>(null);

  // Process colors
  const sourceColors = useMemo(() => {
    const hexCodes = extractHexCodes(inputString);
    // Remove duplicates for cleaner view? Or keep them to map 1:1 to input?
    // Keeping 1:1 for now based on "linear flow" expectation
    return hexCodes.map((hex, index) => createColorData(hex, `color-${index}`, 'user'));
  }, [inputString]);

  const primaryColorId = useMemo(() => {
    if (manualPrimaryId && sourceColors.find(c => c.id === manualPrimaryId)) {
      return manualPrimaryId;
    }
    return sourceColors.length > 0 ? sourceColors[0].id : null;
  }, [sourceColors, manualPrimaryId]);

  const adjustedColors = useMemo(() => {
    return adjustColorsToScene(sourceColors, selectedScene, primaryColorId);
  }, [sourceColors, selectedScene, primaryColorId]);

  const handleExportJson = () => {
    const data = adjustedColors.map(c => ({
      hex: c.hex,
      sourceHex: sourceColors.find(s => s.id === c.id)?.hex
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lumharmony-colors.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCss = () => {
    const cssVars = adjustedColors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join('\n');
    navigator.clipboard.writeText(cssVars);
    alert('CSS Variables copied to clipboard!');
  };

  return (
    <MainLayout>
      {/* Top Section: Input & Config */}
      <InputSection
        inputString={inputString}
        onInputChange={setInputString}
        selectedScene={selectedScene}
        onSceneChange={setSelectedScene}
        lang={language}
      />

      {/* Middle Section: Data Table */}
      <ColorTable
        sourceColors={sourceColors}
        adjustedColors={adjustedColors}
        scene={SCENES[selectedScene]}
        lang={language}
        primaryColorId={primaryColorId}
        onPrimaryChange={setManualPrimaryId}
      />

      {/* Bottom Section: Status */}
      <StatusBar
        parsedCount={sourceColors.length}
        sceneName={t(`scene_${selectedScene}`, language)}
        onExportJson={handleExportJson}
        onCopyCss={handleCopyCss}
        lang={language}
        onLanguageChange={setLanguage}
      />
    </MainLayout>
  );
}

export default App;