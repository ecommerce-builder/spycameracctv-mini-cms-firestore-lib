# SpyCameraCCTV mini CMS client

A small helper library to read and write product content data. Products are keyed by `productId`, corresponding to the product `id` returned from the the Ecom API GET `/products/{id}` resource.

```js
(async () => {
  let db = firebase.firestore();
  let client = new SpycameraCMSClient(db);

  client.updateProduct('12345', {
    sku: 'TV2',
    path: 'television-set',
    ean: 'tv-ean',
    name: 'A giant TV',
    videos: ['a', 'b', 'c'],
    manuals: ['d', 'e', 'f'],
    software: ['g', 'h', 'i'],
    specification: 'specification',
    inTheBox: 'in the box',
    meta: {
      title: 'TV title',
      description: 'description of a tv'
    }
  });

  let p = await client.getProductByID('12345');
  console.dir(p);
})();
```
