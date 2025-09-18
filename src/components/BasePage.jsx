import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Calendar, MapPin, Users, Flag, Sword, Building, Clock, ArrowRight, Star, Info } from 'lucide-react'
import wuyishanCultureImg from '../assets/wuyishan-culture.jpg'
import zhuxiAcademyImg from '../assets/zhuxi-academy.jpg'
import minyueCityImg from '../assets/minyue-city.jpeg'
import fujianRedSitesImg from '../assets/fujian-red-sites.jpg'

const BasePage = ({ searchTerm }) => {
  const [filteredContent, setFilteredContent] = useState(null)
  const [selectedBase, setSelectedBase] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 福建革命根据地数据
  const revolutionaryBases = [
    {
      id: 1,
      name: '闽西革命根据地',
      period: '1929年6月-1931年9月',
      location: '龙岩、上杭、永定、连城等地',
      image: fujianRedSitesImg,
      category: 'main',
      description: '中国共产党在闽西地区建立的重要苏区，是中央苏区的重要组成部分。',
      establishment: '1929年6月21日，闽西第一次工农兵代表大会召开，宣告闽西苏维埃政府成立。',
      leadership: ['邓子恢', '张鼎丞', '谭震林', '毛泽东', '朱德'],
      majorEvents: [
        '闽西暴动',
        '古田会议',
        '才溪乡调查',
        '闽西苏维埃政府成立'
      ],
      significance: '为中央苏区的形成和发展奠定了重要基础，是毛泽东思想形成的重要实践基地。',
      achievements: [
        '建立了完整的苏维埃政权体系',
        '进行了土地革命',
        '发展了红军武装',
        '开展了文化教育事业'
      ],
      relatedSites: [
        '古田会议纪念馆',
        '闽西革命纪念馆',
        '才溪乡调查纪念馆',
        '长汀革命旧址群'
      ],
      area: '约2万平方公里',
      population: '约100万人',
      redArmySize: '约3万人',
      historicalContext: '在第二次国内革命战争时期，中国共产党在农村建立革命根据地的重要实践。'
    },
    {
      id: 2,
      name: '闽东革命根据地',
      period: '1934年-1938年',
      location: '宁德、福安、寿宁、周宁等地',
      image: wuyishanCultureImg,
      category: 'main',
      description: '中国共产党在闽东地区建立的革命根据地，坚持了艰苦的游击战争。',
      establishment: '1934年，在叶飞等人领导下，闽东地区建立了革命根据地。',
      leadership: ['叶飞', '曾志', '范式人', '阮英平'],
      majorEvents: [
        '闽东独立师成立',
        '闽东苏维埃政府成立',
        '三年游击战争',
        '抗日民族统一战线建立'
      ],
      significance: '在极其困难的条件下坚持了革命斗争，为抗日战争的胜利作出了贡献。',
      achievements: [
        '建立了闽东苏维埃政府',
        '组建了闽东独立师',
        '开展了土地革命',
        '坚持了三年游击战争'
      ],
      relatedSites: [
        '闽东革命纪念馆',
        '叶飞故居',
        '闽东苏维埃政府旧址',
        '柏柱洋革命旧址群'
      ],
      area: '约1.5万平方公里',
      population: '约80万人',
      redArmySize: '约2万人',
      historicalContext: '在中央红军长征后，南方各革命根据地坚持游击战争的重要组成部分。'
    },
    {
      id: 3,
      name: '闽北革命根据地',
      period: '1928年-1935年',
      location: '建阳、浦城、崇安、光泽等地',
      image: zhuxiAcademyImg,
      category: 'main',
      description: '中国共产党在闽北地区建立的革命根据地，与闽西根据地相呼应。',
      establishment: '1928年，在黄道等人领导下，闽北地区开始建立革命根据地。',
      leadership: ['黄道', '方志敏', '邵式平', '曾镜冰'],
      majorEvents: [
        '崇安暴动',
        '闽北分区苏维埃政府成立',
        '红军北上抗日先遣队过境',
        '三年游击战争'
      ],
      significance: '连接了闽西和赣东北根据地，为红军北上抗日提供了重要支持。',
      achievements: [
        '建立了闽北分区苏维埃政府',
        '组建了闽北红军',
        '开展了土地革命',
        '发展了根据地经济'
      ],
      relatedSites: [
        '闽北革命纪念馆',
        '黄道故居',
        '崇安暴动纪念馆',
        '大安红色旧址群'
      ],
      area: '约1万平方公里',
      population: '约60万人',
      redArmySize: '约1.5万人',
      historicalContext: '作为闽浙赣革命根据地的重要组成部分，发挥了重要的战略作用。'
    },
    {
      id: 4,
      name: '闽南革命根据地',
      period: '1928年-1934年',
      location: '漳州、厦门、泉州等地',
      image: minyueCityImg,
      category: 'secondary',
      description: '中国共产党在闽南地区建立的革命根据地，具有重要的战略地位。',
      establishment: '1928年，在罗明等人领导下，闽南地区开始建立革命根据地。',
      leadership: ['罗明', '邓子恢', '张鼎丞', '毛泽东'],
      majorEvents: [
        '平和暴动',
        '漳州战役',
        '闽南苏维埃政府成立',
        '红军攻占漳州'
      ],
      significance: '控制了重要的沿海地区，为革命提供了重要的物资和人员支持。',
      achievements: [
        '建立了闽南苏维埃政府',
        '组建了闽南红军',
        '开展了土地革命',
        '发展了海上交通线'
      ],
      relatedSites: [
        '平和暴动纪念馆',
        '漳州战役纪念馆',
        '毛主席率领红军攻克漳州纪念馆',
        '闽南革命纪念馆'
      ],
      area: '约8000平方公里',
      population: '约50万人',
      redArmySize: '约1万人',
      historicalContext: '在沿海地区建立革命根据地，为革命提供了重要的对外联系通道。'
    },
    {
      id: 5,
      name: '武夷山革命根据地',
      period: '1930年-1935年',
      location: '武夷山、建阳、浦城等地',
      image: wuyishanCultureImg,
      category: 'historical',
      description: '依托武夷山地区的地理优势建立的革命根据地，具有重要的历史文化价值。',
      establishment: '1930年，利用武夷山地区的山区优势，建立了革命根据地。',
      leadership: ['黄道', '曾镜冰', '饶守坤'],
      majorEvents: [
        '武夷山游击队成立',
        '建立秘密交通线',
        '开展抗日宣传',
        '坚持游击战争'
      ],
      significance: '结合了丰富的历史文化资源，为革命斗争提供了独特的文化支撑。',
      achievements: [
        '建立了游击队根据地',
        '开辟了秘密交通线',
        '保护了革命文物',
        '传承了革命精神'
      ],
      relatedSites: [
        '武夷山革命纪念馆',
        '赤石暴动旧址',
        '革命烈士陵园',
        '红军洞'
      ],
      area: '约5000平方公里',
      population: '约30万人',
      redArmySize: '约8000人',
      historicalContext: '在历史文化名山中开展革命斗争，体现了革命与文化的结合。'
    }
  ]

  const categories = [
    { id: 'all', name: '全部根据地', icon: Flag, count: revolutionaryBases.length },
    { id: 'main', name: '主要根据地', icon: Star, count: revolutionaryBases.filter(b => b.category === 'main').length },
    { id: 'secondary', name: '重要根据地', icon: Building, count: revolutionaryBases.filter(b => b.category === 'secondary').length },
    { id: 'historical', name: '历史文化根据地', icon: Info, count: revolutionaryBases.filter(b => b.category === 'historical').length }
  ]

  // 搜索和分类过滤功能
  useEffect(() => {
    let filtered = revolutionaryBases

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(base => base.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(base =>
        base.name.includes(searchTerm) ||
        base.description.includes(searchTerm) ||
        base.location.includes(searchTerm) ||
        base.leadership.some(leader => leader.includes(searchTerm)) ||
        base.majorEvents.some(event => event.includes(searchTerm))
      )
    }

    setFilteredContent({ bases: filtered })
  }, [searchTerm, selectedCategory])

  const displayBases = filteredContent ? filteredContent.bases : 
    (selectedCategory === 'all' ? revolutionaryBases : revolutionaryBases.filter(base => base.category === selectedCategory))

  const getCategoryColor = (category) => {
    switch (category) {
      case 'main': return 'bg-red-100 text-red-700 border-red-200'
      case 'secondary': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'historical': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getCategoryName = (category) => {
    switch (category) {
      case 'main': return '主要根据地'
      case 'secondary': return '重要根据地'
      case 'historical': return '历史文化根据地'
      default: return '其他'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* 页面标题 */}
      <section className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              福建革命根据地
            </h1>
            <p className="text-xl text-red-100 mb-6">
              探索福建省各个革命根据地的光辉历史，感受革命先辈的英勇斗争精神，
              了解这些红色热土在中国革命史上的重要地位和深远影响。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-yellow-400 text-red-800">
                <Flag className="w-4 h-4 mr-2" />
                {revolutionaryBases.length}个根据地
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-yellow-400 text-red-800">
                <Users className="w-4 h-4 mr-2" />
                革命摇篮
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 分类筛选 */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`${
                    selectedCategory === category.id 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'border-red-600 text-red-600 hover:bg-red-50'
                  } px-6 py-3`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name}
                  <Badge 
                    variant="secondary" 
                    className="ml-2 bg-white text-red-600"
                  >
                    {category.count}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 搜索结果提示 */}
      {searchTerm && (
        <section className="py-8 bg-red-100">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-800 mb-2">
                搜索结果："{searchTerm}"
              </h2>
              <p className="text-red-600">
                找到 {displayBases.length} 个相关根据地
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 根据地列表 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayBases.map((base) => (
              <Card 
                key={base.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedBase(base)}
              >
                <div className="relative">
                  <img 
                    src={base.image} 
                    alt={base.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(base.category)}>
                      {getCategoryName(base.category)}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-white bg-opacity-90 rounded-full px-3 py-1">
                      <Clock className="w-4 h-4 text-gray-600 mr-1" />
                      <span className="text-sm font-medium">{base.period.split('-')[0]}</span>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-red-800">{base.name}</CardTitle>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{base.period}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{base.location}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 mb-4 leading-relaxed">
                    {base.description}
                  </CardDescription>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">主要领导人：</p>
                      <div className="flex flex-wrap gap-1">
                        {base.leadership.slice(0, 4).map((leader, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {leader}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">重要事件：</p>
                      <div className="flex flex-wrap gap-1">
                        {base.majorEvents.slice(0, 3).map((event, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-red-100 text-red-700">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm text-gray-500">
                        面积：{base.area}
                      </div>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        详细了解
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {displayBases.length === 0 && (
            <div className="text-center py-16">
              <Flag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">暂无相关根据地</h3>
              <p className="text-gray-500">请尝试其他搜索条件或分类</p>
            </div>
          )}
        </div>
      </section>

      {/* 根据地统计 */}
      <section className="py-16 bg-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">福建革命根据地统计</h2>
            <p className="text-xl text-red-100">
              数字见证福建革命根据地的辉煌历程
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">5个</div>
              <div className="text-xl">主要根据地</div>
              <div className="text-red-200 mt-2">覆盖全省各地区</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">300万</div>
              <div className="text-xl">根据地人口</div>
              <div className="text-red-200 mt-2">支持革命的群众</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">8万</div>
              <div className="text-xl">红军战士</div>
              <div className="text-red-200 mt-2">英勇的革命战士</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">10年</div>
              <div className="text-xl">斗争历程</div>
              <div className="text-red-200 mt-2">坚持不懈的斗争</div>
            </div>
          </div>
        </div>
      </section>

      {/* 根据地详情模态框 */}
      {selectedBase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedBase.image} 
                alt={selectedBase.name}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setSelectedBase(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-gray-600 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4">
                <Badge className={getCategoryColor(selectedBase.category)}>
                  {getCategoryName(selectedBase.category)}
                </Badge>
              </div>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold text-red-800">{selectedBase.name}</h3>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span className="text-lg">{selectedBase.period}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{selectedBase.location}</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedBase.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                    <Flag className="w-5 h-5 mr-2" />
                    建立过程
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{selectedBase.establishment}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    历史意义
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{selectedBase.significance}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="text-lg font-bold text-red-800 mb-2">基本数据</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>面积：</span>
                      <span className="font-medium">{selectedBase.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>人口：</span>
                      <span className="font-medium">{selectedBase.population}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>红军规模：</span>
                      <span className="font-medium">{selectedBase.redArmySize}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-lg font-bold text-red-800 mb-2">主要领导人</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedBase.leadership.map((leader, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {leader}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-lg font-bold text-red-800 mb-2">历史背景</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedBase.historicalContext}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                  <Sword className="w-5 h-5 mr-2" />
                  重要事件
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedBase.majorEvents.map((event, index) => (
                    <Badge key={index} variant="secondary" className="text-center py-2 bg-red-100 text-red-700">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  主要成就
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedBase.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  相关遗址
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedBase.relatedSites.map((site, index) => (
                    <Badge key={index} variant="outline" className="text-center py-2 border-red-200">
                      <Building className="w-3 h-3 mr-1" />
                      {site}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BasePage

