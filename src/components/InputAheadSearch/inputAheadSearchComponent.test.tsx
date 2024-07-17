import {InputAheadSearchComponent} from './InputAheadSearchComponent';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../../utils/axios.service', () => ({
    filterSearch: jest.fn().mockResolvedValue([
        { name: 'pikachu',url:'' },
        { name: 'bulbasaur',url:'' },
        { name: 'charizard',url:'' },
        { name: 'gloom',url:'' },
        { name: 'baba',url:'' }
    ])
})) 

describe("InputAheadComponent",()=>{

    test('should show results bring by the service',async()=>{

        const mocksetSelectionFunction = jest.fn();
        render(<InputAheadSearchComponent setSelection={mocksetSelectionFunction}></InputAheadSearchComponent>);
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

})



