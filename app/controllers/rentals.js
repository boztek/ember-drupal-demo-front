import Ember from 'ember';

const {
  Controller,
  get,
} = Ember;

export default Controller.extend({
  actions: {
    filterByCity(param) {
      let store = get(this, 'store');
      if (param !== '') {
        return store.query('rental', { city: param });
      } else {
        return store.findAll('rental');
      }
    }
  }
});