import React, { useEffect, useState } from 'react';
import axios from '../Api/axios';
import { handleError, handleSuccess } from '../utils';

function Updates() {
  const [updates, setUpdates] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchUpdates = async () => {
    try {
      const res = await axios.get('/updates');
      setUpdates(res.data.updates);
    } catch {
      handleError('Failed to fetch updates');
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleSubmit = async () => {
    if (!message) return handleError('Message required');

    try {
      if (editingId) {
        await axios.put(`/updates/${editingId}`, { message });
        handleSuccess('Updated successfully');
      } else {
        await axios.post('/updates', { message });
        handleSuccess('Created successfully');
      }

      setMessage('');
      setEditingId(null);
      fetchUpdates();
    } catch {
      handleError('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/updates/${id}`);
      handleSuccess('Deleted');
      fetchUpdates();
    } catch {
      handleError('Delete failed');
    }
  };

  const startEdit = (update) => {
    setMessage(update.message);
    setEditingId(update._id);
  };

  return (
    <div>
      <h3>Task Updates</h3>

      <input
        placeholder="Enter update message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editingId ? 'Update' : 'Add'}
      </button>

      <ul>
        {updates.map((u) => (
          <li key={u._id}>
            {u.message}

            <button onClick={() => startEdit(u)}>Edit</button>
            <button onClick={() => handleDelete(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Updates;
