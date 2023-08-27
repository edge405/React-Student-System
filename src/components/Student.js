import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Paper, Button, CssBaseline } from '@mui/material';

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [students, setStudents] = React.useState([]);

  const handleClick = (e) => {
    e.preventDefault();

    if (!name || !address) {
      console.log("Please provide both name and address.");
      return;
    }

    const student = { name, address };

    fetch("http://localhost:8080/students/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    })
    .then(() => {
      console.log("Student added");
      // Assuming you want to update the list of students after adding a new student
      fetchStudents();
    })
    .catch(error => {
      console.error("Error adding student:", error);
    });
  };

  const fetchStudents = () => {
    fetch("http://localhost:8080/students/getAllStudents")
      .then(res => res.json())
      .then(result => {
        setStudents(result);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
      });
  };

  const handleDelete = (studentId) => {
  fetch(`http://localhost:8080/students/${studentId}`, {
    method: "DELETE",
  })
    .then(() => {
      console.log("Student deleted");
      fetchStudents(); // Refresh the list after deleting
    })
    .catch(error => {
      console.error("Error deleting student:", error);
    });
};

const handleDeleteAll = () => {
  fetch("http://localhost:8080/students", {
    method: "DELETE",
  })
    .then(() => {
      console.log("All students deleted");
      fetchStudents(); // Refresh the list after deleting all students
    })
    .catch(error => {
      console.error("Error deleting all students:", error);
    });
};


  React.useEffect(() => {
    fetchStudents(); // Fetch students when the component mounts
  }, []);

  return (
    <CssBaseline>
    <Container>
      
      <Paper elevation={3} style={paperStyle}>
        <h1>Add Student</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="student-name"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="student-address"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Paper>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {students.map(student => (
  <Paper elevation={3} style={{ flex: '0 0 calc(33.33% - 20px)', margin: '10px', padding: '15px', textAlign: 'left' }} key={student.id}>
    <p>Id: {student.id}</p>
    <p>Name: {student.name}</p>
    <p>Address: {student.address}</p>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(student.id)}
                sx={{ backgroundColor: '#f44336', color: '#fff', marginTop: '10px' }}
              >
                Delete
              </Button>
  </Paper>
))}
  </div>
  <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAll}
          sx={{ backgroundColor: '#f44336', color: '#fff', marginTop: '20px' }}
        >
          Delete All Students
        </Button>

    </Container>
    </CssBaseline>
  );
}
