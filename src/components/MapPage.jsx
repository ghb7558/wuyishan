import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { MapPin, Star, Clock, Camera, Mountain, Building2, TreePine, Waves, Info } from 'lucide-react'
import fujianTulouImg from '../assets/fujian-tulou.jpg'
import songmaolingImg from '../assets/songmaoling-site.jpeg'
import fujianRedSitesImg from '../assets/fujian-red-sites.jpg'

const MapPage = ({ searchTerm }) => {
  const [filteredContent, setFilteredContent] = useState(null)
  const [selectedSite, setSelectedSite] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 福建省历史旅游景点数据
  const historicalSites = [
    {
      id: 1,
      name: '古田会议纪念馆',
      category: 'red',
      city: '龙岩市',
      district: '上杭县',
      description: '全国重点文物保护单位，展示古田会议的历史意义和革命文物。',
      image: fujianRedSitesImg,
      rating: 5,
      visitTime: '2-3小时',
      highlights: ['古田会议会址', '毛泽东纪念园', '革命文物展览'],
      significance: '确立了思想建党、政治建军的原则',
      coordinates: { lat: 25.0, lng: 116.8 },
      tags: ['红色旅游', '革命纪念', '爱国教育'],
      openTime: '8:00-17:30',
      ticketPrice: '免费'
    },
    {
      id: 2,
      name: '武夷山风景名胜区',
      category: 'cultural',
      city: '南平市',
      district: '武夷山市',
      description: '世界文化与自然双遗产，拥有丰富的历史文化和自然景观。',
      image: fujianTulouImg,
      rating: 5,
      visitTime: '1-2天',
      highlights: ['九曲溪', '天游峰', '武夷精舍', '闽越王城遗址'],
      significance: '朱子理学发源地，闽越文化重要遗址',
      coordinates: { lat: 27.7, lng: 117.7 },
      tags: ['世界遗产', '自然风光', '历史文化'],
      openTime: '6:30-18:00',
      ticketPrice: '140元'
    },
    {
      id: 3,
      name: '松毛岭战役遗址',
      category: 'red',
      city: '龙岩市',
      district: '连城县',
      description: '中央红军长征前最后一战的战场遗址，具有重要的历史意义。',
      image: songmaolingImg,
      rating: 4,
      visitTime: '2-3小时',
      highlights: ['战壕遗址', '纪念碑', '红军烈士陵园'],
      significance: '中央红军长征前的重要战役',
      coordinates: { lat: 25.7, lng: 116.7 },
      tags: ['红色旅游', '战役遗址', '革命教育'],
      openTime: '8:00-17:00',
      ticketPrice: '免费'
    },
    {
      id: 4,
      name: '福建土楼',
      category: 'cultural',
      city: '漳州市',
      district: '南靖县',
      description: '世界文化遗产，客家民居建筑的杰出代表。',
      image: fujianTulouImg,
      rating: 5,
      visitTime: '半天',
      highlights: ['田螺坑土楼群', '承启楼', '振成楼'],
      significance: '客家文化的重要载体，建筑艺术的瑰宝',
      coordinates: { lat: 24.5, lng: 117.0 },
      tags: ['世界遗产', '客家文化', '古建筑'],
      openTime: '8:00-17:30',
      ticketPrice: '90元'
    },
    {
      id: 5,
      name: '长汀革命旧址群',
      category: 'red',
      city: '龙岩市',
      district: '长汀县',
      description: '中央苏区的重要组成部分，保存了大量革命文物和旧址。',
      image: fujianRedSitesImg,
      rating: 4,
      visitTime: '3-4小时',
      highlights: ['福建省苏维埃政府旧址', '红军医院', '毛泽东旧居'],
      significance: '中央苏区的重要政治、经济、文化中心',
      coordinates: { lat: 25.8, lng: 116.4 },
      tags: ['红色旅游', '苏区文化', '革命教育'],
      openTime: '8:00-17:30',
      ticketPrice: '免费'
    },
    {
      id: 6,
      name: '泰宁大金湖',
      category: 'natural',
      city: '三明市',
      district: '泰宁县',
      description: '世界自然遗产，丹霞地貌的典型代表。',
      image: fujianTulouImg,
      rating: 5,
      visitTime: '1天',
      highlights: ['丹霞地貌', '金湖游船', '甘露寺'],
      significance: '中国丹霞地貌的重要组成部分',
      coordinates: { lat: 26.9, lng: 117.2 },
      tags: ['世界遗产', '自然风光', '丹霞地貌'],
      openTime: '7:30-17:30',
      ticketPrice: '80元'
    },
    {
      id: 7,
      name: '鼓浪屿',
      category: 'cultural',
      city: '厦门市',
      district: '思明区',
      description: '世界文化遗产，近代建筑博物馆。',
      image: fujianTulouImg,
      rating: 5,
      visitTime: '1天',
      highlights: ['万国建筑', '钢琴博物馆', '日光岩'],
      significance: '中西文化交融的历史见证',
      coordinates: { lat: 24.4, lng: 118.1 },
      tags: ['世界遗产', '近代建筑', '文化交融'],
      openTime: '全天开放',
      ticketPrice: '船票35元'
    },
    {
      id: 8,
      name: '三坊七巷',
      category: 'cultural',
      city: '福州市',
      district: '鼓楼区',
      description: '中国都市仅存的一块里坊制度活化石。',
      image: fujianTulouImg,
      rating: 4,
      visitTime: '半天',
      highlights: ['明清古建筑', '名人故居', '传统文化'],
      significance: '福州历史文化的重要载体',
      coordinates: { lat: 26.1, lng: 119.3 },
      tags: ['古建筑', '历史街区', '传统文化'],
      openTime: '全天开放',
      ticketPrice: '免费'
    }
  ]

  const categories = [
    { id: 'all', name: '全部景点', icon: MapPin, count: historicalSites.length },
    { id: 'red', name: '红色旅游', icon: Star, count: historicalSites.filter(s => s.category === 'red').length },
    { id: 'cultural', name: '文化遗产', icon: Building2, count: historicalSites.filter(s => s.category === 'cultural').length },
    { id: 'natural', name: '自然景观', icon: TreePine, count: historicalSites.filter(s => s.category === 'natural').length }
  ]

  // 搜索和分类过滤功能
  useEffect(() => {
    let filtered = historicalSites

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(site => site.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(site =>
        site.name.includes(searchTerm) ||
        site.description.includes(searchTerm) ||
        site.city.includes(searchTerm) ||
        site.district.includes(searchTerm) ||
        site.tags.some(tag => tag.includes(searchTerm)) ||
        site.highlights.some(highlight => highlight.includes(searchTerm))
      )
    }

    setFilteredContent({ sites: filtered })
  }, [searchTerm, selectedCategory])

  const displaySites = filteredContent ? filteredContent.sites : 
    (selectedCategory === 'all' ? historicalSites : historicalSites.filter(site => site.category === selectedCategory))

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'red': return Star
      case 'cultural': return Building2
      case 'natural': return TreePine
      default: return MapPin
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'red': return 'bg-red-100 text-red-700 border-red-200'
      case 'cultural': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'natural': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
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
              福建省历史旅游地图
            </h1>
            <p className="text-xl text-red-100 mb-6">
              探索福建省丰富的历史文化旅游景点，感受八闽大地的深厚底蕴
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-yellow-400 text-red-800">
                <MapPin className="w-4 h-4 mr-2" />
                {historicalSites.length}个景点
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-yellow-400 text-red-800">
                <Star className="w-4 h-4 mr-2" />
                世界遗产地
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
                找到 {displaySites.length} 个相关景点
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 景点列表 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displaySites.map((site) => {
              const IconComponent = getCategoryIcon(site.category)
              return (
                <Card 
                  key={site.id} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedSite(site)}
                >
                  <div className="relative">
                    <img 
                      src={site.image} 
                      alt={site.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(site.category)}>
                        <IconComponent className="w-3 h-3 mr-1" />
                        {site.category === 'red' ? '红色旅游' : 
                         site.category === 'cultural' ? '文化遗产' : '自然景观'}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{site.rating}</span>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-red-800">{site.name}</CardTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{site.city} · {site.district}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700 mb-4 leading-relaxed">
                      {site.description}
                    </CardDescription>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>游览时间：{site.visitTime}</span>
                        </div>
                        <div className="font-medium text-red-600">
                          {site.ticketPrice}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">主要看点：</p>
                        <div className="flex flex-wrap gap-1">
                          {site.highlights.slice(0, 3).map((highlight, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {displaySites.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">暂无相关景点</h3>
              <p className="text-gray-500">请尝试其他搜索条件或分类</p>
            </div>
          )}
        </div>
      </section>

      {/* 福建省旅游统计 */}
      <section className="py-16 bg-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">福建旅游数据</h2>
            <p className="text-xl text-red-100">
              数字见证福建丰富的旅游资源
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">5个</div>
              <div className="text-xl">世界遗产</div>
              <div className="text-red-200 mt-2">文化与自然双遗产</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-xl">红色景点</div>
              <div className="text-red-200 mt-2">革命文物保护单位</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">300+</div>
              <div className="text-xl">历史文物</div>
              <div className="text-red-200 mt-2">各级文物保护单位</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">84个</div>
              <div className="text-xl">革命老区县</div>
              <div className="text-red-200 mt-2">覆盖全省各地</div>
            </div>
          </div>
        </div>
      </section>

      {/* 景点详情模态框 */}
      {selectedSite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedSite.image} 
                alt={selectedSite.name}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setSelectedSite(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-gray-600 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center bg-white bg-opacity-90 rounded-full px-3 py-2">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="font-medium">{selectedSite.rating}/5</span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold text-red-800">{selectedSite.name}</h3>
                  <Badge className={getCategoryColor(selectedSite.category)}>
                    {selectedSite.category === 'red' ? '红色旅游' : 
                     selectedSite.category === 'cultural' ? '文化遗产' : '自然景观'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedSite.city} · {selectedSite.district}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>建议游览时间：{selectedSite.visitTime}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedSite.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    基本信息
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">开放时间：</span>
                      <span>{selectedSite.openTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">门票价格：</span>
                      <span className="text-red-600 font-medium">{selectedSite.ticketPrice}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-3">历史意义</h4>
                  <p className="text-gray-700">{selectedSite.significance}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  主要看点
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedSite.highlights.map((highlight, index) => (
                    <Badge key={index} variant="outline" className="text-center py-2">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-red-800 mb-3">相关标签</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSite.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-100 text-red-700">
                      {tag}
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

export default MapPage

