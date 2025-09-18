import { useState } from 'react'
import { Menu, X, MessageSquare, Accessibility } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import SearchBar from './SearchBar.jsx'
import SocialShare from './SocialShare.jsx'
import FeedbackForm from './FeedbackForm.jsx'

const Header = ({ currentPage, onPageChange, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)

  const navItems = [
    { id: 'home', label: '首页', ariaLabel: '返回首页' },
    { id: 'base', label: '根据地', ariaLabel: '查看革命根据地' },
    { id: 'map', label: '地图', ariaLabel: '查看历史旅游地图' }
  ]

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
    document.documentElement.classList.toggle('high-contrast', !isHighContrast)
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-red-100 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo和标题 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">福</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-red-800">福建红色文化</h1>
                  <p className="text-xs text-gray-600 hidden sm:block">传承革命精神 · 弘扬红色文化</p>
                </div>
              </div>
            </div>

            {/* 桌面端导航 */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${currentPage === item.id
                      ? 'text-red-600 bg-red-50 border-b-2 border-red-600'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                  aria-label={item.ariaLabel}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* 搜索栏 */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <SearchBar onSearch={onSearch} />
            </div>

            {/* 功能按钮 */}
            <div className="flex items-center space-x-2">
              {/* 无障碍切换 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleHighContrast}
                className="hidden sm:flex"
                aria-label={isHighContrast ? '关闭高对比度模式' : '开启高对比度模式'}
                title={isHighContrast ? '关闭高对比度模式' : '开启高对比度模式'}
              >
                <Accessibility className={`w-4 h-4 ${isHighContrast ? 'text-red-600' : 'text-gray-600'}`} />
              </Button>

              {/* 社交分享 */}
              <div className="hidden sm:block">
                <SocialShare 
                  title="福建红色文化传播网站"
                  description="探索福建省丰富的红色历史文化，传承革命精神"
                />
              </div>

              {/* 反馈按钮 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFeedbackOpen(true)}
                className="text-gray-600 hover:text-red-600"
                aria-label="提交反馈意见"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">反馈</span>
              </Button>

              {/* 移动端菜单按钮 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
                aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* 移动端搜索栏 */}
          <div className="lg:hidden pb-4">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>

        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-2" role="navigation">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors
                    ${currentPage === item.id
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                  aria-label={item.ariaLabel}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
              
              {/* 移动端功能按钮 */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={toggleHighContrast}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
                  aria-label={isHighContrast ? '关闭高对比度模式' : '开启高对比度模式'}
                >
                  <Accessibility className="w-4 h-4 mr-3" />
                  {isHighContrast ? '关闭高对比度' : '开启高对比度'}
                </button>
                
                <div className="px-3 py-2">
                  <SocialShare 
                    title="福建红色文化传播网站"
                    description="探索福建省丰富的红色历史文化，传承革命精神"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* 反馈表单 */}
      <FeedbackForm 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </>
  )
}

export default Header

