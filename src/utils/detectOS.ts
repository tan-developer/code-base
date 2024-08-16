import type { UserOS } from '@/types/IUserOS';

export const detectOsInUserAgent = (userAgent: string | undefined): UserOS => {
  const osMatch = userAgent?.match(/(Win|Mac|Linux)/);
  switch (osMatch && osMatch[1]) {
    case 'Win':
      return 'WIN';
    case 'Mac':
      return 'MAC';
    case 'Linux':
      return 'LINUX';
    case 'AIX':
      return 'AIX';
    default:
      return 'OTHER';
  }
};

export const detectOS = (): UserOS => detectOsInUserAgent(navigator?.userAgent);