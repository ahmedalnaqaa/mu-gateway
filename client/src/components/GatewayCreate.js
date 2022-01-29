import React from 'react'
import {
    ArrayInput,
    SimpleFormIterator,
    TextInput,
    SimpleForm,
    Create
} from 'react-admin'

const GatewayCreate = (props) => {
    return (
        <Create title='Create a Post' {...props}>
            <SimpleForm>
                <TextInput source='name' />
                <TextInput multiline source='ip' />
                <ArrayInput source="devices">
                    <SimpleFormIterator>
                        <TextInput source="vendor" label='Vendor' placeholder='vendor name'/>
                        <TextInput source="status" label='status' placeholder='online or offline' />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
}

export default GatewayCreate
