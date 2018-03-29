module.exports = 
[
  { 
    service: 'reservations',
    url: `http://localhost:2003/`,
    endpoint: 'bookings', // rework routes in server?
    fileName: {
      server: 'bundle-server.js',
      client: 'bundle-client.js',
    },
    props: {
      id: 'id',
      data: 'bookings',
    }
  }
];




