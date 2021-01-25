export function createRabbit() {
  const privateProperties = {
    scream(line) {
      console.log(`the ${ this.type } rabbit says: ${ line.toUpperCase() }`);
    }
  };

  const rabbit = {
    setType(type) {
      if (!type) {
        throw new Error('A rabbit must have a type');
      }
      privateProperties.type = type;
    },

    getType() {
      return privateProperties.type ?? 'rabbit';
    },

    setTeeth(teethDescription) {
      if (!teethDescription) {
        throw new Error('A rabbit must have teeth');
      }
      privateProperties.teeth = teethDescription;
    },

    getTeeth() {
      return privateProperties.teeth ?? 'normal';
    },

    speak(line) {
      if (privateProperties.type === 'killer') {
        privateProperties.scream(line);
      } else {
        console.log(`The ${ privateProperties.type } rabbit with ${ privateProperties.teeth } teeth says: '${ line }`);
      }
    }
  };

  return rabbit;
}