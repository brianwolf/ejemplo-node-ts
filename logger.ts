import log4js from 'log4js'

const LOG_PREDEFINIDO: string = 'app'
const LOGS_RUTA: string = './'
const LOGS_NIVEL: string = 'info'

interface LoggersMapa {
    [nombre: string]: log4js.Logger
}

let loggers: LoggersMapa = {}

/**
 * Devuelve un logger con log4js creando el logger en caso de ser necesario,
 * en caso de no enviarle ningun argumento usa el log predefido
 * 
 * **Uso:**
 * 
 * - getLogger().info('hola :)')
 * - getLogger().warn('tenemos que hablar')
 * - getLogger().error('AAAAHHHH....!!!!')
 * 
 * @param nombreLog 
 */
export function getLogger(nombreLog: string = LOG_PREDEFINIDO): log4js.Logger {

    for (const nombre in loggers) {
        if (nombre == nombreLog) {
            return loggers[nombre]
        }
    }

    let appenders = JSON.parse(`{ "${nombreLog}": { "type": "file", "filename": "${LOGS_RUTA + nombreLog}.log" }}`)
    let categories = JSON.parse(`{ "default": { "appenders": ["${nombreLog}"], "level": "${LOGS_NIVEL}" } }`)

    let configNueva = log4js.configure({
        appenders: appenders,
        categories: categories
    });

    let loggerNuevo = configNueva.getLogger()
    loggers[nombreLog] = loggerNuevo

    return loggerNuevo
}
