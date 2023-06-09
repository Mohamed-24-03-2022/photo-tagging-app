import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseInitializer';


const ColorButton = styled(Button)({
  padding: '10px 12px',
  color: '#000',
  borderColor: '#000000bf',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#ddd',
    borderColor: '#333',
  },
});

const UserNameField = ({
  isUserNameField,
  setIsUserNameField,
  setBodyEvents,
  setCurrentUser
}) => {
  const closeUserNameField = () => {
    setCurrentUser('without name');
    setIsUserNameField(false);
    setBodyEvents('all');
  };

  useEffect(() => {
    isUserNameField ? setBodyEvents('none') : setBodyEvents('all');
  }, []);

  const handleCLick = async (e) => {
    e.preventDefault();
    const userNameInput = e.target.parentElement.children[0].children[1].children[0].value;
    if (!userNameInput) return;
    setCurrentUser(userNameInput);
    setIsUserNameField(false);
    setBodyEvents('all');
    await setDoc(doc(db, 'users', userNameInput), { name: userNameInput, time: '' });
  };

  return (
    <div className="user-name-field absolute flex h-[220px] w-[600px] max-w-[600px] items-center justify-center bg-[#fff] p-6 ">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        className="flex items-center justify-center"
      >
        <TextField id="outlined-basic" label="User Name" variant="outlined" />
        <ColorButton variant="contained" onClick={handleCLick}>
          Enter
        </ColorButton>
      </Box>
      <AiOutlineCloseCircle
        onClick={closeUserNameField}
        className="absolute right-[10px] top-[10px] cursor-pointer text-xl text-black"
      />
    </div>
  );
};

export default UserNameField;
