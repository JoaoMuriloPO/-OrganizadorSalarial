import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { AccountBalance } from '@mui/icons-material';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="static" 
      color="primary"
      elevation={2}
      sx={{
        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
        marginBottom: 3
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexGrow: 1,
            justifyContent: 'center'
          }}
        >
          {/* Ícone */}
          <AccountBalance 
            sx={{ 
              fontSize: isMobile ? 28 : 32,
              marginRight: 2,
              color: 'white'
            }} 
          />
          
          {/* Título */}
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1"
            sx={{
              fontWeight: 600,
              color: 'white',
              textAlign: 'center',
              letterSpacing: '0.5px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Organizador Salarial
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;