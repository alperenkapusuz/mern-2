const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, password, name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, password: hashedPassword, role });
    await user.save();
    res.status(200).json({ message: 'Kullanıcı başarıyla kaydedildi.', status: 200 });
  } catch (err) {
    res.status(500).json({ message: err, status: 500 });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: 'Kullanıcı bulunamadı.', status: 401 });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: 'Hatalı Giriş', status: 401 });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    res.status(200).json({ data: token, status: 200, message: 'Giriş başarılı' });
  } catch (err) {
    res.status(500).json({ message: err, status: 500 });
  }
};
