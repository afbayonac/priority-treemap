import '../styles/board.css'
import { pipe } from '../utils/pipe'

import { dispatch, getstate, subscribe } from '../utils/state'

const Board = (document, window) => {
  const { board } = getstate()
  const { show, mode } = board
  const boardElement = document.getElementById('board')

  const background = boardElement.querySelector('.board__background')
  background.addEventListener('click', () => dispatch({ type: 'HIDE_BOARD' }))

  const closeNav = boardElement.querySelector('#board__nav__close')
  closeNav.addEventListener('click', () => dispatch({ type: 'HIDE_BOARD' }))

  const listNav = boardElement.querySelector('#board__nav__list')
  listNav.addEventListener('click', () => dispatch({ type: 'MODE_BOARD', payload: { mode: 'list' } }))

  const createNav = boardElement.querySelector('#board__nav__add')
  createNav.addEventListener('click', () => dispatch({ type: 'MODE_BOARD', payload: { mode: 'add' } }))

  const list = boardElement.querySelector('.board__list')
  const edit = boardElement.querySelector('.board__edit')
  const add = boardElement.querySelector('.board__add')

  boardElement.addEventListener('wheel', () => {
    document.body.style.overflow = 'hidden'
  })

  pipe(
    () => mode,
    init => {
      let value = init
      return (state) => {
        const newValue = state.board.mode
        if (newValue === value) return
        value = newValue
        switch (value) {
          case 'edit':
            edit.classList.remove('hide')
            add.classList.add('hide')
            list.classList.add('hide')
            break
          case 'add':
            edit.classList.add('hide')
            add.classList.remove('hide')
            list.classList.add('hide')
            break
          default:
            edit.classList.add('hide')
            add.classList.add('hide')
            list.classList.remove('hide')
        }
      }
    },
    subscribe
  )

  pipe(
    () => show,
    init => {
      let value = init
      return (state) => {
        const newValue = state.board.show
        if (newValue === value) return
        value = newValue
        if (value === true) {
          boardElement.classList.add('show')
          const mural = document.getElementById('mural')
          window.scrollTo({ top: mural.offsetTop, behavior: 'smooth' })
        } else {
          boardElement.classList.remove('show')
          document.body.style.overflow = 'auto'
        }
      }
    },
    subscribe
  )
}

export default Board
