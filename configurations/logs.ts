import * as log4js from 'log4js';

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: '../app.log', category: 'app' }
    ]
})

export function getLogger(categoryName?: string): log4js.Logger {
    return log4js.getLogger(categoryName);
}