import { createContext, useState } from "react";

export const LayerContext = createContext<{
  container: HTMLElement;
  zIndex: number;
}>({
  container: document.body,
  zIndex: 1,
});

export enum LayerType {
  Tools = 100,
  Notification = 1050,
  Modal = 1300,
  TopNotification = 2000,
}

type LayerOffset = 1 | 2 | 3 | 4 | 5;

interface LayerProps {
  layerType: LayerType;
  children?: React.ReactNode;
}

const layerStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
};

export const Layer = ({ children, layerType }: LayerProps) => {
  const [container, setContainer] = useState<HTMLElement>(document.body);
  return (
    <div
      style={{ zIndex: layerType, ...layerStyle }}
      ref={(ref) => ref && setContainer(ref)}
    >
      <LayerContext.Provider value={{ container, zIndex: layerType }}>
        {children}
      </LayerContext.Provider>
    </div>
  );
};

interface OffsetLayerProps {
  children?: React.ReactNode;
  offset: LayerOffset;
}

export const OffsetLayer = ({ children, offset }: OffsetLayerProps) => {
  const [offsetContainer, setOffsetContainer] = useState<HTMLElement>(
    document.body
  );

  return (
    <LayerContext.Consumer>
      {({ zIndex }) => {
        const offsetZIndex = zIndex + offset;
        return (
          <div
            style={{ zIndex: offsetZIndex, ...layerStyle }}
            ref={(ref) => ref && setOffsetContainer(ref)}
          >
            <LayerContext.Provider
              value={{ container: offsetContainer, zIndex: offsetZIndex }}
            >
              {children}
            </LayerContext.Provider>
          </div>
        );
      }}
    </LayerContext.Consumer>
  );
};
