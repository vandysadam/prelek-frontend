import CircleIcon from "@mui/icons-material/Circle";
import {
  Box,
  Button,
  Grid,
  hexToRgb,
  hslToRgb,
  Menu,
  rgbToHex,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import convert from "color-convert";
import React, { useEffect, useMemo, useState } from "react";

type ColorFormat = "rgb" | "hex" | "hsb";

const isRgbValid = (rgb: string): boolean => {
  // rgb(0, 0, 0)
  const rgbNumbers = rgb.replace("rgb", "").replace("(", "").replace(")", "");
  const rgba = rgbNumbers.split(", ");

  if (rgba.length !== 3) {
    return false;
  }

  rgba.forEach((c) => {
    // Must not be decimal
    if (c.toString().includes(".")) {
      return false;
    }

    // Must be within
    if (parseInt(c) > 255 || parseInt(c) < 0) {
      return false;
    }
  });
  return true;
};

interface IColorPickerProps {
  onChange?: (hex: string) => void;
  label?: string;
  defaultValue?: string;
}

const RGB: React.FC<{
  onChange?: (hex: string) => void;
  defaultRedValue?: number;
  defaultGreenValue?: number;
  defaultBlueValue?: number;
}> = (props) => {
  const { defaultRedValue, defaultGreenValue, defaultBlueValue } = props;

  const [red, setRed] = useState<number>(defaultRedValue ?? 0);
  const [green, setGreen] = useState<number>(defaultGreenValue ?? 0);
  const [blue, setBlue] = useState<number>(defaultBlueValue ?? 0);

  const hexFromRgb = useMemo(() => {
    return rgbToHex(`rgb(${red}, ${green}, ${blue})`);
  }, [red, green, blue]);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(hexFromRgb);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hexFromRgb]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="flex justify-between items-center gap-3">
          <small className="w-5">R</small>
          <Slider
            aria-label="Default"
            color="primary"
            defaultValue={50}
            max={255}
            onChange={(e, val) => typeof val === "number" && setRed(val)}
            step={1}
            value={red}
            valueLabelDisplay="auto"
          />
        </div>
      </Grid>

      <Grid item xs={12}>
        <div className="flex justify-between items-center gap-3">
          <small className="w-5">G</small>
          <Slider
            aria-label="Default"
            color="primary"
            defaultValue={50}
            max={255}
            onChange={(e, val) => typeof val === "number" && setGreen(val)}
            step={1}
            value={green}
            valueLabelDisplay="auto"
          />
        </div>
      </Grid>

      <Grid item xs={12}>
        <div className="flex justify-between items-center gap-3">
          <small className="w-5">B</small>
          <Slider
            aria-label="Default"
            color="primary"
            defaultValue={50}
            max={255}
            onChange={(e, val) => {
              typeof val === "number" && setBlue(val);
            }}
            step={1}
            value={blue}
            valueLabelDisplay="auto"
          />
        </div>
      </Grid>
    </Grid>
  );
};

