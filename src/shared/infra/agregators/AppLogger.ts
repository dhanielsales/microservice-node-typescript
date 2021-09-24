import colorizeText from '@shared/utils/colorizeText';
import { format } from 'date-fns';

type Type = 'INFO' | 'WARNING' | 'ERROR';

interface AppLoggerConfig {
  date?: Date;
  message: string;
  type: Type;
  error?: any;
}

const typeColors = {
  INFO: 'blue_foreground',
  WARNING: 'yellow_foreground',
  ERROR: 'red_foreground',
};

export default class AppLogger {
  public readonly date: Date;
  public readonly type: Type;
  public readonly message: string;

  constructor({ date = new Date(), message, type, error }: AppLoggerConfig) {
    this.date = date;
    this.message = message;
    this.type = type;

    const formatedType = colorizeText(type, typeColors[type] as any);
    const formatedDate = format(date, 'dd-MM-yyyy HH:mm:ss');

    const finalMessage = error
      ? `[${formatedType}] ${colorizeText(formatedDate, 'bright')} - ${message} - ${error}`
      : `[${formatedType}] ${colorizeText(formatedDate, 'bright')} - ${message}`;

    console.log(finalMessage);
  }
}
