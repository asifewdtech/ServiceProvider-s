// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/SubCategoriesControllers/SubCategoriesControllers.mjs";
import TokenValidator from "../../../Utilities/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE NEW SUB-CATEGORY
router.post("/create", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.CreateNewSubCategory(req.body);
    return data ? res.send(data) : res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL SUB-CATEGORIES
router.get("/", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetAllSubCategories();
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE SUB-CATEGORY DETAILS
router.get("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.GetSingleSubCategoryDetails(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE SINGLE SUB-CATEGORY
router.put("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.UpdateSingleSubCategory(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE SUB-CATEGORY - DELETE SOFT
router.delete("/:id", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteSubCategorySoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE SINGLE SUB-CATEGORY - DELETE PERMANENT
router.delete("/:id/delete", TokenValidator, async (req, res) => {
  try {
    const data = await Controllers.DeleteSubCategoryPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;