const { connectToDB } = require('./config/db');

const PORT = process.env.PORT || 3001;

connectToDB()
  .then(() => {
    const app = require('./config/app'); 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  })
  .catch(err => {
    console.error('Failed to connect to DB:', err);
  });


