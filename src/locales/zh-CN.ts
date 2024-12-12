import { LocaleMessages } from "@/types";

const zhCN: LocaleMessages = {
  common: {
    save: "保存",
    cancel: "取消",
    delete: "删除",
    edit: "编辑",
    loading: "加载中...",
    error: "发生错误",
    success: "成功",
  },
  wordList: {
    title: "词库",
    empty: "暂无词库",
    addNew: "添加新词库",
    categories: {
      all: "全部",
      school: "学校",
      dictionary: "词典",
      exam: "考试准备",
      literature: "文学作品",
      custom: "自定义",
    },
  },
  nav: {
    learn: "学习",
    games: "游戏",
    achievements: "成就",
    friends: "好友",
    settings: "设置",
  },
  settings: {
    title: "设置",
    language: "语言",
    theme: "主题",
    wordLists: "词库",
    themes: {
      light: "浅色",
      dark: "深色",
    },
  },
  games: {
    title: "游戏",
    typing: {
      name: "打字游戏",
      description: "通过打字练习词汇",
    },
    shooter: {
      name: "太空射击",
      description: "按顺序输入字母击碎方块",
    },
    puzzle: {
      name: "字母填词",
      description: "在字母网格中寻找单词",
    },
    guessing: {
      name: "猜字母",
      description: "猜测单词中缺失的字母",
    },
  },
  learn: {
    progress: "每日进度",
    wordsLearned: "个单词已学习",
    of: "/",
    longPress: "长按显示更多选项",
    wordCard: {
      save: "保存到词库",
      share: "分享",
      play: "玩游戏",
      like: "收藏",
      speak: "朗读",
      next: "下一个",
      previous: "上一个",
    },
  },
  achievements: {
    title: "你的成就",
    streak: {
      title: "连续学习",
      description: "连续学习天数",
    },
    words: {
      title: "词汇掌握",
      description: "已掌握的单词总数",
    },
    games: {
      title: "游戏高手",
      description: "词汇游戏最高分",
    },
  },
  friends: {
    title: "好友",
    addFriend: "添加好友",
    searchPlaceholder: "搜索好友...",
    noFriends: "暂无好友",
    invite: "邀请好友",
  },
};

export default zhCN;