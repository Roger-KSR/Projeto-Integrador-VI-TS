import { Router } from "express";
import * as funcionarioController from "../controllers/funcionario.controller";

const router = Router();

router.get("/", funcionarioController.listar);
router.get("/:id", funcionarioController.buscarPorId);
router.post("/", funcionarioController.criar);

export default router;
