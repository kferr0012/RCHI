import React from 'react'
import {Table, Header, TableHeader } from "semantic-ui-react";



const tableHeader = x => (
    <Table.HeaderCell textAlign="center" colSpan="2">
        {x.header}
        <Header.Subheader>
            {x.subheader}
        </Header.Subheader>
    </Table.HeaderCell>
);


const table = (props) => (
    <TableHeader>
        {tableHeader(props.Headers)}
    </TableHeader>
    // <Table.Body>
    //     {/* {props.data.map(x => row(x))} */}
    // </Table.Body>
    
);

export default table;