import * as log4js from 'log4js';

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'app.log', category: 'app' },
        { type: 'file', filename: 'app.log', category: 'mongo' }
    ],
    replaceConsole: true
})

export function getLogger(categoryName?: string): log4js.Logger {
    return log4js.getLogger(categoryName);
}