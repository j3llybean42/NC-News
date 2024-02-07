import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export default function NavBar() {
  return (
    <>
      <Box sx={{flexgrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/articles">All Articles</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
