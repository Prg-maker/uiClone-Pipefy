import { useState } from 'react'
import { Container } from './styles'
import { loadLists } from '../../services/api'
import { List } from '../List'

import produce from 'immer'

import BordContext from './context'


const data = loadLists()


export function Bord() {



  const [lists, setLists] = useState(data)

  function move(fromList, toList, from, to) {

    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from]

      draft[fromList].cards.splice(from, 1);
      console.log(toList)
      draft[toList].cards.splice(to, 0, dragged);

    }))
  }


  return (
    <BordContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => {
          return (
            <List key={list.title} index={index} data={list} />
          )
        })}


      </Container>
    </BordContext.Provider>

  )
}
