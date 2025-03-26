import { Router } from "express";
import eventOrganizerController from "../controllers/event-organizer.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const router = Router();

router.get('/', validateToken, eventOrganizerController.getEventOrganizers);
router.get('/:id', validateToken, eventOrganizerController.getEventOrganizer);
router.get('/owner/:ownerId', validateToken, eventOrganizerController.getEventOrganizerByOwnerId);
router.post('/', validateToken, eventOrganizerController.createEventOrganizer);
router.put('/:id', validateToken, eventOrganizerController.updateEventOrganizer);
router.delete('/:id', validateToken, eventOrganizerController.deleteEventOrganizer);

export default router;