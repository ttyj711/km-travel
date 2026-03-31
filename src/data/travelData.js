// 旅行节点数据
export const travelData = [
  {
    id: 1,
    day: '第1天',
    name: '香格里拉',
    location: [99.743582, 27.842185],
    altitude: '3280m',
    desc: '云南迪庆藏族自治州首府，藏语意为"心中的日月"。这里有普达措国家公园、松赞林寺、独克宗古城等著名景点。是进入西藏的重要门户。',
    tips: '建议在此适应海拔1-2天，补充物资。独克宗古城夜景很美，转经筒必打卡。',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=400&fit=crop',
    tags: ['高原古城', '藏文化', '普达措']
  },
  {
    id: 2,
    day: '第2天',
    name: '飞来寺',
    location: [98.881797, 28.444183],
    altitude: '3400m',
    desc: '位于德钦县，是观看梅里雪山日照金山的最佳地点。梅里雪山主峰卡瓦格博海拔6740米，至今无人登顶，是藏区八大神山之首。',
    tips: '清晨是观看日照金山的最佳时间，提前一天到达，住飞来寺附近。运气好能看到完整的梅里十三峰。',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=400&fit=crop',
    tags: ['梅里雪山', '日照金山', '神山']
  },
  {
    id: 3,
    day: '第3-4天',
    name: '察隅',
    location: [97.466919, 28.661280],
    altitude: '2320m',
    desc: '丙察察线的核心路段，被称为"进藏第八条线"。沿途穿越怒江大峡谷，风景壮美但路况险峻，是越野爱好者的终极挑战。',
    tips: '丙察察路段需四驱车，雨天极易塌方。建议结伴而行，备好干粮和水。察隅有"西藏小江南"之称，气候温和。',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop',
    tags: ['丙察察', '越野', '怒江峡谷']
  },
  {
    id: 4,
    day: '第5天',
    name: '墨脱',
    location: [95.332108, 29.325425],
    altitude: '1200m',
    desc: '中国最后一个通公路的县，被称为"隐秘的莲花"。这里有中国最大的原始森林，雅鲁藏布大峡谷的主体部分，是门巴族和珞巴族的聚居地。',
    tips: '墨脱气候湿润多雨，需携带雨具。当地有丰富的热带水果，可以体验门巴族风情。需要边防证。',
    image: 'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800&h=400&fit=crop',
    tags: ['莲花秘境', '原始森林', '雅鲁藏布']
  },
  {
    id: 5,
    day: '第6天',
    name: '尼屋乡',
    location: [94.003388, 30.480716],
    altitude: '3800m',
    desc: '嘉黎县下辖的神秘乡村，近年来因独特的自然风光走红。这里有原始的藏族村落、壮美的雪山冰川，是深度游爱好者的秘境。',
    tips: '尼屋乡是新晋网红地，住宿条件有限，建议自带睡袋。沿途风景绝美，适合摄影。',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    tags: ['秘境', '原始村落', '冰川']
  },
  {
    id: 6,
    day: '第7天',
    name: '林芝',
    location: [94.361436, 29.648750],
    altitude: '3100m',
    desc: '西藏海拔最低的地区，被称为"西藏小瑞士"。每年3-4月桃花盛开，美不胜收。南迦巴瓦峰、雅鲁藏布大峡谷、巴松措等景点闻名遐迩。',
    tips: '林芝是补给和休整的好地方，酒店条件较好。如果时间充裕，可以去巴松措、南迦巴瓦观景台。',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=400&fit=crop',
    tags: ['桃花源', '南迦巴瓦', '巴松措']
  },
  {
    id: 7,
    day: '第8天',
    name: '拉萨',
    location: [91.171924, 29.653491],
    altitude: '3650m',
    desc: '西藏自治区首府，藏传佛教圣地。布达拉宫、大昭寺、八廓街是必游之地。这里汇聚了藏文化的精髓，是每个旅行者心中的圣地。',
    tips: '布达拉宫需要提前预约门票。八廓街购物注意辨别真假。建议停留2天，慢慢感受这座城市。',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&h=400&fit=crop',
    tags: ['布达拉宫', '大昭寺', '圣城']
  },
  {
    id: 8,
    day: '第9天',
    name: '纳木错',
    location: [91.111199, 30.786294],
    altitude: '4718m',
    desc: '西藏三大圣湖之一，世界上海拔最高的咸水湖。湖水清澈湛蓝，念青唐古拉山倒映其中，美如仙境。夜晚可以看到璀璨的星空。',
    tips: '纳木错海拔高，注意高反。建议下午到达看日落，住一晚看星空和日出。住宿条件有限。',
    image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&h=400&fit=crop',
    tags: ['圣湖', '星空', '念青唐古拉']
  },
  {
    id: 9,
    day: '第10天',
    name: '萨普神山',
    location: [93.794711, 31.080287],
    altitude: '4800m',
    desc: '近年火爆的小众秘境，主峰海拔6956米。萨普神山圣湖被誉为"绝世秘境"，冰川湖泊相映成辉，被网友称为"西藏的冰岛"。',
    tips: '萨普景区海拔高，路途遥远，建议做好充分准备。最佳拍摄时间是清晨和傍晚，可以露营看星空。',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=400&fit=crop',
    tags: ['神山', '冰川', '秘境']
  },
  {
    id: 10,
    day: '第11天',
    name: '那曲',
    location: [92.051510, 31.477905],
    altitude: '4500m',
    desc: '藏北高原的重镇，羌塘草原的核心区域。每年8月举办盛大的羌塘赛马节。这里天高云淡，草原辽阔，是体验藏北风情的好地方。',
    tips: '那曲海拔较高，注意保暖和高反。这里虫草品质好，可以选购。美食有手抓羊肉、酸奶。',
    image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&h=400&fit=crop',
    tags: ['羌塘草原', '赛马节', '虫草']
  },
  {
    id: 11,
    day: '第12天',
    name: '安多',
    location: [91.681950, 32.265016],
    altitude: '4700m',
    desc: '青藏公路上的重要节点，是进入青海的最后一站。这里有壮美的高原风光，措那湖是野生动物的天堂。',
    tips: '安多是翻越唐古拉山前的最后一个补给点，建议加满油。住宿条件一般，建议早休息。',
    image: 'https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=800&h=400&fit=crop',
    tags: ['青藏公路', '唐古拉山', '措那湖']
  },
  {
    id: 12,
    day: '第13天',
    name: '格尔木',
    location: [94.928293, 36.407272],
    altitude: '2780m',
    desc: '青海海西州的重要城市，青藏铁路和公路的必经之地。这里有察尔汗盐湖、昆仑山口等景点，是结束西藏之旅、返回内地的理想出口。',
    tips: '翻越唐古拉山口（5231m）是本次行程的最高点，注意高反。到达格尔木后海拔降低，可以好好休息。',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=400&fit=crop',
    tags: ['青藏线', '盐湖', '昆仑山']
  }
]

