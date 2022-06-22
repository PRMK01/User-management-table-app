import React, { useState, useEffect } from 'react';

const TableRow = (props) => {

    return (
        <tr>
            <td><input onInput={props.onClick} type='checkbox' name='selectUser' className="checkbox" checked={props.checked}></input></td>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.lastLoggedAt}</td>
            <td>{props.registeredAt}</td>
            <td>{props.status}</td>
        </tr>
    )
}


export default TableRow