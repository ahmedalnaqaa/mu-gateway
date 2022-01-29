import React from 'react'
import {
    Show,
    SimpleShowLayout,
    TextField,
    ArrayField,
    DateField,
    Datagrid
} from 'react-admin'

const GatewayShow = (props) => {
    return (
        <Show title="Show Gateway" {...props} >
            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="ip" />
                <TextField source="serialNumber" />
                <ArrayField source="devices">
                    <Datagrid>
                        <TextField source="vendor" />
                        <TextField source="status" />
                        <TextField source="uid" />
                        <DateField source="createdAt" />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    )
}

export default GatewayShow
