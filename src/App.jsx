import { Header } from './components/Header'
import { Bord } from './components/Bord'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

import GlobalStyle from './styles/GlobalStyles'



function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Bord />
      <GlobalStyle />
    </DndProvider>
  )
}

export default App
