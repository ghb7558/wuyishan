import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './components/HomePage.jsx'
import BasePage from './components/BasePage.jsx'
import MapPage from './components/MapPage.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // 切换页面时清除搜索
    setSearchTerm('')
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage searchTerm={searchTerm} />
      case 'base':
        return <BasePage searchTerm={searchTerm} />
      case 'map':
        return <MapPage searchTerm={searchTerm} />
      default:
        return <HomePage searchTerm={searchTerm} />
    }
  }

  return (
    <div className="App min-h-screen flex flex-col">
      <Header 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        onSearch={handleSearch}
      />
      <main className="flex-1" role="main">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App

