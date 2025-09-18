import { Button } from '@/components/ui/button.jsx'
import { Share2, MessageCircle, Mail, Phone, MapPin } from 'lucide-react'

const Footer = ({ onFeedback, onShare }) => {
  const socialLinks = [
    { icon: Share2, label: '分享到微信', action: () => onShare('wechat') },
    { icon: Share2, label: '分享到微博', action: () => onShare('weibo') },
    { icon: Share2, label: '分享到QQ', action: () => onShare('qq') }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 网站信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">福</span>
              </div>
              <h3 className="text-xl font-bold">福建红色文化传播网站</h3>
            </div>
            <p className="text-gray-300 mb-4">
              传承红色基因，弘扬革命精神。深入了解福建省丰富的红色历史文化，
              探索武夷山的历史文化底蕴，感受革命先辈的光辉事迹。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={link.action}
                  className="text-gray-300 border-gray-600 hover:bg-red-600 hover:border-red-600"
                >
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">快速导航</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">首页</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">革命根据地</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">历史地图</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">红色人物</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">历史事件</a></li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">联系我们</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">福建省南平市武夷山</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">info@fujianredculture.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">400-123-4567</span>
              </div>
            </div>
            
            {/* 反馈按钮 */}
            <Button
              onClick={onFeedback}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              意见反馈
            </Button>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © 2024 福建红色文化传播网站. 保留所有权利. | 
            <a href="#" className="hover:text-white ml-2">隐私政策</a> | 
            <a href="#" className="hover:text-white ml-2">使用条款</a> |
            <a href="#" className="hover:text-white ml-2">无障碍声明</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

