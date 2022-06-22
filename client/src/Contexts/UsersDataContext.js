import React, { useState, createContext } from "react";

export const UsersDataContext = createContext();

export const UsersDataProvider = props => {
    const [users, setUsers] = useState(null);

    return (
        <UsersDataContext.Provider value={[users, setUsers]}>
            {props.children}
        </UsersDataContext.Provider>
    )
}