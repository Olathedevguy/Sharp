import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({shoeType, setShoeType}) {
//   const [brand, setBrand] = React.useState('');

  const handleChange = (event) => {
    setShoeType(event.target.value);
    // setShoeType(brand)
  };


    
    console.log(shoeType)


  return (
    <Box sx={{ minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Shoe Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={shoeType}
          label="Shoe Brand"
          onChange={handleChange}
        >
          <MenuItem value="jordan">Jordan</MenuItem>
          <MenuItem value="nike">Nike</MenuItem>
          <MenuItem value="adidas">Adidas</MenuItem>
          <MenuItem value="puma">Puma</MenuItem>
          <MenuItem value="reebok">Reebok</MenuItem>
          <MenuItem value="converse">Converse</MenuItem>
          <MenuItem value="vans">Vans</MenuItem>
          <MenuItem value="new-balance">New Balance</MenuItem>
          <MenuItem value="asics">Asics</MenuItem>
          <MenuItem value="under-armour">Under Armour</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

BasicSelect.propTypes = {
  shoeType: PropTypes.string.isRequired,
  setShoeType: PropTypes.func.isRequired
};
