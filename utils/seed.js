const User = require("./../models/User");

User.find({ isAdmin: true }, (err, adminUser) => {
  if (adminUser.length === 0) {
    const Admin = new User({
      name: "altcampus",
      email: "admin@altcampus.com",
      phoneNo: 0000000000,
      socialProfile: "https://twitter.com/altcampus",
      motivation: "The Alternative to College That You Wish Existed.",
      isAdmin: true,
      password: "qwerty"
    });
    Admin.save();
  }
});
