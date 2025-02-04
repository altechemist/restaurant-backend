import { Router } from 'express';
import { 
  createReservation, 
  getReservations, 
  getReservation, 
  updateReservation, 
  deleteReservation 
} from "../controllers/reservationController";

const router = Router();

// Create a new reservation
router.post('/', createReservation);

// Get all reservations
router.get('/', getReservations);

// Get a single reservation by ID
router.get('/:id', getReservation);

// Update a reservation
router.put('/:id', updateReservation);

// Delete a reservation
router.delete('/:id', deleteReservation);

export default router;
