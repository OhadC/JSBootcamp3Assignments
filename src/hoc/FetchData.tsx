import * as React from 'react'

class FetchData extends React.Component<{ link: string, children: (data: any) => {} }, any> {
    state = {
        data: null
    }

    componentDidMount() {
        fetch(this.props.link)
            .then(res => res.json())
            .then((data: JSON) => {
                this.setState({ data })
            })
    }

    render() {
        return (
            this.props.children(this.state.data)
        )
    }
}

export default FetchData
