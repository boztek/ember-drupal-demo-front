export default function() {
  this.namespace = '/api';

  let rentals = [
    {
      type: 'rentals',
      id: '17c45e2d-403a-4ef0-8137-045d30d24111',
      attributes: {
        title: 'Grand Old Mansion',
        field_owner: 'Veruca Salt',
        field_city: 'San Francisco',
        type: 'Estate',
        field_bedrooms: 15,
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        field_description: "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.",
        slug: 'grand-old-mansion'
      }
    }, {
      type: 'rentals',
      id: '17c45e2d-403a-4ef0-8137-045d30d24112',
      attributes: {
        title: 'Urban Living',
        field_owner: 'Mike Teavee',
        field_city: 'Seattle',
        type: 'Condo',
        field_bedrooms: 1,
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        field_description: "A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.",
        slug: 'urban-living'
      }
    }, {
      type: 'rentals',
      id: '17c45e2d-403a-4ef0-8137-045d30d24113',
      attributes: {
        title: 'Downtown Charm',
        field_owner: 'Violet Beauregarde',
        field_city: 'Portland',
        type: 'Apartment',
        field_bedrooms: 3,
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
        field_description: "Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.",
        slug: 'downtown-charm'
      }
  }];

  this.get('/node/rental', function(db, request) {
    if(request.queryParams["filter[field_city][value]"] !== undefined) {
      let filteredRentals = rentals.filter(function(i) {
        let city = request.queryParams["filter[field_city][value]"].toLowerCase();
        return i.attributes.field_city.toLowerCase().indexOf(city) !== -1;
      });
      return { data: filteredRentals };
    } else {
      return { data: rentals };
    }
  });

  // Find and return the provided rental from our rental list above
  this.get('/node/rental/:id', function (db, request) {
    return { data: rentals.find((rental) => request.params.id === rental.id) };
  });
}