import { act, fireEvent, render,screen, waitFor } from "@testing-library/react";
import { PokemonListComponent } from "./PokemonListComponent";
import '@testing-library/jest-dom';
import { PokemonLocal } from "../../models/local";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () =>mockNavigate,
 }));

describe("PokemonListComponent",()=>{
    const mockPokemonList:PokemonLocal[] = [{
        name:'Pika',
        url:'https://pokeapi.co/api/v2/pokemon/1/',
        isFavorite:true
    },{
        name:'charm',
        url:'https://pokeapi.co/api/v2/pokemon/2/',
        isFavorite:false
    }]

    test('should show a message when it doesnt receive elements',()=>{
        render(<PokemonListComponent pokemonList={[]}></PokemonListComponent>);
        expect(screen.queryByText('There are not pokemon to display')).toBeInTheDocument();
    })

    test('it should display the number of elements it receives',()=>{
        const { container } = render(<PokemonListComponent pokemonList={mockPokemonList}></PokemonListComponent>);
        const elements = container.getElementsByClassName('row-container');
        expect(elements.length).toBe(2); 
        expect(screen.queryByText('2. charm')).toBeInTheDocument();
        expect(screen.queryByText('1. Pika')).toBeInTheDocument();
    })

    test('call navigate with the selected row',()=>{
        const { getByText } = render(<PokemonListComponent pokemonList={mockPokemonList}></PokemonListComponent>);
        const button = getByText('1. Pika');
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith('/detail/Pika');
    })

    test('favorite',async()=>{
        const { container } = render(<PokemonListComponent pokemonList={mockPokemonList}></PokemonListComponent>);
        const favoriteElements = container.getElementsByClassName('marked-favorite');
        expect(favoriteElements.length).toBe(1);
    })
});