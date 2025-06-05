export const TableRowAnimation = {
  hidden: {
    opacity: 0,
    x: -20,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: index * 0.03,
      mass: 0.5,
    },
  }),
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    scale: 1.01,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  tap: {
    scale: 0.98,
  },
};

export const CardSlideAnimation = {
  hidden: {
    opacity: 0,
    x: -30,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: index * 0.05,
      mass: 0.5,
    },
  }),
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  tap: {
    scale: 0.97,
  },
};
