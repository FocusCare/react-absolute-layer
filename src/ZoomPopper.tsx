import { PopperProps, Popper } from "@mui/material";
import { LayerContext } from "./LayerContext";

export const ZoomPopper = (props: PopperProps) => {
  return (
    <LayerContext.Consumer>
      {({ container }) => {
        return <Popper container={container} {...props} />;
      }}
    </LayerContext.Consumer>
  );
};
