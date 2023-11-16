import HeaderCartButton from './HeaderCartButton'
import classes from './Header.module.css'

const Header = (props) => {
      return (
            <header className={classes.header}>
                  <h1>Candy Shop</h1>
                  <HeaderCartButton onClick={props.onShowCart} />
            </header>
      );
};

export default Header;