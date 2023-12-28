const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: 'Kullanıcı bulunamadı.' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Entered Password:', password);
    console.log('Stored Password:', user.password);
    console.log('Password Match:', passwordMatch);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Hatalı Giriş' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};