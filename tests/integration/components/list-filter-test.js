import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | list filter', {
  integration: true
});

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

test('should initially load all listings', function (assert) {
  this.on('filterByCity', (val) => {
    if ('' === val) {
      return RSVP.resolve(ITEMS);
    }

    return RSVP.resolve(FILTERED_ITEMS);
  });

  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |filteredList|}}
      <ul>
        {{#each filteredList as |item|}}
        <li class="city">
          {{item.city}}
        </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);

  return wait().then(() => {
    assert.equal(this.$('.city').length, 3);
  }).then(() => {
    // The keyup event here should invoke an action that will cause the list to be filtered
    this.$('.list-filter input').val('San').keyup();
    assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
  });
});