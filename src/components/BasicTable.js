import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebaseInitializer';
import { useEffect } from 'react';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

async function retrieveData() {
  const q = query(collection(db, 'users'));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

export default function BasicTable() {
  const [users, setUsers] = useState([]);

  const compareFn = (first, second) => {
    if (first.time.hr !== second.time.hr) {
      return first.time.hr - second.time.hr;
    }
    if (first.time.min !== second.time.min) {
      return first.time.min - second.time.min;
    }
    return first.time.sec - second.time.sec;
  };

  useEffect(() => {
    retrieveData().then((data) => {
      data.forEach((user) => {
        setUsers((prevUsers) =>
          [...prevUsers, user.data()]
            .filter((user) => user.time !== '')
            .sort(compareFn)
        );
      });
    });
  }, []);

  console.log(users.length);
  return (
    <>
      {!users.length ? (
        <Stack sx={{ color: '#333' }} spacing={2} direction="row">
          <CircularProgress color="inherit" />
        </Stack>
      ) : (
        ''
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="leader board">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow
                key={i + 1}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">
                  {user.time.hr}:{user.time.min}:{user.time.sec}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
