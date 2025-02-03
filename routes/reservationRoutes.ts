import { Router } from 'express';
import { createReservation, getReservations } from "../controllers/reservationController";

const router = Router();

router.post('/addReservation', createReservation);
router.get('/getReservations', getReservations);

export default router;