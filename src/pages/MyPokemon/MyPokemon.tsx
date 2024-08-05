import React from 'react';
import './MyPokemon.css'
import { Empty, Space } from 'antd';
import empty_pokeball from '../../assets/empty_pokeball.png'
import { useSelector } from 'react-redux';
import { RootState } from '../../helper/store';
import MyPokemonCard from '../../components/MyPokemonCard';

function MyPokemon() {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  return (
    <div>
      <div className="pokemon-list">
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          {favorites.length > 0 && favorites.map(((pokemon: any, i) =>
            <MyPokemonCard key={i} pokemon={pokemon} />
          ))}
          {!favorites.length &&
            <Empty
              style={{ marginTop: 100 }}
              image={empty_pokeball}
              imageStyle={{ height: 60 }}
              description="You dont have any favorite pokemon"
            >
            </Empty>}
        </Space>
      </div>

    </div>
  );
}

export default MyPokemon;
