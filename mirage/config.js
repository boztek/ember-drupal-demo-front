export default function() {
  this.namespace = '/jsonapi';

  let rentals = [
    {
      type: 'node--rental',
      id: '1234',
      attributes: {
        title: 'Grand Old Mansion',
        field_owner: 'Veruca Salt',
        field_city: 'San Francisco',
        field_bedrooms: 15,
        field_description: "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.",
      },
      relationships: {
        field_image: {
          data: {
            type: 'file--file',
            id: '42'
          }
        },
        field_type: {
          data: {
            type: 'taxonomy_term--rental_type',
            id: '100'
          }          
        }
      }
    }, {
      type: 'node--rental',
      id: '5678',
      attributes: {
        title: 'Urban Living',
        field_owner: 'Mike Teavee',
        field_city: 'Seattle',
        field_bedrooms: 1,
        field_description: "A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.",
      },
      relationships: {
        field_image: {
          data: {
            type: 'file--file',
            id: '43'
          }
        },
        field_type: {
          data: {
            type: 'taxonomy_term--rental_type',
            id: '101'
          }          
        }
      }
    }, {
      type: 'node--rental',
      id: '9012',
      attributes: {
        title: 'Downtown Charm',
        field_owner: 'Violet Beauregarde',
        field_city: 'Portland',
        field_bedrooms: 3,
        field_description: "Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.",
      },
      relationships: {
        field_image: {
          data: {
            type: 'file--file',
            id: '44'
          }
        },
        field_type: {
          data: {
            type: 'taxonomy_term--rental_type',
            id: '102'
          }          
        }
      }
  }];

  let files = [
    {
      type: 'file--file',
      id: '42',
      attributes: {
        filename: 'grand-old-mansion',
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
      }
    },
    {
      type: 'file--file',
      id: '43',
      attributes: {
        filename: 'grand-old-mansion',
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg'
      }
    },
    {
      type: 'file--file',
      id: '44',
      attributes: {
        filename: 'grand-old-mansion',
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg'
      }
    }
  ];

  let types = [
    {
      type: 'taxonomy_term--rental_type',
      id: '100',
      attributes: {
        name: 'Estate'
      }
    },
    {
      type: 'taxonomy_term--rental_type',
      id: '101',
      attributes: {
        name: 'Terrace House'
      }
    },
    {
      type: 'taxonomy_term--rental_type',
      id: '102',
      attributes: {
        name: 'Palace'
      }
    }
  ];

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

  this.get('/file/file/:id', function (db, request) {
    return { data: files.find((file) => request.params.id === file.id) };
  });

  this.get('/taxonomy_term/rental_type/:id', function (db, request) {
    return { data: types.find((rentalType) => request.params.id === rentalType.id) };
  });
}