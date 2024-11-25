const express = require('express');
const path = require('path');
const app = express();

//EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to verify if the request is within working hours (Mon-Fri, 9 AM - 5 PM)
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const hour = currentDate.getHours();

  // Check if it's Monday to Friday and between 9 AM and 5 PM
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next(); // Proceed to the next middleware or route
  } else {
    res.send('The website is only available during working hours (Mon-Fri, 9 AM - 5 PM).');
  }
};

// Use the middleware globally
app.use(workingHoursMiddleware);

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
