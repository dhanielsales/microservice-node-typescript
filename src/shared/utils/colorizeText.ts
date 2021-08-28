const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  everse: '\x1b[7m',
  hidden: '\x1b[8m',

  black__foreground: '\x1b[30m',
  red_foreground: '\x1b[31m',
  green_foreground: '\x1b[32m',
  yellow_foreground: '\x1b[33m',
  blue_foreground: '\x1b[34m',
  magenta_foreground: '\x1b[35m',
  cyan_foreground: '\x1b[36m',
  white_foreground: '\x1b[37m',

  black_background: '\x1b[40m',
  red_background: '\x1b[41m',
  green_background: '\x1b[42m',
  yellow_background: '\x1b[43m',
  blue_background: '\x1b[44m',
  magenta_background: '\x1b[45m',
  cyan_background: '\x1b[46m',
  white_background: '\x1b[47m',
};

type ColorOptions = keyof typeof colors;

export default function colorizeText(text: string, color: ColorOptions): string {
  return `${colors[color]}${text}${colors.reset}`;
}
