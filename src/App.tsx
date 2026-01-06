import React, { useState } from "react";
import StarshipLayout from "./layouts/starship/StarshipLayout";
import DefaultLayout from "./layouts/default/DefaultLayout";
import PixelizedLayout from "./layouts/pixelized/PixelizedLayout";
import LayoutSwitcher from "./components/LayoutSwitcher";

const App = () => {
  const [layout, setLayout] = useState<'default' | 'starship' | 'pixelized'>('default');

  return (
    <>
      <LayoutSwitcher currentLayout={layout} onSwitch={setLayout} />
      
      {layout === 'starship' && <StarshipLayout />}
      {layout === 'pixelized' && <PixelizedLayout />}
      {layout === 'default' && <DefaultLayout />}
    </>
  );
};

export default App;
