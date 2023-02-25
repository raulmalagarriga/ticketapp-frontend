import { Card, Col, Divider, List, Row , Tag, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';
import { useHideMenu } from '../hooks/useHideMenu';



const { Title , Text } = Typography;

export const Cola = () => {

  useHideMenu(true);

  const {socket} = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
        
    socket.on( 'ticket-asignado', ( asignados ) => {
        console.log(tickets)
        setTickets( asignados )
    });

    return () => {
        socket.off('ticket-asignado');
    }
}, [socket , tickets])
  
  useEffect(() => {
    getUltimos().then( tickets => setTickets(tickets) );
  }, []);
  
  return (
    <>
    <Title level={ 1 }>Atendiendo al cliente</Title>
      <Row>
        <Col span={ 12 }>
          <List 
            dataSource={ tickets.slice(0,2)}
            renderItem={ item => (
              <List.Item>
                <Card
                  style={{width: 300 , marginTop: 16}}
                  actions={[
                    <Tag color='volcano'>{item.nombre}</Tag>,
                    <Tag color='magenta'>Escritorio: {item.escritorio}</Tag>,
                  ]}
                >
                  <Title>No. {item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={ 12 }>
          <Divider>Historial</Divider>
          <List 
            dataSource={ tickets.slice(0,4) }
            renderItem={ item=> (
              <List.Item>
                <List.Item.Meta 
                  title={`Ticket No. ${ item.number }`}
                  description={
                    <>
                      <Text type='secondary'>En el escritorio: </Text>
                      <Tag color='magenta'>{item.escritorio}</Tag>
                      <Text type='secondary'>Agente: </Text>
                      <Tag color='volcano'>{item.nombre}</Tag>
                    </>
                  }
                />
                  
              </List.Item>
            )}
          />

        </Col>
      </Row>
    </>
  )
}

