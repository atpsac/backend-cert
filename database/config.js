const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: '192.168.1.11',
    // host: '107.180.6.39',
    user: 'atp_user',
    password: 'Am4z0n4s*',
    database: 'atpcert-db',
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
    debug: false,
    multipleStatements: true
  },
  listPerPage: 10,
};
  
module.exports = config;