import * as firebase from 'firebase/app';
import "firebase/firestore";

type HasProductId = {
    id: string
}

type HasCreateProduct = {
  sku: string
  path: string
  ean: string
  name: string
  videos: string[]
  manuals: string[]
  software: string[]
  specification: string
  inTheBox: string
  meta: {
      title: string
      description: string
  }
};

type CreateProduct = HasCreateProduct;
type Product = HasProductId & HasCreateProduct;

class Client {
  db: firebase.firestore.Firestore;

  constructor(db: firebase.firestore.Firestore) {
    this.db = db;
  }

  static version() {
      return 'VERSION';
  }

  async updateProduct(productId: string, product: CreateProduct): Promise<void> {
    try {
      this.db.collection('products').doc(productId).set(product);
    } catch (err) {
      throw err;
    }
  }

  async getProductByID(productId: string): Promise<Product> {
    try {
      let doc = await this.db.collection('products').doc(productId).get();
      if (doc.exists) {
        let data = doc.data();
        if (data) {
          return {
            id: productId,
            sku: data.sku,
            path: data.path,
            ean: data.ean,
            name: data.name,
            videos: data.videos,
            manuals: data.manuals,
            software: data.software,
            specification: data.specification,
            inTheBox: data.inTheBox,
            meta: data.meta
          };
        }
        throw new Error('failed to read data from document');
      }
      throw new Error(`product id ${productId} does not exist`);
    } catch (err) {
      throw err;
    }
  }
}

export default Client;
