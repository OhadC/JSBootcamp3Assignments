import * as React from 'react'

class FetchData extends React.Component<{ link: string, children: (data: any) => any }, any> {
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
            this.props.children(this.state.data || [])
        )
    }
}

// How to use:
// ------------
// <FetchData link="./mock-data/tree.json">
//     {(data) => (data.map((x: any, i: number) => <div key={i}>{x.name}</div>))}
// </FetchData> 

export default FetchData
