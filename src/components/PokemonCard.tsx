import React, { useEffect, useState } from 'react';
import { PokeAPI } from '../helper/api';
import { Skeleton, Space, Tooltip } from 'antd';
import './PokemonCard.css'
import { getTypeIcon } from '../assets/icons';
import { Link } from 'react-router-dom';

interface PokemonCardrops {
  name: string
  url: string
}

const PokemonCard = (props: PokemonCardrops) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pokemon, setPokemon] = useState<any>(null)

  useEffect(() => {
    const getPokemonDetails = () => {
      setIsLoading(true)
      PokeAPI.get(props.url).then(res => {
        setPokemon(res.data)
      }).finally(() => {
        setIsLoading(false)
      })
    }

    getPokemonDetails()
  }, [props.url])

  return (
    <div className="pokemon-card">
      {isLoading && <div className="pokemon-item">
        <Skeleton loading={isLoading} style={{ padding: 12 }} title={false} active paragraph={{ rows: 2 }} />
      </div>}
      {!isLoading && pokemon &&
        <Link to={`pokemon/${pokemon.id}`}>
          <div className="pokemon-item">
            <Space direction='horizontal'>
              <div className="pokemon-image">
                <img style={{ display: 'flex', justifySelf: 'center' }} src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
              <div className="pokemon-info">
                <div className="pokemon-name">
                  {pokemon.name}
                </div>
                <div className="pokemon-type">
                  <Space direction='horizontal' size='small'>
                    {pokemon.types.map((type: any,i: KeyType) =>
                      <Tooltip key={i} title={type.type.name}>
                        <img src={getTypeIcon(type.type.name)} className='type-icon' alt={type.type.name} />
                      </Tooltip>
                    )}
                  </Space>
                </div>
              </div>
            </Space>
          </div>
        </Link>
      }
    </div>
  );
};

export default PokemonCard;