import Hero from '../components/Hero/Hero';
import OrderBanner from '../components/OrderBanner/OrderBanner';
import NotebookSection from '../components/NotebookSection/NotebookSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <OrderBanner />
      <NotebookSection category="Regular" sectionId="regular" />
      <NotebookSection category="Register" sectionId="register" />
      {/* Hidden categories — uncomment when ready:
      <NotebookSection category="A5" sectionId="a5" />
      <NotebookSection category="Spiral" sectionId="spiral" />
      <NotebookSection category="Hard Cover" sectionId="hard-cover" />
      */}
    </>
  );
};

export default HomePage;
