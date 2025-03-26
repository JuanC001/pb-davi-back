import { Router } from "express";
import eventController from "../controllers/event.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const router = Router();

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post('/', validateToken, eventController.createEvent);
router.put('/:id', validateToken, eventController.updateEvent);
router.delete('/:id', validateToken, eventController.deleteEvent);

export default router;