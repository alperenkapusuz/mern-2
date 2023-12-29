const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  color: {
    type: [String],
    required: true,
  },
  mascot: {
    type: String,
    required: true,
  },
  squadValue: {
    type: String,
    required: true,
  },
  coach: {
    type: String,
    required: true,
  },
  leagueCups: {
    type: Number,
    required: true,
  },
  stadium: {
    type: String,
    required: true,
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
  },
});

TeamSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team