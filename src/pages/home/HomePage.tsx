import { useLoaderData } from 'react-router-dom';
import './home.scss';
import { PokemonDTO } from '../../models/dtos';
import { useContextAPIGlobal } from '../../context/GlobalContext';
import { useEffect, useState } from 'react';
import { PokemonLocal } from '../../models/local';
import { pokeService, MAX_LIMIT } from '../../utils/axios.service';
import { CurtainComponent, InputAheadSearchComponent, PaginatorComponent, PokemonListComponent } from '../../components';

const HomePage = () =>{
   
    const pokemonList = useLoaderData() as PokemonDTO[];
    const {favoriteState} = useContextAPIGlobal();
    const [pokemonListToDisplay,setpokemonListToDisplay] = useState<PokemonLocal[]>([]);

    useEffect(()=>{
        updatePokemonList(pokemonList);
    },[])

    const updatePage=async(page:number)=>{
        const pokemonList =await pokeService.getPokemonList(page);
        (pokemonList) && updatePokemonList(pokemonList);
    }

    const updatePokemonList =(pokemonList:PokemonDTO[])=>{
        const tempList = pokemonList.map((pokemon)=>{
            const isFavorite = favoriteState.favoriteList.findIndex(({name})=>pokemon.name === name)
            return (isFavorite>=0) ?  {...pokemon,isFavorite:true} : {...pokemon,isFavorite:false}
        })
        setpokemonListToDisplay(tempList);
    }

    return(
        <>
            <InputAheadSearchComponent></InputAheadSearchComponent>
            <PokemonListComponent pokemonList={pokemonListToDisplay}></PokemonListComponent>
            <PaginatorComponent numOfElements={MAX_LIMIT} currentPage={1} updatePage={updatePage}></PaginatorComponent>
            <CurtainComponent></CurtainComponent>
        </>

    )
}
export default HomePage;