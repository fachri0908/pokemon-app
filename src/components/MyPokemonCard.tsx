import React, { useState } from 'react';
import { Button, Popover, Result, Space, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { ItalicOutlined } from '@ant-design/icons';
import { editFavorite, removeFavorite } from '../features/favoriteSlice';
import { getTypeIcon } from '../assets/icons';
import empty_pokeball from '../assets/empty_pokeball.png'
import PokeballCatch from './PokeballCatch';
import './MyPokemonCard.css'
import { AppAPI } from '../helper/api';
import { checkPrime, getNewName } from '../helper/textHelper';

interface PokemonCardrops {
  pokemon: any
}

const MyPokemonCard = (props: PokemonCardrops) => {
  const { pokemon } = props
  const [isReleasing, setIsReleasing] = useState<boolean>(false)
  const [catchingStatus, setCatchingStatus] = useState<number>(0)
  const [showReleasePopup, setShowReleasePopup] = useState<boolean>(false)

  const dispatch = useDispatch();

  const changePokemonName = () => {
    AppAPI.get('rename/' + pokemon.rename_sequence).then((res) => {
      if(res.status === 200) {
        const newName = getNewName(pokemon.given_name, res.data.result)
        dispatch(editFavorite({
          id: pokemon.id,
          name: pokemon.name,
          moves: pokemon.moves,
          weight: pokemon.weight,
          height: pokemon.height,
          types: pokemon.types,
          sprites: pokemon.sprites,
          given_name: newName,
          rename_sequence: Number(res.data.sequence)
        }));
      }
    })
  }

  const releasePokemon = () => {
    setIsReleasing(true)
    setCatchingStatus(0)
    AppAPI.get('release').then((res) => {
      if (res.status === 200 && checkPrime(res.data.result)) {
        setTimeout(() => {
          dispatch(removeFavorite(pokemon))
          setCatchingStatus(1)
          setIsReleasing(false)
          setShowReleasePopup(false)
        }, 1000)
      } else {
        setTimeout(() => {
          setCatchingStatus(2)
          setIsReleasing(false)
        }, 1000)
      }
    })
  }

  return (
    <div className="pokemon-card">
      {pokemon &&
        <div className="pokemon-item">
          <Space direction='horizontal'>
            <div className="pokemon-image">
              <img style={{ display: 'flex', justifySelf: 'center' }} src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <div className="pokemon-info">
              <div className="pokemon-given-name">
                {pokemon.given_name}
              </div>
              <div className="pokemon-name">
                {pokemon.name}
              </div>
              <div className="pokemon-type">
                <Space direction='horizontal' size='small'>
                  {pokemon.types.map((type: any, i: KeyType) =>
                    <Tooltip key={i} title={type.type.name}>
                      <img src={getTypeIcon(type.type.name)} className='type-icon' alt={type.type.name} />
                    </Tooltip>
                  )}
                </Space>
              </div>
            </div>
          </Space>
          <div className="pokemon-action">
            <Space direction='vertical' align='end'>
              <Tooltip title="Change Pokemon Name">
                <Button shape="circle" icon={<ItalicOutlined />} onClick={changePokemonName} />
              </Tooltip>
              <Tooltip title="Release Pokemon">
                <Popover open={showReleasePopup} content={
                  <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: 150 }}>
                    <Space direction='vertical'>
                      {isReleasing && <PokeballCatch />}
                      {catchingStatus === 2 && <Space direction='vertical'>
                        <Result
                          status="error"
                          style={{ padding: 0 }}
                        />
                        <Button onClick={releasePokemon}>
                          Release Again
                        </Button>
                      </Space>
                      }
                      {!isReleasing && !catchingStatus &&
                        <>
                          <img
                            className='pokemon-detail-gallery-image'
                            src={pokemon.sprites.other.showdown.front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                          />
                          <Button onClick={releasePokemon}>
                            Release {pokemon.given_name}
                          </Button>
                        </>
                      }
                    </Space>
                  </div>
                } title={isReleasing ?
                  'Releasing Pokemon...' : catchingStatus === 2 ? `Failed to release Pokemon` : `Release ${pokemon.given_name} ?`}
                  trigger="click">
                  <Button onClick={() => setShowReleasePopup(!showReleasePopup)} shape="circle" icon={
                    <img style={{ width: 15, transform: 'scaleX(-1)' }} src={empty_pokeball} alt="poke-ball"/>} />
                </Popover>
              </Tooltip>
            </Space>
          </div>
        </div>
      }
    </div>
  );
};

export default MyPokemonCard;