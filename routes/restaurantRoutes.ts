import { Router } from 'express';
import { createReservation, getReservations } from '../controllers/reservationController';

const router = Router();

router.post('/reservations', createReservation);  // This should point to a valid function
router.get('/reservations', getReservations);    // This should point to a valid function

export default router;
