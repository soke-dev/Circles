
export class Utils {
  /**
   * Capitalize strings
   * @param str string
   * @returns string
   */
  static capitalize(str: string) {
    return (str ?? '')
      .split(' ')
      .map(
        (e) => e.substring(0, 1).toUpperCase() + e.substring(1).toLowerCase(),
      )
      .join('');
  }

  static cleanString(str: string) {
    // Convert to lowercase
    const lowercaseStr = (str ?? '').toLowerCase();

    // Remove emojis, spaces, and non-alphanumeric characters
    const cleanedStr = lowercaseStr.replace(/[^\w]/g, ''); // \w matches alphanumeric characters and underscore

    return cleanedStr;
  }

  /**
   * Removes Special Characters from a string
   * @param arg string
   */
  static sanitizer<T>(arg: any): T {
    const data: any = arg;

    // clean data
    for (const key in arg) {
      const element = data[key];
      // return non string value
      if (
        typeof element === 'string' &&
        element !== undefined &&
        element !== null
      ) {
        data[key] = element.replace(/[^\w@\-_\s\.]/g, '');
      }
    }

    // return clean data
    return data;
  }

  static calculateAge(dateOfBirth: string) {
    // Convert dateOfBirth to a Date object
    const birthDate = new Date(dateOfBirth);

    // Get the current date
    const currentDate = new Date();

    // Calculate the age
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust the age based on the month and day
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() == birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // Return the age
    return age;
  }

