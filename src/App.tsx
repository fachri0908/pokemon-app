import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Pokemon from './pages/Pokemon/Pokemon';
import PokemonDetail from './pages/PokemonDetail/PokemonDetail';
import { Layout, Space } from 'antd';
import MyPokemon from './pages/MyPokemon/MyPokemon';
import { useLocation } from 'react-router-dom';

const { Content } = Layout;

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Layout className='app-layout'>
        <Content className='app-content'>
          <div className="navigation-menu">
            <Space direction='horizontal'>
              <Link to='/' className={`menu-item ${location.pathname === '/' && 'active'}`}>
                All Pokemon
              </Link>
              <Link to='my-pokemon' className={`menu-item ${location.pathname === '/my-pokemon' && 'active'}`}>
                My Pokemon
              </Link>
            </Space>
          </div>
          <div
            style={{
              padding: 24,
              minHeight: '100vh',
              background: '#FFFFFF',
              borderRadius: 20,
            }}
          >
            <Routes>
              <Route path='/' index Component={Pokemon} />
              <Route path='/pokemon/:id' Component={PokemonDetail} />
              <Route path='/my-pokemon' Component={MyPokemon} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
