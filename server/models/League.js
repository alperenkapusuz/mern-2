const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const LeagueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  }
});

LeagueSchema.pre('validate', function(next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    })
    next();
})

const League = mongoose.model('League', LeagueSchema);

module.exports = League;