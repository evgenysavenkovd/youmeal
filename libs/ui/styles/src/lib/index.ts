import vars from './exports.module.scss';
import { ThemeColors } from './types';

export const variables = vars as unknown as ThemeColors;

export const concat = (...str: (string | undefined)[]) => str.join(' ');
