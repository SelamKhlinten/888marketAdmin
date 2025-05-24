//   {
//     "id": 8,
//     "title": "Samsung Galaxy",
//     "description": "Flagship Samsung phone",
//     "price": "900.00",
//     "formattedPrice": {
//         "amount": 900,
//         "currency": "USD",
//         "formatted": "900.00 USD"
//     },
//     "reviewCount": 0,
//     "averageRating": 0,
//     "convertedPrice": {
//         "amount": 900,
//         "currency": "USD",
//         "exchange_rate": 1
//     },
//     "category": {
//         "id": 3,
//         "name": "Phones",
//         "parent": 1,
//         "icon": null,
//         "icon_url": null,
//         "image": null,
//         "image_url": null,
//         "created_at": "2025-05-11T08:13:37.447306Z",
//         "subcategories": []
//     },
//     "city": {
//         "id": 5,
//         "name": "Deira",
//         "region": "Dubai"
//     },
//     "sellerName": "Vendor",
//     "image": null,
//     "imageUrl": null,
//     "createdAt": "2025-05-11 08:13:39",
//     "isFavorited": false
// }
// {
//   "id": 0,
//   "title": "string",
//   "description": "string",
//   "price": "string",
//   "formatted_price": "string",
//   "review_count": 0,
//   "average_rating": "string",
//   "converted_price": "string",
//   "currency": "string",
//   "category": {
//     "id": 0,
//     "name": "string",
//     "parent": 0,
//     "icon": "string",
//     "icon_url": "string",
//     "image": "string",
//     "image_url": "string",
//     "created_at": "2025-05-14T23:33:46.689Z",
//     "subcategories": "string"
//   },
//   "category_id": 0,
//   "city": {
//     "id": 0,
//     "name": "string",
//     "region": "string"
//   },
//   "city_id": 0,
//   "seller_name": "string",
//   "image": "string",
//   "image_url": "string",
//   "created_at": "2025-05-14T23:33:46.689Z",
//   "is_favorited": "string"
// }

export default interface ProductTypes {
  id: number;
  name: string;
  description: string;
  price: {
    currency: string;
    amount: number;
  };
  stock: number;
  imgUrls: string[];
  category: {
    id: number;
    name: string;
  };
  subcategory: {
    id: number;
    name: string;
  };
}
