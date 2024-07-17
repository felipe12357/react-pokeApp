import { render, fireEvent, act } from '@testing-library/react';
import HomePage from './HomePage';
import '@testing-library/jest-dom';
import { pokeRepository } from '../../utils/pokemonService';


const mockPokemonList = [
    { name: 'Pikachu', url:'https://pokeapi.co/api/v2/pokemon/1/', },
    { name: 'Bulbasaur',url:'https://pokeapi.co/api/v2/pokemon/2/', },
];

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () =>mockPokemonList,
    useNavigate: () =>mockNavigate,
 }));

describe('HomePage Component', () => {

    test('renders PokemonListComponent with initialized pokemonListToDisplay', () => {
        const { getByText } = render(<HomePage />);

        expect(getByText('1. Pikachu')).toBeInTheDocument();
        expect(getByText('2. Bulbasaur')).toBeInTheDocument();
    });

    test('updatePage updates pokemonListToDisplay correctly', async() => {
        // Mock de la función getPokemonList
        jest.spyOn(pokeRepository, 'getPokemonList').mockResolvedValue([
            { name: 'Charmander',url: 'https://pokeapi.co/api/v2/pokemon/3/', }] );

        const { getByText } = render(<HomePage />);
        act(() => fireEvent.click(getByText('2')) ); 

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
        });
        expect(getByText('3. Charmander')).toBeInTheDocument();
    });

});