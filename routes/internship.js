const router = require("express").Router();

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' }
  ];

  
  // Endpoint to get all users
  
  router.get('/api/users', (req, res) => {
    res.json(users);
  });
  

  // Endpoint to get a user by ID

  router.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.json(user);
  });
  
module.exports = router;