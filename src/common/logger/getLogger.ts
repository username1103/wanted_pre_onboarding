import moment from 'moment-timezone';
import winston from 'winston';

const CUSTOM_LEVEL = {
  error: 0,
  warn: 1,
  notice: 2,
  info: 3,
  debug: 4,
};

const CUSTOM_COLOR = {
  error: 'red',
  warn: 'yellow',
  notice: 'blue',
  info: 'green',
  debug: 'gray',
};

const getMaxShowingLevel = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'debug';
    case 'production':
      return 'info';
    case 'test':
      return 'error';
    default:
      return 'info';
  }
};

export const getLogger = (moduleName: string): winston.LoggerOptions => {
  winston.addColors(CUSTOM_COLOR);
  return {
    levels: CUSTOM_LEVEL,
    format: winston.format.combine(
      process.env.NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
      winston.format.printf(({ context, level, message }) => {
        return [
          `[${moduleName}]`,
          moment.tz('Asia/Seoul').format('YY/MM/DD HH:mm:ss'),
          level,
          context ? `[${context}]` : '',
          message,
        ].join(' ');
      }),
    ),
    transports: [
      new winston.transports.Console({
        stderrLevels: ['error'],
        level: getMaxShowingLevel(),
      }),
    ],
  };
};
