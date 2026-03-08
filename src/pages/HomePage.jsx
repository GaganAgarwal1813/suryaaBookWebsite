import Hero from '../components/Hero/Hero';
import NotebookSection from '../components/NotebookSection/NotebookSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <NotebookSection category="Regular" sectionId="regular" />
      <NotebookSection category="Register" sectionId="register" />
    </>
  );
};

export default HomePage;
