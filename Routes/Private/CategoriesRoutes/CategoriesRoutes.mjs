// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/CategoriesControllers/CategoriesControllers.mjs";
import TokenValidator from "../../../Utilities/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE NEW CATEGORY
router.post("/create", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.CreateNewCategory(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL CATEGORIES
router.get("/", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllCategories();
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE CATEGORY
router.get("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetSingleCategoryDetails(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE SINGLE CATEGORY
router.put("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.UpdateSingleCategory(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE CATEGORY - DELETE SOFT
router.delete("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteCategorySoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE CATEGORY - DELETE PERMANENT
router.delete("/:id/delete", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteCategoryPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;