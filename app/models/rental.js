import DS from 'ember-data';

const {
  attr,
  belongsTo,
  Model,
} = DS;

export default Model.extend({
  title: attr('string'),
  owner: attr('string'),
  city: attr('string'),
  type: belongsTo('rental-type'),
  image: belongsTo('file'),
  bedrooms: attr('number'),
  description: attr('string'),
  testField: attr('string')
});
