import React,{Component} from 'react';
import { Navbar, NavbarBrand ,Jumbotron} from 'reactstrap';

class Header1 extends Component
{
    render()
    {
        return(
            <>
                <Navbar dark >
                    <div className="container">
                    <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                     </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Restorrente de Confusion</h1>
                                <p>Enjoy the best cusion ever</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

            </>

        );
    }
}
export default Header1;