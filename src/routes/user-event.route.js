import { Router } from "express";
import userEventController from "../controllers/user-event.controller.js";

const router = Router();

router.get('/event/:eventId', userEventController.getRegisteredUsersByEvent);
router.get('/user/:userId', userEventController.getRegisteredEventsByUser);
router.post('/', userEventController.registerUserToEvent);
router.delete('/', userEventController.unregisterUserFromEvent);

export default router;