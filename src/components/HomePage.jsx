import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Calendar, User, MapPin, Star, Clock, ArrowRight, Heart, Eye, BookOpen } from 'lucide-react'
import gutianMeetingImg from '../assets/gutian-meeting.jpg'
import gutianMemorialImg from '../assets/gutian-memorial.jpg'
import zhudePortraitImg from '../assets/zhude-portrait.jpg'
import wuyishanCultureImg from '../assets/wuyishan-culture.jpg'

const HomePage = ({ searchTerm }) => {
  const [filteredContent, setFilteredContent] = useState(null)
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // 福建省历史革命人物数据
  const revolutionaryFigures = [
    {
      id: 1,
      name: '毛泽东',
      title: '伟大的马克思主义者',
      period: '1893-1976',
      image: gutianMeetingImg,
      description: '中国共产党、中国人民解放军、中华人民共和国的主要缔造者和领导人。',
      fujianConnection: '先后八次入闽，在福建留下了《古田会议决议》《星星之火，可以燎原》《反对本本主义》《才溪乡调查》等光辉著作。',
      majorEvents: ['古田会议', '才溪乡调查', '闽西革命根据地建设'],
      significance: '确立了思想建党、政治建军的原则，为中国革命指明了方向。',
      quotes: '星星之火，可以燎原',
      relatedSites: ['古田会议纪念馆', '才溪乡调查纪念馆']
    },
    {
      id: 2,
      name: '朱德',
      title: '中国人民解放军总司令',
      period: '1886-1976',
      image: zhudePortraitImg,
      description: '中国共产党、中国人民解放军和中华人民共和国的主要缔造者和领导人之一。',
      fujianConnection: '1927年10月率南昌起义军到达秀芦村，召开秀芦会议，确定转战闽西、赣南的行军路线。',
      majorEvents: ['南昌起义', '秀芦会议', '井冈山会师'],
      significance: '与毛泽东共同创建了人民军队，为中国革命胜利作出了重大贡献。',
      quotes: '革命理想高于天',
      relatedSites: ['秀芦会议旧址', '闽西革命纪念馆']
    },
    {
      id: 3,
      name: '陈毅',
      title: '无产阶级革命家',
      period: '1901-1972',
      image: gutianMemorialImg,
      description: '中国共产党和中华人民共和国的重要领导人，军事家、政治家、诗人。',
      fujianConnection: '曾在闽西长汀从事革命活动，参与创建了长汀红色区域。',
      majorEvents: ['闽西革命', '新四军重建', '解放战争'],
      significance: '在福建革命斗争中发挥了重要作用，为闽西革命根据地建设贡献力量。',
      quotes: '大雪压青松，青松挺且直',
      relatedSites: ['长汀革命旧址群', '闽西苏维埃政府旧址']
    }
  ]

  // 福建省重大历史事件数据
  const historicalEvents = [
    {
      id: 1,
      name: '古田会议',
      date: '1929年12月28日',
      location: '龙岩市上杭县古田镇',
      image: gutianMeetingImg,
      description: '中国共产党红军第四军第九次代表大会，确立了思想建党、政治建军的原则。',
      background: '红四军在发展过程中出现了各种非无产阶级思想，急需从思想上政治上进行整顿。',
      process: '会议通过了毛泽东起草的《中国共产党红军第四军第九次代表大会决议案》。',
      significance: '确立了思想建党、政治建军的原则，为人民军队建设奠定了基础。',
      impact: '古田会议精神成为人民军队建设的重要指导思想，影响深远。',
      participants: ['毛泽东', '朱德', '陈毅', '罗荣桓'],
      relatedSites: ['古田会议纪念馆', '古田会议会址'],
      category: 'political'
    },
    {
      id: 2,
      name: '闽西暴动',
      date: '1928年3月',
      location: '龙岩、永定等地',
      image: gutianMemorialImg,
      description: '中国共产党在闽西地区领导的武装起义，建立了闽西革命根据地。',
      background: '在大革命失败后，中国共产党在闽西地区积极开展武装斗争。',
      process: '在邓子恢等人领导下，闽西各县相继爆发武装起义。',
      significance: '建立了闽西革命根据地，为中央苏区的形成奠定了基础。',
      impact: '闽西成为中央苏区的重要组成部分，为中国革命作出了重大贡献。',
      participants: ['邓子恢', '张鼎丞', '谭震林'],
      relatedSites: ['闽西革命纪念馆', '永定暴动纪念馆'],
      category: 'military'
    },
    {
      id: 3,
      name: '才溪乡调查',
      date: '1933年11月',
      location: '龙岩市上杭县才溪乡',
      image: wuyishanCultureImg,
      description: '毛泽东深入才溪乡进行的社会调查，写下了著名的《才溪乡调查》。',
      background: '为了总结苏区建设经验，毛泽东选择才溪乡作为调查对象。',
      process: '毛泽东深入农村，与农民座谈，了解苏区建设情况。',
      significance: '为苏区建设提供了宝贵经验，体现了实事求是的工作作风。',
      impact: '《才溪乡调查》成为马克思主义中国化的重要文献。',
      participants: ['毛泽东'],
      relatedSites: ['才溪乡调查纪念馆', '光荣亭'],
      category: 'social'
    },
    {
      id: 4,
      name: '秀芦会议',
      date: '1927年10月',
      location: '龙岩市上杭县秀芦村',
      image: zhudePortraitImg,
      description: '朱德率南昌起义军召开的重要会议，确定了转战闽西、赣南的战略方针。',
      background: '南昌起义军南下受挫后，需要重新确定战略方向。',
      process: '朱德在陈氏家庙召开会议，研究部队去向问题。',
      significance: '确定了转战闽西、赣南的正确方针，为井冈山会师创造了条件。',
      impact: '为中国革命找到了农村包围城市的正确道路。',
      participants: ['朱德', '陈毅', '王尔琢'],
      relatedSites: ['秀芦会议旧址', '陈氏家庙'],
      category: 'military'
    }
  ]

  // 搜索功能
  useEffect(() => {
    if (searchTerm) {
      const filteredFigures = revolutionaryFigures.filter(person =>
        person.name.includes(searchTerm) ||
        person.description.includes(searchTerm) ||
        person.fujianConnection.includes(searchTerm) ||
        person.majorEvents.some(event => event.includes(searchTerm))
      )

      const filteredEvents = historicalEvents.filter(event =>
        event.name.includes(searchTerm) ||
        event.description.includes(searchTerm) ||
        event.location.includes(searchTerm) ||
        event.participants.some(participant => participant.includes(searchTerm))
      )

      setFilteredContent({ figures: filteredFigures, events: filteredEvents })
    } else {
      setFilteredContent(null)
    }
  }, [searchTerm])

  const displayFigures = filteredContent ? filteredContent.figures : revolutionaryFigures
  const displayEvents = filteredContent ? filteredContent.events : historicalEvents

  const getEventCategoryColor = (category) => {
    switch (category) {
      case 'political': return 'bg-red-100 text-red-700 border-red-200'
      case 'military': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'social': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getEventCategoryName = (category) => {
    switch (category) {
      case 'political': return '政治事件'
      case 'military': return '军事事件'
      case 'social': return '社会调查'
      default: return '其他'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* 英雄横幅 */}
      <section className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              传承红色基因
              <br />
              <span className="text-yellow-400">弘扬革命精神</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 leading-relaxed">
              深入了解福建省丰富的红色历史文化，感受革命先辈的光辉事迹，
              传承不朽的革命精神，汲取前进的力量。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-6 py-3 bg-yellow-400 text-red-800">
                <Star className="w-5 h-5 mr-2" />
                革命老区
              </Badge>
              <Badge variant="secondary" className="text-lg px-6 py-3 bg-yellow-400 text-red-800">
                <Heart className="w-5 h-5 mr-2" />
                红色传承
              </Badge>
              <Badge variant="secondary" className="text-lg px-6 py-3 bg-yellow-400 text-red-800">
                <BookOpen className="w-5 h-5 mr-2" />
                历史教育
              </Badge>
            </div>
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
                找到 {displayFigures.length} 位人物，{displayEvents.length} 个历史事件
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 革命人物简介 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-4">革命先辈风采</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              他们是民族的脊梁，是历史的丰碑。让我们走近这些在福建大地上留下光辉足迹的革命先辈，
              感受他们的崇高品格和不朽精神。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayFigures.map((person) => (
              <Card 
                key={person.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedPerson(person)}
              >
                <div className="relative">
                  <img 
                    src={person.image} 
                    alt={person.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{person.name}</h3>
                    <p className="text-sm opacity-90">{person.period}</p>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-red-800">{person.title}</CardTitle>
                  <CardDescription className="text-gray-700 leading-relaxed">
                    {person.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">在福建的足迹：</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {person.fujianConnection.substring(0, 80)}...
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{person.majorEvents.length} 个重要事件</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                        <Eye className="w-4 h-4 mr-2" />
                        详细了解
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {displayFigures.length === 0 && (
            <div className="text-center py-16">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">暂无相关人物</h3>
              <p className="text-gray-500">请尝试其他搜索关键词</p>
            </div>
          )}
        </div>
      </section>

      {/* 重大历史事件 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-4">重大历史事件</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              这些发生在福建大地上的重大历史事件，见证了中国革命的光辉历程，
              每一个事件都承载着深刻的历史意义和时代价值。
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayEvents.map((event) => (
              <Card 
                key={event.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getEventCategoryColor(event.category)}>
                      {getEventCategoryName(event.category)}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl text-red-800">{event.name}</CardTitle>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <CardDescription className="text-gray-700 leading-relaxed">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">历史意义：</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {event.significance}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">主要参与者：</p>
                      <div className="flex flex-wrap gap-1">
                        {event.participants.map((participant, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-500">
                        {event.relatedSites.length} 个相关遗址
                      </span>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        了解详情
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {displayEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">暂无相关事件</h3>
              <p className="text-gray-500">请尝试其他搜索关键词</p>
            </div>
          )}
        </div>
      </section>

      {/* 福建红色文化统计 */}
      <section className="py-16 bg-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">福建红色文化数据</h2>
            <p className="text-xl text-red-100">
              数字见证福建在中国革命史上的重要地位
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">84个</div>
              <div className="text-xl">革命老区县</div>
              <div className="text-red-200 mt-2">覆盖全省各地市</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">10万+</div>
              <div className="text-xl">参加红军人数</div>
              <div className="text-red-200 mt-2">为革命献身的英雄</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">20年</div>
              <div className="text-xl">红旗不倒</div>
              <div className="text-red-200 mt-2">坚持革命斗争</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-xl">革命遗址</div>
              <div className="text-red-200 mt-2">珍贵的历史见证</div>
            </div>
          </div>
        </div>
      </section>

      {/* 人物详情模态框 */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedPerson.image} 
                alt={selectedPerson.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <button 
                onClick={() => setSelectedPerson(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-gray-600 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-3xl font-bold">{selectedPerson.name}</h3>
                <p className="text-lg opacity-90">{selectedPerson.period}</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-red-800 mb-3">{selectedPerson.title}</h4>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedPerson.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-3">在福建的革命足迹</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedPerson.fujianConnection}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-3">历史意义</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedPerson.significance}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-red-800 mb-3">主要事件</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedPerson.majorEvents.map((event, index) => (
                    <Badge key={index} variant="outline" className="text-center py-2">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-red-800 mb-3">相关遗址</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedPerson.relatedSites.map((site, index) => (
                    <Badge key={index} variant="secondary" className="text-center py-2 bg-red-100 text-red-700">
                      <MapPin className="w-3 h-3 mr-1" />
                      {site}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="text-xl font-bold text-red-800 mb-2">经典语录</h4>
                <blockquote className="text-lg italic text-red-700 border-l-4 border-red-400 pl-4">
                  "{selectedPerson.quotes}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 事件详情模态框 */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.name}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-gray-600 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={getEventCategoryColor(selectedEvent.category)}>
                    {getEventCategoryName(selectedEvent.category)}
                  </Badge>
                </div>
                <h3 className="text-3xl font-bold">{selectedEvent.name}</h3>
                <p className="text-lg opacity-90">{selectedEvent.date}</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{selectedEvent.location}</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-3">历史背景</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.background}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-3">事件过程</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.process}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-3">历史意义</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.significance}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-3">深远影响</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.impact}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-red-800 mb-3">主要参与者</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedEvent.participants.map((participant, index) => (
                    <Badge key={index} variant="outline" className="text-center py-2">
                      <User className="w-3 h-3 mr-1" />
                      {participant}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-red-800 mb-3">相关遗址</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedEvent.relatedSites.map((site, index) => (
                    <Badge key={index} variant="secondary" className="text-center py-2 bg-red-100 text-red-700">
                      <MapPin className="w-3 h-3 mr-1" />
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

export default HomePage

