import { useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function CreateTask() {

  const [name, setName] = useState('');
  const [type, setType] = useState('S1');
  const clientCrd = JSON.parse(localStorage.getItem('Client'));
  const savedToken = JSON.parse(localStorage.getItem('Token'));

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      strength : type,
      name : name,
      clientId : `${clientCrd.id}`
    };

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/ManageTask/${clientCrd.id}`, task, {
      headers: {
      'Authorization': `Bearer ${savedToken}`,
      'Content-Type': 'application/json'
    }})
    .then(async response => {
      return await response.data;
    })
    .then(data => {
      if(!data) return toast.error("An error occured. Could not create task.");

      toast.success("Task added succesfully");
    })
    .catch(error => toast.error("An error occured."))
    
    // Clear the input fields
    setName('');
    setType('S1');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <label style={{ fontWeight: 'bold' }}>Task Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '1rem', fontSize: '15px', }}
          maxLength={30}
        />

        <label style={{ fontWeight: 'bold' }}>Category:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1.2rem' }}
        >
          <option value="S1">Important And Urgent</option>
          <option value="S2">Important But Not Urgent</option>
          <option value="S3">Not Important But Urgent</option>
          <option value="S4">Not Important And Not Urgent</option>
        </select>
        <button
          style={{
            padding: '1rem 2rem',
            background: 'white',
            color: 'deeppink',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0px 3px 10px rgba(255, 0, 128, 0.3)',
            transition: 'background 0.3s',
          }}
          type="submit"
          onMouseEnter={(e) => {
            e.target.style.background = 'deeppink';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'white';
            e.target.style.color = 'deeppink';
          }}
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;