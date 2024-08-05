import React, { useEffect, useState } from 'react';
import { PokeAPI } from '../../helper/api';
import './Pokemon.css'
import { Pagination, Space } from 'antd';
import PokemonCard from '../../components/PokemonCard';
import { useSearchParams } from 'react-router-dom';
import { kebabToCapitalized } from '../../helper/textHelper';

function Pokemon() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pokemons, setPokemons] = useState<any[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  let [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  const changePage = (page: number, pageSize: number) => {
    setSearchParams({ page: String(page) });
  }

  useEffect(() => {
    if (currentPage) {
      setPage(Number(currentPage))
    }
  }, [currentPage])

  useEffect(() => {
    const getPokemon = async () => {
      setIsLoading(true)
      const offset = (Number(currentPage) - 1) * 10
      const url = `pokemon?offset=${offset}&limit=10`
      PokeAPI.get(url).then(res => {
        setPokemons(res.data.results)
        setTotal(res.data.count)
      }).finally(() => {
        setIsLoading(false)
      })
    }

    getPokemon()
  }, [page, currentPage])

  return (
    <div>
      <div className="pagination">
        <Pagination
          align="end"
          defaultCurrent={1}
          current={page}
          onChange={changePage}
          total={total}
          pageSize={10}
          showSizeChanger={false} />
      </div>
      <div className="pokemon-list">
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          {!isLoading && pokemons.map(((pokemon, i) =>
            <PokemonCard key={i} name={kebabToCapitalized(pokemon.name)} url={pokemon.url} />
          ))}
        </Space>
      </div>

    </div>
  );
}

export default Pokemon;
