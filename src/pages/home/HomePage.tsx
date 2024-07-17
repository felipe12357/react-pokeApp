import { useLoaderData } from 'react-router-dom';
import './home.scss';
import { PokemonDTO } from '../../models/dtos';
import { useContextAPIGlobal } from '../../context/GlobalContext';
import { useEffect, useState } from 'react';
import { PokemonLocal } from '../../models/local';
import { getPokemonList, MAX_LIMIT } from '../../utils/axios.service';
import { InputAheadSearchComponent, PaginatorComponent, PokemonListComponent } from '../../components';

const HomePage = () =>{
   
    const pokemonList = useLoaderData() as PokemonDTO[];
    const getSelection =(name:string)=> {
        console.log(name);
    }

    const {favoriteState} = useContextAPIGlobal();
    const [pokemonListToDisplay,setpokemonListToDisplay] = useState<PokemonLocal[]>([]);

    useEffect(()=>{
        updatePokemonList(pokemonList);
    },[])

    const updatePage=async(page:number)=>{
        const pokemonList =await getPokemonList(page);
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
        <div className='home-container'>
            <InputAheadSearchComponent setSelection={getSelection}></InputAheadSearchComponent>
            <PokemonListComponent pokemonList={pokemonListToDisplay}></PokemonListComponent>
            <PaginatorComponent numOfElements={MAX_LIMIT} currentPage={1} updatePage={updatePage}></PaginatorComponent>
            <div className="curtain-top"></div>
            <div className="curtain-bottom"> </div>            
        </div>

    )
}
export default HomePage;