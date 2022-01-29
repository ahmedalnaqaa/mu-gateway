import React from 'react'
import {Admin, Resource} from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import GatewayList from './components/GatewayList'
import GatewayCreate from './components/GatewayCreate'
import GatewayShow from "./components/GatewayShow";

function App() {
  return (<Admin dataProvider={restProvider('http://localhost:8080/api')}>
      <Resource name='gateways' list={GatewayList} show={GatewayShow} create={GatewayCreate}/>
  </Admin>);
}

export default App;
