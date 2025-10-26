import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./userSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        alert('התחברת בהצלחה!');
        navigate('/');
      })
      .catch(() => {
        // השגיאה כבר תוצג מה־redux
      });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          התחברות
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="אימייל"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="סיסמה"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              שם משתמש או סיסמה אינם נכונים / לא קיימים במערכת
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'התחבר'}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          אין לך חשבון?{' '}
          <Button color="secondary" onClick={onSwitchToRegister}>
            הירשם
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
