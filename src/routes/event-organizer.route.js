import { Router } from "express";
import eventOrganizerController from "../controllers/event-organizer.controller.js";

const router = Router();

router.get('/', eventOrganizerController.getEventOrganizers);
router.get('/:id', eventOrganizerController.getEventOrganizer);
router.post('/', eventOrganizerController.createEventOrganizer);
router.put('/:id', eventOrganizerController.updateEventOrganizer);
router.delete('/:id', eventOrganizerController.deleteEventOrganizer);

export default router;