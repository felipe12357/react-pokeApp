import { fireEvent, render,screen } from "@testing-library/react";
import { PaginatorComponent } from "./PaginatorComponent";
import '@testing-library/jest-dom';
describe("PaginatorComponent",()=>{

    jest.mock('../../utils/axios.service', () => ({
        ELEMENTS_X_PAGE: 20
    })) 

    const updatePageFn = jest.fn();
    test('should show all buttons',()=>{
        render(<PaginatorComponent numOfElements={180} currentPage={5} updatePage={updatePageFn}></PaginatorComponent>);
        expect(screen.queryByText('4')).toBeInTheDocument();
        expect(screen.queryByText('5')).toBeInTheDocument();
        expect(screen.queryByText('3')).toBeInTheDocument();
        expect(screen.queryByText('<<')).toBeInTheDocument();
        expect(screen.queryByText('>>')).toBeInTheDocument();
    })

    test('should show call output funcion when click on a button',()=>{
        const {getByText} = render(<PaginatorComponent numOfElements={180} currentPage={5} updatePage={updatePageFn}></PaginatorComponent>);
      
        const buttonnumber = getByText('4');
        fireEvent.click(buttonnumber);
        expect(updatePageFn).toHaveBeenCalledWith(4);
        const buttonStart = getByText('<<');
        fireEvent.click(buttonStart);
        expect(updatePageFn).toHaveBeenCalledWith(1);
        const buttonEnd = getByText('>>');
        fireEvent.click(buttonEnd);
        expect(updatePageFn).toHaveBeenCalledWith(9);

    })

    test('the button should have active class if it is current page',()=>{
        const {getByText} = render(<PaginatorComponent numOfElements={180} currentPage={5} updatePage={updatePageFn}></PaginatorComponent>);
        const buttonnumber = getByText('5');
        expect(buttonnumber).toHaveClass('active');
    })
   
})