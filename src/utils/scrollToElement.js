/**
 * Smoothly scrolls the viewport to the element with the given id.
 * @param {string} id - The DOM element id to scroll to
 */
export const scrollToElement = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};
