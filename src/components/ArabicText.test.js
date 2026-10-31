import { describe, expect, it } from 'vitest';
import { extractArabicSpeechText } from './ArabicText.jsx';

describe('Arabic speech text extraction', () => {
  it('keeps Arabic harakat for neural pronunciation', () => {
    expect(extractArabicSpeechText('لِلْكِيلُو')).toBe('لِلْكِيلُو');
  });

  it('removes transliteration and Indonesian meaning from the spoken text', () => {
    expect(extractArabicSpeechText('لِلْكِيلُو lil-kīlū · untuk setiap kilogram')).toBe('لِلْكِيلُو');
  });

  it('preserves a full Arabic phrase and its diacritics', () => {
    expect(extractArabicSpeechText('سِعْرُ اللَّحْمِ')).toBe('سِعْرُ اللَّحْمِ');
  });

  it('returns an empty string when the input contains no Arabic', () => {
    expect(extractArabicSpeechText('harga daging')).toBe('');
  });
});
