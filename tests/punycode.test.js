import { toUnicode, toASCII } from 'punycode';

describe('punycode conversion', () => {
  describe('toASCII', () => {
    test('converts unicode domain to punycode', () => {
      expect(toASCII('日本語.jp')).toBe('xn--wgv71a119e.jp');
    });

    test('keeps ASCII domain unchanged', () => {
      expect(toASCII('example.com')).toBe('example.com');
    });

    test('converts emoji domain', () => {
      const result = toASCII('💩.la');
      expect(result).toMatch(/^xn--.*\.la$/);
    });

    test('handles empty string', () => {
      expect(toASCII('')).toBe('');
    });
  });

  describe('toUnicode', () => {
    test('converts punycode domain to unicode', () => {
      expect(toUnicode('xn--wgv71a119e.jp')).toBe('日本語.jp');
    });

    test('keeps ASCII domain unchanged', () => {
      expect(toUnicode('example.com')).toBe('example.com');
    });

    test('handles empty string', () => {
      expect(toUnicode('')).toBe('');
    });
  });

  describe('round-trip conversion', () => {
    const domains = [
      '日本語.jp',
      'münchen.de',
      '例え.jp',
      'example.com',
    ];

    test.each(domains)('%s survives round-trip', (domain) => {
      expect(toUnicode(toASCII(domain))).toBe(domain);
    });
  });
});