// 小红书推荐链接
export const xiaohongshuLinks = [
  { name: '香格里拉攻略', keyword: '香格里拉旅游攻略', color: '#FF2442' },
  { name: '梅里雪山', keyword: '梅里雪山日照金山', color: '#FF6B6B' },
  { name: '丙察察路线', keyword: '丙察察进藏', color: '#FF2442' },
  { name: '墨脱秘境', keyword: '墨脱莲花秘境', color: '#FF6B6B' },
  { name: '萨普神山', keyword: '萨普神山', color: '#FF2442' },
  { name: '纳木错星空', keyword: '纳木错星空', color: '#FF6B6B' }
]

// SVG 图标组件 - Heroicons 风格
const icons = {
  health: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>`,
  car: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
    <circle cx="6.5" cy="16.5" r="2.5"/>
    <circle cx="16.5" cy="16.5" r="2.5"/>
  </svg>`,
  clothes: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 4h16v16H4z"/>
    <path d="M4 4l4 4M20 4l-4 4M12 4v4"/>
    <path d="M8 20v-6h8v6"/>
  </svg>`,
  document: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>`,
  phone: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>`,
  fuel: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
    <path d="M3 10h12"/>
    <path d="M15 6h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h0a2 2 0 0 1 2 2v2"/>
    <circle cx="18" cy="18" r="2"/>
  </svg>`
}

// 旅行贴士
export const tipsData = [
  { icon: 'health', iconSvg: icons.health, title: '高原反应预防', desc: '提前服用红景天，携带氧气瓶，避免剧烈运动' },
  { icon: 'car', iconSvg: icons.car, title: '车辆准备', desc: '建议四驱SUV，备好防滑链、备胎、应急工具' },
  { icon: 'clothes', iconSvg: icons.clothes, title: '衣物装备', desc: '羽绒服、冲锋衣、保暖帽、墨镜必备' },
  { icon: 'document', iconSvg: icons.document, title: '证件准备', desc: '身份证、驾驶证、边防证（墨脱、阿里地区）' },
  { icon: 'phone', iconSvg: icons.phone, title: '通讯导航', desc: '下载离线地图，部分路段无信号' },
  { icon: 'fuel', iconSvg: icons.fuel, title: '加油补给', desc: '见站加油，部分路段加油站间隔超200km' }
]
