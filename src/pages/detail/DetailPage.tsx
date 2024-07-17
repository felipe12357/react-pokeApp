import { useLoaderData } from "react-router-dom";
import './detail.scss';
import { PokemonDetailLocal } from "../../models/local";
const DetailPage = () =>{
    const pokemonDetail = useLoaderData() as PokemonDetailLocal;
    const pokemonImgUrl ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home";

    return (
        <div className="details">
            <div className={`details_image poke_container_${pokemonDetail.types[0]}`}>
                <div className={`details_title poke_font_${pokemonDetail.types[0]}`}>{pokemonDetail.name}</div>
                <img src={ `${pokemonImgUrl}/${pokemonDetail.id}.png`}></img>
            </div>
            <div className="details_characteristcs">
                <div className={`poke_font_${pokemonDetail.types[0]} subtitle`}>Type(s)</div> 
                <div><span>{pokemonDetail.types[0]}</span>
                     { (pokemonDetail.types.length>1) && <span>, {pokemonDetail.types[1]}</span> }
                </div>
                <div className={`poke_font_${pokemonDetail.types[0]} subtitle`}>Abilities(s)</div> 
                <div><span>{pokemonDetail.abilities[0]}</span>
                     { (pokemonDetail.abilities.length>1) && <span>, {pokemonDetail.abilities[1]}</span> }
                </div>
                <div className={`poke_font_${pokemonDetail.types[0]} subtitle` }>Height</div> <div>{pokemonDetail.height} Mtr</div>
                <div className={`poke_font_${pokemonDetail.types[0]} subtitle`}>Width</div> <div> {pokemonDetail.weight} Lb</div>
                <div className={`poke_font_${pokemonDetail.types[0]} subtitle`}>Habitat</div> <div>{(pokemonDetail.habitat) && pokemonDetail.habitat}</div>
            </div>
            <div className="details_description">
                <p>{(pokemonDetail.flavor_text_entries.length>=0) &&pokemonDetail.flavor_text_entries[0]} </p>
                <p>{(pokemonDetail.flavor_text_entries.length>=2) && pokemonDetail.flavor_text_entries[2]} </p>
                <p>{(pokemonDetail.flavor_text_entries.length>=4) && pokemonDetail.flavor_text_entries[4]} </p>
            </div>
        </div>
    )
}

export default DetailPage;