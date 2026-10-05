const timestamp = Date.now();

module.exports = {
  validUser: {
    firstName: 'Playwright',
    lastName: 'Tester',
    email: `playwright${timestamp}@example.test`,
    password: 'Test@12345'
  },

  loginUser: {
    // Replace these if you have an existing Demo Web Shop account.
    email: process.env.DWS_EMAIL || '',
    password: process.env.DWS_PASSWORD || ''
  },

  address: {
    firstName: 'Playwright',
    lastName: 'Tester',
    email: `checkout${timestamp}@example.test`,
    country: 'India',
    city: 'Chennai',
    address1: '100 Automation Street',
    zip: '600001',
    phone: '9876543210'
  }
};