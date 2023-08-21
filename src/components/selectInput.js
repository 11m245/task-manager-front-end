import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectInput({
  label = "select",
  options = [{ title: "option1", id: "id1", value: "op1" }],
  value,
  onChange,

  name,
}) {
  const [selectValue, setSelectValue] = React.useState(value);

  const handleChange = (event) => {
    setSelectValue(event.target.value);
    onChange(event);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectValue}
          label={label}
          onChange={handleChange}
          name={name}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export { SelectInput };
