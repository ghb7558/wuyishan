import { useState } from 'react'
import { Share2, Copy, Check, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const SocialShare = ({ title, description, url }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareData = {
    title: title || '福建红色文化传播网站',
    text: description || '探索福建省丰富的红色历史文化，传承革命精神',
    url: url || window.location.href
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('分享取消或失败')
      }
    } else {
      setIsOpen(true)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = shareData.url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareToWeChat = () => {
    // 微信分享通常需要微信JS-SDK，这里提供一个简单的提示
    alert('请复制链接后在微信中分享')
    handleCopyLink()
  }

  const shareToWeibo = () => {
    const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title + ' - ' + shareData.text)}`
    window.open(weiboUrl, '_blank', 'width=600,height=400')
  }

  const shareToQQ = () => {
    const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}&summary=${encodeURIComponent(shareData.text)}`
    window.open(qqUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className="relative">
      <Button
        onClick={handleNativeShare}
        variant="outline"
        size="sm"
        className="border-red-600 text-red-600 hover:bg-red-50"
        aria-label="分享内容"
      >
        <Share2 className="w-4 h-4 mr-2" />
        分享
      </Button>

      {/* 分享选项面板 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 
                      rounded-lg shadow-lg z-50 p-4 min-w-64">
          <div className="mb-3">
            <h4 className="font-medium text-gray-900 mb-2">分享到</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={shareToWeChat}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 
                         transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                aria-label="分享到微信"
              >
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">微信</span>
              </button>
              
              <button
                onClick={shareToWeibo}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 
                         transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                aria-label="分享到微博"
              >
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">微博</span>
              </button>
              
              <button
                onClick={shareToQQ}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 
                         transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                aria-label="分享到QQ"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">QQ</span>
              </button>
              
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 
                         transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                aria-label="复制链接"
              >
                <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                  {copied ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Copy className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-sm">{copied ? '已复制' : '复制链接'}</span>
              </button>
            </div>
          </div>
          
          <div className="border-t pt-3">
            <div className="text-xs text-gray-600 mb-2">分享内容预览：</div>
            <div className="bg-gray-50 p-2 rounded text-xs">
              <div className="font-medium text-gray-900 mb-1">{shareData.title}</div>
              <div className="text-gray-600">{shareData.text}</div>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-red-200"
            aria-label="关闭分享面板"
          >
            <Copy className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      )}
      
      {/* 点击外部关闭 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* 复制成功提示 */}
      {copied && (
        <div className="absolute top-full right-0 mt-2 bg-green-500 text-white 
                      px-3 py-1 rounded text-sm z-50">
          <Check className="w-3 h-3 inline mr-1" />
          链接已复制
        </div>
      )}
    </div>
  )
}

export default SocialShare

