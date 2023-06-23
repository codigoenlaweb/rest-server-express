// express
import { Request, Response } from "express";
// third party
// app
import { errorResponse } from "../helper";
import {
  searchCategories,
  searchProducts,
  searchUsers,
} from "../queries/searchQueries";

class SearchController {
  constructor() {
    this.Search = this.Search.bind(this);
  }
  
  // atributes
  public collectionPermitted = ["users", "categories", "products"];

  // Get search by collection and term
  public async Search(req: Request, res: Response) {
    const { collection, term } = req.params;
    const { limit = 15, page = 0 } = req.query;

    if (!this.collectionPermitted.includes(collection)) {
      return errorResponse({
        res,
        msg: `The collection ${collection} is not permitted`,
        status: 400,
        value: collection,
        location: "params",
      });
    }

    switch (collection) {
      case "users":
        await searchUsers(term, res, Number(limit), Number(page));
        break;
      case "categories":
        await searchCategories(term, res, Number(limit), Number(page));
        break;
      case "products":
        await searchProducts(term, res, Number(limit), Number(page));
        break;
      default:
        errorResponse({
          res,
          msg: "Internal server error",
          status: 500,
          value: "Internal server error",
          location: "params",
        });
    }
  }
}

export default new SearchController();