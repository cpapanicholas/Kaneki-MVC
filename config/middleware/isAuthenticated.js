const isAuthenticated = (req, res, next) => {
    // If user is authenticated, proceed to the next middleware or route
    if (req.session.user) {
      return next();
    }
  
    // If user is not authenticated, redirect to login or show an unauthorized message
    return res.status(401).redirect('/login'); // You can customize the redirect or response as needed
  };
  
  module.exports = isAuthenticated;