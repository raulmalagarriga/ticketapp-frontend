import React, { useState } from 'react';
import { Button, Divider, Form, Input, InputNumber , Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuario } from '../helpers/getUsuario';

export const Ingresar = () => {
  useHideMenu(false);
  const history = useHistory();
  const [usuario] = useState(getUsuario()); // usuario: {agente: '  , escritorio: ''} 

  const onFinish = ({nombre , escritorio}) => {
    localStorage.setItem('nombre' , nombre);
    localStorage.setItem('escritorio' , escritorio);
    history.push('/escritorio');
    
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  if( usuario.nombre && usuario.escritorio ){
    return <Redirect to='/escritorio' />
  }

  const { Text , Title } = Typography;

  return (
    <>
    <Title level={2}>Ingresar</Title>
    <Text>Ingrese su nombre y numero de escritorio</Text>
    <Divider />
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[
            {
              required: true,
              message: 'Por favor ingresar su nombre',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: 'Por favor ingresar el numero de  escritorio',
            },
          ]}
        >
          <InputNumber min={1} max={ 99 } />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" shape='round'>
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
