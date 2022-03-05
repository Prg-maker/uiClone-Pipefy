import { Container, Label } from './styles'
import { css } from 'styled-components'

import { useDrag } from 'react-dnd'



export function Card({ data }) {

  const text = data.content

  const [{ opacity, isDragging }, dragRef] = useDrag(() => ({
    type: 'CARD',
    item: { text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()

    })

  }), [])




  return (



    <Container ref={dragRef} style={{ opacity }} isDragging={isDragging} >
      <header>
        {data.labels.map(label => {
          return (
            <Label key={label} color={label} />
          )
        })}
      </header>

      <p>{data.content}</p>
      {data.user && <img src={data.user} />}

    </Container >

  )
}
