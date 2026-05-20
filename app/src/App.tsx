import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TestProvider } from './context/TestContext'
import { LanguageProvider } from './i18n'
import { Landing } from './pages/Landing'
import { RoleSelection } from './pages/RoleSelection'
import { TestIntro } from './pages/TestIntro'
import { QuestionFlow } from './pages/QuestionFlow'
import { Loading } from './pages/Loading'
import { Result } from './pages/Result'

function App() {
  return (
    <LanguageProvider>
      <TestProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/role" element={<RoleSelection />} />
            <Route path="/intro" element={<TestIntro />} />
            <Route path="/test" element={<QuestionFlow />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/result/:key" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </TestProvider>
    </LanguageProvider>
  )
}

export default App
