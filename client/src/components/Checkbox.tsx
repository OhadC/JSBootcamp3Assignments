import * as React from 'react'

interface IProps {
    label: string
    value: string | number
    isChecked: boolean
    onChange: (value: string | number, isChecked: boolean) => any
}

const Checkbox: React.SFC<IProps> = props => {
    const toggleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(props.value, e.target.checked)
    }

    return (
        <label>
            <input type="checkbox" value={props.value} onChange={toggleCheckboxChange} checked={props.isChecked} />
            {props.label}
        </label>
    )
}

export default Checkbox