  /**
   * Add 'n' days to a specified date and returns the new data in milliseconds
   * @param date DateTime
   * @param days number
   */
  static addDaysToDate(date: Date, days: number): number {
    if (!date) date = new Date();
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000).valueOf();
  }

  static moneyFormat(num: number, symbol?: string) {
    const p = num.toFixed(2).split('.');
    const e = p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i) {
        return num == '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      });
    return `${!symbol ? '₦' : symbol} ${e}.${p[1]}`;
  }

  /**
   * Removes whitespace from string
   * @param text string
   */
  static removeWhitespace(text: string): string {
    return text
      .trim()
      .split('')
      .filter((e) => {
        return e !== ' ';
      })
      .join('');
  }

  /**
   * Add 'n' minutes to a specified date and returns the new data in milliseconds
   * @param minutes number
   * @param date DateTime
   */
  static addMinutesToDate(minutes: number, date?: Date): number {
    if (!date) date = new Date();
    return new Date(date.getTime() + minutes * 60 * 1000).valueOf();
  }

  /**
   * Returns a string representing the current date and time in a specific time zone.
   *
   * @return {string} A string containing the time and date in the format 'time zone'
   */
  static getDateTimeString() {
    // Create a new Date object for the current date and time
    const now = new Date();

    // Format the date string for a specific time zone
    const timeZone = 'Africa/Lagos';
    const dateString = now.toLocaleString('en-US', { dateStyle: "full", timeZone });
    const timeString = now.toLocaleTimeString('en-US', { timeZone });

    return timeString + " " + dateString;
  }


  /**
   * Randoms list of array
   * @param array Array<any>
   */
  static shuffleArray(array: Array<any>): Array<any> {
    return array.sort(() => Math.random() - 0.5);
  }

  /**
   * Generate random (N) char string with optional prefix for customization
   */
  static generateRef(prefix = '', length = 24): string {
    const src =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789TUVWXYZabcdefghGHIJKLM';
    const strLength = src.length;
    let ref = '';

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * strLength);
      ref += src[index];
    }

    return prefix + ref;
  }

  /**
   * Generate random numbers
   * @pram limit: Number (Max is 10)
   */
  static generateNumber(limit = 10) {
    const random = Date.now().toString();

    const salt = Math.floor(100 + Math.random() * 900);

    return Number(`${salt}${random.substring(6, random.length)}`)
      .toString()
      .substring(0, limit);
  }

  /**
   * Mask email address
   * @param arg string
   * @returns string
   */
  static maskEmail(arg: string) {
    const arr = arg.split('@');
    return `${arr[0].substring(0, arr[0].length / 2)}****@${arr[1]}`;
  }

  /**
   * Mask telephone number
   * @param arg string
   * @returns string
   */
  static maskTel(arg: string) {
    return `*****${arg.substring(arg.length - 4, arg.length)}`;
  }

  static getBankNubanNumber(bank: string): string {
    return [
      { bank: 'ACCESS BANK', code: '044' },
      { bank: 'ACCESSMOBILE', code: '323' },
      { bank: 'DIAMOND BANK', code: '063' },
      { bank: 'ECOBANK NIGERIA', code: '050' },
      { bank: 'ECOMOBILE', code: '307' },
      { bank: 'FIDELITY BANK', code: '070' },
      { bank: 'FIDELITY MOBILE', code: '318' },
      { bank: 'FIRST BANK OF NIGERIA', code: '011' },
      { bank: 'GT MOBILE MONEY', code: '315' },
      { bank: 'GUARANTY TRUST BANK', code: '058' },
      { bank: 'HERITAGE BANK', code: '030' },
      { bank: 'KEYSTONE BANK', code: '082' },
      { bank: 'SKYE BANK', code: '076' },
      { bank: 'STANBIC IBTC BANK', code: '221' },
      { bank: 'STANBIC MOBILE', code: '304' },
      { bank: 'STERLING BANK', code: '232' },
      { bank: 'STERLING MOBILE', code: '326' },
      { bank: 'UNION BANK OF NIGERIA', code: '032' },
      { bank: 'UNITED BANK FOR AFRICA', code: '033' },
      { bank: 'UNITY BANK', code: '215' },
      { bank: 'WEMA BANK', code: '035' },
      { bank: 'ZENITH BANK', code: '057' },
      { bank: 'ZENITH MOBILE', code: '322' },
    ].filter(
      (e) => e.bank.trim().toLocaleUpperCase() === bank.trim().toUpperCase(),
    )[0].code;
  }

  /**
   * Checks if a file mime type is valid
   * @param mimeType string
   * @param whiteList Array<string>
   * @returns boolean
   */
  isMimeTypeValid(mimeType: string, whiteList: Array<string>): boolean {
    return whiteList.includes(mimeType.toLowerCase());
  }

  static numToWord(num: number): string {
    const words = [
      '',
      'First',
      'Second',
      'Third',
      'Fourth',
      'Fifth',
      'Sixth',
      'Seventh',
      'Eighth',
      'Ninth',
      'Tenth',
      'Eleventh',
      'Twelfth',
      'Thirteenth',
      'Fourteenth',
      'Fifteenth',
      'Sixteenth',
      'Seventeenth',
      'Eighteenth',
      'Nineteenth',
      'Twentieth',
      'Twenty-First',
      'Twenty-Second',
      'Twenty-Third',
      'Twenty-Fourth',
      'Twenty-Fifth',
      'Twenty-Sixth',
      'Twenty-Seventh',
      'Twenty-Eighth',
      'Twenty-Ninth',
      'Thirtieth',
      'Thirty-First',
      'Thirty-Second',
      'Thirty-Third',
      'Thirty-Fourth',
      'Thirty-Fifth',
      'Thirty-Sixth',
      'Thirty-Seventh',
      'Thirty-Eighth',
      'Thirty-Ninth',
      'Fortieth',
      'Forty-First',
      'Forty-Second',
      'Forty-Third',
      'Forty-Fourth',
      'Forty-Fifth',
      'Forty-Sixth',
      'Forty-Seventh',
      'Forty-Eighth',
      'Forty-Ninth',
      'Fiftieth',
      'Fifty-First',
      'Fifty-Second',
      'Fifty-Third',
      'Fifty-Fourth',
      'Fifty-Fifth',
      'Fifty-Sixth',
      'Fifty-Seventh',
      'Fifty-Eighth',
      'Fifty-Ninth',
      'Sixtieth',
      'Sixty-First',
      'Sixty-Second',
      'Sixty-Third',
      'Sixty-Fourth',
      'Sixty-Fifth',
      'Sixty-Sixth',
      'Sixty-Seventh',
      'Sixty-Eighth',
      'Sixty-Ninth',
      'Seventieth',
      'Seventy-First',
      'Seventy-Second',
      'Seventy-Third',
      'Seventy-Fourth',
      'Seventy-Fifth',
      'Seventy-Sixth',
      'Seventy-Seventh',
      'Seventy-Eighth',
      'Seventy-Ninth',
      'Eightieth',
      'Eighty-First',
      'Eighty-Second',
      'Eighty-Third',
      'Eighty-Fourth',
      'Eighty-Fifth',
      'Eighty-Sixth',
      'Eighty-Seventh',
      'Eighty-Eighth',
      'Eighty-Ninth',
      'Ninetieth',
      'Ninety-First',
      'Ninety-Second',
      'Ninety-Third',
      'Ninety-Fourth',
      'Ninety-Fifth',
      'Ninety-Sixth',
      'Ninety-Seventh',
      'Ninety-Eighth',
      'Ninety-Ninth',
      'Hundredth',
    ];

    if (num < 1 || num > 100) {
      return 'Number out of range';
    }

    return words[num];
  }
}

export default Utils;
