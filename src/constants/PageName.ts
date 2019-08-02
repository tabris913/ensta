import * as Q from 'querystring';

enum PageName {
  TOP = '/top',

  EVENT_LIST = '/event/list',
  EVENT = '/event',
  SCOUT_LIST = '/scout/list',
  SCOUT = '/scout',

  UNIT_LIST = '/unit/list',
  UNIT = '/unit',
  CHARACTER_LIST = '/character/list',
  CHARACTER = '/character',
  CARD_LIST = '/card/list',
  CARD = '/card',

  UNDEFINED = '',
}

// tslint:disable-next-line array-type
export const toPublicUrl = (page: PageName, suffixList?: (string | number)[], param?: any) => {
  const suffix = suffixList && suffixList.length > 0 ? `/${suffixList.join('/')}` : '';
  const stringifiedParam = param ? `?${Q.stringify(param)}` : '';
  return process.env.PUBLIC_URL + page + suffix + stringifiedParam;
};

export default PageName;
