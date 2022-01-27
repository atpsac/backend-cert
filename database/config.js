const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: 'localhost',
    user: 'atp_user',
    password: 'Am4z0n4s*',
    database: 'atp-cer',
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
    debug: false,
    multipleStatements: true
  },
  listPerPage: 10,
};
  
module.exports = config;