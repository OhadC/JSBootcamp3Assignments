import * as React from 'react'
import * as _ from 'lodash'

import Checkbox from './Checkbox'

interface IProps {
    data: any[]
    value: string
    label: string
    checkedValues: string[],
    onChange: (newCheckedValues: string[]) => any
}

const CheckboxList: React.SFC<IProps> = props => {

    const valueCheckedHandler = (value: string, isChecked: boolean) => {
        props.onChange(_.xor(props.checkedValues, [value]))
    }

    const { data, label, value } = props

    const checkboxes = data.map(dataItem => (
        <Checkbox label={dataItem[label]} key={dataItem[value]} value={dataItem[value]} isChecked={_.includes(props.checkedValues, dataItem[value])} onChange={valueCheckedHandler} />
    ))
    return (
        <>
            {checkboxes}
        </>
    )
}

export default CheckboxList
