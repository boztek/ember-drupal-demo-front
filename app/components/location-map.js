import Ember from 'ember';

const {
  Component,
  get,
  inject: { service },
} = Ember;

export default Component.extend({
  maps: service(),

  didInsertElement() {
    this._super(...arguments);
    let maps = get(this, 'maps'),
        location = get(this, 'location'),
        mapElement = maps.getMapElement(location);
    let mapContainer = this.$('.map-container');
    mapContainer.append(mapElement);
  }
});
