import { LocaleMessages } from '@/types';

const jaJP: LocaleMessages = {
  common: {
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    loading: '読み込み中...',
    error: 'エラーが発生しました',
    success: '成功',
  },
  wordList: {
    title: '単語リスト',
    empty: '単語リストが見つかりません',
    addNew: '新規リスト作成',
    categories: {
      all: 'すべて',
      school: '学校',
      dictionary: '辞書',
      exam: '試験対策',
      literature: '文学',
      custom: 'カスタム',
    },
  },
  nav: {
    learn: '学習',
    games: 'ゲーム',
    achievements: '実績',
    friends: '友達',
    settings: '設定',
  },
  settings: {
    title: '設定',
    language: '言語',
    theme: 'テーマ',
    wordLists: '単語リスト',
    themes: {
      light: 'ライト',
      dark: 'ダーク',
    },
  },
  games: {
    title: 'ゲーム',
    typing: {
      name: 'タイピングゲーム',
      description: '単語を入力して練習しましょう',
    },
    shooter: {
      name: 'スペースシューター',
      description: '文字を順番に入力してブロックを破壊',
    },
  },
  learn: {
    progress: '今日の進捗',
    wordsLearned: '単語を学習済み',
    of: '/',
    longPress: '長押しで他のオプションを表示',
  },
};

export default jaJP;