import Ember from 'ember';

const {
  Component,
  get,
  set,
} = Ember;

export default Component.extend({
  classNames: ['list-filter'],
  value: '',

  init() {
    this._super(...arguments);
    let initialFilter = get(this, 'filter')('');
    initialFilter.then((results) => set(this, 'results', results));
  },

  actions: {
    handleFilterEntry() {
      let filterInputValue = get(this, 'value'),
          filterAction = get(this, 'filter');

      filterAction(filterInputValue).then((filterResults) => set(this, 'results', filterResults));
    }
  }
});