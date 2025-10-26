import React from "react";
import { Button, Stack } from "@mui/material";

const categories = ["טלפונים", "מחשבים", "טאבלטים"];

const ProductCategory = ({ onSelect }) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant="contained"
          color="primary"
          onClick={() => onSelect(cat)}
        >
          {cat}
        </Button>
      ))}
    </Stack>
  );
};

export default ProductCategory;
