import * as React from 'react'

interface IButtonProps {
    enabledStyle: React.CSSProperties,
    disabledStyle: React.CSSProperties,
    isDisabled: boolean,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    text: string
}

const Button = (props: IButtonProps) => (
    <button
        style={!props.isDisabled ? props.enabledStyle : props.disabledStyle}
        disabled={props.isDisabled}
        onClick={props.onClick}
    >
        {props.text}
    </button>
)

export default Button
