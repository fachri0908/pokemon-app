import React, { useEffect, useState } from 'react';
import { AppAPI, PokeAPI } from '../../helper/api';
import { Breadcrumb, Button, Divider, Popover, Progress, Result, Space, Tag, Tooltip, Input } from 'antd';
import { useParams } from 'react-router-dom';
import './PokemonDetail.css'
import { getTypeIcon } from '../../assets/icons';
import weight from '../../assets/icons/weight.svg';
import ruler from '../../assets/icons/ruler.svg';
import pokeball from '../../assets/icons/pokeball.svg';
import { kebabToCapitalized } from '../../helper/textHelper';
import PokeballCatch from '../../components/PokeballCatch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../helper/store';
import { addFavorite, removeFavorite } from '../../features/favoriteSlice';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

function PokemonDetail() {
  const [isCatching, setIsCatching] = useState<boolean>(false)
  const [catchingStatus, setCatchingStatus] = useState<number>(0)
  const [pokemon, setPokemon] = useState<any>(null)
  const [givenName, setGivenName] = useState<string>("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const favorites = useSelector((state: RootState) => state.favorites.favorites)

  const isFavorite = favorites.some((fav) => fav.id === Number(id))

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const res = await PokeAPI.get(`pokemon/${id}`);
        setPokemon(res.data);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };
  
    getPokemonDetails();
  }, [id]);

  const catchPokemon = () => {
    const newName = `Mighty ${kebabToCapitalized(pokemon.name)}`
    setIsCatching(true)
    setCatchingStatus(0)
    AppAPI.get('catch').then((res) => {
      if (res.status === 200 && res.data.result) {
        dispatch(addFavorite({
          id: pokemon.id,
          name: pokemon.name,
          moves: pokemon.moves,
          weight: pokemon.weight,
          height: pokemon.height,
          types: pokemon.types,
          sprites: pokemon.sprites,
          given_name: newName,
          rename_sequence: 0
        }));
        setGivenName(newName)
        setTimeout(() => {
          setCatchingStatus(1)
          setIsCatching(false)
        }, 2000)
      } else {
        setTimeout(() => {
          setIsCatching(false)
          setCatchingStatus(2)
        }, 2000)
      }
    })
  }

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) setCatchingStatus(0)
  }

  const changePokemonName = () => {
    dispatch(removeFavorite(pokemon))
    dispatch(addFavorite({
      id: pokemon.id,
      name: pokemon.name,
      moves: pokemon.moves,
      weight: pokemon.weight,
      height: pokemon.height,
      types: pokemon.types,
      sprites: pokemon.sprites,
      given_name: givenName,
      rename_sequence: 0
    }));
    setCatchingStatus(0)
  }

  return (
    <div style={{ flex: 1 }}>
      {pokemon &&
        <>
          <Breadcrumb
            style={{ marginBottom: 10 }}
            items={[
              {
                title: <span style={{color:'#000', fontWeight: 500, cursor:'pointer'}} onClick={() => navigate(-1)}><LeftOutlined /> Pokemon</span>,
              },
              {
                title: kebabToCapitalized(pokemon.name),
              }
            ]}
          />
          <Space size='large' direction='horizontal' style={{ verticalAlign: 'top', alignItems: 'start' }}>
            <div className="image-container">
              <img src={pokemon.sprites.other.home.front_default} className='pokemon-detail-image' alt={pokemon.name} />
            </div>
            <div className="pokemon-info">
              <div className="pokemon-detail-name">
                {kebabToCapitalized(pokemon.name)}
              </div>
              <div className="pokemon-detail-type">
                <Space direction='horizontal' size={30}>
                  {pokemon.types.map((type: any, i: KeyType) =>
                    <Space direction='vertical' key={i} size={1} style={{ alignItems: 'center' }}>
                      <div className="type-detail-icon-container">
                        <img src={getTypeIcon(type.type.name)} className='type-detail-icon' alt={type.type.name} />
                      </div>
                      <div className="type-detail-name">
                        {type.type.name}
                      </div>
                    </Space>
                  )}
                </Space>
              </div>
              <div className="pokemon-detail-size">
                <Space direction='horizontal' size={30}>
                  <Space direction='vertical' size={1} style={{ alignItems: 'center' }}>
                    <div className="type-detail-icon-container">
                      <img src={ruler} className='type-detail-icon' alt='weight' />

                    </div>
                    <div className="type-detail-name">
                      {pokemon.height / 10}M
                    </div>
                  </Space>
                  <Space direction='vertical' size={1} style={{ alignItems: 'center' }}>
                    <div className="type-detail-icon-container">
                      <img src={weight} className='type-detail-icon' alt='weight' />
                    </div>
                    <div className="type-detail-name">
                      {pokemon.weight}KG
                    </div>
                  </Space>
                </Space>
              </div>
            </div>
            <div className="pokemon-detail-stat">
              {pokemon.stats.map((stat: any, i: KeyType) => (
                <div key={i}>
                  <div className='pokemon-detail-stat-name'>
                    {kebabToCapitalized(stat.stat.name)}
                  </div>
                  <Progress strokeColor='#1677ff' percent={(stat.base_stat / 255) * 100} showInfo={false} />
                </div>
              ))}
            </div>
          </Space>
          <Divider />
          <div className="pokemon-detail-moves">
            <div className="pokemon-detail-moves-title">Moves</div>
            {pokemon.moves.map((move: any, i: KeyType) => (
              <Tag key={i} style={{ margin: 3 }}>{kebabToCapitalized(move.move.name)}</Tag>
            ))}
          </div>
          <Divider />
          <div className="pokemon-detail-moves">
            <div className="pokemon-detail-moves-title">Gallery</div>
            <Space direction='vertical'>
              <Space direction='horizontal'>
                {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
                {pokemon.sprites.back_default && <img src={pokemon.sprites.back_default} alt={pokemon.name} />}
                {pokemon.sprites.front_shiny && <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />}
                {pokemon.sprites.back_shiny && <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />}
              </Space>
              <Space direction='horizontal'>
                {pokemon.sprites.other.dream_world.front_default &&
                  <img className='pokemon-detail-gallery-image' src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                }
                {pokemon.sprites.other.home.front_default &&
                  <img className='pokemon-detail-gallery-image' src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
                }
                {pokemon.sprites.other['official-artwork'].front_default &&
                  <img className='pokemon-detail-gallery-image' src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                }
                {pokemon.sprites.other.showdown.front_default &&
                  <img className='pokemon-detail-gallery-image' src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} />
                }
              </Space>
            </Space>
          </div>
          <Tooltip title="Catch this pokemon">
            <Popover content={
              <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: 150 }}>
                <Space direction='vertical'>
                  {isCatching && <PokeballCatch />}
                  {catchingStatus === 1 && <Space direction='vertical' size={1}>
                    <Result
                      status="success"
                      style={{ padding: 0, margin: 0 }}
                    />
                    <span style={{ fontSize: 12 }}>
                      Name your pokemon
                    </span>
                    <Input
                      placeholder="Give your new pokemon a name"
                      value={givenName}
                      style={{ margin: '0px 0px 5px 0px' }}
                      onChange={(event) => setGivenName(event.target.value)}
                    />
                    <Button onClick={changePokemonName} type='primary'>save</Button>
                  </Space>
                  }
                  {catchingStatus === 2 && <Space direction='vertical'>
                    <Result
                      status="error"
                      style={{ padding: 0 }}
                    />
                    <Button onClick={catchPokemon}>
                      Catch Again
                    </Button>
                  </Space>}
                  {!isCatching && !catchingStatus &&
                    <>
                      <img
                        className='pokemon-detail-gallery-image'
                        src={pokemon.sprites.other.showdown.front_default || pokemon.sprites.front_default}
                        alt={pokemon.name}
                      />
                      <Button onClick={catchPokemon} disabled={isFavorite}>
                        {isFavorite ? `You already catched ${kebabToCapitalized(pokemon.name)}` :
                          `Catch ${kebabToCapitalized(pokemon.name)}`}
                      </Button>
                    </>
                  }

                </Space>

              </div>
            } title={isCatching ?
              'Catching Pokemon...' : isFavorite ?
                `Yay, you got bulbasour` : catchingStatus === 2 ?
                  `Oups, ${kebabToCapitalized(pokemon.name)} has ran away` : `Catch ${kebabToCapitalized(pokemon.name)} ?`}
              trigger="click"
              onOpenChange={onOpenChange}>
              <img src={pokeball} className='poke-ball' alt="poke-ball" />
            </Popover>
          </Tooltip>
        </>
      }
    </div>
  );
}

export default PokemonDetail;
