import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import "./ColorPicker.css";

const ColorPicker = ({ value = "#7b8fc0", onChange }) => {
  const [hex, setHex] = useState(value);

  useEffect(() => {
    setHex(value || "#7b8fc0");
  }, [value]);

  const handleChange = (nextColor) => {
    setHex(nextColor);
    onChange?.(nextColor);
  };

  return (
    <div className="colorpicker">
      <div className="colorpicker__panel">
        <HexColorPicker
          color={hex}
          onChange={handleChange}
          className="colorpicker__square"
          style={{ width: "100%", height: "240px" }}
        />
      </div>

      <div className="colorpicker__input-row">
        <span className="colorpicker__label">Hex</span>
        <input
          className="colorpicker__input"
          value={hex}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
