import * as React from 'react'

const UserEdit = (props: any) => {
    return props.active && (
        <>
            <h2>
                Currently editing {props.active && props.active.name}:
            </h2>
            <label>
                age:
            </label>
            <input type="text" value={props.active.age} />
            <hr />
            <button>Save</button><button>Delete User</button>
        </>
    )
}

export default UserEdit