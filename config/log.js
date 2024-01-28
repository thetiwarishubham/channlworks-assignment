const winston = require('winston');
require('winston-daily-rotate-file');
var transport = new winston.transports.DailyRotateFile({
    filename: '/mnt/logs/channlworks-assignment-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '50m',
    maxFiles: '14d'
  });
transport.on('rotate', function(oldFilename, newFilename) {
    console.log(`oldFilename ${oldFilename} -> newFilename ${newFilename}`)
  });
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'channlworks-assignment-log-service' },
    transports: [
        transport
    ],
  });

module.exports = logger