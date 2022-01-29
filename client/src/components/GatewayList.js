import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    ShowButton
} from 'react-admin'

const GatewayList = (props) => {
    return (
        <List {...props} bulkActionButtons={false} >
            <Datagrid>
                <TextField source='name' />
                <TextField source='ip' label='IP'/>
                <TextField source='serialNumber' />
                <ShowButton/>
            </Datagrid>
        </List>
    )
}

export default GatewayList
