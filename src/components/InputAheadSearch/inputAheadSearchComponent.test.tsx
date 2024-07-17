import {InputAheadSearchComponent} from './InputAheadSearchComponent';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { pokeRepository } from '../../utils/pokemonService';

const mockUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockUsedNavigate,
 }));


describe("InputAheadComponent",()=>{

    test('should show results bring by the service',async()=>{
        jest.spyOn(pokeRepository, 'filterSearch').mockResolvedValue([
            { name: 'pikachu',url:'' },
            { name: 'bulbasaur',url:'' },
            { name: 'charizard',url:'' },
            { name: 'gloom',url:'' },
            { name: 'baba',url:'' }
        ]);

        render(<InputAheadSearchComponent></InputAheadSearchComponent>);
        expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();

        const inputElement = screen.getByRole('textbox') as HTMLInputElement;
        act(() => {
            fireEvent.change(inputElement, { target: { value: 'pika' } });
        });

        
        expect(screen.getByText('Loading ...')).toBeInTheDocument();

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
        });

        expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();
        expect(screen.queryByText('pikachu')).toBeInTheDocument();
        expect(screen.queryByText('bulbasaur')).toBeInTheDocument();
        expect(screen.queryByText('baba')).not.toBeInTheDocument();
    })


    test('should show not result foound',async()=>{
        jest.spyOn(pokeRepository, 'filterSearch').mockResolvedValue([]);

        render(<InputAheadSearchComponent></InputAheadSearchComponent>);
        expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();

        const inputElement = screen.getByRole('textbox') as HTMLInputElement;
        act(() => {
            fireEvent.change(inputElement, { target: { value: 'pika' } });
        });

        
        expect(screen.getByText('Loading ...')).toBeInTheDocument();

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
        });

        expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();
        expect(screen.queryByText('There was not result')).toBeInTheDocument();
    })
})
