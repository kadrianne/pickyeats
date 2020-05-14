import React, { useState } from 'react'

export default function useFormField() {

    const [field, setField] = useState('')

    const handleChange = (event) => {
        setField(event)
    }

    return [field,handleChange]
}