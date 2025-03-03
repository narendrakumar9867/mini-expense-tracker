import * as React from 'react';
import { useState } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="mode">Change mode</Button>;
  }

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: 'max-content' }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

function LoginFinal() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ... user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`http://localhost:4000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if(response.ok) {
        navigate("/user/home");
      } else {
        alert("Invalid credentials");
      }
      console.log(response);
    } catch (error) {
      console.log("login", error);1
    }
  };

  return (
    <main className='login'>
      <ModeToggle />
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4,
          py: 3, 
          px: 2, 
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={user.email}
              onChange={handleInput}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={user.password}
              onChange={handleInput}
            />
          </FormControl>
          <Button type="submit" sx={{ mt: 1 }}>Log in</Button>
        </form>
        <Typography
          endDecorator={<RouterLink to="/user/register">Register</RouterLink>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </main>
  );
}
  
export default LoginFinal;
