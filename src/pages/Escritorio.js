import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row , Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { getUsuario } from '../helpers/getUsuario';
import { useHideMenu } from '../hooks/useHideMenu';

const { Text , Title } = Typography;
export const Escritorio = () => {

  const [usuario] = useState(getUsuario());
  useHideMenu(false);
  const history = useHistory();
  const {socket} = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const salir = () => {
    localStorage.clear();
    history.replace('/ingresar');

  } 
  const siguienteTicket = () => {

    socket.emit('siguiente-ticket-trabajar' , usuario, (ticket) => {
      setTicket(ticket); 
    })

  }
  if( !usuario.nombre || !usuario.escritorio ){
    return <Redirect to='/ingresar' />
  }

  return (
    <>
      <Row>
          <Col span={ 20 }>
            <Title level={ 2 }>{usuario.nombre}</Title>
            <Text>Usted esta trabajando en el escritorio: </Text>
            <Text type='success'>{usuario.escritorio}</Text>
          </Col>
          <Col span={ 4 } align='rigth'>
            <Button shape='round' type='danger' onClick={ salir }>
              <CloseCircleOutlined />
              salir
            </Button>
          </Col>
      </Row>
      <Divider />
      {
      ticket ? (
        <Row>
          <Col>
            <Text>Esta atendiendo el cliente numero: </Text>
            <Text style={{fontSize: 30}} type='danger'>{ticket.number}</Text>
          </Col>
        </Row>
      ) :
      (<h3>No hay tickets pendientes</h3>)
      }
      
      <Row>
        <Col offset={ 18 } span={ 6 } align='right'>
          <Button
            onClick={ siguienteTicket }
            shape='round'
            type='primary'
          >
            Siguiente
            <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  )
}
