export class Logger {
    static debug(message?: any, ...optionalParams: any[]): void {
        console.debug(message, ...optionalParams);
    }
    static error(message?: any, ...optionalParams: any[]): void {
        console.error(message, ...optionalParams);
    }
    static info(message?: any, ...optionalParams: any[]): void {
        console.info(message, ...optionalParams);
    }
    static trace(message?: any, ...optionalParams: any[]): void {
        console.trace(message, ...optionalParams);
    }
    static warn(message?: any, ...optionalParams: any[]): void {
        console.warn(message, ...optionalParams);
    }
}