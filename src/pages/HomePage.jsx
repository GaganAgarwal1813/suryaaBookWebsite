import Hero from '../components/Hero/Hero';
import NotebookSection from '../components/NotebookSection/NotebookSection';
import { isFullCatalogActive } from '../utils/catalogDate';

const HomePage = () => {
  return (
    <>
      <Hero />
      <NotebookSection category="Regular" sectionId="regular" />
      {isFullCatalogActive() && (
        <NotebookSection category="Register" sectionId="register" />
      )}
    </>
  );
};

export default HomePage;
