import React from 'react'

const FormWidget = ({children, onSubmit,className})  => {
  return (
    <form onSubmit={onSubmit} className={className} autoComplete="off">
      {children}
    </form>
  )
}

export default FormWidget
