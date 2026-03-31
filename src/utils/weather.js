// 天气数据
export const weatherData = {
  '拉萨': {
    city: '拉萨市',
    temp: 17,
    nightTemp: 2,
    weather: '多云',
    nightWeather: '多云',
    wind: '北风1-3级',
    forecast: [
      { date: '03-31', day: '多云', night: '雨夹雪', high: '18', low: '2' },
      { date: '04-01', day: '多云', night: '多云', high: '16', low: '3' },
      { date: '04-02', day: '多云', night: '晴', high: '16', low: '3' }
    ]
  },
  '林芝': {
    city: '林芝市',
    temp: 16,
    nightTemp: 5,
    weather: '多云',
    nightWeather: '多云',
    wind: '北风1-3级',
    forecast: [
      { date: '03-31', day: '多云', night: '小雨', high: '18', low: '5' },
      { date: '04-01', day: '小雨', night: '小雨', high: '14', low: '6' },
      { date: '04-02', day: '小雨', night: '晴', high: '18', low: '3' }
    ]
  },
  '香格里拉': {
    city: '香格里拉市',
    temp: 12,
    nightTemp: 0,
    weather: '阴',
    nightWeather: '阴',
    wind: '西南风1-3级',
    forecast: [
      { date: '03-31', day: '多云', night: '多云', high: '17', low: '0' },
      { date: '04-01', day: '小雨', night: '多云', high: '13', low: '0' },
      { date: '04-02', day: '小雨', night: '阴', high: '9', low: '-1' }
    ]
  },
  '那曲': {
    city: '那曲市',
    temp: 7,
    nightTemp: -7,
    weather: '多云',
    nightWeather: '多云',
    wind: '北风1-3级',
    forecast: [
      { date: '03-31', day: '多云', night: '雨夹雪', high: '11', low: '-7' },
      { date: '04-01', day: '多云', night: '晴', high: '7', low: '-5' },
      { date: '04-02', day: '多云', night: '晴', high: '6', low: '-7' }
    ]
  },
  '格尔木': {
    city: '格尔木市',
    temp: 8,
    nightTemp: -3,
    weather: '晴',
    nightWeather: '晴',
    wind: '西北风1-3级',
    forecast: [
      { date: '03-31', day: '晴', night: '阴', high: '17', low: '-2' },
      { date: '04-01', day: '多云', night: '阴', high: '15', low: '0' },
      { date: '04-02', day: '多云', night: '多云', high: '15', low: '0' }
    ]
  }
}

// SVG 天气图标 - 使用 Heroicons 风格
export const weatherIcons = {
  '晴': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>`,
  '多云': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M8 22h8a4 4 0 0 0 0-8h-.5a5.5 5.5 0 0 0-11 0A4 4 0 0 0 8 22z"/>
    <path d="M16 14a4 4 0 0 0 0-8h-.5a5.5 5.5 0 0 0-9.96 1.5" opacity="0.5"/>
  </svg>`,
  '阴': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>`,
  '小雨': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 13h-2.5a5.5 5.5 0 0 0-11 0H2"/>
    <path d="M16 13a4 4 0 0 1 0 8H8"/>
    <path d="M8 19v2M12 19v2M16 19v2" stroke-linecap="round"/>
  </svg>`,
  '中雨': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 11h-2.5a5.5 5.5 0 0 0-11 0H2"/>
    <path d="M16 11a4 4 0 0 1 0 8H8"/>
    <path d="M6 19v2M10 19v2M14 19v2M18 19v2" stroke-linecap="round"/>
  </svg>`,
  '大雨': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 9h-2.5a5.5 5.5 0 0 0-11 0H2"/>
    <path d="M16 9a4 4 0 0 1 0 8H8"/>
    <path d="M5 17v3M9 17v3M13 17v3M17 17v3M7 21v2M11 21v2M15 21v2" stroke-linecap="round"/>
  </svg>`,
  '雨夹雪': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 11h-2.5a5.5 5.5 0 0 0-11 0H2"/>
    <path d="M16 11a4 4 0 0 1 0 8H8"/>
    <path d="M6 19v2M10 19v2" stroke-linecap="round"/>
    <circle cx="15" cy="20" r="1" fill="currentColor"/>
    <circle cx="18" cy="18" r="1" fill="currentColor"/>
  </svg>`,
  '小雪': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 11h-2.5a5.5 5.5 0 0 0-11 0H2"/>
    <path d="M16 11a4 4 0 0 1 0 8H8"/>
    <circle cx="8" cy="20" r="1" fill="currentColor"/>
    <circle cx="12" cy="20" r="1" fill="currentColor"/>
    <circle cx="16" cy="20" r="1" fill="currentColor"/>
  </svg>`,
  '中雪': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 11h-2.5a5.5 5.5 0 0 0-11 0H2"/>
    <path d="M16 11a4 4 0 0 1 0 8H8"/>
    <circle cx="6" cy="20" r="1.5" fill="currentColor"/>
    <circle cx="10" cy="20" r="1.5" fill="currentColor"/>
    <circle cx="14" cy="20" r="1.5" fill="currentColor"/>
    <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
  </svg>`,
  '大雪': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 9h-2.5a5.5 5.5 0 0 0-11 0H2"/>
    <path d="M16 9a4 4 0 0 1 0 8H8"/>
    <circle cx="5" cy="19" r="1.5" fill="currentColor"/>
    <circle cx="8" cy="21" r="1.5" fill="currentColor"/>
    <circle cx="11" cy="19" r="1.5" fill="currentColor"/>
    <circle cx="14" cy="21" r="1.5" fill="currentColor"/>
    <circle cx="17" cy="19" r="1.5" fill="currentColor"/>
  </svg>`,
  '雾': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 14h16M4 18h16M4 10h16" stroke-linecap="round"/>
  </svg>`,
  '霾': `<svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="8" r="3" opacity="0.4"/>
    <path d="M4 14h16M4 18h16" stroke-linecap="round" opacity="0.6"/>
  </svg>`
}

// 获取天气图标 SVG
export function getWeatherIcon(weather) {
  return weatherIcons[weather] || weatherIcons['多云']
}

// 城市列表
export const cityList = ['拉萨', '林芝', '香格里拉', '那曲', '格尔木']
