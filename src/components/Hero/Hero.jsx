import { STORE_NAME } from '../../constants/business';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">{STORE_NAME}</h1>
        <p className="hero-tagline">Quality notebooks at wholesale prices</p>
      </div>
    </section>
  );
};

export default Hero;
