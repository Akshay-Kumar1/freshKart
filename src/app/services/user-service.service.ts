import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  getItems() {
    let products =
      [
        {
          "id": 1,
          "img_url": "./assets/kurkure.jpg",
          "price": 20,
          "discount": 5,
          "category": "chips",
          "translationKey":"products.kurkure"
        },
      {
          "id": 2,
          "img_url": './assets/kitkat.jpg',
          "price": 10,
          "discount": 0,
          "category": "chocolate",
          "translationKey":"products.kitkat"
        },
        {
          "id": 3,
          "img_url": './assets/celebrations.jpg',
          "price": 450,
          "discount": 10,
          "category": "chocolate",
          "translationKey":"products.celebrations"
        },
          {
          "id": 4,
          "img_url": './assets/maggi.jpg',
          "price": 60,
          "discount": 0,
          "category": "noodles",
          "translationKey":"products.maggi"
        },
          {
            "id": 5,
            "img_url": './assets/masala-chips.svg',
            "price": 30,
            "discount": 10,
            "category": "chips",
            "translationKey":"products.masalaChips"
          },
          {
            "id": 6,
            "img_url": './assets/salted-chips.svg',
            "price": 20,
            "discount": 0,
            "category": "chips",
            "translationKey":"products.saltedChips"
          },
          {
            "id": 7,
            "img_url": './assets/milk-chocolate.svg',
            "price": 40,
            "discount": 5,
            "category": "chocolate",
            "translationKey":"products.milkChocolate"
          },
          {
            "id": 8,
            "img_url": './assets/chocolate-wafer.svg',
            "price": 25,
            "discount": 12,
            "category": "biscuits",
            "translationKey":"products.chocolateWafer"
          },
      ]
    return products;
  }
}
