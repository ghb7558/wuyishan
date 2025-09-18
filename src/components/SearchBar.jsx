import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const SearchBar = ({ onSearch, placeholder = "搜索历史人物、事件、地点..." }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm.trim())
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
    setIsExpanded(false)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    // 实时搜索
    if (value.trim().length > 0) {
      onSearch(value.trim())
    } else {
      onSearch('')
    }
  }

  return (
    <div className="relative max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative transition-all duration-300 ${isExpanded ? 'scale-105' : ''}`}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-full 
                     focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200
                     transition-all duration-300 bg-white shadow-sm
                     hover:shadow-md focus:shadow-lg"
            aria-label="搜索内容"
          />
          
          {/* 搜索图标 */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          
          {/* 清除按钮 */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2
                       p-1 rounded-full hover:bg-gray-100 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-red-200"
              aria-label="清除搜索"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </form>
      
      {/* 搜索建议 */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 
                      rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-3">
            <div className="text-sm text-gray-600 mb-2">搜索建议：</div>
            <div className="space-y-1">
              {['古田会议', '毛泽东', '闽西革命根据地', '武夷山', '朱德'].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(suggestion)
                    onSearch(suggestion)
                  }}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 
                           rounded transition-colors focus:outline-none focus:bg-gray-50"
                >
                  <Search className="w-3 h-3 inline mr-2 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar

