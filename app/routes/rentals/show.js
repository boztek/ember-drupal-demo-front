import Ember from 'ember';

const {
  get,
  Route,
} = Ember;

export default Route.extend({
  model(params) {
    return get(this, 'store').findRecord('rental', params.rental_id);
  }
});
