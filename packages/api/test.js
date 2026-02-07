// Simple CI test for API: import the app without starting server
// Skip DB connection by setting SKIP_DB=1

process.env.SKIP_DB = process.env.SKIP_DB || '1';

const { app } = require('./server');

if (!app || typeof app !== 'function') {
  console.error('API test failed: exported app is not an Express application');
  process.exit(1);
}

console.log('API test passed: app exported and ready (DB skipped)');
process.exit(0);
