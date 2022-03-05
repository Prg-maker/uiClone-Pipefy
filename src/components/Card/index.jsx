import { useRef, useContext } from 'react'
import BoardContext from '../Bord/context'
import { Container, Label } from './styles'
import { css } from 'styled-components'

import { useDrag, useDrop } from 'react-dnd'



export function Card({ data, index, listIndex }) {

  const { move } = useContext(BoardContext)


  const ref = useRef()


  const text = data.content

  const [{ opacity, isDragging }, dragRef] = useDrag(() => ({
    type: 'CARD',
    item: { text, id: data.id, index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()

    })

  }), [])


  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {

      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex

      const draggedIndex = item.index
      const targetIndex = index

      if (draggedIndex == targetIndex && draggedListIndex == targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      console.log(targetListIndex)

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex
      item.listIndex = targetListIndex
    }
  })


  dragRef(dropRef(ref))




  return (



    <Container ref={ref} style={{ opacity }} isDragging={isDragging} >
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
