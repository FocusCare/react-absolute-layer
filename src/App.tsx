import React from "react";
import "./App.css";
import { ZoomPopper } from "./ZoomPopper";
import { Box, Button } from "@mui/material";
import { Layer, LayerType, LayerContext, OffsetLayer } from "./LayerContext";
import { ConfigProvider, Popover } from "antd";

function App() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const open = Boolean(anchorEl);

  // Tools
  const [anchorToolsEl, setAnchorToolsEl] =
    React.useState<HTMLButtonElement | null>(null);
  const handleToolsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorToolsEl) {
      setAnchorToolsEl(null);
    } else {
      setAnchorToolsEl(event.currentTarget);
    }
  };
  const toolsOpen = Boolean(anchorToolsEl);

  return (
    <div className="App">
      <h1>Default</h1>
      <div>
        <Popover title="and popover">
          <Button>and popover default</Button>
        </Popover>
      </div>
      <Button variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <ZoomPopper open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          mui popper at body
        </Box>
      </ZoomPopper>
      <div style={{ marginTop: 20, position: "relative" }}>
        <Layer layerType={LayerType.Tools}>
          <h1>Layer Tools</h1>
          <LayerContext.Consumer>
            {({ container }) => {
              return (
                <ConfigProvider
                  getPopupContainer={() => {
                    return container as HTMLElement;
                  }}
                >
                  <div>
                    <Popover title="and popover">
                      <Button>and popover</Button>
                    </Popover>
                  </div>
                </ConfigProvider>
              );
            }}
          </LayerContext.Consumer>
          <Button variant="contained" onClick={handleToolsClick}>
            Open Tools Popper
          </Button>
          <ZoomPopper open={toolsOpen} anchorEl={anchorToolsEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              mui popper at tools
            </Box>
          </ZoomPopper>
          <div style={{ position: "relative" }}>
          <OffsetLayer offset={1}>
            <h2>OffsetLayer z index is 101</h2>
          </OffsetLayer>
          </div>
        </Layer>
      </div>

      <div style={{ marginTop: 400, position: "relative" }}>
        <Layer layerType={LayerType.Notification}>
          <h1>Notification</h1>
          <h2>Render Notification here</h2>
          <LayerContext.Consumer>
            {({ container }) => {
              return (
                <ConfigProvider
                  getPopupContainer={() => {
                    return container as HTMLElement;
                  }}
                >
                  <div>
                    <Popover title="and popover">
                      <Button>and popover</Button>
                    </Popover>
                  </div>
                </ConfigProvider>
              );
            }}
          </LayerContext.Consumer>
        </Layer>
      </div>

      <div style={{ marginTop: 600, position: "relative" }}>
        <Layer layerType={LayerType.Modal}>
          <h1>Modal</h1>
          <h2>Render Modal here</h2>
        </Layer>
      </div>

      <div style={{ marginTop: 800, position: "relative" }}>
        <Layer layerType={LayerType.TopNotification}>
          <h1>Top Notification</h1>
          <h2>Render Agreement here</h2>
          <h2>Render Guide here</h2>
          <h2>Render Template here</h2>
        </Layer>
      </div>
    </div>
  );
}

export default App;
