type Motor = {
  color: string,
  doors: number,
  wheels: number,
  fourWheelDrive: boolean
}

type Truck = {
  doubleCab: boolean,
  winch: boolean
}

type PickupTruck = Motor & Truck

function TruckBuilder(pickupTruck: PickupTruck): PickupTruck {
  return pickupTruck;
}

const myPickupTruck = TruckBuilder({
  color: 'red',
  doors: 4,
  doubleCab: true,
  wheels: 4,
  fourWheelDrive: true,
  winch: true
});

console.log(myPickupTruck);