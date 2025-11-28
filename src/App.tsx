import { useState, useMemo } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { InputSection } from './components/controls/InputSection';
import { ColorTable } from './components/data/ColorTable';
import { StatusBar } from './components/layout/StatusBar';
import { extractHexCodes, createColorData, adjustColorsToScene, SCENES } from './lib/color-utils';
import type { SceneType } from './lib/types';

function App() {
  const [inputString, setInputString] = useState<string>('');
  const [selectedScene, setSelectedScene] = useState<SceneType>('light');

  // Process colors
  const sourceColors = useMemo(() => {
    const hexCodes = extractHexCodes(inputString);
    // Remove duplicates for cleaner view? Or keep them to map 1:1 to input?
    // Keeping 1:1 for now based on "linear flow" expectation
    return hexCodes.map((hex, index) => createColorData(hex, `color-${index}`, 'user'));
  }, [inputString]);

  const adjustedColors = useMemo(() => {
    return adjustColorsToScene(sourceColors, selectedScene, null);
  }, [sourceColors, selectedScene]);

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
      />

      {/* Middle Section: Data Table */}
      <ColorTable 
        sourceColors={sourceColors}
        adjustedColors={adjustedColors}
        scene={SCENES[selectedScene]}
      />

      {/* Bottom Section: Status */}
      <StatusBar 
        parsedCount={sourceColors.length}
        sceneName={SCENES[selectedScene].id === 'light' ? 'Light Mode' : SCENES[selectedScene].id === 'normal' ? 'Normal' : 'High Contrast'}
        onExportJson={handleExportJson}
        onCopyCss={handleCopyCss}
      />
    </MainLayout>
  );
}

export default App;