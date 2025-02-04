import { Request, Response } from 'express';
import { Reservation } from '../models/reservationModel';

// Create a reservation
export const createReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: 'Error creating reservation' });
  }
};

// Fetch all reservations
export const getReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservations = await Reservation.find().populate('restaurant').populate('user');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reservations' });
  }
};

// Fetch a single reservation by ID
export const getReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('restaurant').populate('user');
    if (!reservation) {
      res.status(404).json({ message: 'Reservation not found' });
      return;
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reservation' });
  }
};

// Update a reservation
export const updateReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReservation) {
      res.status(404).json({ message: 'Reservation not found' });
      return;
    }
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: 'Error updating reservation' });
  }
};

// Delete a reservation
export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) {
      res.status(404).json({ message: 'Reservation not found' });
      return;
    }
    res.json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting reservation' });
  }
};
