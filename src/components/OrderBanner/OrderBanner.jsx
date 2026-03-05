import './OrderBanner.css';

const OrderBanner = () => {
  return (
    <div className="order-banner">
      <div className="order-banner-inner">
        <div className="order-banner-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25.94l-2.2 2.28z" fill="currentColor"/>
          </svg>
        </div>
        <div className="order-banner-text">
          <span className="order-banner-heading">Want to place an order? Call us!</span>
          <a href="tel:+919927158581" className="order-banner-phone">+91 9927158581</a>
        </div>
      </div>
    </div>
  );
};

export default OrderBanner;
