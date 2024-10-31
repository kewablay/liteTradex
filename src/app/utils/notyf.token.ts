import { isPlatformBrowser } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { Notyf } from 'notyf';

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf | null {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    return new Notyf({
      duration: 3000, // Set your global Notyf configuration here
      position: {
        x: 'right',
        y: 'top',
      },
    });
  }
  return null;
}