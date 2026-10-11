import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Request, Response } from "express";
import ProductService from "../models/product.service";
import { AdminRequest } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";

const productService = new ProductService();

const productController: T = {};

/**
SPA
*/

/**
SSR
 */
productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    res.render("products");
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("createNewProduct");
    console.log("req.files:", req.files);
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;
    data.productImages = req.files?.map((ele) => {
      return ele.path;
    });

    await productService.createNewProduct(data);

    res.send(
      `<script>alert('Successful creation'); window.location.replace('/admin/products/all');</script>`,
    );
  } catch (error) {
    console.error("Error in createNewProduct:", error);
    const message =
      error instanceof Errors ? error.message : Message.SOMETHING_WENT_WRONG;

    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/products/all')</script>`,
    );
  }
};
productController.updateChosenProduct = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("updateChosenProduct");
    const id = req.params.id;
    const result = await productService.updateChosenProduct(
      Array.isArray(id) ? id[0] : id,
      req.body,
    );

    res.status(HttpCode.OK).json({ data: result });
  } catch (error) {
    console.error("Error in updateChosenProduct:", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
