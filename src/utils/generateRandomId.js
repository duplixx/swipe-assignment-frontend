const generateRandomId = () => {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
};

export default generateRandomId;
