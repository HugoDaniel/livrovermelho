import React, { useState } from "react"
import Envio from './envio'

const ModalContainer = ({ onExit, children }) => (
  <div
    className="fixed top-0 left-0 w-100 h-100 bg-black-50 flex items-center justify-center"
    onClick={onExit}
  >
    <section
      className="w6 bg-white br2 flex flex-column items-start justify-start shadow-2"
      onClick={e => e.stopPropagation()}
    >
      {children}
    </section>
  </div>
)

const Modal = ({ onExit }) => {
  return (
    <ModalContainer onExit={onExit}>
      <Envio onExit={onExit} />
    </ModalContainer>
  )
}

export default Modal
