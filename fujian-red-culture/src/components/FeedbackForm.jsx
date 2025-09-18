import { useState } from 'react'
import { MessageSquare, Send, Star, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const FeedbackForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    type: 'suggestion',
    rating: 0,
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const feedbackTypes = [
    { value: 'suggestion', label: '建议意见', icon: '💡' },
    { value: 'bug', label: '问题反馈', icon: '🐛' },
    { value: 'content', label: '内容纠错', icon: '📝' },
    { value: 'praise', label: '表扬鼓励', icon: '👍' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模拟提交过程
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 这里可以添加实际的提交逻辑
      console.log('反馈提交:', formData)
      
      setIsSubmitted(true)
      
      // 3秒后关闭表单
      setTimeout(() => {
        onClose()
        setIsSubmitted(false)
        setFormData({
          type: 'suggestion',
          rating: 0,
          name: '',
          email: '',
          message: ''
        })
      }, 3000)
    } catch (error) {
      console.error('提交失败:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2 text-red-800">
            <MessageSquare className="w-5 h-5" />
            用户反馈
          </CardTitle>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 
                     transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
            aria-label="关闭反馈表单"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </CardHeader>
        
        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">提交成功！</h3>
              <p className="text-gray-600">感谢您的宝贵意见，我们会认真考虑您的建议。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 反馈类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  反馈类型 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                      className={`p-3 border rounded-lg text-sm transition-colors
                        ${formData.type === type.value 
                          ? 'border-red-500 bg-red-50 text-red-700' 
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      <div className="text-lg mb-1">{type.icon}</div>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 评分 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  整体评价
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="p-1 focus:outline-none focus:ring-2 focus:ring-red-200 rounded"
                      aria-label={`${star}星评价`}
                    >
                      <Star 
                        className={`w-6 h-6 transition-colors
                          ${star <= formData.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                          }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* 姓名 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  姓名（可选）
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-red-200 focus:border-red-500 
                           transition-colors"
                  placeholder="请输入您的姓名"
                />
              </div>

              {/* 邮箱 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱（可选）
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-red-200 focus:border-red-500 
                           transition-colors"
                  placeholder="请输入您的邮箱地址"
                />
              </div>

              {/* 反馈内容 */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  反馈内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-red-200 focus:border-red-500 
                           transition-colors resize-none"
                  placeholder="请详细描述您的意见或建议..."
                />
              </div>

              {/* 提交按钮 */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  取消
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting || !formData.message.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent 
                                    rounded-full animate-spin mr-2" />
                      提交中...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      提交反馈
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default FeedbackForm