const HSB: React.FC<{
  onChange: (hsl: string) => void;
  defaultHueValue?: number;
  defaultSaturationValue?: number;
  defaultBrightnessValue?: number;
}> = (props) => {
  const {
    defaultHueValue: initialHue,
    defaultBrightnessValue: initialBrightness,
    defaultSaturationValue: initialSaturation,
  } = props;
  const [hue, setHue] = useState<number>(initialHue ?? 0);
  const [saturation, setSaturation] = useState<number>(
    initialSaturation ?? 100
  );
  const [brightness, setBrightness] = useState<number>(initialBrightness ?? 50);

  const hsl = `hsl(${hue}, ${saturation}%, ${brightness}%)`;

  const hueBackground = `linear-gradient(90deg, 
    hsl(0,100%,50%) 0%,
    hsl(30,100%,50%) 8.333%,
    hsl(60,100%,50%) 16.667%,
    hsl(90,100%,50%) 25%,
    hsl(120,100%,50%) 25%,
    hsl(150,100%,50%) 41.667%,
    hsl(180,100%,50%) 50%,
    hsl(210,100%,50%) 58.333%,
    hsl(240,100%,50%) 66.667%,
    hsl(270,100%,50%) 75%,
    hsl(300,100%,50%) 83.333%,
    hsl(330,100%,50%) 91.667%,
    hsl(359,100%,50%) 99.722%
    )`;

  useEffect(() => {
    if (props.onChange) {
      props.onChange(hsl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hsl]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="flex justify-between items-center gap-3">
          <small className="w-5">H</small>
          <Slider
            aria-label="Default"
            color="primary"
            defaultValue={0}
            max={359}
            onChange={(e, value) => setHue(value as number)}
            step={1}
            sx={{
              "& .MuiSlider-rail": {
                background: hueBackground,
                opacity: 1,
              },
              "& .MuiSlider-track": {
                background: "transparent",
                border: "none",
              },
            }}
            value={hue}
            valueLabelDisplay="auto"
          />
        </div>
      </Grid>

      <Grid item xs={12}>
        <div className="flex justify-between items-center gap-3">
          <small className="w-5">S</small>
          <Slider
            aria-label="Default"
            color="primary"
            defaultValue={50}
            max={100}
            onChange={(e, value) => setSaturation(value as number)}
            step={1}
            value={saturation}
            valueLabelDisplay="auto"
          />
        </div>
      </Grid>

      <Grid item xs={12}>
        <div className="flex justify-between items-center gap-3">
          <small className="w-5">L</small>
          <Slider
            aria-label="Default"
            color="primary"
            defaultValue={50}
            max={100}
            onChange={(e, value) => setBrightness(value as number)}
            step={1}
            value={brightness}
            valueLabelDisplay="auto"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export const ColorPicker: React.FC<IColorPickerProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Global
  const [globalHexColor, setGlobalHexColor] = useState<string>(
    props.defaultValue ?? "#000"
  );

  const [r, g, b] = useMemo(() => {
    return convert.hex.rgb(globalHexColor);
  }, [globalHexColor]);

  const [hue, saturation, brightness] = useMemo(() => {
    return convert.hex.hsl(globalHexColor);
  }, [globalHexColor]);

  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // useEffects
  useEffect(() => {
    if (props.onChange) {
      props.onChange(globalHexColor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalHexColor]);
  return (
    <>
      <Button
        className="rounded-md shadow-sm border border-gray-300"
        color="inherit"
        endIcon={<CircleIcon style={{ color: globalHexColor }} />}
        onClick={handleOpen}
        variant="outlined"
      >
        {props.label ?? "Choose Color"}
      </Button>

      <Menu
        PaperProps={{
          elevation: 0,
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open}
      >
        <div className="p-3 shadow-sm border border-gray-300 rounded-md w-[300px]">
          <Grid className="gap-3" container>
            <Grid item xs={12}>
              <Box
                className={`rounded-none pointer-events-none w-full h-10`}
                style={{
                  backgroundColor: globalHexColor,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <ToggleButtonGroup
                aria-label="text alignment"
                exclusive
                onChange={(event: React.MouseEvent<HTMLElement>, value) => {
                  if (value) {
                    setColorFormat(value);
                  }
                }}
                value={colorFormat}
              >
                <ToggleButton aria-label="hsb" size="small" value="hsb">
                  HSB
                </ToggleButton>
                <ToggleButton aria-label="rgb" size="small" value="rgb">
                  RGB
                </ToggleButton>
                <ToggleButton aria-label="hex" size="small" value="hex">
                  HEX
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            {colorFormat === "rgb" && (
              <Grid container xs={12}>
                <RGB
                  defaultBlueValue={b}
                  defaultGreenValue={g}
                  defaultRedValue={r}
                  onChange={(hex) => {
                    setGlobalHexColor(hex);
                  }}
                />
              </Grid>
            )}

            {colorFormat === "hex" && (
              <Grid item xs={12}>
                <TextField
                  defaultValue={globalHexColor}
                  fullWidth
                  onChange={(e) => {
                    const rgb = hexToRgb(e.target.value);
                    if (isRgbValid(rgb)) {
                      setGlobalHexColor(e.target.value);
                    }
                  }}
                  placeholder="#fffff"
                  size="small"
                />
              </Grid>
            )}

            {colorFormat === "hsb" && (
              <Grid container xs={12}>
                <HSB
                  defaultBrightnessValue={brightness}
                  defaultHueValue={hue}
                  defaultSaturationValue={saturation}
                  onChange={(hsl) => {
                    const rgb = hslToRgb(hsl);
                    const hex = rgbToHex(rgb);
                    setGlobalHexColor(hex);
                  }}
                />
              </Grid>
            )}
          </Grid>
        </div>
      </Menu>
    </>
  );
};
