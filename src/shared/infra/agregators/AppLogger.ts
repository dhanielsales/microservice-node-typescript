import colorizeText from '@shared/utils/colorizeText';
import { format } from 'date-fns';

type Type = 'INFO' | 'WARNING' | 'ERROR';

interface AppLoggerConfig {
  date: Date;
  message: string;
  type: Type;
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

  constructor({ date, message, type }: AppLoggerConfig) {
    this.date = date;
    this.message = message;
    this.type = type;

    const formatedType = colorizeText(type, typeColors[type] as any);
    const formatedDate = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

    console.log(`[${formatedType}] ${colorizeText(formatedDate, 'bright')} - ${message}`);
  }
}
