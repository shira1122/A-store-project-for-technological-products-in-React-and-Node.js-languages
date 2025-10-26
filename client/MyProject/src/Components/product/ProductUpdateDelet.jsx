import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../Order/CartContext";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  Box
} from "@mui/material";

function ProductUpdate({ products, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const { cart } = useCart();

  const deleteProduct = async (id) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      alert("נמחק בהצלחה!");
      onRefresh();
    } catch (err) {
      alert("שגיאה במחיקה");
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/products/${id}`, editForm);
      alert("עודכן בהצלחה!");
      setEditingId(null);
      onRefresh();
    } catch (err) {
      alert("שגיאה בעדכון");
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        ניהול מוצרים
      </Typography>
      <Stack spacing={2}>
        {products.map((p) => (
          <Card key={p.id} variant="outlined">
            <CardContent>
              {editingId === p.id ? (
                <Stack spacing={1}>
                  <TextField
                    name="name"
                    label="שם"
                    value={editForm.name}
                    onChange={handleEditChange}
                    fullWidth
                  />
                  <TextField
                    name="description"
                    label="תיאור"
                    value={editForm.description}
                    onChange={handleEditChange}
                    fullWidth
                  />
                  <TextField
                    name="price"
                    label="מחיר"
                    type="number"
                    value={editForm.price}
                    onChange={handleEditChange}
                    fullWidth
                  />
                  <TextField
                    name="company"
                    label="חברה"
                    value={editForm.company}
                    onChange={handleEditChange}
                    fullWidth
                  />
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="success" onClick={() => submitEdit(p.id)}>
                      שמור
                    </Button>
                    <Button variant="outlined" color="inherit" onClick={() => setEditingId(null)}>
                      ביטול
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <Box>
                  <Typography variant="h6">{p.name}</Typography>
                  <Typography variant="body2">{p.description}</Typography>
                  <Typography variant="body2">מחיר: ₪{p.price}</Typography>
                  <Typography variant="body2">חברה: {p.company}</Typography>
                  <Typography variant="body2">קטגוריה: {p.category}</Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={() => startEdit(p)}>
                      ערוך
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => deleteProduct(p.id)}>
                      מחק
                    </Button>
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default ProductUpdate;
