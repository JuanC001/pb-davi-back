import { Router } from "express";
import eventController from "../controllers/event.controller.js";

const router = Router();

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;