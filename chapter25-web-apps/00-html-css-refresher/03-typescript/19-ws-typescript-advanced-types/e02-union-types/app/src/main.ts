type LandPack = {
  destination: string,
  deliveryType: 'land',
  label?: string
}

type AirPack = {
  destination: string,
  deliveryType: 'air',
  label?: string
}

type ComboPack = LandPack | AirPack

class Shipping {
  pack: ComboPack;

  constructor(pack: ComboPack) {
    this.pack = { ...pack }; // force cloning to prevent aliasing to the same reference
    if (pack.deliveryType === 'land') {
      this.pack.label = 'land cargo';
    } else {
      this.pack.label = 'air cargo';
    }
  }
}

const myLandPack: ComboPack = { destination: 'Pozuelo', deliveryType: 'land' };
const landShipment = new Shipping(myLandPack);

const airShipment = new Shipping({ destination: 'Kuala Lumpur', deliveryType: 'air' });

console.log(airShipment);
console.log(landShipment);
console.log(myLandPack);


