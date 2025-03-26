import { Router } from "express";
import userEventController from "../controllers/user-event.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const router = Router();

router.get('/event/:eventId', validateToken, userEventController.getRegisteredUsersByEvent);
router.get('/user/:userId', validateToken, userEventController.getRegisteredEventsByUser);
router.post('/', validateToken, userEventController.registerUserToEvent);
router.delete('/', validateToken, userEventController.unregisterUserFromEvent);

export default router;