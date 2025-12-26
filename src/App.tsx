import React, { useState } from "react";
import StarshipLayout from "./layouts/starship/StarshipLayout";
import DefaultLayout from "./layouts/default/DefaultLayout";
import HymythLayout from "./layouts/hymyth/HymythLayout";
import LayoutSwitcher from "./components/LayoutSwitcher";

const App = () => {
  const [layout, setLayout] = useState<'default' | 'starship' | 'hymyth'>('default');

  return (
    <>
      <LayoutSwitcher currentLayout={layout} onSwitch={setLayout} />
      
      {layout === 'starship' && <StarshipLayout />}
      {layout === 'hymyth' && <HymythLayout />}
      {layout === 'default' && <DefaultLayout />}
    </>
  );
};

export default App;
