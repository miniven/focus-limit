const focusLimiter = (node) => {
  const focusableElementsSelectors = [
    'a[href]',
    'button:not([disabled])',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable]',
  ];

  const keyCodes = {
    TAB: 9,
  };

  const isVisible = field => field.style.display !== 'none';

  const isTabable = (field) => {
    if (field.hasAttribute('tabindex')) {
      const index = Number(field.getAttribute('tabindex'));
      const MAX_INDEX = 32767;

      return !Number.isNaN(index) && index >= 0 && index <= MAX_INDEX;
    }

    return true;
  };

  const sortByTabindex = (prev, current) => {
    const prevTabindex = Number(prev.getAttribute('tabindex'));
    const currentTabindex = Number(current.getAttribute('tabindex'));

    if (prevTabindex === 0 && currentTabindex === 0) return 0;

    if (prevTabindex === 0) return 1;

    if (currentTabindex === 0) return -1;

    return prevTabindex > currentTabindex ? 1 : currentTabindex - prevTabindex;
  };

  const focusableElements = [...node.querySelectorAll(focusableElementsSelectors.join())]
    .filter(field => isVisible(field) && isTabable(field))
    .sort(sortByTabindex);

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  const handleKeydown = (event) => {
    const currentIndex = focusableElements.indexOf(event.target);
    let nextFocus;

    if (event.keyCode !== keyCodes.TAB) return false;

    if (!event.shiftKey) {
      nextFocus = focusableElements[currentIndex + 1] || first;
    } else {
      nextFocus = focusableElements[currentIndex - 1] || last;
    }

    nextFocus.focus();
    event.preventDefault();

    return event;
  };

  const limit = () => {
    document.addEventListener('keydown', handleKeydown);
  };

  const unlimit = () => {
    document.removeEventListener('keydown', handleKeydown);
  };

  return {
    limit,
    unlimit,
  };
};

export default focusLimiter;