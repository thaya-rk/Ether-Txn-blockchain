import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import '@fontsource/poppins'; // Ensure you have this dependency installed

const Container = styled('div')({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #000000 0%, #004d00 100%)', // Black to green gradient
  fontFamily: '"Poppins", sans-serif', // Applying Poppins font
});

const Card = styled('div')({
  width: '450px', // Increased width
  minHeight: '300px', // Increased height
  background: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent background
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  borderRadius: '1rem',
  padding: '2rem', // Increased padding
  color: '#e0e0e0', // Light text color
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Center content vertically
  gap: '16px', // Add spacing between elements
});

const Blob = styled('div')({
  position: 'absolute',
  width: '500px',
  height: '500px',
  background: 'linear-gradient(180deg, rgba(0, 255, 0, 0.5) 31.77%, #004d00 100%)',
  mixBlendMode: 'color-dodge',
  animation: 'move 50s infinite alternate', // Slower animation
  transition: '1s cubic-bezier(0.07, 0.8, 0.16, 0.16)',
  '&:hover': {
    width: '520px',
    height: '520px',
    filter: 'blur(30px)',
    boxShadow: 'inset 0 0 0 5px rgba(255, 255, 255, 0.6), inset 100px 100px 0 0px #004d00, inset 200px 200px 0 0px #007700, inset 300px 300px 0 0px #00ff00',
  },
  '@keyframes move': {
    '0%': {
      transform: 'translate(-100px, -50px) rotate(-90deg)',
      borderRadius: '24% 76% 35% 65% / 27% 36% 64% 73%',
    },
    '100%': {
      transform: 'translate(500px, 100px) rotate(-10deg)',
      borderRadius: '76% 24% 33% 67% / 68% 55% 45% 32%',
    },
  },
});

// Helper function to validate Ethereum address
const isValidEthereumAddress = (address) => {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  
  return regex.test(address);
};

// CSS animation for fading in result boxes
const resultAnimation = `
  @keyframes fadeInBox {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const EthereumExpenses = () => {
  const [address, setAddress] = useState('');
  const [expenses, setExpenses] = useState(null);
  const [error, setError] = useState(null);

  const fetchExpenses = async (address) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/expenses?address=${address}`);
      setExpenses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please check the Ethereum address and try again.');
      setExpenses(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEthereumAddress(address)) {
      fetchExpenses(address);
    } else {
      setError('Invalid Ethereum address. Please enter a valid address.');
    }
  };

  return (
    <Container>
      <Card>
        <Typography variant="h5" component="h1" style={{ fontWeight: '900', fontSize: '2rem' }}>
          ETHER TXN
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            InputProps={{ 
              style: { 
                color: '#e0e0e0', 
                fontSize: '0.875rem', 
                border: '2px solid #ffffff', // White border
                borderRadius: '4px',
                backgroundColor: 'transparent', // Transparent background
              } 
            }}
            InputLabelProps={{ style: { color: '#e0e0e0' } }} // Input label color light
            style={{ width: '100%' }} // Full width within the container
          />
          <Button
            type="submit"
            variant="contained"
            style={{ 
              marginTop: '16px', 
              backgroundColor: '#00ff00', 
              color: '#000000', 
              fontSize: '0.875rem', 
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: '600', // Strong font
            }} // Green button with black text
          >
            Ethereum Details
          </Button>
        </form>
        {error && <Typography color="error" style={{ marginTop: '16px', fontWeight: '500' }}>{error}</Typography>}
        {expenses && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            marginTop="16px"
            gap="16px"
          >
            <Box
              sx={{
                background: 'rgba(0, 255, 0, 0.2)',
                padding: '16px',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 20 , 0, 0.4)',
                animation: 'fadeInBox 0.5s ease-out',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <Typography style={{ fontWeight: '700' }}>
                <strong>Total Expenses:</strong> {expenses.totalExpenses} ETH
              </Typography>
            </Box>
            <Box
              sx={{
                background: 'rgba(0, 255, 0, 0.2)',
                padding: '16px',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 20, 0, 0.2)',
                animation: 'fadeInBox 0.8s ease-out',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <Typography style={{ fontWeight: '700' }}>
                <strong>Ethereum Price:</strong> ${expenses.currentPrice}
              </Typography>
            </Box>
          </Box>
        )}
      </Card>
      <Blob />
      <style>{resultAnimation}</style> {/* Inject CSS animation */}
    </Container>
  );
};

export default EthereumExpenses;
