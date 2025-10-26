import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ProductAdd({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "טלפונים",
    price: "",
    company: "",
    prodDate: ""
  });

  const user = useSelector((state) => state.user.userInfo);
  const isAdmin = user?.email === "admin@email.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/products", form);
      alert("נוסף בהצלחה!");
      onAdd();
      setForm({ name: "", description: "", category: "טלפונים", price: "", company: "", prodDate: "" });
    } catch (err) {
      alert("שגיאה בהוספה");
    }
  };

  if (!isAdmin) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h3>הוסף מוצר</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="שם מוצר" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="תיאור" />
      <select name="category" value={form.category} onChange={handleChange}>
        <option>טלפונים</option>
        <option>מחשבים</option>
        <option>טאבלטים</option>
      </select>
      <input name="price" value={form.price} onChange={handleChange} placeholder="מחיר" type="number" required />
      <input name="company" value={form.company} onChange={handleChange} placeholder="חברה" />
      <input name="prodDate" value={form.prodDate} onChange={handleChange} placeholder="תאריך ייצור" />
      <button type="submit">הוסף</button>
    </form>
  );
}

export default ProductAdd;
