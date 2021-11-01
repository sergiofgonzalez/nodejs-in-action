/* note that an interface could also be defined instead of a type */
type PackageStatus = {
  [status: string]: boolean
}

type Package = {
  destination: string,
  weight: number,
  status: PackageStatus
}

class PackageProcessor {
  pack: Package;

  constructor(pack: Package) {
    this.pack = { ...pack };
  }

  getPackageStatus() {
    return this.pack.status;
  }

  setPackageStatus(status: string) {
    this.pack.status[status] = true;
  }
}

const initialPackageStatus: PackageStatus = {
  'shipped': false,
  'packed': false,
  'delivered': false
};

const myPack: Package = {
  destination: 'Pune',
  weight: 65,
  status: initialPackageStatus
};

const myPackageProcessor = new PackageProcessor(myPack);
console.log(myPackageProcessor.getPackageStatus());

myPackageProcessor.setPackageStatus('packed');
console.log(myPackageProcessor.getPackageStatus());

myPackageProcessor.setPackageStatus('shipped');
console.log(myPackageProcessor.getPackageStatus());

myPackageProcessor.setPackageStatus('delivered');
console.log(myPackageProcessor.getPackageStatus());

myPackageProcessor.setPackageStatus('returned');
console.log(myPackageProcessor.getPackageStatus());