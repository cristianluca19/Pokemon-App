export const validateForm = (input) => {
    const errors = {};
    if (!input.name.trim()) {
      errors.name = "Name required.";
    }
    if (!input.hp) {
      errors.hp = "Hp required.";
    }
    if (!input.attack) {
      errors.attack = "Attack required.";
    }
    if (!input.defense) {
      errors.defense = "Defense required.";
    }
    if (!input.speed) {
      errors.speed = "Speed required.";
    }
    if (!input.height) {
      errors.height = "Height required.";
    }
    if (!input.weight) {
      errors.weight = "Weight required.";
    }
    if (!input.img) {
      errors.img = "Image required.";
    }
    if (input.types.length === 0) {
      errors.types = "At least one type is required";
    }
    return errors;
  };