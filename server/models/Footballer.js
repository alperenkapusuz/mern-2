const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const FootballerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  overall: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  slug: {
    type: String,
    unique: true,
  },
});

FootballerSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Footballer = mongoose.model('Footballer', FootballerSchema);

module.exports = Footballer;
