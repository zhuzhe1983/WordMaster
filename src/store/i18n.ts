import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LocaleMessages } from '@/types';
import enUS from '@/locales/en-US';
import zhCN from '@/locales/zh-CN';
import jaJP from '@/locales/ja-JP';

type LocaleCode = 'en-US' | 'zh-CN' | 'ja-JP';

interface I18nState {
  locale: LocaleCode;
  messages: LocaleMessages;
  setLocale: (locale: LocaleCode) => void;
}

const locales: Record<LocaleCode, LocaleMessages> = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'ja-JP': jaJP,
};

// Detect browser language
const getBrowserLocale = (): LocaleCode => {
  const browserLang = navigator.language;
  if (browserLang.startsWith('zh')) return 'zh-CN';
  if (browserLang.startsWith('ja')) return 'ja-JP';
  return 'en-US';
};

export const useI18nStore = create<I18nState>()((set) => ({
  locale: getBrowserLocale(),
  messages: locales[getBrowserLocale()],
  setLocale: (locale) => set({
    locale,
    messages: locales[locale],
  }),
}));