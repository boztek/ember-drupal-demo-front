import DS from 'ember-data';

const {
  attr,
  Model,
} = DS;

export default Model.extend({
  filename: attr('string'),
  url: attr('string'),
});
